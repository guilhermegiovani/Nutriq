export type Food = {
    id: number;
    name: string;
    calories_100g: number;
    protein_100g: number;
    carbs_100g: number;
    fat_100g: number;
    created_at: Date;
}

export type CreateFoodDTO = {
    name: string;
    calories_100g: number;
    protein_100g: number;
    carbs_100g: number;
    fat_100g: number;
}