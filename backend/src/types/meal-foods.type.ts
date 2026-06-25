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