import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('adminToken');
      const storedAdmin = localStorage.getItem('adminData');

      if (storedToken && storedAdmin) {
        try {
          setToken(storedToken);
          setAdmin(JSON.parse(storedAdmin));
          // Verify with backend
          const res = await authAPI.getProfile();
          if (res.data.success) {
            setAdmin(res.data.admin);
            localStorage.setItem('adminData', JSON.stringify(res.data.admin));
          }
        } catch (error) {
          console.warn('Session expired or invalid token:', error.message);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      if (res.data.success) {
        const { token: receivedToken, admin: receivedAdmin } = res.data;
        setToken(receivedToken);
        setAdmin(receivedAdmin);
        localStorage.setItem('adminToken', receivedToken);
        localStorage.setItem('adminData', JSON.stringify(receivedAdmin));
        return { success: true, message: res.data.message };
      }
      return { success: false, message: res.data.message || 'Login failed' };
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Please check credentials.';
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  };

  const updateAdmin = (updated) => {
    setAdmin(updated);
    localStorage.setItem('adminData', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
        updateAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
