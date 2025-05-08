import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData, navigate) => { // Receive the navigate function
    setUser({
      id: userData.id,
      username: userData.username,
      email: userData.email,
      roles: userData.roles,
      token: userData.token,
    });
    if (navigate) {
      navigate('/');
    }
  };

  const logout = (navigate) => { // Receive the navigate function
    setUser(null);
    localStorage.removeItem('authToken');
    if (navigate) {
      navigate('/login');
    }
  };

  // Function to get the token from local storage (for initial load or protected routes)
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};