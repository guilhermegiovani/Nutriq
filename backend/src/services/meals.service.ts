import { createMealRepository, deleteMealRepository, getMealByIdRepository, getRepositoryMeals, updateMealRepository } from "../repositories/meals.repository.js";
import type { CreateMealDTO, Meal, MealResponse, MealType, UpdateMealData } from "../types/meals.types.js";
import { VALID_MEAL_TYPES } from "../types/meals.types.js";
import { AppError } from "../errors/AppError.js";
import { createMealFoodRepository, deleteMealFoodsRepository, getMealFoodsRepository } from "../repositories/meals_foods.repository.js";
import { calculateFromFood } from "../util/nutrition.js";
import { buildMeal } from "./meal-builder.js";

export async function createMealService(mealData: CreateMealDTO, userId: number): Promise<Meal> {
    // Here you would normally save the meal to a database and return the created meal
    if (!mealData.type) {
        throw new AppError('type are required to create a meal', 400);
    }

    if (!VALID_MEAL_TYPES.includes(mealData.type)) {
        throw new AppError('Invalid meal type', 400);
    }

    const { items, ...meal } = mealData;
    const newMeal = await createMealRepository(meal, userId);

    for (const item of items) {
        await createMealFoodRepository(item, newMeal.id);
    }

    return buildMeal(newMeal)
}

export async function getMealsServices(userId: number): Promise<MealResponse[]> {
    const meals = await getRepositoryMeals(userId);

    if (!meals || meals.length === 0) {
        throw new AppError('No meals found', 404);
    }

    return Promise.all(meals.map(buildMeal));
}

export async function getMealsByIdServices(mealId: number, userId: number): Promise<MealResponse> {
    const meal = await getMealByIdRepository(mealId, userId);
    if (!meal) {
        throw new AppError(`Meal with ID ${mealId} not found`, 404);
    }

    // const foods = await getMealFoodsRepository(mealId);

    // return {
    //     ...meal,
    //     foods
    // };

    return buildMeal(meal);
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

export async function updateMealService(mealId: number, userId: number, mealData: UpdateMealData): Promise<MealResponse> {
    // Here you would normally update the meal in a database
    const mealExists = await getMealByIdRepository(mealId, userId);
    if (!mealExists) {
        throw new AppError(`Meal with ID ${mealId} not found`, 404);
    }

    if (Object.keys(mealData).length === 0) {
        throw new AppError('No data provided to update the meal', 400);
    }

    // Here you would normally update the meal in a database
    const mealToUpdate = {
        type: mealData.type,
        meal_date: mealData.meal_date,
    };

    const updated = await updateMealRepository(mealId, userId, mealToUpdate);

    if (!updated) {
        throw new AppError(`Meal with ID ${mealId} not found`, 404);
    }

    await deleteMealFoodsRepository(mealId);

    for (const item of mealData.items) {
        await createMealFoodRepository(item, mealId)
    }

    const updatedMeal = await getMealByIdRepository(mealId, userId);

    if (!updatedMeal) {
        throw new AppError(`Meal with ID ${mealId} not found`, 404);
    }

    // For demonstration purposes, we'll just return the updated meal
    return buildMeal(updatedMeal);
}
