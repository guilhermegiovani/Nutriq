import { Text, View } from 'react-native';

import { MEAL_TYPE_LABELS } from '@/constants/mealLabels';
import type { Meal } from '@/types/meal';

type MealCardProps = {
  meal: Meal;
};

/** Card de uma refeição salva na lista */
export function MealCard({ meal }: MealCardProps) {
  const item = meal.items[0];

  return (
    <View className="rounded-lg border border-slate-300 bg-surface px-4 py-3">
      <Text className="text-xs font-medium text-muted">
        {MEAL_TYPE_LABELS[meal.type]}
      </Text>
      <Text className="mt-1 text-base font-semibold text-text">{item.name}</Text>
      <Text className="mt-1 text-sm text-muted">
        {item.amountGrams} g · {meal.totalCalories} kcal
      </Text>
    </View>
  );
}
