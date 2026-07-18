import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ROUTES } from '@/constants/routes';
import type { AppStackParamList } from '@/navigation/types';
import { DailySummaryCard } from '@/components/dashboard/DailySummaryCard';
import { useMeals } from '@/context/MealsContext';
import { HomeActionCard } from '@/components/home/HomeActionCard';
import { Utensils } from 'lucide-react-native';

/** Props injetadas pelo React Navigation nesta tela */
type Props = NativeStackScreenProps<AppStackParamList, typeof ROUTES.HOME>;

/**
 * Tela inicial — resumo do dia (calorias, meta, atalhos).
 * Dados virão da API quando o backend estiver pronto.
 */
export function HomeScreen({ navigation }: Props) {
  const { meals, dailyGoal } = useMeals()
  const today = new Date().toISOString().slice(0, 10);
  const consumedToday = meals.filter((meal) => meal.meal_date.slice(0, 10) === today)
  const totalConsumed = consumedToday?.reduce((sum, meal) => sum + meal.totalCalories, 0);

  return (
    <ScreenContainer>
      <Text className="text-2xl font-bold text-text">Nutriq</Text>
      <Text className="mt-2 text-base text-muted">
        Controle suas calorias e refeições no dia a dia.
      </Text>

      <DailySummaryCard consumed={totalConsumed} goal={dailyGoal} />

      <View className="mt-8 gap-3">
        <HomeActionCard
          title="Ver refeições"
          icon={null}
          onPress={() => navigation.navigate(ROUTES.MEALS)}
          classNamePress="bg-primary"
          classNameText="text-white"
        />

        <HomeActionCard
          title="Meu perfil"
          icon={null}
          onPress={() => navigation.navigate(ROUTES.PROFILE)}
          classNamePress="border border-secondary"
          classNameText="text-secondary"
        />

        <HomeActionCard
          title="Histórico de refeições"
          icon={null}
          onPress={() => navigation.navigate(ROUTES.HISTORICAL)}
          classNamePress="border border-secondary"
          classNameText="text-secondary"
        />
      </View>
    </ScreenContainer>
  );
}
