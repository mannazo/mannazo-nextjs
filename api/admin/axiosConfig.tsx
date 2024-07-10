import axios from 'axios';

const server = 'http://192.168.0.184:8080/admin';

const axiosInstance = axios.create({
  baseURL: server,
  headers: { 'Content-Type': 'application/json' }
});

export default axiosInstance;