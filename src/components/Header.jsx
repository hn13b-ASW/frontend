import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; // Importar el contexto del usuario
import Logo from "/y18.svg";
import axios from "axios";

function Header() {
  const { currentUser, setCurrentUser, USERS } = useUser();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Activar estado de carga

    try {
      const response = await axios.get(
        `https://hn13b.onrender.com/api/v1/submissions/search`,
        { params: { query } }
      );

      // Redirigir con resultados
      navigate("/search", { state: { results: response.data } });
    } catch (error) {
      // Manejar error (422 o cualquier otro)
      navigate("/search", {
        state: { errorMessage: "Error al realizar la búsqueda. Inténtalo de nuevo." },
      });
    } finally {
      setIsLoading(false); // Desactivar estado de carga
    }
  };

  return (
    <header style={{ backgroundColor: "#ff6600", padding: "2px" }}>
      <table width="100%">
        <tbody>
          <tr>
            <td style={{ width: "18px", paddingRight: "4px" }}>
              {/* Logo */}
              <Link to="/">
                <img
                  src={Logo}
                  width="18"
                  height="18"
                  alt="Hacker News Logo"
                  style={{ border: "1px solid white", display: "block" }}
                />
              </Link>
            </td>
            {/* Navegación */}
            <td>
              <span className="pagetop">
                <b className="hnname">
                  <Link to="/">Hacker News</Link>
                </b>
                | {" "}
                <Link to="/new">new</Link> | {" "}
                <Link to="/threads">threads</Link> | {" "}
                <Link to="/comments">comments</Link> | {" "}
                <Link to="/ask">ask</Link> | {" "}
                <Link to="/submit">submit</Link> | {" "}
              </span>
            </td>
            {/* Barra de búsqueda */}
            <td style={{ textAlign: "center" }}>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  name="q"
                  placeholder="Search on Hacker News"
                  className="search-bar"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isLoading} // Deshabilitar durante carga
                />
                <input
                  type="submit"
                  value={isLoading ? "Buscando..." : "Search"}
                  style={{ fontSize: "10pt" }}
                  disabled={isLoading} // Deshabilitar durante carga
                />
              </form>
            </td>
            {/* Usuario */}
            <td style={{ textAlign: "right", paddingRight: "4px" }}>
              <span className="pagetop">
                Usuario:{" "}
                <select
                  value={currentUser.user_id} // Usuario seleccionado actualmente
                  onChange={(e) => {
                    const selectedUser = USERS.find((user) => user.user_id === Number(e.target.value));
                    if (selectedUser) {
                      setCurrentUser(selectedUser); // Actualizar el contexto
                      window.location.reload(); // Recargar la página
                    }
                  }}
                  style={{ fontSize: "10pt" }}
                >
                  {USERS.map((user) => (
                    <option key={user.user_id} value={user.user_id}>
                      {user.name} {/* Mostrar name como opción visible */}
                    </option>
                  ))}
                </select>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </header>
  );
}

export default Header;
