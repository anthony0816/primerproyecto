"use client";
import { useEffect, useState, useRef } from "react";

export default function AssetsPage() {
  const [images, setImages] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  // Función para cargar assets
  async function fetchAssets(reset = false) {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/cloudinary/assets${
          !reset && nextCursor ? `?next_cursor=${nextCursor}` : ""
        }`
      );
      if (!res.ok) {
        return;
      }
      const data = await res.json();

      setImages((prev) => {
        const merged = reset ? data.resources : [...prev, ...data.resources];
        // Deduplicar por public_id
        return merged.filter(
          (img, index, self) =>
            index === self.findIndex((i) => i.public_id === img.public_id)
        );
      });

      setNextCursor(data.next_cursor || null);
    } catch (error) {
      console.error("Error cargando assets:", error);
    } finally {
      setLoading(false);
    }
  }

  // Scroll infinito con IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextCursor) {
          fetchAssets();
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [nextCursor]); // ya no depende de la referencia de la función

  // Cargar primera tanda y limpiar estado al entrar
  useEffect(() => {
    setImages([]);
    setNextCursor(null);
    fetchAssets(true); // reset = true para cargar desde cero
  }, []);

  async function GetAllUrls() {
    const dbRes = await fetch("api/imagenes/getallurls");
    if (!dbRes.ok) return;
    const dbUrls = await dbRes.json();
    console.log("urls From BACKEND", dbUrls);

    const cloudRes = await fetch("api/cloudinary/assets/getallurls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dbUrls }),
    });
    if (!cloudRes.ok) {
      return;
    }
    const cloudUrls = await cloudRes.json();
    console.log("urls From CLOUDINARY", cloudUrls);
  }

  // Eliminar asset
  async function deleteAsset(public_id) {
    if (!confirm("¿Seguro que quieres eliminar esta imagen?")) return;
    try {
      await fetch("/api/cloudinary/assets", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id }),
      });
      setImages((prev) => prev.filter((img) => img.public_id !== public_id));
    } catch (error) {
      console.error("Error eliminando asset:", error);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 min-w-100">
      <div className="flex justify-between  w-1/2 min-w-80">
        <h3 className="text-2xl text-gray-500 active:text-gray-700  hover:text-gray-700 font-bold mb-6 cursor-pointer">
          Todos los Assets
        </h3>
        <h3
          onClick={GetAllUrls}
          className="text-2xl text-red-400 hover:text-red-500 font-bold mb-6 cursor-pointer"
        >
          En desuso
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img.public_id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden group"
          >
            <img
              src={img.secure_url}
              alt={img.public_id}
              className="w-full h-48 object-cover"
            />
            {/* Botón eliminar */}
            <button
              onClick={() => deleteAsset(img.public_id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              title="Eliminar"
            >
              ✕
            </button>
            <div className="p-2 text-sm text-gray-600 truncate">
              {img.public_id}
            </div>
          </div>
        ))}
      </div>

      {/* Loader para scroll infinito */}
      {loading && <p className="text-center mt-4">Cargando...</p>}
      <div ref={loaderRef} className="h-10"></div>
    </div>
  );
}
