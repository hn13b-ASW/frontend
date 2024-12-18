import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext"; // Importar el contexto

import DefaultLayout from "./layouts/DefaultLayout"; // Layout con Header y Footer
import NoHeaderFooterLayout from "./layouts/NoHeaderFooterLayout"; // Layout sin Header ni Footer
import Header from "./components/Header";
import StoryList from "./components/StoryList";
import Footer from "./components/Footer";
import Maintenance from "./components/Maintenance"; // Página en mantenimiento
import "./styles/news.css";

function App() {
  return (
    <UserProvider> {/* Proveer el contexto del usuario */}
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

              {/* Ruta temporal sin header ni footer */}
              <Route
                path="/maintenance"
                element={
                  <NoHeaderFooterLayout>
                    <Maintenance />
                  </NoHeaderFooterLayout>
                }
              />
              {/* Ruta para manejar todas las rutas no definidas */}
              <Route path="*" element={<Maintenance />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

