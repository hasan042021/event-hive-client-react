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
    <div>
      {selectedImage && (
        <div className="p-3 image-preview relative">
          <img
            className="h-40 w-full rounded object-cover object-center shadow-xl shadow-blue-gray-900/50"
            src={selectedImage}
            alt="Selected image"
          />
          <button
            className="absolute border-black top-0 right-0 p-2 bg-black-200 rounded-full hover:bg-gray-300"
            onClick={handleCancel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="flex items-center justify-center">
        <IconButton color="blue" onClick={handleButtonClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </IconButton>
        <Typography> Click The Icon To Upload Image</Typography>
      </div>

      <input ref={inputRef} type="file" hidden onChange={handleFileUpload} />
    </div>
  );
}
