import express from 'express';
import { getMealsController, createMealController, deleteMealController, updateMealController, getMealsByIdController } from '../controllers/meals.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getMealsController);
router.get('/:id', authMiddleware, getMealsByIdController);
router.post('/', authMiddleware, createMealController);
router.delete('/:id', authMiddleware, deleteMealController);
router.patch('/:id', authMiddleware, updateMealController);

export default router;