import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const UserContext = createContext();

// Usuarios hardcodeados
const USERS = [
  { name: "observador", api_Key: "no_privileges" },
  { name: "usuario1", api_Key: "key_usuario1" },
  { name: "usuario2", api_Key: "key_usuario2" },
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
