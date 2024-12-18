import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function DefaultLayout({ children }) {
  return (
    <>
      {/* Encabezado */}
      <Header />

      {/* Contenido principal */}
      {children}

      {/* Pie de página */}
      <Footer />
    </>
  );
}

export default DefaultLayout;
