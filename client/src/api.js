import axios from 'axios';

const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || `http://${host}:5000/api`,
  timeout: 10000,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('travel_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
