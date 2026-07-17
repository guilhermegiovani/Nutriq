import type { CreateMealItem, MealFoodWithFood } from "./meal-foods.type.js";
export type CreateMealDTO = {
    type: MealType;
    meal_date: Date;
    items: CreateMealItem[];
}

export type CreateMealRepositoryDTO = Omit<CreateMealDTO, "items">;
export type Meal = {
    id: number;
    type: MealType;
    meal_date: Date;
    items: MealFoodWithFood[];
}

export type UpdateMealData = {
  type: MealType;
  meal_date: string;
  items: {
    food_id: number;
    quantity_g: number;
  }[];
};

export type UpdateMealRepositoryData = {
  type: MealType;
  meal_date: string;
};

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