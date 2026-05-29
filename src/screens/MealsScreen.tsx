import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';

import { MealList } from '@/components/meals/MealList';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ROUTES } from '@/constants/routes';
import { useMeals } from '@/context/MealsContext';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.MEALS>;

export function MealsScreen({ navigation }: Props) {
  const { meals } = useMeals();
  console.log("Meals Screen", meals)
  const today = new Date().toISOString().slice(0, 10);
  const mealsToday = meals.filter((meal) => meal.date === today)

  const totalDay = mealsToday?.reduce((sum, meal) => sum + meal.totalCalories, 0);

  return (
    <ScreenContainer scrollable>
      <Text className="text-xl font-bold text-text">Refeições</Text>
      <Text className="mt-2 text-muted">
        Total do dia: {totalDay} kcal · {meals.length} registro(s)
      </Text>

      <View className="mt-6 gap-3">
        <Pressable
          onPress={() => navigation.navigate(ROUTES.ADD_NEW_MEALS)}
          className="rounded-xl bg-primary px-4 py-3 active:opacity-80"
        >
          <Text className="text-center font-semibold text-white">
            Adicionar refeição
          </Text>
        </Pressable>

        <MealList meals={meals} />
      </View>
    </ScreenContainer>
  );
}
