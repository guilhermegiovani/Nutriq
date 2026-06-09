import { createMealRepository, deleteMealRepository, getMealByIdRepository, getRepositoryMeals, updateMealRepository } from "../repositories/meals.repository.js";
import type { CreateMealDTO, Meal } from "../types/meals.types.js";

export async function createMealService(mealData: CreateMealDTO) {
    // Here you would normally save the meal to a database and return the created meal
    if (!mealData.name || !mealData.description) {
        throw new Error('Name and description are required to create a meal');
    }

    const newMeal = await createMealRepository(mealData);

    return newMeal;
}

export async function getMealsServices(): Promise<Meal[]> {
    const meals = await getRepositoryMeals();

    if (!meals || meals.length === 0) {
        throw new Error('No meals found');
    }

    return meals;
}

export async function getMealsByIdServices(mealId: number): Promise<Meal> {
    const meal = await getMealByIdRepository(mealId);
    if (!meal) {
        throw new Error(`Meal with ID ${mealId} not found`);
    }

    return meal;
}

export async function deleteMealService(mealId: number) {
    // Here you would normally delete the meal from a database
    const mealExists = await getMealByIdRepository(mealId);
    if (!mealExists) {
        throw new Error(`Meal with ID ${mealId} not found`);
    }

    const deletedMeal = await deleteMealRepository(mealId);
    console.log(`Meal with ID ${mealId} deleted (not really, this is just a placeholder)`);
    return deletedMeal;
}

export async function updateMealService(mealId: number, mealData: { name?: string, description?: string }) {
    // Here you would normally update the meal in a database
    const mealExists = await getMealByIdRepository(mealId);
    if (!mealExists) {
        throw new Error(`Meal with ID ${mealId} not found`);
    }

    if (Object.keys(mealData).length === 0) {
        throw new Error('No data provided to update the meal');
    }

    // Here you would normally update the meal in a database
    const updatedMeal = await updateMealRepository(mealId, mealData);
    console.log(`Meal with ID ${mealId} updated (not really, this is just a placeholder)`);

    // For demonstration purposes, we'll just return the updated meal
    return updatedMeal;
}
