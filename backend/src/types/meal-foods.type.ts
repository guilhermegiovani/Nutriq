import type { Food } from "./foods.type.js";

export type MealFoodWithFood = Food & {
    meal_food_id: number;
    meal_id: number;
    quantity_g: number;
}

export type CreateMealItem = {
    food_id: number;
    quantity_g: number;
}

export type MealFood = {
    id: number;
    meal_id: number;
    food_id: number;
    quantity_g: number;
}

export type CreateMealFoodDTO = {
    food_id: number;
    quantity_g: number;
}

export type UpdateMealFoodDTO = {
    food_id?: number;
    quantity_g?: number;
}