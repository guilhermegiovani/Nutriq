import type { Request, Response, NextFunction } from 'express';
import { createFoodsService, getFoodsByIdService, getFoodsService } from '../services/foods.service.js';

export async function getFoodsController(req: Request, res: Response, next: NextFunction) {
    try {
        const foods = await getFoodsService();

        res.status(200).json(foods);

    } catch(error) {
        next(error);
    }
}

export async function getFoodsByIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const food = await getFoodsByIdService(Number(req.params.id));

        res.status(200).json(food);

    } catch(error) {
        next(error);
    }
}

export async function createFoodsController(req: Request, res: Response, next: NextFunction) {
    try {
        const newFood = await createFoodsService(req.body);

        res.status(201).json(newFood);

    } catch(error) {
        next(error);
    }
}