// 'use client'
// import { useState } from 'react'
// import { CldUploadButton } from 'next-cloudinary'

// export default function ImageUploader() {
//   const [imageUrl, setImageUrl] = useState('')

//   const handleUpload = (result) => {
//     setImageUrl(result.info.secure_url)
//     console.log('Upload result:', result.info)
//   }

//   return (
//     <div className="space-y-4">
//       <CldUploadButton
//         uploadPreset="first-preset" // Create this in Cloudinary
//         onSuccess={handleUpload}
//         options={{
//           sources: ['local'],
//           multiple: false,
//           maxFiles: 1,
//         }}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Upload Image
//       </CldUploadButton>

//       {imageUrl && (
//         <div className="mt-4">
//           <img
//             src={imageUrl}
//             alt="Uploaded"
//             className="max-w-xs rounded shadow"
//           />
//           <p className="mt-2 text-sm text-gray-600">
//             Image uploaded successfully!
//           </p>
//         </div>
//       )}
//     </div>
//   )
// }

"use client";
import ImageUploader from "@/components/ImageUploader";

export default function claudinary() {
return <ImageUploader/>
}
