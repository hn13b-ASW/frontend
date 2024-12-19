import React, { useState, useEffect } from "react";
import axios from "axios";
import VoteButton from "./VoteButton";

//Funció per mostrar submisions
function StoryList() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos desde la API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("https://hn13b.onrender.com/api/v1/submissions");
        setStories(response.data);
      } catch (err) {
        setError("Error loading stories");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
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

  // Extraer dominio del URL
  const getSite = (url) => {
    if (url && isValidURL(url)) {
      return new URL(url).hostname;
    }
    return null;
  };

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table style={{ backgroundColor: "#f6f6ef", width: "100%" }}>
      <tbody>
        {stories.map((story, index) => (
          <React.Fragment key={story.id}>
            <tr className="athing">
              {/* Número de clasificación */}
              <td align="right" className="title" style={{ paddingRight: "5px" }}>
                <span className="rank">{index + 1}.</span>
              </td>
              {/* Flecha de votación */}
              <td className="votelinks">  
                <VoteButton id={story.id} />
              </td>
              {/* Título y URL o Content */}
              <td className="title">
                {story.url && isValidURL(story.url) ? (
                  <>
                    {/* Título como enlace */}
                    <a
                      href={story.url}
                      className="titleline hover-link"
                      style={{ color: "#000", textDecoration: "none" }}
                      target="_blank" // Abrir en nueva pestaña
                      rel="noopener noreferrer" // Seguridad
                    >
                      {story.title}
                    </a>{" "}
                    {/* Dominio como enlace */}
                    <span className="sitebit comhead" style={{ color: "#828282" }}>
                      (
                      <a
                        href={story.url}
                        className="hover-link"
                        style={{ color: "#828282", textDecoration: "none" }}
                        target="_blank" // Abrir en nueva pestaña
                        rel="noopener noreferrer" // Seguridad
                      >
                        {getSite(story.url)}
                      </a>
                      )
                    </span>
                  </>
                ) : (
                  <>
                    <span style={{ color: "#000" }}>{story.title}</span>
                    {story.content && (
                      <span style={{ color: "#828282" }}>({story.content})</span>
                    )}
                  </>
                )}
              </td>
            </tr>
            {/* Subtexto con user_id */}
            <tr>
              <td colSpan="2"></td>
              <td className="subtext" style={{ fontSize: "7pt", color: "#828282" }}>
                {story.points} points | by{" "}
                <a href="#" className="hnuser" style={{ color: "#828282" }}>
                  User {story.user_id}
                </a>{" "}
                | <span className="age">{new Date(story.created_at).toLocaleString()}</span> |{" "}
                <a
                  href="#"
                  style={{ color: "#828282" }}
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Funcionalidad no implementada todavía.");
                  }}
                >
                  hide
                </a>{" "}
                |{" "}
                <a
                  href="#"
                  style={{ color: "#828282" }}
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Funcionalidad no implementada todavía.");
                  }}
                >
                  comments
                </a>
              </td>
            </tr>
            <tr className="spacer" style={{ height: "5px" }}></tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default StoryList;
