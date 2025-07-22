import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_URL + '/api/users';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API}/login`, credentials);
  return response.data;
};

export const getAllUsers = async (token) => {
  const response = await axios.get(`${API}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const likeUser = async (likedUserId, token) => {
  const response = await axios.post(`${API}/like`, { likedUserId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getMatches = async (token) => {
  const response = await axios.get(`${API}/matches`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
