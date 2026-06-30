import type { MealFoodWithFood } from "./meal-foods.type.js";

export type Meal = {
    id: number;
    type: MealType;
    foods: MealFoodWithFood[];
    meal_date: Date;
}

export type CreateMealDTO = {
    type: MealType;
}

export const VALID_MEAL_TYPES = [
    'breakfast',
    'lunch',
    'snack',
    'dinner'
] as const;

export type MealType = typeof VALID_MEAL_TYPES[number];