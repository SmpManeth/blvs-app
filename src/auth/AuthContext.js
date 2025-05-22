import React, { createContext, useEffect, useState } from 'react';
import { getToken, logout, validateToken } from '../api/auth';
import { fetchCustomerProfile } from '../api/customers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = await getToken();
    console.log("Token:", token);


    if (token) {

      try {
        const userData = await fetchCustomerProfile();
        setUser(userData);
      } catch (err) {
        console.warn("Invalid token, logging out..." + err);
        await logout(); // ensures token removed
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
