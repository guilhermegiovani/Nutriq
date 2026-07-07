import { AppError } from "../errors/AppError.js";
import bcrypt from 'bcrypt';
import { createUserRepository, findUserByEmailRepository, getUserByIdRepository, getUsersRepository } from "../repositories/users.repository.js";
import type { CreateUserDTO, User } from "../types/users.type.js";

export async function createUserService(userData: CreateUserDTO) {
    const { name, email, password, confirmPassword } = userData;

    if (!name || !email || !password) {
        throw new AppError("Name, email, and password are required", 400);
    }

    if (password !== confirmPassword) {
        throw new AppError("Passwords do not match", 400);
    }

    const existingUser = await findUserByEmailRepository(email);

    if (existingUser) {
        throw new AppError("Email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userToCreate = {
        ...userData,
        password: hashedPassword
    }

    const newUser = await createUserRepository(userToCreate);

    if (!newUser) {
        throw new AppError("Failed to create user", 500);
    }

    return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        created_at: newUser.created_at,
    }
}

export async function getUsersService(): Promise<User[]> {
    const users = await getUsersRepository();

    if (!users || users.length === 0) {
        throw new AppError("No users found", 404);
    }

    return users;
}

export async function getUserByIdService(userId: number): Promise<User> {
    const user = await getUserByIdRepository(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
}

