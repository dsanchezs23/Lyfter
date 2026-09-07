import { post } from './http.js';

export function addCartItem(item) {
  return post('/cartItem', item);
}
