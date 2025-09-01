"use client";
import { useState } from "react";
import { UploadIMG } from "@/libs/api";

export default function ImageUploader({setUrls}) {
  const [imageUrl, setImageUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (files) => {
    if (files.length == 0) return;

    setIsLoading(true);
    setError("");
    const imgUrl = await UploadIMG(files);
    console.log("imgUrl", imgUrl);
    if (!imgUrl) {
      setError("Algo salio mal, vuelva a intentarlo");
      setIsLoading(false);
      return;
    }
    setImageUrl(imgUrl);
    setUrls(imgUrl)
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center space-x-4 w-fit m-auto">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files)}
          disabled={isLoading}
          className="hidden"
          id="file-upload"
          multiple
        />
        <label
          htmlFor="file-upload"
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer ${
            isLoading ? "opacity-50" : ""
          }`}
        >
          {isLoading ? "Subiendo..." : "Seleccionar Imagen"}
        </label>

        {error && (
          <div>
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>

      {imageUrl.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {imageUrl.map((url) => (
            <div key={url} className="flex justify-center">
              <img
                src={url}
                alt="Uploaded preview"
                className="max-w-xs rounded shadow"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
