import axios from "axios";
import { auth } from "./firebase";

// Create the axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Attach the ID token to every request if the user is logged in
api.interceptors.request.use(
  async (config) => {
    if (auth && auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// User-related API functions (no need to send userId/firbeaseUid anymore)
export const fetchUserInfo = async () => {
  const response = await api.get(`/user`);
  return response.data;
};

export const fetchUserTasks = async () => {
  const response = await api.get(`/tasks`);
  return response.data;
};

export const updateUserTags = async (tags: string[]) => {
  const response = await api.post(`/user/tags`, { tags });
  return response.data;
};

// Task-related API functions
export const logTask = async (taskData: {
  type: string;
  description: string;
  name: string;
  email: string;
}) => {
  const response = await api.post("/log", taskData);
  return response.data;
};
