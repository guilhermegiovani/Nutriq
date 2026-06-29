import type { Request, Response, NextFunction } from "express"
import { createMealFoodService, deleteMealFoodService, getMealFoodsService, updateMealFoodService } from "../services/meals_foods.service.js";

export async function createMealFoodController(req: Request, res: Response, next: NextFunction) {
    try {
        const mealId = Number(req.params.mealId)
        const newMealFoods = await createMealFoodService(req.body, mealId, req.userId!)

        res.status(201).json(newMealFoods)

    } catch(erro) {
        next(erro)
    }

}

export async function getMealFoodsController(req: Request, res: Response, next: NextFunction) {
    try {
        const mealId = Number(req.params.mealId)
        const mealFoods = await getMealFoodsService(mealId, req.userId!)

        res.status(200).json(mealFoods)

    } catch(erro) {
        next(erro)
    }

}

export async function deleteMealFoodController(req: Request, res: Response, next: NextFunction) {
    try {
        const mealId = Number(req.params.mealId)
        const mealFoodId = Number(req.params.mealFoodId)
        const deletedMealFood = await deleteMealFoodService(mealId, mealFoodId, req.userId!)

        res.status(200).json(deletedMealFood)

    } catch(erro) {
        next(erro)
    }

}

export async function updateMealFoodController(req: Request, res: Response, next: NextFunction) {
    try {
        const mealId = Number(req.params.mealId)
        const mealFoodId = Number(req.params.mealFoodId)
        const updatedMealFood = await updateMealFoodService(mealId, mealFoodId, req.userId!, req.body)

        res.status(200).json(updatedMealFood)

    } catch(erro) {
        next(erro)
    }

}