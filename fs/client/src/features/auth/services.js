import axios from 'axios';
const BASE_URL = '/api/users/';
const LOGIN_URL = '/api/users/login';

const register = async (userData) => {
  const response = await axios.post(BASE_URL, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const login = async (userData) => {
  const response = await axios.post(LOGIN_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const services = {
  register,
  logout,
  login,
};

export default services;
