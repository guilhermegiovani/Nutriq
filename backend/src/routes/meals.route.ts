import express from 'express';
import { getMealsController, createMealController, deleteMealController, updateMealController, getMealsByIdController } from '../controllers/meals.controller.js';

const router = express.Router();

router.get('/', getMealsController);
router.get('/:id', getMealsByIdController);
router.post('/', createMealController);
router.delete('/:id', deleteMealController);
router.patch('/:id', updateMealController);

export default router;