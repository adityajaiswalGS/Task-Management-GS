import axios from 'axios';

console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,  // Your MockAPI endpoint from .env
// });



// Add token interceptor (for protected API calls)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// CRUD functions
export const fetchTasks = () => api.get('');
export const createTask = (task) => api.post('', task);
export const updateTask = (id, task) => api.put(`/${id}`, task);
export const deleteTask = (id) => api.delete(`/${id}`);