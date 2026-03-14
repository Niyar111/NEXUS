import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor – attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nexus_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('nexus_token');
      localStorage.removeItem('nexus_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─── Auth ───────────────────────────────────────────────
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
};

// ─── Medicines ──────────────────────────────────────────
export const medicineService = {
  getAll: () => api.get('/medicines'),
  getById: (id) => api.get(`/medicines/${id}`),
  create: (data) => api.post('/medicines', data),
  update: (id, data) => api.put(`/medicines/${id}`, data),
  delete: (id) => api.delete(`/medicines/${id}`),
};

// ─── Dose Logs ──────────────────────────────────────────
export const doseLogService = {
  log: (data) => api.post('/dose-log', data),
  getHistory: () => api.get('/dose-log/history'),
};

// ─── Analytics ──────────────────────────────────────────
export const analyticsService = {
  getAdherence: () => api.get('/analytics/adherence'),
};

// ─── User ────────────────────────────────────────────────
export const userService = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
};

// ─── Caregivers ─────────────────────────────────────────
export const caregiverService = {
  getAll: () => api.get('/caregivers'),
  create: (data) => api.post('/caregivers', data),
  delete: (id) => api.delete(`/caregivers/${id}`),
};

export default api;
