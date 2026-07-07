export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
}

export type CreateUserDTO = {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
}