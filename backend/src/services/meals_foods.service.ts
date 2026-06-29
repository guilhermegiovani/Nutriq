import { AppError } from "../errors/AppError.js";
import { getFoodsByIdRepository } from "../repositories/foods.repository.js";
import { getMealByIdRepository } from "../repositories/meals.repository.js";
import { createMealFoodRepository, deleteMealFoodRepository, getMealFoodByIdRepository, getMealFoodsRepository, updateMealFoodRepository } from "../repositories/meals_foods.repository.js";
import type { CreateMealFoodDTO, UpdateMealFoodDTO } from "../types/meal-foods.type.js";

export async function createMealFoodService(MealFood: CreateMealFoodDTO, mealId: number, userId: number) {
    const { food_id, quantity_g } = MealFood

    const mealExists = await getMealByIdRepository(mealId, userId)
    if (!mealExists) {
        throw new AppError(`Meal with ID ${mealId} not found`, 404)
    }

    if (!food_id) {
        throw new AppError("Food ID is required to create a Meal", 400)
    }

    const foodExists = await getFoodsByIdRepository(food_id)
    if (!foodExists) {
        throw new AppError(`Food with ID ${food_id} not found`, 404)
    }

    if (typeof food_id !== "number" || food_id < 0) {
        throw new AppError("Food ID must be a number and a positive number", 400)
    }

    if (quantity_g === undefined) {
        throw new AppError("Quantity are required to create a Meal", 400)
    }

    if (typeof quantity_g !== "number" || quantity_g <= 0) {
        throw new AppError("Quantity must be a number and a positive number", 400)
    }

    const newMealFood = await createMealFoodRepository(MealFood, mealId)

    return newMealFood

}

export async function getMealFoodsService(mealId: number, userId: number) {
    const mealExists = await getMealByIdRepository(mealId, userId)
    if (!mealExists) {
        throw new AppError(`Meal with ID ${mealId} not found`, 404)
    }

    const mealFoods = await getMealFoodsRepository(mealId)

    return mealFoods
}

export async function deleteMealFoodService(mealId: number, mealFoodId: number, userId: number) {
    const mealExists = await getMealByIdRepository(mealId, userId)
    if (!mealExists) {
        throw new AppError(`Meal with ID ${mealId} not found`, 404)
    }

    const mealFoodExists = await getMealFoodByIdRepository(mealFoodId)
    if (!mealFoodExists) {
        throw new AppError(`Meal Food with ID ${mealFoodId} not found`, 404)
    }

    if (mealFoodExists.meal_id !== mealId) {
        throw new AppError("Meal food does not belong to this meal", 400)
    }

    const deletedMealFood = await deleteMealFoodRepository(mealId, mealFoodId)

    return deletedMealFood
}

export async function updateMealFoodService(mealId: number, mealFoodId: number, userId: number, updateData: UpdateMealFoodDTO) {
    const { food_id, quantity_g } = updateData

    const mealExists = await getMealByIdRepository(mealId, userId)
    if (!mealExists) {
        throw new AppError(`Meal with ID ${mealId} not found`, 404)
    }

    const mealFoodExists = await getMealFoodByIdRepository(mealFoodId)
    if (!mealFoodExists) {
        throw new AppError(`Meal food with ID ${mealFoodId} not found`, 404)
    }

    if (mealFoodExists.meal_id !== mealId) {
        throw new AppError("Meal food does not belong to this meal", 400)
    }

    if (Object.keys(updateData).length === 0) {
        throw new AppError('No data provided to update the meal', 400);
    }

    if (food_id !== undefined) {
        // valida food_id
        if (typeof food_id !== "number" || food_id <= 0) {
            throw new AppError("Food ID must be a number and a positive number", 400)
        }

        const foodExists = await getFoodsByIdRepository(food_id)
        if (!foodExists) {
            throw new AppError(`Food with ID ${food_id} not found`, 404)
        }

    }

    if (quantity_g !== undefined) {
        // valida quantity_g
        if (typeof quantity_g !== "number" || quantity_g <= 0) {
            throw new AppError("Quantity must be a number and a positive number", 400)
        }
    }

    const updatedMealFood = await updateMealFoodRepository(mealId, mealFoodId, updateData)

    return updatedMealFood

}