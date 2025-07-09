import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  // You can add more default config here
});

// Add the interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Optionally clear token here
      localStorage.removeItem("access_token");
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
