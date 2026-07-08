import express from 'express';
import { getMeController, loginController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', loginController);
router.get('/me', authMiddleware, getMeController);
// router.delete('/:id', );
// router.patch('/:id', );

export default router;