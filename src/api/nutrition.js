import { api } from './api';

export function createFood(credentials) {
  return api.post('/nutrition', credentials);
}

export function deleteFood(credentials) {
  return api.delete('/nutrition', credentials);
}
