import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
  const errorMessage = location.state?.errorMessage || null;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Resultados de Búsqueda</h2>
      {errorMessage ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : results.length > 0 ? (
        <ul>
          {results.map((submission) => (
            <li key={submission.id}>
              <strong>{submission.title}</strong> (id: {submission.id})
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron resultados.</p>
      )}
      {/* Botón para volver a la página de inicio */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/")} // Redirigir a la página de inicio
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff6600", // Color naranja
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          Volver a la página de inicio
        </button>
      </div>
    </div>
  );
}

export default SearchResults;
