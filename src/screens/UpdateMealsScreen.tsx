import { Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { ROUTES } from '@/constants/routes';

import { MealForm } from '@/components/meals/MealForm';
import { ScreenContainer } from '@/components/ui/ScreenContainer';

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTES.UPDATE_MEALS
>;

export function UpdateMealsScreen({ route }: Props) {
  const { meal } = route.params;

  const initialMealItems = {
    id: meal.id,
    type: meal.type,
    date: meal.date,
    items: meal.items,
    totalCalories: meal.totalCalories
  }

  // console.log("Initial Meal: ", initialMeal)
  // console.log("Meals update: ", meal)
  return (
    <ScreenContainer scrollable>
      <Text className="mb-4 text-xl font-bold text-text">Editar refeição</Text>
      <MealForm initialData={initialMealItems} isEditing={true} />
    </ScreenContainer>
  );
}
