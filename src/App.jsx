import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

import DefaultLayout from "./layouts/DefaultLayout";
import NoHeaderFooterLayout from "./layouts/NoHeaderFooterLayout";
import Header from "./components/Header";
import StoryList from "./components/StoryList";
import Footer from "./components/Footer";
import Maintenance from "./components/Maintenance";
import Submit from "./components/Submit";
import SearchResults from "./components/SearchResults";
import UserProfile from "./components/UserProfile";
import "./styles/news.css";

// Funció principal que fa còrrer l'app
function App() {
  return (
    <UserProvider>
      <Router>
        <div
          id="hnmain"
          style={{
            width: "85%",
            margin: "0 auto",
            backgroundColor: "#f6f6ef",
          }}
        >
          <main>
            <Routes>
              {/* Ruta principal con header y footer */}
              <Route
                path="/"
                element={
                  <DefaultLayout>
                    <StoryList />
                  </DefaultLayout>
                }
              />
              <Route
                path="/user/0"
                element={
                  <DefaultLayout>
                    <StoryList />
                  </DefaultLayout>
                }
                />
              <Route
                path="/submit"
                element={
                  <DefaultLayout>
                    <Submit />
                  </DefaultLayout>
                }
              />
              {/* Nueva ruta para los resultados de búsqueda */}
              <Route path="/search"
                element={
                  <DefaultLayout>
                    <SearchResults />
                  </DefaultLayout>
                }
              />
              {/* Nueva ruta para perfil de usuario */}
              <Route path="/user/:user_id"
                element={
                  <DefaultLayout>
                    <UserProfile />
                  </DefaultLayout>
                }
              />
              {/* Ruta temporal sin header ni footer */}
              <Route path="/maintenance" element={
                  <DefaultLayout>
                    <Maintenance />
                  </DefaultLayout>
                }
              />
              {/* Ruta para manejar todas las rutas no definidas */}
              <Route path="*" element={<DefaultLayout><Maintenance /></DefaultLayout>} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
