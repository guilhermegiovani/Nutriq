import { getMealFoodsRepository } from "../repositories/meals_foods.repository.js";
import type { Meal, MealItemResponse, MealResponse } from "../types/meals.types.js";
import { calculateFromFood } from "../util/nutrition.js";

export async function buildMeal(meal: Meal): Promise<MealResponse> {
    const foods = await getMealFoodsRepository(meal.id);

    const items: MealItemResponse[] = foods.map(food => ({
        ...food,
        ...calculateFromFood(food, food.quantity_g),
    }));

    return {
        ...meal,
        items,
        totalCalories: items.reduce(
            (sum, item) => sum + item.calories,
            0
        ),
    };
}