import { queryDB } from "../database/queryDB.js";
import type { CreateMealFoodDTO, MealFood, MealFoodWithFood, UpdateMealFoodDTO } from "../types/meal-foods.type.js";


export async function createMealFoodRepository(MealFood: CreateMealFoodDTO, mealId: number): Promise<MealFood> {
    const newMealFood = await queryDB("INSERT INTO meal_foods (meal_id, food_id, quantity_g) VALUES ($1, $2, $3) RETURNING *", [mealId, MealFood.food_id, MealFood.quantity_g])

    return newMealFood.rows[0]

}

export async function getMealFoodsRepository(mealId: number): Promise<MealFoodWithFood[]> {
    const mealFoods = await queryDB("SELECT mf.id AS meal_food_id, mf.meal_id, mf.quantity_g, f.* FROM meal_foods mf INNER JOIN foods f ON mf.food_id = f.id WHERE mf.meal_id = $1;", [mealId])

    return mealFoods.rows
}

export async function getMealFoodByIdRepository(mealFoodId: number): Promise<MealFood | undefined> {
    const mealFoods = await queryDB("SELECT * FROM meal_foods WHERE id = $1", [mealFoodId])

    return mealFoods.rows[0]
}

export async function deleteMealFoodsRepository(mealId: number): Promise<MealFood | undefined> {
    const deletedMealFood = await queryDB("DELETE FROM meal_foods WHERE meal_id = $1 RETURNING *", [mealId])

    return deletedMealFood.rows[0]
}

export async function updateMealFoodRepository(mealId: number, mealFoodId: number, updateData: UpdateMealFoodDTO): Promise<MealFood> {
    const fieldsToUpdate:string[] = [];
    const values:(string | number)[] = [];

    for (const [key, value] of Object.entries(updateData)) {

        fieldsToUpdate.push(`${key} = $${values.length + 1}`)
        values.push(value)
    }

    values.push(mealFoodId); // Add mealFoodId as the last parameter for the WHERE clause
    values.push(mealId); // Add mealId as the last parameter for the WHERE clause

    const updatedMealFood  = await queryDB(`UPDATE meal_foods SET ${fieldsToUpdate.join(', ')} WHERE id = $${values.length - 1} AND meal_id = $${values.length} RETURNING *`, values);

    return updatedMealFood .rows[0];
}