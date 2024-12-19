import React from "react";
import { Link } from "react-router-dom";

//Funció per ensenyar pagines inacabades 
function Maintenance() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Verdana, Geneva, sans-serif",
        color: "#828282",
      }}
    >
      <h1 style={{ color: "#000" }}>Página en Mantenimiento</h1>
      <p>Estamos trabajando en esta sección. Vuelve pronto.</p>
      <Link
        to="/"
        style={{
          color: "#ff6600",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Regresar a la página de inicio
      </Link>
    </div>
  );
}

export default Maintenance;
