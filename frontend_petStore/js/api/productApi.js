import { get, post, put } from './http.js';

export function getAllProducts() {
  return get('/product');
}

export function getProductById(id) {
  return get(`/product/${id}`);
}

export function createProduct(payload) {
  return post('/product', payload);
}

export function updateProduct(id, payload) {
  return put(`/product/${id}`, payload);
}
