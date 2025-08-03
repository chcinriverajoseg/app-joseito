// src/context/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto
export const UserContext = createContext(null);

// Hook personalizado para usar el contexto
export const useUser = () => {
  return useContext(UserContext);
};

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
