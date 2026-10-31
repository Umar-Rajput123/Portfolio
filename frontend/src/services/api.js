import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Attach JWT token to requests if available in localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiry gracefully
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized on protected route, clean expired token
      if (localStorage.getItem('adminToken')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
      }
    }
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  getProfile: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
};

// Projects Endpoints
export const projectsAPI = {
  getAll: (params) => API.get('/projects', { params }),
  getById: (id) => API.get(`/projects/${id}`),
  create: (formData) =>
    API.post('/projects', formData, {
      headers: {
        'Content-Type': formData instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    }),
  update: (id, formData) =>
    API.put(`/projects/${id}`, formData, {
      headers: {
        'Content-Type': formData instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    }),
  delete: (id) => API.delete(`/projects/${id}`),
};

// Skills Endpoints
export const skillsAPI = {
  getAll: (params) => API.get('/skills', { params }),
  getById: (id) => API.get(`/skills/${id}`),
  create: (data) => API.post('/skills', data),
  update: (id, data) => API.put(`/skills/${id}`, data),
  delete: (id) => API.delete(`/skills/${id}`),
};

// Messages Endpoints
export const messagesAPI = {
  send: (messageData) => API.post('/messages', messageData),
  getAll: () => API.get('/messages'),
  toggleRead: (id, read) => API.patch(`/messages/${id}/read`, { read }),
  delete: (id) => API.delete(`/messages/${id}`),
};

// Dashboard Stats Endpoint
export const statsAPI = {
  getStats: () => API.get('/stats'),
};

export default API;
