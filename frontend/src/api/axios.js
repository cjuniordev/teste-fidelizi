import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';
const BASE_URL = `${BACKEND_URL}/api/`;

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;