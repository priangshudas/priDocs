import  { useRef, useState} from 'react'
import { uploadFileWithProgress } from "../utils/UploadFileWIthProgress"; 
import {  downloadFile } from "../utils/DriveFileHandler" 
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase'; 

const TagButton = ({ data,user }) => {
    const accessToken = localStorage.getItem("googleAccessToken") || null; // Get access token from sessionStorage

    const fileInputRef = useRef(null);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !accessToken) return;
        setUploadStatus({
            percent: 0,
            fileName: file.name,
            size: file.size,
            done: false,
            error: false,
        });
        try {
            await uploadFileWithProgress(accessToken, file, (progress) => {
                setUploadStatus((prev) => ({ ...prev, ...progress }));
            }).then((fileId) => {
                console.log("File uploaded successfully, IDaaaaaa:", fileId)      
                
                
                updateFileDataFirestore(data.id,file, fileId);
                setTimeout(() => setUploadStatus(null), 2000);
            });
        } catch (error) {
            console.error("Upload failed", error);
            setUploadStatus((prev) => ({ ...prev, error: true }));
            // Hide error after 4 seconds
            setTimeout(() => setUploadStatus(null), 4000);
        }
    };



const updateFileDataFirestore = async (docid , file,fileId ) => {
  try {
    const fileData = { name: file.name, size: file.size, type: file.type, lastModified: file.lastModified};
        const ref =  {
    //    desc: "",
            filesize: file.size,
            file: {...fileData,id: fileId},
            downloadble: true,
            close: false,
            tag: { isOpen: true, tagTitle: "Download", tagColor: "green" },
            // createdAt: serverTimestamp() 
          
    }
    const fileDocRef = doc(db, "users", user.uid, "files", docid);
    await updateDoc(fileDocRef,ref);
    // console.log(`Description for document ${id} updated to: "${newDesc}"`);
  } catch (error) {
    console.error(`Error updating description for ${docid}:`, error);
  }
}
    return (
        <div
            onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card click
                console.log("Tag clicked:", data.tag.tagTitle);
                if (data.tag.tagTitle === "Upload") {
                    // console.log("Upload action triggered for:", data.tag.tagTitle);
                    fileInputRef.current.click(); // Trigger the hidden file input

                } else if (data.tag.tagTitle === "Download") {
                    // console.log("Download action triggered for:", data.tag.tagTitle);
                    downloadFile(data, accessToken);
                }
            }}
            className={`progress w-full px-6 py-3 ${data.tag.tagColor === "blue" ? "bg-blue-600" : "bg-green-600"
                } flex justify-center items-center`}
        >
            <p className="text-xs font-semibold leading-tight">
                {data.tag.tagTitle}
            </p>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }} // 👈 hidden input
            />

            {/* uploadProgressbar */}
            {uploadStatus && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl border border-white border-opacity-30 shadow-xl text-white w-80 text-center">
                        <h3 className="text-lg font-semibold mb-2">
                            {uploadStatus.done
                                ? "Upload complete"
                                : uploadStatus.error
                                    ? "Upload failed"
                                    : `Uploading ${uploadStatus.fileName}`}
                        </h3>

                        {!uploadStatus.done && !uploadStatus.error && (
                            <>
                                <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-2">
                                    <div
                                        className="bg-green-400 h-3 rounded-full"
                                        style={{ width: `${uploadStatus.percent}%` }}
                                    />
                                </div>
                                <p className="text-sm">
                                    {uploadStatus.percent}% —{" "}
                                    {(uploadStatus.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </>
                        )}

                        {uploadStatus.done && (
                            <p className="text-green-300 mt-2">Upload completed successfully.</p>
                        )}
                        {uploadStatus.error && (
                            <p className="text-red-400 mt-2">Something went wrong.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TagButton