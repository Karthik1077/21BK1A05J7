// api.js
import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/test';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
