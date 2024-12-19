import React from "react";
import { useLocation } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
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
    </div>
  );
}

export default SearchResults;
