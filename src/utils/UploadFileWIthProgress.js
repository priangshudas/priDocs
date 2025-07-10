export const uploadFileWithProgress = (accessToken, file, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: ['appDataFolder'], //  uploads to private app folder

    };

    const form = new FormData();
    const blob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
    form.append("metadata", blob);
    form.append("file", file);

    xhr.open(
      "POST",
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name"
    );
    xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        // const speed = event.loaded / ((event.timeStamp || Date.now()) / 1000); // bytes/sec
        onProgress({ percent, loaded: event.loaded, total: event.total });
      }
    };

    xhr.onload = () => {
  console.log("XHR Response:", xhr.responseText); 
  if (xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);
    // console.log("File uploaded, ID:", response.id);    
    resolve(response.id);
  } else {
    console.error("Upload failed", xhr.responseText);
    reject(new Error("Upload failed"));
  }
};


    xhr.onerror = () => reject(new Error("Network error"));

    xhr.send(form);
  });
};
