import express from 'express';
import { getMealsController, createMealController, deleteMealController, updateMealController, getMealsByIdController } from '../controllers/meals.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getMealsController);
router.get('/:id', getMealsByIdController);
router.post('/', authMiddleware, createMealController);
router.delete('/:id', deleteMealController);
router.patch('/:id', updateMealController);

export default router;