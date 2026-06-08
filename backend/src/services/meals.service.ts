import { createMealRepository, deleteMealRepository, getMealById, getRepositoryMeals, updateMealRepository } from "../repositories/meals.repository.js";


export function getMealsServices() {
    const meals = getRepositoryMeals();

    return meals;
}

export function createMealService(mealData: { name: string, description: string }) {
    // Here you would normally save the meal to a database and return the created meal
    if (!mealData.name || !mealData.description) {
        throw new Error('Name and description are required to create a meal');
    }

    const newMeal = createMealRepository(mealData);

    return newMeal;
}

export function deleteMealService(mealId: number) {
    // Here you would normally delete the meal from a database
    const mealExists = getMealById(mealId);
    if (!mealExists) {
        throw new Error(`Meal with ID ${mealId} not found`);
    }

    const deletedMeal = deleteMealRepository(mealId);
    console.log(`Meal with ID ${mealId} deleted (not really, this is just a placeholder)`);
    return deletedMeal;
}

export function updateMealService(mealId: number, mealData: { name?: string, description?: string }) {
    // Here you would normally update the meal in a database
    const mealExists = getMealById(mealId);
    if (!mealExists) {
        throw new Error(`Meal with ID ${mealId} not found`);
    }

    if (Object.keys(mealData).length === 0) {
        throw new Error('No data provided to update the meal');
    }

    // Here you would normally update the meal in a database
    const updatedMeal = updateMealRepository(mealId, mealData);
    console.log(`Meal with ID ${mealId} updated (not really, this is just a placeholder)`);

    // For demonstration purposes, we'll just return the updated meal
    return updatedMeal;
}
