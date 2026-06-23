import { queryDB } from "../database/queryDB.js";
import type { CreateFoodDTO, Food } from "../types/foods.type.js";

export async function getFoodsRepository(): Promise<Food[]> {
    const foods = await queryDB("SELECT * FROM foods"); // This is a placeholder for the actual database call

    return foods.rows;
}

export async function getFoodsByIdRepository(foodId: number): Promise<Food | undefined> {
    const food = await queryDB("SELECT * FROM foods WHERE id = $1", [foodId]);

    return food.rows[0];
}

export async function findFoodByNameRepository(name: string): Promise<Food | undefined> {
    const food = await queryDB("SELECT * FROM foods WHERE LOWER(name) = LOWER($1);", [name])

    return food.rows[0]
}

export async function createFoodsRepository(foodData: CreateFoodDTO): Promise<Food> {
    const { name, calories_100g, protein_100g, carbs_100g, fat_100g } = foodData;
    const newFood = await queryDB(
        "INSERT INTO foods (name, calories_100g, protein_100g, carbs_100g, fat_100g) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, calories_100g, protein_100g, carbs_100g, fat_100g]
    );

    return newFood.rows[0];
}