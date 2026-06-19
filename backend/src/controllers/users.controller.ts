import type { NextFunction, Request, Response } from "express";
import { createUserService, getUserByIdService, getUsersService } from "../services/users.service.js";

export async function createUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const newUser = await createUserService(req.body);
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        next(error);
    }
}

export async function getUsersController(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await getUsersService();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export async function getUserByIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = Number(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = await getUserByIdService(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}
