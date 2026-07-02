import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh token
        await axios.post("http://localhost:3000/api/v1/auth/refresh", {}, { withCredentials: true });
        
        // If successful, retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
