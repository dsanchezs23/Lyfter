import { UserModel } from './user.model';

export interface CustomerModel extends UserModel {
  shippingAddress: string;
}
