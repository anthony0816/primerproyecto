import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(request) {
  const formData = await request.formData();
  const files = formData.getAll('files'); // obtiene todos los archivos

  if (!files || files.length === 0) {
    return NextResponse.json(
      { error: 'No se enviaron archivos' },
      { status: 400 }
    );
  }

  try {
    const uploadPromises = files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const result = await cloudinary.uploader.upload(
        `data:${file.type};base64,${base64}`,
        { upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET }
      );
      return result.secure_url;
    });

    const urls = await Promise.all(uploadPromises);

    return NextResponse.json({ urls }); // devuelve array de URLs
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Error al subir imágenes' },
      { status: 500 }
    );
  }
}
