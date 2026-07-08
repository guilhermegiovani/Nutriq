import type { Request, Response, NextFunction } from 'express';
import { loginService } from '../services/auth.service.js';
import { getUserByIdService } from '../services/users.service.js';

export async function loginController(req: Request, res: Response, next: NextFunction) {
    try {
       const userLogin = await loginService(req.body);
       
       res.status(200).json({ message: "Login successful", ...userLogin });
    } catch (error) {
        next(error);
    }
  
}

export async function getMeController(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId!;
        const user = await getUserByIdService(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}
