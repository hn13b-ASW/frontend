import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; // Importar el contexto del usuario
import Logo from "/y18.svg";

// Funció per ensenyar la barra de navegació de sobre de la app
function Header() {
  const { currentUser, setCurrentUser, USERS } = useUser(); // Acceso al usuario actual y la lista de usuarios

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
                <Link to="/newest">new</Link> | <Link to="/front">past</Link> |{" "}
                <Link to="/comments">comments</Link> | <Link to="/ask">ask</Link> |{" "}
                <Link to="/show">show</Link> | <Link to="/jobs">jobs</Link> |{" "}
                <Link to="/submit">submit</Link>
              </span>
            </td>
            {/* Barra de búsqueda */}
            <td style={{ textAlign: "center" }}>
              <form method="get" action="https://hn.algolia.com/">
                <input
                  type="text"
                  name="q"
                  placeholder="Search on Hacker News"
                  className="search-bar"
                />
                <input type="submit" value="Search" style={{ fontSize: "10pt" }} />
              </form>
            </td>
            {/* Usuario */}
            <td style={{ textAlign: "right", paddingRight: "4px" }}>
              <span className="pagetop">
                Usuario:{" "}
                <select
                  value={currentUser.name} // Usuario seleccionado actualmente
                  onChange={(e) => {
                    const selectedUser = USERS.find((user) => user.name === e.target.value);
                    if (selectedUser) {
                      setCurrentUser(selectedUser); // Actualizar el contexto
                      window.location.reload(); // Recargar la página
                    }
                  }}
                  style={{ fontSize: "10pt" }}
                >
                  {USERS.map((user) => (
                    <option key={user.name} value={user.name}>
                      {user.name}
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

