import { get, post } from './http.js';

export function createOrder(order) {
  return post('/order', order);
}

export function getOrder(id) {
  return get(`/order/${id}`);
}

export function getAllOrders() {
  return get('/order');
}
