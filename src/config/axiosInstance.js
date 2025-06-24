import axios from "axios";

// Create instance
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER, // change to your API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle error globally
        if (error.response) {
            if (error.response.status === 401) {
                sessionStorage.clear()
                window.location.href = '/login';
            } else if (error.response.status === 403 || error.response.data.message === 'Forbidden') {
                window.location.href = '/forbidden';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
