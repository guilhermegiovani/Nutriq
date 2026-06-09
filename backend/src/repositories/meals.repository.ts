import pool from "../database/db.js";
import type { CreateMealDTO, Meal } from "../types/meals.types.js";

let meals: Meal[] = [
    {
        id: 1,
        name: 'Meal 1',
        description: 'Description for Meal 1'
    },
    {
        id: 2,
        name: 'Meal 2',
        description: 'Description for Meal 2'
    },
    {
        id: 3,
        name: 'Meal 3',
        description: 'Description for Meal 3'
    },
    {
        id: 4,
        name: 'Meal 4',
        description: 'Description for Meal 4'
    },
];

export async function getRepositoryMeals(): Promise<Meal[]> {
    const mealsDB = await pool.query('SELECT * FROM meals');

    return mealsDB.rows;
}

export async function getMealByIdRepository(mealId: number) {
    const meal = await pool.query('SELECT * FROM meals WHERE id = $1', [mealId]);
    return meal.rows[0];
}

export async function createMealRepository(mealData: CreateMealDTO) {
    // Here you would normally save the meal to a database and return the created meal
    const newMeal = await pool.query('INSERT INTO meals (name, description) VALUES ($1, $2) RETURNING *', [mealData.name, mealData.description]);

    //meals.push(newMeal); // Add the new meal to the in-memory array
    return newMeal.rows[0];
}

export async function deleteMealRepository(mealId: number) {
    const mealDeleted = await pool.query('DELETE FROM meals WHERE id = $1 RETURNING *', [mealId]);
    return mealDeleted.rows[0];
}

export async function updateMealRepository(mealId: number, mealData: { name?: string, description?: string }) {
    const mealsUpdated = await pool.query('UPDATE meals SET name = $1, description = $2 WHERE id = $3 RETURNING *', [mealData.name, mealData.description, mealId]);

    return mealsUpdated.rows[0];
}
