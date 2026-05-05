import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [activeRole, setActiveRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(true);

  // Rehydrate user from localStorage/token on load
  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
        if (payload.roles && payload.roles.length > 0) {
          setActiveRole(payload.roles[0]);
        }
      } catch (error) {
        console.error("Invalid token format", error);
        logout();
      }
    }
    setIsLoading(false);
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      if (data.user.roles && data.user.roles.length > 0) {
        setActiveRole(data.user.roles[0]);
      }
      return data.user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setActiveRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, role: activeRole, activeRole, setActiveRole, switchRole: setActiveRole, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
