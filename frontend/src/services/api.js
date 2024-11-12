// src/services/api.js
import axios from 'axios';

// Set up the base URL for the Rails API
const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3001/api/v1', // Ensure this matches your Rails server URL
});

// User API request functions
export const createUser = (data) => api.post('/users', { user: data });
export const signInUser = (data) => api.post('/users/sign_in', data);

// Asset API request functions
export const getAssets = () => api.get('/assets');
export const getAsset = (id) => api.get(`/assets/${id}`);
export const createAsset = (data) => api.post('/assets', data);
export const updateAsset = (id, data) => api.put(`/assets/${id}`, data);
export const deleteAsset = (id) => api.delete(`/assets/${id}`);
export const updateAssetStatus = (id, completedStep) =>
  api.patch(`/assets/${id}/update_status`, { completed_step: completedStep });

// Debt API request functions
export const getDebts = () => api.get('/debts');
export const createDebt = (data) => api.post('/debts', data);
export const updateDebt = (id, data) => api.put(`/debts/${id}`, data);
export const deleteDebt = (id) => api.delete(`/debts/${id}`);

export default api;
