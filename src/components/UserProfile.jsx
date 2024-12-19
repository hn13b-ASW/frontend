import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const { user_id } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://hn13b.onrender.com/api/v1/users/${user_id}`);
        setUserData(response.data);
        setError(null);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Usuario no encontrado.");
        } else {
          setError("Error al cargar la información del usuario.");
        }
      }
    };

    fetchUser();
  }, [user_id]);

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Error</h2>
        <p style={{ color: "red" }}>{error}</p>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff6600",
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
    );
  }

  if (!userData) {
    return <p style={{ padding: "20px" }}>Cargando perfil...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          backgroundImage: "url(/placeholder-banner.jpg)",
          height: "150px",
          backgroundSize: "cover",
          borderRadius: "5px",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "-50px",
          paddingLeft: "10px",
        }}
      >
        <img
          src="/placeholder-profile.jpg"
          alt="Perfil"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "3px solid white",
          }}
        />
        <h2 style={{ marginLeft: "20px", color: "#000", fontWeight: "bold" }}>{userData.username}</h2>
      </div>
      <div style={{ marginTop: "20px" }}>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Karma:</strong> {userData.karma}</p>
        <p><strong>Fecha de Creación:</strong> {new Date(userData.created_at).toLocaleString()}</p>
        <p><strong>About:</strong> {userData.about || "No disponible."}</p>
      </div>
    </div>
  );
}

export default UserProfile;

