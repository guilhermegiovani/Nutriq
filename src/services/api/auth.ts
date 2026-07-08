import { LoginDTO, LoginResponse, RegisterDTO, RegisterResponse } from "@/types/auth";
import { apiClient } from "./client";
import { endpoints } from "./endpoints";
import { User } from "@/types/user";

export async function login(credetials: LoginDTO): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>(endpoints.auth.login, credetials);

    return data;
}

export async function register(userData: RegisterDTO): Promise<RegisterResponse> {
    const { data } = await apiClient.post<RegisterResponse>(endpoints.users.register, userData);

    return data;
}

export async function getMe(): Promise<User> {
    const { data } = await apiClient.get<User>(endpoints.auth.me);
    return data;
}