import { CartItemModel } from "../cart-item.model/cart-item.model.ts.js";

export interface CartModel {
  userId: string;
  items: Array<CartItemModel>;
  totalPrice: number;
}