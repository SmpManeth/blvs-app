import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = await SecureStore.getItemAsync('auth_token');
    if (token) {
      try {
        const response = await api.get('/customer', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (err) {
        await SecureStore.deleteItemAsync('auth_token'); // invalid token
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
