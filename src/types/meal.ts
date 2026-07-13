/**
 * Tipos de domínio para refeições e alimentos.
 * Espelham o que o PostgreSQL + API Node.js exporão depois.
 */

import { CreateMealItem } from "./food";

/** Momento do dia em que a refeição foi registrada */
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

/** Um alimento dentro de uma refeição */
export type FoodItem = {
  /** Identificador único no banco */
  id: number;
  /** Nome exibido (ex.: "Arroz integral") */
  name: string;
  /** Quantidade consumida em gramas */
  quantity_g: number;
  /** Calorias por porção informada */
  calories: number;
  /** Proteínas em gramas */
  protein: number;
  /** Carboidratos em gramas */
  carbs: number;
  /** Gorduras em gramas */
  fat: number;
};

export type MealItem = FoodItem & {
  meal_food_id: number;
  meal_id: number;
};

/** Refeição completa do usuário */
export type Meal = {
  id: string;
  /** Tipo: café, almoço, etc. */
  type: MealType;
  /** Data ISO (YYYY-MM-DD) */
  meal_date: string;
  /** Itens consumidos nesta refeição */
  items: MealItem[];
  /** Soma das calorias dos itens */
  totalCalories: number;
};

export type CreateMealRequest = {
  type: MealType;
  meal_date: string;
  items: CreateMealItem[];
};
