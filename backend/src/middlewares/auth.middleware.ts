import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // Implement your authentication logic here
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const [type, token] = authorizationHeader.split(' ');

    if (type !== 'Bearer') {
        return res.status(401).json({ message: 'Invalid token type' });
    }

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        // Validate the token (this is just a placeholder, implement your actual validation logic)
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET!);
        const payload = verifiedToken as JwtPayload & {
            userId: number;
        };
        
        req.userId = payload.userId; // Assuming the token contains a user ID
    } catch (error) {
        return res.status(401).json({ message: 'Token validation failed' });
    }

    next();
}