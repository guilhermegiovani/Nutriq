import express from 'express';
import { getMealsController, createMealController, deleteMealController, updateMealController, getMealsByIdController } from '../controllers/meals.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { createMealFoodController, deleteMealFoodController, getMealFoodsController, updateMealFoodController } from '../controllers/meals_foods.controller.js';

const router = express.Router();

router.get('/', authMiddleware, getMealsController);
router.get('/:id', authMiddleware, getMealsByIdController);
router.post('/', authMiddleware, createMealController);
router.delete('/:id', authMiddleware, deleteMealController);
router.patch('/:id', authMiddleware, updateMealController);

// Meals foods
router.post('/:mealId/foods', authMiddleware, createMealFoodController);
router.get('/:mealId/foods', authMiddleware, getMealFoodsController);
router.delete('/:mealId/foods/:mealFoodId', authMiddleware, deleteMealFoodController );
router.patch('/:mealId/foods/:mealFoodId', authMiddleware, updateMealFoodController);

export default router;