import { User } from "./user";

export type LoginDTO = {
  email: string;
  password: string;
}

export type LoginResponse = {
  token: string;
  user: User;
}

export type RegisterDTO = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegisterResponse = {
  id: number;
  name: string;
  email: string;
  created_at: string;
}