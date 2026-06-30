import { createMealRepository, deleteMealRepository, getMealByIdRepository, getRepositoryMeals, updateMealRepository } from "../repositories/meals.repository.js";
import type { CreateMealDTO, Meal, MealType } from "../types/meals.types.js";
import { VALID_MEAL_TYPES } from "../types/meals.types.js";
import { AppError } from "../errors/AppError.js";
import { getMealFoodsRepository } from "../repositories/meals_foods.repository.js";

export async function createMealService(mealData: CreateMealDTO, userId: number): Promise<Meal> {
    // Here you would normally save the meal to a database and return the created meal
    if (!mealData.type) {
        throw new AppError('type are required to create a meal', 400);
    }

    if (!VALID_MEAL_TYPES.includes(mealData.type)) {
        throw new AppError('Invalid meal type', 400);
    }

    const newMeal = await createMealRepository(mealData, userId);

    return newMeal;
}

export async function getMealsServices(userId: number): Promise<Meal[]> {
    const meals = await getRepositoryMeals(userId);

    if (!meals || meals.length === 0) {
        throw new AppError('No meals found', 404);
    }

    return meals;
}

export async function getMealsByIdServices(mealId: number, userId: number): Promise<Meal> {
    const meal = await getMealByIdRepository(mealId, userId);
    if (!meal) {
        throw new AppError(`Meal with ID ${mealId} not found`, 404);
    }

    const foods = await getMealFoodsRepository(mealId);

    return {
        ...meal,
        foods
    };
}

export async function deleteMealService(mealId: number, userId: number) {
    // Here you would normally delete the meal from a database
    const mealExists = await getMealByIdRepository(mealId, userId);
    if (!mealExists) {
        throw new AppError(`Meal with ID ${mealId} not found`, 404);
    }

    const deletedMeal = await deleteMealRepository(mealId, userId);
    return deletedMeal;
}

export async function updateMealService(mealId: number, userId: number, mealData: { name?: string, description?: string, type?: MealType }) {
    // Here you would normally update the meal in a database
    const mealExists = await getMealByIdRepository(mealId, userId);
    if (!mealExists) {
        throw new AppError(`Meal with ID ${mealId} not found`, 404);
    }

    if (Object.keys(mealData).length === 0) {
        throw new AppError('No data provided to update the meal', 400);
    }

    // Here you would normally update the meal in a database
    const updatedMeal = await updateMealRepository(mealId, userId, mealData);

    // For demonstration purposes, we'll just return the updated meal
    return updatedMeal;
}
