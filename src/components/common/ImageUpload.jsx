import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Avatar, IconButton, Typography } from "@material-tailwind/react";
import { useRef, useState } from "react";

export default function ImageUpload({
  setProfilePicture,
  selectedImage,
  setSelectedImage,
}) {
  const inputRef = useRef(null);

  function handleFileUpload(e) {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    setProfilePicture(file);
    const reader = new FileReader();

    reader.onload = (event) => {
      setSelectedImage(event.target.result); // Update state with image URL
    };
    console.log(file);
    reader.readAsDataURL(file); // Read the file as a data URL for preview
  }

  function handleButtonClick(e) {
    e.preventDefault();
    if (!inputRef || !inputRef.current) return;

    inputRef.current.click();
  }

  function handleCancel() {
    setSelectedImage(null);
    setProfilePicture(null); // Clear the selected image
  }

  return (
    <div className="w-full">
      {selectedImage ? (
        <div className="relative mb-4">
          <img
            className="w-full h-48 object-cover rounded-lg shadow-md"
            src={selectedImage}
            alt="Selected image"
          />
          <button
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition duration-300 ease-in-out"
            onClick={handleCancel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div
          className="mb-4 flex items-center justify-center w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition duration-300 ease-in-out"
          onClick={handleButtonClick}
        >
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-600">Click to upload image</p>
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={handleFileUpload}
        accept="image/*"
      />
    </div>
  );
}
