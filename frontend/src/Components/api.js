import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: 'http://localhost:8081',
});

// Add a request interceptor
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default api;