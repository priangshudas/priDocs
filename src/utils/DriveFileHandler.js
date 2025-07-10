
async function downloadFile(data, accessToken) {
  const fileId = data.file.id; // Assuming 'data' contains the file ID
  const fileName = data.file.name || 'downloaded-file'; // Default name if not provided
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName; 
  a.click();
}

 async function deleteFile(fileId, accessToken) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 204) {
      console.log("✅ File deleted successfully");
      return true;
    } else {
      const error = await response.json();
      console.error("❌ Delete failed", response.status, error);
      return false;
    }
  } catch (err) {
    console.error("❌ Unexpected error deleting file:", err);
    return false;
  }
}


export {  downloadFile, deleteFile };