import express from 'express';
import { createUserController, getUserByIdController, getUsersController } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', getUsersController);
router.get('/:id', getUserByIdController);
router.post('/', createUserController);
// router.delete('/:id', );
// router.patch('/:id', );

export default router;