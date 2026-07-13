import { CreateMealRequest, Meal } from "@/types/meal";
import { apiClient } from "./client";
import { endpoints } from "./endpoints";

export async function createMeal(meal: CreateMealRequest): Promise<Meal> {
    const { data } = await apiClient.post<Meal>(endpoints.meals.create, meal)
    return data
}

export async function getMeals(): Promise<Meal[]> {
    const { data } = await apiClient.get<Meal[]>(endpoints.meals.list);
    return data;
}