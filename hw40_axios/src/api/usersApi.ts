import axios from 'axios';
import type { User } from '../types/user';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const loadUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('users');
  return response.data;
};
