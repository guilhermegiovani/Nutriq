
let meals = [
    {
        id: 1,
        name: 'Meal 1',
        description: 'Description for Meal 1'
    },
    {
        id: 2,
        name: 'Meal 2',
        description: 'Description for Meal 2'
    },
    {
        id: 3,
        name: 'Meal 3',
        description: 'Description for Meal 3'
    },
    {
        id: 4,
        name: 'Meal 4',
        description: 'Description for Meal 4'
    },
];
export function getRepositoryMeals() {

    return meals;
}

export function getMealById(mealId: number) {
    const meal = meals.find(meal => meal.id === mealId);
    return meal;
}

export function createMealRepository(mealData: { name: string, description: string }) {
    // Here you would normally save the meal to a database and return the created meal
    const newMeal = {
        id: Math.floor(Math.random() * 1000), // Just a random ID for demonstration
        name: mealData.name,
        description: mealData.description
    };

    meals.push(newMeal); // Add the new meal to the in-memory array
    return newMeal;
}

export function deleteMealRepository(mealId: number) {
    const mealDeleted = meals.find(meal => meal.id === mealId);
    meals = meals.filter(meal => meal.id !== mealId); // Remove the meal with the given ID from the array

    return mealDeleted;
}

export function updateMealRepository(mealId: number, mealData: { name?: string, description?: string }) {
    const mealsUpdated = meals.map(meal => {
        if (meal.id === mealId) {
            return {
                ...meal,
                name: mealData.name || meal.name,
                description: mealData.description || meal.description
            };
        }
        return meal;
    });
    
    meals = mealsUpdated;
    return getMealById(mealId);
}