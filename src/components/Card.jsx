import { useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaRegFileAlt } from "react-icons/fa";
import { IoMdCloudDownload } from "react-icons/io";
import { RiCloseLine } from "react-icons/ri";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming db and auth are exported from here
import ConfirmModalBox from "./ConfirmModalBox";
import TagButton from "./TagButton";
import { deleteFile } from "../utils/DriveFileHandler"; // Import any necessary functions from DriveFileHandler


const Card = ({ data, reference, user }) => {
  const [originalDesc, setOriginalDesc] = useState(data.desc);
  const [desc, setDesc] = useState(data.desc || "");
  const descRef = useRef(null);
  const cardRef = useRef(null);
  const controls = useAnimation();
  const editableRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteCardModal, setDeleteCardModalOpen] = useState(false);
  const accessToken = localStorage.getItem("googleAccessToken") || null; // Get access token from sessionStorage




  const getFileDocRef = (fileId) => {
    return doc(db, "users", user.uid, "files", fileId);
  };

  const updateDescription = async (id, newDesc) => {
    try {
      const fileDocRef = getFileDocRef(id);
      await updateDoc(fileDocRef, {
        desc: newDesc
      });
      // console.log(`Description for document ${id} updated to: "${newDesc}"`);
    } catch (error) {
      console.error(`Error updating description for ${id}:`, error);
    }
  }

  const setUpload = async (id, upload) => {
    try {
      const fileDocRef = getFileDocRef(id);
      if (upload) {
        var ref = { close: true, tag: { isOpen: true, tagTitle: "Upload", tagColor: "blue" } }
      } else {
        var ref = { close: false, tag: { isOpen: false, tagTitle: "init", tagColor: "blue" } }
      }
      await updateDoc(fileDocRef, ref);
      // console.log(`Description for document ${id} updated to: "${newDesc}"`);
    } catch (error) {
      console.error(`Error updating description for ${id}:`, error);
    }
  }

  const setDownload = async (id, download) => {
    try {
      const fileDocRef = getFileDocRef(id);
      if (download) {
        var ref = { close: true, tag: { isOpen: true, tagTitle: "Download", tagColor: "green" } }
      } else {
        var ref = { close: false, tag: { isOpen: false, tagTitle: "init", tagColor: "green" } }
      }
      await updateDoc(fileDocRef, ref);
      // console.log(`Description for document ${id} updated to: "${newDesc}"`);
    } catch (error) {
      console.error(`Error updating description for ${id}:`, error);
    }
  }





  const handleCardClick = () => {
    // Focus on the editable field
    if (editableRef.current) {
      editableRef.current.focus();
    }
    handleClick();
  };


  const handleClick = () => {
    setOriginalDesc(desc); // Save original before editing
    // setIsEditing(true);
    setTimeout(() => {
      descRef.current?.focus();
    }, 0);
  };

  const handleBlur = (e) => {
    const content = e.target.innerText.trim();

    if (content === originalDesc?.trim()) {
      // No changes made
      // setIsEditing(false);
      console.log("No changes to save.");
      return;
    }

    // If content is empty, revert to original description or fallback
    if (content !== "") {
      setDesc(content);
      // setIsEditing(false);
      updateDescription(data.id, content); // Update the description in Firestore
      console.log("Description saved:", content);

    } else {
      const fallback = data.desc || "Click to edit...";
      setDesc(fallback);
      console.log("Reverting to fallback:", fallback);
    }
  };


  const deleteTheFile = (e) => {
    e.stopPropagation(); // Prevent the card click event
    const fileId = data.file.id;
    // setModalOpen(true); // Open the confirmation modal
    deleteFile(fileId, accessToken)
      .then(() => {
        console.log("File deleted successfully:", fileId);
        // onDelete(fileId); // Call the onDelete prop to remove the card from the UI
        setModalOpen(false); // Close the modal after deletion
        try {
          const ref = {
            filesize: "",
            file: {},
            downloadble: false,
            tag: { isOpen: true, tagTitle: "Upload", tagColor: "blue" },
          }
          const fileDocRef = doc(db, "users", user.uid, "files", data.id);
          updateDoc(fileDocRef, ref);
          //     // console.log(`Description for document ${id} updated to: "${newDesc}"`);
        } catch (error) {
          console.error(`Error updating description for ${data.id}:`, error);
        }
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });
  };


  const deleteTheCard = async (e) => {
    e.stopPropagation(); // Prevent the card click event
    try {
      const fileDocRef = doc(db, "users", user.uid, "files", data.id);
      await deleteDoc(fileDocRef);
      console.log(`Document with ID ${docId} deleted successfully`);
    } catch (e) {
      console.error("Error deleting document:", e);
    }
  }
  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={reference}
      animate={controls}
      whileDrag={{ scale: 1.1 }}
      className="relative flex-shrink-0 w-52 h-60 rounded-[30px] bg-zinc-900/50 text-white px-6 py-8 overflow-hidden shadow-2xl hover:shadow-indigo-500/50 cursor-grab"
    >
      <header
        onClick={handleCardClick}

      >

        <FaRegFileAlt />

        <div
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={handleBlur}
          className={`text-xs mt-5 font-semibold leading-tight outline-none break-words ${desc === "" ? "text-zinc-400 italic" : ""
            }`}
        >
          {desc || "Click to edit..."}
        </div>
      </header>

      <footer className="absolute bottom-0 left-0 w-full h-15">
        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-xs font-semibold leading-tight">
            {formatBytes(data.filesize || 0)}
          </p>
          {data?.downloadble ? <span className="flex flex-row items-center space-x-2"> <MdDelete className="cursor-pointer" onClick={e => { e.stopPropagation(); setModalOpen(true); }} />


            <span>{data.close ? <RiCloseLine className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setDownload(data.id, false) }} /> : <IoMdCloudDownload className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setDownload(data.id, true) }} />}</span>

          </span> :

            (<span className="flex flex-row items-center space-x-2">  <MdDelete className="cursor-pointer" onClick={e => { e.stopPropagation(); setDeleteCardModalOpen(true); }} />{data.close ? <RiCloseLine className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setUpload(data.id, false) }} /> :
              <IoMdCloudUpload className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setUpload(data.id, true) }} />}</span>)}
        </div>
        {data.tag.isOpen && (
          <TagButton data={data} user={user} />
        )}
      </footer>

      <ConfirmModalBox
        open={modalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this file?"
        onConfirm={deleteTheFile}
        onCancel={() => setModalOpen(false)}
      />


      <ConfirmModalBox
        open={deleteCardModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this Card?"
        onConfirm={deleteTheCard}
        onCancel={() => setDeleteCardModalOpen(false)}
      />
    </motion.div>
  );
};


function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default Card;
