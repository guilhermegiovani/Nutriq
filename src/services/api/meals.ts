import { CreateMealRequest, Meal, UpdateMealRequest } from "@/types/meal";
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

export async function deleteMealApi(id: number): Promise<Meal> {
  const { data } = await apiClient.delete<{
    message: string;
    meal: Meal;
  }>(endpoints.meals.byId(id));

  return data.meal;
}

export async function updateMealApi(id: number, meal: UpdateMealRequest): Promise<Meal> {
  const { data } = await apiClient.patch<Meal>(endpoints.meals.byId(id), meal);
  return data;
}