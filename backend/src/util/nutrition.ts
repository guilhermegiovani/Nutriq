/**
 * Utilitários de nutrição para cálculo de macros e conversão de unidades.
 */
// import { foods } from '@/data/foods';
// import type { Food } from '@/types/food';

import type { Food } from "../types/foods.type.js";

/** Busca alimento no mock pelo nome (ignora maiúsculas) */
// export function findFoodByName(name: string): Food | undefined {
//   const term = name.trim().toLowerCase();
//   return foods.find((food) => food.name.toLowerCase() === term);
// }

/** Converte quantidade + unidade para gramas */
export function toGrams(amount: number, unit: 'g' | 'kg'): number {
  return unit === 'kg' ? amount * 1000 : amount;
}

/** Calcula macros proporcionais à quantidade em gramas */
export function calculateFromFood(food: Food, grams: number) {
  const ratio = grams / 100;

  return {
    calories: Math.round(food.calories_100g * ratio),
    protein: Math.round(food.protein_100g * ratio * 10) / 10,
    carbs: Math.round(food.carbs_100g * ratio * 10) / 10,
    fat: Math.round(food.fat_100g * ratio * 10) / 10,
  };
}
