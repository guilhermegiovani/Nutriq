import { Text, View } from 'react-native';

import { MealCard } from '@/components/meals/MealCard';
import type { Meal } from '@/types/meal';

type MealListProps = {
  meals: Meal[];
};

/** Lista de refeições salvas ou estado vazio */
export function MealList({ meals }: MealListProps) {
  if (meals.length === 0) {
    return (
      <View className="items-center justify-center py-16">
        <Text className="text-5xl">🍽️</Text>

        <Text className="mt-4 text-lg font-semibold text-text">
          Nenhuma refeição cadastrada
        </Text>

        <Text className="mt-2 text-center text-muted">
          Adicione sua primeira refeição para começar.
        </Text>
      </View>
    );
  }

  return (
    <View className="gap-3">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </View>
  );
}
