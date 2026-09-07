import { CartItemModel } from './cart-item.model';

export interface CartModel {
  userId: string;
  items: Array<CartItemModel>;
  totalPrice: number;
}
