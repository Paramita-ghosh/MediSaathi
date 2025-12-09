import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.get('/api/auth/profile')
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          // Token is invalid
          localStorage.removeItem('authToken');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // const login = async (email, password) => {
  //   const { data } = await api.post('/api/auth/login', { email, password });
  //   localStorage.setItem('authToken', data.token);
  //   const profileRes = await api.get('/api/auth/profile');
  //   setUser(profileRes.data);
  // };

  const login = async (email, password) => {
      const { data } = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('authToken', data.token);

      const profileRes = await api.get('/api/auth/profile');
      const fullUser = { ...profileRes.data, token: data.token };

      // ✅ Store full user info (so AdherenceChart can use it)
      localStorage.setItem('userInfo', JSON.stringify(fullUser));
      setUser(fullUser);
  };

  
  // const register = async (name, email, password) => {
  //     const { data } = await api.post('/api/auth/register', { name, email, password });
  //     localStorage.setItem('authToken', data.token);
  //     setUser({_id: data._id, name: data.name, email: data.email});
  // };

  const register = async (name, email, password) => {
    const { data } = await api.post('/api/auth/register', { name, email, password });
    localStorage.setItem('authToken', data.token);
    const fullUser = { _id: data._id, name: data.name, email: data.email, token: data.token };

    // ✅ Store full user info
    localStorage.setItem('userInfo', JSON.stringify(fullUser));
    setUser(fullUser);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, api }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

