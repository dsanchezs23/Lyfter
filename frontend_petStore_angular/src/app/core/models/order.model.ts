import { CartItemModel } from './cart-item.model';

export interface OrderModel {
  userId: string;
  status: string;
  cartItems: Array<CartItemModel>;
  totalPrice: number;
}
