export interface UserModel {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthday: string; // ISO date string — see the note on RegisterRequest.birthday below
}

export type Role = 'CUSTOMER' | 'EMPLOYEE' | 'MANAGER';

export interface Session {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: Role;
  shippingAddress?: string; // only present when role is CUSTOMER
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthday: string; // ISO date string, e.g. "2000-01-01T00:00:00"
  shippingAddress: string;
}
