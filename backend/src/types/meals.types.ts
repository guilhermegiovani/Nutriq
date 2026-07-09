import type { MealFoodWithFood } from "./meal-foods.type.js";
export type CreateMealDTO = {
    type: MealType;
}
export type Meal = {
    id: number;
    type: MealType;
    meal_date: Date;
    foods: MealFoodWithFood[];
}

export type MealResponse = {
    id: number;
    type: MealType;
    meal_date: Date;
    items: MealItemResponse[];
    totalCalories: number;
};
export type MealItemResponse = MealFoodWithFood & {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
};

export const VALID_MEAL_TYPES = [
    'breakfast',
    'lunch',
    'snack',
    'dinner'
] as const;

export type MealType = typeof VALID_MEAL_TYPES[number];