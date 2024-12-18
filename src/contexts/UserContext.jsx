import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const UserContext = createContext();

// Usuarios hardcodeados
const USERS = [
  { name: "observador", api_Key: "no_privileges" },
  { name: "usuario1", api_Key: "key_usuario1" },
  { name: "usuario2", api_Key: "key_usuario2" },
  { name: "admin", api_Key: "key_admin" },
];

// Proveedor del contexto
export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(USERS[0]); // "observador" por defecto

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
