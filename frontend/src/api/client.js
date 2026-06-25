import axios from 'axios';

const viteEnv = import.meta.env || {};
const API_BASE = viteEnv.VITE_API_URL || (viteEnv.DEV ? 'http://localhost:5000' : '');

export const apiClient = axios.create({
  baseURL: API_BASE,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getApiBase = () => API_BASE;
