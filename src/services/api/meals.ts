import { Meal } from "@/types/meal";
import { apiClient } from "./client";
import { endpoints } from "./endpoints";


export async function getMeals(): Promise<Meal[]> {
    const { data } = await apiClient.get<Meal[]>(endpoints.meals.list);
    return data;
}