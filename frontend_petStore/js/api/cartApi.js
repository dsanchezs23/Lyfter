import { get, post } from './http.js';

export function getCart(cartId) {
  return get(`/cart/${cartId}`);
}

export function createCart(cart) {
  return post('/cart', cart);
}
