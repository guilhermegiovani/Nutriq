import { AppError } from '../errors/AppError.js';
import { createFoodsRepository, findFoodByNameRepository, getFoodsByIdRepository, getFoodsRepository } from '../repositories/foods.repository.js';
import type { CreateFoodDTO, Food } from '../types/foods.type.js';

export async function getFoodsService() {
    const foods = await getFoodsRepository();

    if(!foods || foods.length === 0) {
        throw new AppError('Foods not found', 404);
    }

    return foods;
}

export async function getFoodsByIdService(foodId: number) {
    const food = await getFoodsByIdRepository(foodId);

    if(!food) {
        throw new AppError('Food not found', 404);
    }

    return food;
}

export async function createFoodsService(foodData: CreateFoodDTO) {
    const { name, calories_100g, protein_100g, carbs_100g, fat_100g } = foodData;

    if(name.trim() === '' || !name) {
        throw new AppError('Name cannot be empty', 400);
    }

    if(calories_100g === 0 && protein_100g === 0 && carbs_100g === 0 && fat_100g === 0) {
        throw new AppError('Nutritional every values cannot be 0', 400);
    }

    if(calories_100g < 0 || protein_100g < 0 || carbs_100g < 0 || fat_100g < 0) {
        throw new AppError('Nutritional values cannot be 0 or negative', 400);
    }

    const foodExists = await findFoodByNameRepository(name)

    if(foodExists) {
        throw new AppError('Food already exists', 409);
    }

    const newFood = await createFoodsRepository(foodData);

    return newFood;
}