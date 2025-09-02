export function NotificationCard({ context, descrip, leido, fecha }) {
  return (
    <div className="my-3">
      <div
        className={` relative bg-white rounded-lg shadow-xl border border-gray-200 min-w-md p-6`}
      >
        <div
          className={`flex justify-end ${
            leido == false ? "text-black-600" : "text-gray-400"
          } `}
        >
          <p>
            {new Date(fecha).toLocaleString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
        <p
          className={` text-lg ${
            leido == false ? "text-purple-600" : "text-purple-400"
          }`}
        >
          {context ? context : "sin contexto"}
        </p>
        <p
          className={`text-lg ${
            leido == false ? "text-black-600" : "text-gray-400"
          }`}
        >
          Mensaje: <br />
          {descrip ? descrip : "sin descripcion"}
        </p>
      </div>
    </div>
  );
}
