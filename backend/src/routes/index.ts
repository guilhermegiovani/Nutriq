import express from 'express';
import mealsRouter from './meals.route.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

router.use('/meals', mealsRouter);

export default router;