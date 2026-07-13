/** Alimento do mock local (valores por 100 g) */
export type Food = {
  // id: number;
  // name: string;
  // caloriesPer100g: number;
  // proteinPer100g: number;
  // carbsPer100g: number;
  // fatPer100g: number;
  id: number;
  name: string;
  calories_100g: number;
  protein_100g: number;
  carbs_100g: number;
  fat_100g: number;
  created_at: Date;
};

export type CreateMealItem = {
  food_id: number;
  quantity_g: number;
};
