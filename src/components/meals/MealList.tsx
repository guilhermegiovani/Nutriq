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
      <Text className="text-sm text-muted">
        Nenhuma refeição salva ainda. Toque em &quot;Adicionar refeição&quot;.
      </Text>
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
