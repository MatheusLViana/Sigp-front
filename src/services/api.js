import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.3.21:8000/api/",
  //   baseURL: 'http://10.0.24.15:8000'
});

// Intercepta todas as requisições para adicionar o token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
