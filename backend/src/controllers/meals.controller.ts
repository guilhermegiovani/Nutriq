import type { NextFunction, Request, Response } from 'express';
import { createMealService, deleteMealService, getMealsByIdServices, getMealsServices, updateMealService } from '../services/meals.service.js';

export async function createMealController(req: Request, res: Response, next: NextFunction) {
    try{
        const newMeal = await createMealService(req.body);

        return res.status(201).json({"message": "Meal created successfully", "meal": newMeal});

    } catch (error) {
        next(error);
    }
}

export async function getMealsController(req: Request, res: Response, next: NextFunction) {
    try {
        const meals = await getMealsServices();

        return res.json(meals);
    } catch (error) {
        next(error);
    }
}

export async function getMealsByIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const mealId = Number(req.params.id);
        const meal = await getMealsByIdServices(mealId);

        return res.json(meal);
    } catch (error) {
        next(error);
    }
}

export async function deleteMealController(req: Request, res: Response, next: NextFunction) {
    try {
        // Here you would normally delete the meal from a database
        const deletedMeal = await deleteMealService(Number(req.params.id));
        return res.json({ message: 'Meal deleted successfully', meal: deletedMeal });
    } catch (error) {
        next(error);
    }
}

export async function updateMealController(req: Request, res: Response, next: NextFunction) {
    try {
        // Here you would normally update the meal in a database
        const updatedMeal = await updateMealService(Number(req.params.id), req.body);
        return res.json({ message: 'Meal updated successfully', meal: updatedMeal });
    } catch (error: unknown) {
        next(error);
    }
}
