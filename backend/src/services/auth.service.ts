import { AppError } from "../errors/AppError.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmailRepository } from "../repositories/users.repository.js";
import type { LoginDTO } from "../types/auth.type.js";


export async function loginService(credentials: LoginDTO) {
    // Implement your login logic here, e.g., validate credentials against the database
    // For demonstration, we'll just return a mock user object if the email and password match
    const { email, password } = credentials;

    if (!email || !password) {
        throw new AppError("Email and password are required", 400);
    }

    const dataUserByEmail = await findUserByEmailRepository(email); // Replace with actual database query
    if (!dataUserByEmail) {
        throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, dataUserByEmail.password); // Replace with actual password comparison logic (e.g., bcrypt)

    if (!isPasswordValid) {
        throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign({ userId: dataUserByEmail.id }, process.env.JWT_SECRET!, { expiresIn: '1h' }); // Replace with actual JWT generation logic

    return {
        token: token,
        user: {
            id: dataUserByEmail.id,
            email: dataUserByEmail.email,
            name: dataUserByEmail.name,
            created_at: dataUserByEmail.created_at
        }
    };
}