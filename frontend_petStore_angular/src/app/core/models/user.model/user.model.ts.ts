export interface UserModel {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthday: Date;
}

export type Role = 'CUSTOMER' | 'EMPLOYEE' | 'MANAGER'

export interface Session {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: Role;
  shippingAddress?: string;
}

export interface LoginRequest{
  email: string;
  password: string;
}

export interface RegisterRequest{
  name: string;
  lastName: string;
  email: string;
  role: Role;
  phoneNumber: string;
  birthday: Date;
  shippingAddress?: string;
}