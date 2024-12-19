import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext"; // Importar el contexto del usuario
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redirección

function Submit() {
  const { currentUser } = useUser(); // Obtener el usuario actual del contexto
  const navigate = useNavigate(); // Hook para redirección
  const [type, setType] = useState("url"); // Tipo de submission
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [existingUrls, setExistingUrls] = useState([]); // URLs ya existentes
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío

  // Cargar las URLs existentes al montar el componente
  useEffect(() => {
    const fetchExistingUrls = async () => {
      try {
        const response = await axios.get("https://hn13b.onrender.com/api/v1/submissions");
        const urls = response.data
          .filter((submission) => submission.url) // Filtrar solo submissions con URL
          .map((submission) => submission.url); // Extraer las URLs
        setExistingUrls(urls);
      } catch (err) {
        console.error("Error al cargar las URLs existentes:", err);
        setMessage("No se pudieron cargar las submissions existentes.");
        setError(true);
      }
    };

    fetchExistingUrls();
  }, []);

  // Validar URL
  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar usuario
    if (currentUser.user_id === 0) { // Observador no puede realizar submissions
      setMessage("El usuario Observador no puede realizar submissions.");
      setError(true);
      return;
    }

    // Validar duplicados para tipo "url"
    if (type === "url" && existingUrls.includes(url)) {
      setMessage("La URL ya existe. Intenta con otra.");
      setError(true);
      return;
    }

    // Validar campos según el tipo
    if (type === "url" && (!title || !url || !isValidURL(url))) {
      setMessage("Por favor, introduce un título válido y una URL válida.");
      setError(true);
      return;
    }

    if (type === "ask" && (!title || !content)) {
      setMessage("Por favor, introduce un título y contenido válido.");
      setError(true);
      return;
    }

    // Crear el payload
    const payload = {
      title,
      url: type === "url" ? url : null,
      content: type === "ask" ? content : null,
      user_id: currentUser.user_id, // Usar user_id directamente
    };

    try {
      setIsSubmitting(true); // Activar el estado de envío
      setMessage(""); // Limpiar mensajes anteriores

      // Enviar la solicitud POST
      await axios.post("https://hn13b.onrender.com/api/v1/submissions", payload);
      setMessage("Submission creada con éxito.");
      setError(false);
      setSuccess(true);
      // Limpiar el formulario
      setTitle("");
      setUrl("");
      setContent("");
    } catch (error) {
      setMessage("Invalid request. Revisa los campos e inténtalo de nuevo.");
      setError(true);
    } finally {
      setIsSubmitting(false); // Desactivar el estado de envío
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Enviar Submission</h2>

      {/* Mensajes de error o éxito */}
      {message && (
        <p style={{ color: error ? "red" : "green", marginBottom: "20px" }}>
          {message}
        </p>
      )}

      {/* Indicador de carga */}
      {isSubmitting && <p style={{ color: "blue", marginBottom: "20px" }}>Enviando...</p>}

      {/* Mostrar el formulario si no hay éxito */}
      {!success && (
        <form onSubmit={handleSubmit}>
          {/* Seleccionar Tipo de Submission */}
          <div>
            <label>
              <input
                type="radio"
                value="url"
                checked={type === "url"}
                onChange={() => setType("url")}
                disabled={isSubmitting} // Deshabilitar durante el envío
              />
              URL
            </label>
            <label style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                value="ask"
                checked={type === "ask"}
                onChange={() => setType("ask")}
                disabled={isSubmitting} // Deshabilitar durante el envío
              />
              Ask
            </label>
          </div>

          {/* Campos según el tipo */}
          <div style={{ marginTop: "10px" }}>
            <label>
              Título:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ width: "100%", marginTop: "5px" }}
                disabled={isSubmitting} // Deshabilitar durante el envío
              />
            </label>
          </div>

          {type === "url" && (
            <div style={{ marginTop: "10px" }}>
              <label>
                URL:
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  style={{ width: "100%", marginTop: "5px" }}
                  disabled={isSubmitting} // Deshabilitar durante el envío
                />
              </label>
            </div>
          )}

          {type === "ask" && (
            <div style={{ marginTop: "10px" }}>
              <label>
                Contenido:
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  style={{ width: "100%", height: "100px", marginTop: "5px" }}
                  disabled={isSubmitting} // Deshabilitar durante el envío
                />
              </label>
            </div>
          )}

          {/* Botón de Enviar */}
          <div style={{ marginTop: "20px" }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#ff6600",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
              disabled={isSubmitting} // Deshabilitar durante el envío
            >
              Enviar
            </button>
          </div>
        </form>
      )}

      {/* Opciones tras el envío exitoso */}
      {success && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Volver al inicio
          </button>
          <button
            onClick={() => {
              setSuccess(false);
              setMessage("");
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Hacer otra submission
          </button>
        </div>
      )}
    </div>
  );
}

export default Submit;

