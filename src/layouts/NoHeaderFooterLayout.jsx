import React from "react";

function NoHeaderFooterLayout({ children }) {
  return (
    <>
      {/* Contenido principal sin encabezado ni pie de página */}
      {children}
    </>
  );
}

export default NoHeaderFooterLayout;
