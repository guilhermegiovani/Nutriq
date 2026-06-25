
export type Meal = {
    id: number;
    name: string;
    description: string;
    type: MealType;
    meal_date: Date;
}

export type CreateMealDTO = {
    name: string;
    description: string;
    type: MealType;
}

export const VALID_MEAL_TYPES = [
    'breakfast',
    'lunch',
    'snack',
    'dinner'
] as const;

export type MealType = typeof VALID_MEAL_TYPES[number];