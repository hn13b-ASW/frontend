import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/news.css"; // Importa el CSS global

// Punto de montaje en el DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

