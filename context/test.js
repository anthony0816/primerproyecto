"use client"
import { useEffect, useState } from "react";

export default function HacerFetch() {
  const [data, setData] = useState(null);
  const[username, setUsername] = useState()
  const [password, setPasword] = useState()

  useEffect(() => {
    const fetchData = async () => {
      console.log("parametros:", username, password);

      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, pas: password }),
      });

      const result = await response.json();
      console.log("data", result);
      setData(result);
    };

    fetchData();
  }, [username, password]);

  return (
    <>
    <div>
      Datos: <strong>{data ? JSON.stringify(data) : "cargando..."}</strong>
    </div>

    <input type="text" placeholder="nombre" onChange={(e)=>setUsername(e.target.value)}></input>
    <input type="text" placeholder="pas" onChange={(e)=> setPasword(e.target.value)}></input>
    </>
  );
}
