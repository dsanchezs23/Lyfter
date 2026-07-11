import { get, post } from './http.js';

export function login(email, password) {
  return post('/user/login', { email, password });
}

export function register(role, payload) {
  return post(`/user/${role}`, payload);
}

export function getUser(role, id) {
  return get(`/user/${role}/${id}`);
}

export function getAllUsers(role) {
  return get(`/user/${role}`);
}
