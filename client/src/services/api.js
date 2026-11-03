import axios from 'axios';

// Resolve and normalize the API base URL for both development and production environments
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string') {
    let clean = envUrl.trim().replace(/\/+$/, '');
    if (clean.startsWith('http') && !clean.endsWith('/api')) {
      clean = `${clean}/api`;
    }
    return clean;
  }
  // In production builds without an explicit VITE_API_URL, fallback to relative /api
  if (import.meta.env.PROD) {
    return '/api';
  }
  // Development default
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach JWT token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dbgym_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token expiration or error formatting
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token if expired or unauthorized
      if (localStorage.getItem('dbgym_token')) {
        localStorage.removeItem('dbgym_token');
        localStorage.removeItem('dbgym_user');
      }
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
};

// Membership Enquiries
export const enquiryService = {
  create: (enquiryData) => api.post('/enquiries', enquiryData),
  getAll: () => api.get('/enquiries'),
  updateStatus: (id, status) => api.patch(`/enquiries/${id}/status`, { status }),
  delete: (id) => api.delete(`/enquiries/${id}`),
};

// Contact Messages
export const contactService = {
  send: (contactData) => api.post('/contacts', contactData),
  getAll: () => api.get('/contacts'),
  markAsRead: (id) => api.patch(`/contacts/${id}/read`),
  delete: (id) => api.delete(`/contacts/${id}`),
};

// Plans Services
export const planService = {
  getAll: () => api.get('/plans'),
  getById: (id) => api.get(`/plans/${id}`),
  create: (planData) => api.post('/plans', planData),
  update: (id, planData) => api.put(`/plans/${id}`, planData),
  delete: (id) => api.delete(`/plans/${id}`),
};

// Admin Services
export const adminService = {
  getDashboardStats: () => api.get('/admin/stats'),
  getAllUsers: () => api.get('/admin/users'),
  updateUserRole: (userId, role) => api.patch(`/admin/users/${userId}/role`, { role }),
};

export default api;
