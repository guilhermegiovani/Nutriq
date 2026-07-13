import { Food } from "@/types/food";
import { apiClient } from "./client";
import { endpoints } from "./endpoints";

export async function getFoods(): Promise<Food[]> {
  const { data } = await apiClient.get(endpoints.foods.list);
  return data;
}