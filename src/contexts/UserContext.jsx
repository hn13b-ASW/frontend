import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const UserContext = createContext();

// Usuarios hardcodeados
const USERS = [
  { user_id: 0, name: "observador", api_Key: "no_privileges" },
  { user_id: 1, name: "conillet-dolent", api_Key: "fa172d11989596ffb6b6739236b8fb6c2547dcf2" },
  { user_id: 2, name: "vladis-exe", api_Key: "395f7120605e047310d6d892498cf2f655dc4f0c" },
];

// Proveedor del contexto
export function UserProvider({ children }) {
  // Estado inicial cargado desde sessionStorage o "observador" por defecto
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : USERS[0];
  });

  // Guardar el usuario actual en sessionStorage cada vez que cambie
  useEffect(() => {
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, USERS }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para usar el contexto
export function useUser() {
  return useContext(UserContext);
}
