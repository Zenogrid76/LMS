import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';

const AvatarUploader = ({ onImageChange }) => {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [editor, setEditor] = useState(null);
  const fileInputRef = useRef(null);

  // Open file dialog when button is clicked
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const handlePositionChange = (pos) => {
    setPosition(pos);
  };

  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        onImageChange(blob);
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      {/* Custom upload button */}
      <button
        type="button"
        onClick={handleButtonClick}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#1FE0AB] text-[#0D1C17] font-bold rounded-full text-center hover:bg-[#13c89a] transition duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-upload"
          viewBox="0 0 16 16"
        >
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
        </svg>
        Upload a professional photo
      </button>
      {image && (
        <>
          <AvatarEditor
            ref={setEditor}
            image={image}
            width={200}
            height={200}
            border={30}
            borderRadius={100}
            color={[255, 255, 255, 0.6]}
            scale={scale}
            position={position}
            onPositionChange={handlePositionChange}
          />
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={scale}
            onChange={handleScaleChange}
          />
          <button
            type="button"
            className="px-4 py-2 bg-[#1FE0AB] rounded-full text-[#0D1C17] font-bold hover:bg-[#13c89a] transition"
            onClick={handleSave}
          >
            Save Photo
          </button>
        </>
      )}
    </div>
  );
};

export default AvatarUploader;
