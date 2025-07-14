import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

export default api;

// User-related API functions
export const fetchUserInfo = async (userId: string) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const fetchUserTasks = async (userId: string) => {
  const response = await api.get(`/users/${userId}/tasks`);
  return response.data;
};

export const updateUserTags = async (userId: string, tags: string[]) => {
  const response = await api.put(`/users/${userId}/tags`, { tags });
  return response.data;
};

// Task-related API functions
export const logTask = async (taskData: {
  firebaseUid: string;
  type: string;
  description: string;
  name: string;
  email: string;
}) => {
  const response = await api.post("/tasks/log", taskData);
  return response.data;
}; 