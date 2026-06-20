import type { Request, Response, NextFunction } from 'express';
import { loginService } from '../services/auth.service.js';

export async function loginController(req: Request, res: Response, next: NextFunction) {

    try {
       const userLogin = await loginService(req.body);
       
       res.status(200).json({ message: "Login successful", user: userLogin });
    } catch (error) {
        next(error);
    }
  
}