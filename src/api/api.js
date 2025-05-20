import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.102:8000/api', // 🔁 Replace with your actual API domain
});

export default api;
