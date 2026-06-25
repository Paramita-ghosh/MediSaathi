import React, { createContext, useEffect, useState } from 'react';
import { apiClient } from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = apiClient;

  useEffect(() => {
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get('/api/auth/profile')
      .then((response) => {
        setUser({ ...response.data, token });
      })
      .catch(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [api]);

  const persistSession = async (token) => {
    localStorage.setItem('authToken', token);
    const profileRes = await api.get('/api/auth/profile');
    const fullUser = { ...profileRes.data, token };
    localStorage.setItem('userInfo', JSON.stringify(fullUser));
    setUser(fullUser);
    return fullUser;
  };

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    return persistSession(data.token);
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/api/auth/register', { name, email, password });
    return data;
  };

  const verifyRegistration = async (email, otp) => {
    const { data } = await api.post('/api/auth/verify-registration', { email, otp });
    return persistSession(data.token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, verifyRegistration, loading, api, setUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
