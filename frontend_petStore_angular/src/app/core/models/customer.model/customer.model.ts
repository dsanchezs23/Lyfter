import { UserModel } from "../user.model/user.model.ts";

export interface CustomerModel extends UserModel {
  shippingAddress: string;
}