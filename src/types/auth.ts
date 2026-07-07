export type LoginDTO = {
  email: string;
  password: string;
}

export type LoginResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
  };
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