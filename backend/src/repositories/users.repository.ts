import { queryDB } from "../database/queryDB.js";
import type { CreateUserDTO, User } from "../types/users.type.js";

export async function createUserRepository(userData: CreateUserDTO) {
    const newUser = await queryDB('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [userData.name, userData.email, userData.password]);

    console.log(`User created: ${JSON.stringify(newUser.rows[0])} (not really, this is just a placeholder)`);

    return newUser.rows[0];
}

export async function getUserByIdRepository(userId: number): Promise<User | undefined> {
    const user = await queryDB('SELECT * FROM users WHERE id = $1', [userId]);
    return user.rows[0];
}

export async function getUsersRepository(): Promise<User[]> {
    const users = await queryDB('SELECT * FROM users');
    return users.rows;
}

export async function findUserByEmailRepository(email: string): Promise<User | undefined> {
    const user = await queryDB('SELECT * FROM users WHERE email = $1', [email]);
    return user.rows[0];
}