import express from 'express';
import mealsRouter from './meals.route.js';
import usersRouter from './users.route.js';
import authRouter from './auth.route.js';
import foodsRouter from './foods.route.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

router.use('/meals', mealsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/foods', foodsRouter);

export default router;