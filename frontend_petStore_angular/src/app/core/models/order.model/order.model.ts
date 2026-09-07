import { CartItemModel } from "../cart-item.model/cart-item.model.ts.js";

export interface OrderModel {
  userId: string;
  status: string;
  cartItems: Array<CartItemModel>;
  totalPrice: number;
}