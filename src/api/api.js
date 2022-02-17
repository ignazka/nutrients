import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const foodAPI = axios.create({
  baseURL: process.env.REACT_APP_FOOD_API_URL,
});
