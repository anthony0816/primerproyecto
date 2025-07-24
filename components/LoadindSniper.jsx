"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-2">
      <strong>Cargando</strong>
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
    </div>
  );
}