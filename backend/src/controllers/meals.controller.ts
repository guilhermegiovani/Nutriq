import type { Request, Response } from 'express';
import { createMealService, deleteMealService, getMealsServices, updateMealService } from '../services/meals.service.js';

export function getMealsController(req: Request, res: Response) {
    try {
        const meals = getMealsServices();

        return res.json(meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export function createMealController(req: Request, res: Response) {
    try{
        const newMeal = createMealService(req.body);

        return res.status(201).json({"message": "Meal created successfully", "meal": newMeal});

    } catch (error) {
        console.error('Error creating meal:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export function deleteMealController(req: Request, res: Response) {
    try {
        // Here you would normally delete the meal from a database
        const deletedMeal = deleteMealService(Number(req.params.id));
        return res.json({ message: 'Meal deleted successfully', meal: deletedMeal });
    } catch (error) {
        console.error('Error deleting meal:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export function updateMealController(req: Request, res: Response) {
    try {
        // Here you would normally update the meal in a database
        const updatedMeal = updateMealService(Number(req.params.id), req.body);
        return res.json({ message: 'Meal updated successfully', meal: updatedMeal });
    } catch (error) {
        console.error('Error updating meal:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
