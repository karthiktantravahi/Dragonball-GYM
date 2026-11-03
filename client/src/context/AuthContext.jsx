import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('dbgym_token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('dbgym_token');
      const storedUser = localStorage.getItem('dbgym_user');

      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          // Optionally verify with backend
          try {
            const { data } = await authService.getProfile();
            if (data?.user) {
              setUser(data.user);
              localStorage.setItem('dbgym_user', JSON.stringify(data.user));
            }
          } catch (err) {
            // If offline, keep local stored user for resilience
            console.warn('Backend verification failed, using cached session:', err.message);
          }
        } catch (e) {
          console.error('Error parsing stored user:', e);
          localStorage.removeItem('dbgym_token');
          localStorage.removeItem('dbgym_user');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authService.login({ email, password });
      const { token: receivedToken, user: receivedUser } = res.data;

      localStorage.setItem('dbgym_token', receivedToken);
      localStorage.setItem('dbgym_user', JSON.stringify(receivedUser));
      setToken(receivedToken);
      setUser(receivedUser);
      return { success: true, user: receivedUser };
    } catch (error) {
      // Return meaningful error
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const res = await authService.register(userData);
      const { token: receivedToken, user: receivedUser } = res.data;

      localStorage.setItem('dbgym_token', receivedToken);
      localStorage.setItem('dbgym_user', JSON.stringify(receivedUser));
      setToken(receivedToken);
      setUser(receivedUser);
      return { success: true, user: receivedUser };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, message };
    }
  };

  // Demo Admin Login for instant review / development testing
  const loginAsDemoAdmin = async () => {
    return await login('admin@dragonballgym.com', 'AdminPassword123!');
  };

  // Demo Member Login for instant athlete inspection
  const loginAsDemoMember = async () => {
    return await login('member@dragonballgym.com', 'Member123!');
  };

  const logout = () => {
    localStorage.removeItem('dbgym_token');
    localStorage.removeItem('dbgym_user');
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAdmin,
        login,
        register,
        loginAsDemoAdmin,
        loginAsDemoMember,
        logout,
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
