import { foods } from '@/data/foods';
import type { Food } from '@/types/food';

/** Busca alimento no mock pelo nome (ignora maiúsculas) */
export function findFoodByName(name: string): Food | undefined {
  const term = name.trim().toLowerCase();
  return foods.find((food) => food.name.toLowerCase() === term);
}

/** Converte quantidade + unidade para gramas */
export function toGrams(amount: number, unit: 'g' | 'kg'): number {
  return unit === 'kg' ? amount * 1000 : amount;
}

/** Calcula macros proporcionais à quantidade em gramas */
export function calculateFromFood(food: Food, grams: number) {
  const ratio = grams / 100;

  return {
    calories: Math.round(food.caloriesPer100g * ratio),
    protein: Math.round(food.proteinPer100g * ratio * 10) / 10,
    carbs: Math.round(food.carbsPer100g * ratio * 10) / 10,
    fat: Math.round(food.fatPer100g * ratio * 10) / 10,
  };
}
