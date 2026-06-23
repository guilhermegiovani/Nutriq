import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { createFoodsController, getFoodsByIdController, getFoodsController } from '../controllers/foods.controller.js';

const router = express.Router();

router.get('/', getFoodsController);
router.get('/:id', getFoodsByIdController);
router.post('/', createFoodsController);
// router.delete('/:id');
// router.patch('/:id');

export default router;