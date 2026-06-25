import { queryDB } from "../database/queryDB.js";
import type { CreateMealDTO, Meal } from "../types/meals.types.js";

export async function getRepositoryMeals(userId: number): Promise<Meal[]> {
    const mealsDB = await queryDB('SELECT * FROM meals WHERE user_id = $1', [userId]);

    return mealsDB.rows;
}

export async function getMealByIdRepository(mealId: number, userId: number): Promise<Meal | undefined> {
    const meal = await queryDB('SELECT * FROM meals WHERE id = $1 AND user_id = $2', [mealId, userId]);
    return meal.rows[0];
}

export async function createMealRepository(mealData: CreateMealDTO, userId: number): Promise<Meal> {
    // Here you would normally save the meal to a database and return the created meal
    const newMeal = await queryDB('INSERT INTO meals (name, description, type, user_id) VALUES ($1, $2, $3, $4) RETURNING *', [mealData.name, mealData.description, mealData.type, userId]);

    //meals.push(newMeal); // Add the new meal to the in-memory array
    return newMeal.rows[0];
}

export async function deleteMealRepository(mealId: number, userId: number): Promise<Meal | undefined> {
    const mealDeleted = await queryDB('DELETE FROM meals WHERE id = $1 AND user_id = $2 RETURNING *', [mealId, userId]);
    return mealDeleted.rows[0];
}

export async function updateMealRepository(mealId: number, userId: number, mealData: Partial<CreateMealDTO>): Promise<Meal | undefined> {
    const fieldsToUpdate:string[] = [];
    const values:(string | number)[] = [];

    for (const [key, value] of Object.entries(mealData)) {

        fieldsToUpdate.push(`${key} = $${values.length + 1}`)
        values.push(value)
    }

    values.push(mealId); // Add mealId as the last parameter for the WHERE clause
    values.push(userId); // Add userId as the last parameter for the WHERE clause

    console.log(fieldsToUpdate);
    console.log(values);

    const mealsUpdated = await queryDB(`UPDATE meals SET ${fieldsToUpdate.join(', ')} WHERE id = $${values.length - 1} AND user_id = $${values.length} RETURNING *`, values);

    return mealsUpdated.rows[0];
}
