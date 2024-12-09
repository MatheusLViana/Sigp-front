import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.3.21:8000/api/", // Certifique-se que a URL termina com `/api/`
});

// Intercepta todas as requisições para adicionar o token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
