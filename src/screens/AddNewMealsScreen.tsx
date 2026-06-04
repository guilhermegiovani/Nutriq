/**
 * Tela para cadastro de nova refeição.
 * Reutiliza MealForm para registrar alimentos e calorias.
 */
import { Text } from 'react-native';

import { MealForm } from '@/components/meals/MealForm';
import { ScreenContainer } from '@/components/ui/ScreenContainer';

export function AddNewMealsScreen() {
  return (
    <ScreenContainer scrollable>
      <Text className="mb-4 text-xl font-bold text-text">Adicionar refeição</Text>
      <MealForm />
    </ScreenContainer>
  );
}
