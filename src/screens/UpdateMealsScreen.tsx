import { Text } from 'react-native';

import { MealForm } from '@/components/meals/MealForm';
import { ScreenContainer } from '@/components/ui/ScreenContainer';

export function UpdateMealsScreen() {
  return (
    <ScreenContainer scrollable>
      <Text className="mb-4 text-xl font-bold text-text">Editar refeição</Text>
      <MealForm />
    </ScreenContainer>
  );
}
