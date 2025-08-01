"use client";
import { useNotifi } from "@/context/notifiContext";
import { useEffect, useState } from "react";
export default function EmergentNotificacion() {
  const [text, setText] = useState();
  const { notification } = useNotifi();

  useEffect(() => {
    setText(notification);
  }, [notification]);

  function Close() {
    setText("");
  }

  if (!text) return null;

  return (
    <div className="fixed top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60">
      <div className={` relative bg-white rounded-lg shadow-xl border border-gray-200 min-w-md p-6`}>
        <div className="flex justify-end">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6  right-1 top-1 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => Close()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        </div>
        <p className=" text-lg text-purple-600">Notificacion:</p>
        <p className="text-lg text-black-600">{text}</p>
      </div>
    </div>
  );
}
