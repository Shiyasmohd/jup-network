'use client'
import React, { useState } from "react";
import { shareFile, signAuthMessage, uploadEncryptedFile } from "../../lib/light-house"; // Replace with the correct path to your helper file


const LighthouseApp: React.FC = () => {
 const [file, setFile] = useState(null);

const handleFileChange = (e:any) => {
  const selectedFile = e.target.files;
  if (selectedFile) {
    setFile(selectedFile);
  }
};

  const handleSignMessage = async () => {
    const result = await signAuthMessage();
    if (result) {
      console.log("Signature and Address:", result);
    }
  };

  const handleUploadFile = async () => {
   
    if (file) {
      const result = await uploadEncryptedFile( file);
      // Replace "your-signer-address" with the actual signer address
      if (result) {
        console.log("Encrypted File Status:", result);
        console.log(result.data[0].Hash)
        shareFile(
          result.data[0].Hash,
          "0xe57f24e3c9c5be617e6d330d2b2308926188e398",
          ["0x14C333676A49557bc299a8E379cAc2bDdf624064"]
        );
      }
    }
  };

  return (
    <div>
      <h1>Lighthouse App</h1>
      <div>
        <button onClick={handleSignMessage}>Sign Message</button>
      </div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUploadFile}>Upload Encrypted File</button>
      </div>
    </div>
  );
};

export default LighthouseApp;
