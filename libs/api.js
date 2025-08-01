export async function CreateNotificacion(usuario_id, descrip, contexto) {
  const res = await fetch("/api/notificaciones/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuarioId: usuario_id,
      mensaje: descrip,
      contexto: contexto,
    }),
  });
  const data = await res.json();
  const { notificacion, mensaje } = data;
  if (notificacion) {
    return {
      state: true,
      mensaje: null,
    };
  }
  return {
    state: false,
    mensaje: mensaje,
  };
}

export async function MarcarNotificacionesComoLeidas(id) {
  const respone = await fetch("api/notificaciones/marcar_leidas", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  const data = await respone.json();
  return data;
}

  export async function VerifyForNewNotifications(id) {
    const response = await fetch("api/notificaciones/new", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await response.json();
    return data;
  }

  export async function FetchNotifi(id) {
    const response = await fetch(`/api/notificaciones/${id}`);
      const data = await response.json();
      const { notificaciones } = data;
      if (!notificaciones) {
        return null
      }
      return notificaciones
  }