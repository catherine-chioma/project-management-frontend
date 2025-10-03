// src/services/api.ts
import axios from "axios";

// Use the environment variable for the backend URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., https://project-management-r80d.onrender.com/api
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional: 10 seconds timeout
});

export default api;



