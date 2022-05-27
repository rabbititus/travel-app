import React, { useState, useEffect } from "react";

const ImageUpload = ({ getImageURI }) => {
  const [postImage, setPostImage] = useState("");

  useEffect(() => {
    getImageURI(postImage);
  }, [getImageURI, postImage]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ base64 });
  };

  return (
    <input
      type="file"
      className="form-control"
      id="image"
      name="image"
      accept=".jpeg, .png, .jpg"
      onChange={(e) => handleFileUpload(e)}
    />
  );
};

export default ImageUpload;
