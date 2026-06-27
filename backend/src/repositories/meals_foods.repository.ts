import { queryDB } from "../database/queryDB.js";
import type { CreateMealFoodDTO, MealFood } from "../types/meal-foods.type.js";


export async function createMealFoodRepository(MealFood: CreateMealFoodDTO, mealId: number): Promise<MealFood> {
    const newMealFood = await queryDB("INSERT INTO meal_foods (meal_id, food_id, quantity_g) VALUES ($1, $2, $3) RETURNING *", [mealId, MealFood.food_id, MealFood.quantity_g])

    return newMealFood.rows[0]

}

export async function getMealFoodsRepository(mealId: number): Promise<MealFood[]> {
    const mealFoods = await queryDB("SELECT * FROM meal_foods WHERE meal_id = $1", [mealId])

    return mealFoods.rows
}

export async function getMealFoodByIdRepository(mealFoodId: number): Promise<MealFood | undefined> {
    const mealFoods = await queryDB("SELECT * FROM meal_foods WHERE id = $1", [mealFoodId])

    return mealFoods.rows[0]
}

export async function deleteMealFoodRepository(mealId: number, mealFoodId: number): Promise<MealFood | undefined> {
    const deletedMealFood = await queryDB("DELETE FROM meal_foods WHERE id = $1 AND meal_id = $2 RETURNING *", [mealFoodId, mealId])

    return deletedMealFood.rows[0]
}