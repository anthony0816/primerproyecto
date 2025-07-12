"use client";
import { forwardRef, useImperativeHandle, useState } from "react";
const ModalSolicitudes = forwardRef((props, ref) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    fetchSolicitudes: async (id) => {
      const response = await fetch(
        "http://localhost:3000/api/solicitudes/" + id
      );
      const data = await response.json();
      console.log("solicitudes", data);
      setSolicitudes(data);
      setIsOpen(true);
    },
  }));

  if (isOpen == false) return null;
  return (
    <>
      <div>
        <h1>Solicitudes de adopcion {solicitudes[0].animal.nombre}</h1>
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.id}>
                <td>{solicitud.usuario.nombre}</td>
                <td>{new Date(solicitud.fecha).toLocaleDateString()}</td>
                <td>{solicitud.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
});
ModalSolicitudes.displayName = "ModalSolicitudes";
export default ModalSolicitudes;
