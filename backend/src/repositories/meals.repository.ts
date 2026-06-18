import { queryDB } from "../database/queryDB.js";
import type { CreateMealDTO, Meal } from "../types/meals.types.js";

export async function getRepositoryMeals(): Promise<Meal[]> {
    const mealsDB = await queryDB('SELECT * FROM meals');

    return mealsDB.rows;
}

export async function getMealByIdRepository(mealId: number): Promise<Meal | undefined> {
    const meal = await queryDB('SELECT * FROM meals WHERE id = $1', [mealId]);
    return meal.rows[0];
}

export async function createMealRepository(mealData: CreateMealDTO): Promise<Meal> {
    // Here you would normally save the meal to a database and return the created meal
    const newMeal = await queryDB('INSERT INTO meals (name, description) VALUES ($1, $2) RETURNING *', [mealData.name, mealData.description]);

    //meals.push(newMeal); // Add the new meal to the in-memory array
    return newMeal.rows[0];
}

export async function deleteMealRepository(mealId: number): Promise<Meal | undefined> {
    const mealDeleted = await queryDB('DELETE FROM meals WHERE id = $1 RETURNING *', [mealId]);
    return mealDeleted.rows[0];
}

export async function updateMealRepository(mealId: number, mealData: Partial<CreateMealDTO>): Promise<Meal | undefined> {
    const fieldsToUpdate = [];
    const values = [];

    for (const [key, value] of Object.entries(mealData)) {

        fieldsToUpdate.push(`${key} = $${values.length + 1}`)
        values.push(value)
    }

    values.push(mealId); // Add mealId as the last parameter for the WHERE clause

    console.log(fieldsToUpdate);
    console.log(values);

    const mealsUpdated = await queryDB(`UPDATE meals SET ${fieldsToUpdate.join(', ')} WHERE id = $${values.length} RETURNING *`, values);

    return mealsUpdated.rows[0];
}
