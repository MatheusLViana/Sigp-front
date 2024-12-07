import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.3.21:8000/api/',
  //   baseURL: 'http://10.0.24.15:8000'
});

export default api;
