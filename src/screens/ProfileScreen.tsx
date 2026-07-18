import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ROUTES } from '@/constants/routes';
import { env } from '@/config/env';
import type { AppStackParamList } from '@/navigation/types';
import { useMeals } from '@/context/MealsContext';
import { Input } from '@/components/ui/Input';
import { InfoCard } from '@/components/ui/InfoCard';
import { useState } from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAuth } from '@/context/AuthContext';
import { DailySummaryCard } from '@/components/dashboard/DailySummaryCard';

type Props = NativeStackScreenProps<AppStackParamList, typeof ROUTES.PROFILE>;

/**
 * Perfil do usuário, metas calóricas e configurações.
 */
export function ProfileScreen(_props: Props) {
  const { meals, dailyGoal, setDailyGoal } = useMeals()
  const today = new Date().toISOString().slice(0, 10);
  const [isActive, setIsActive] = useState<boolean>(false)

  const consumedToday = meals.filter((meal) => meal.meal_date.slice(0, 10) === today)
  console.log("Consumido hoje:", consumedToday)
  const totalConsumed = consumedToday?.reduce((sum, meal) => sum + meal.totalCalories, 0);
  const remainingCalories = dailyGoal - totalConsumed;
  const progressPercentage = dailyGoal > 0
    ? (totalConsumed / dailyGoal) * 100
    : 0;

  const progressWidth = Math.min(progressPercentage, 100);

  const { signOut } = useAuth()

  return (
    <ScreenContainer>
      <View className='mb-5'>
        <Text className="text-xl font-bold text-text">Perfil</Text>
        <Text className="mt-2 text-muted">
          Meta calórica, peso e preferências alimentares.
        </Text>
        <Text className="mt-4 text-xs text-muted">
          API configurada: {env.apiUrl}
        </Text>
      </View>

      <View className='flex mt-4'>

        <InfoCard title="Meta Calórica Diária">
          <View className="flex-row items-center justify-between gap-3">
            {isActive ? (
              <Input
                placeholder="Meta kcal"
                value={String(dailyGoal)}
                onChange={(goal) => setDailyGoal(Number(goal))}
              // className="flex-1"
              />
            ) : (
              <Text className="text-2xl font-bold text-text">
                {dailyGoal} kcal
              </Text>
            )}

            <Pressable
              className="items-center justify-center rounded-lg bg-primary px-4 py-3 active:opacity-80"
              onPress={() => setIsActive(!isActive)}
            >
              <Text className="font-semibold text-white">
                {isActive ? 'Salvar' : 'Editar'}
              </Text>
            </Pressable>
          </View>
        </InfoCard>

        <DailySummaryCard consumed={totalConsumed} goal={dailyGoal} showGoal={false} />

        <Pressable
          className="rounded-xl border border-secondary px-4 py-3 mt-6 active:opacity-80"
          onPress={signOut}
        >
          <Text className="text-center font-semibold text-secondary">Sair</Text>
        </Pressable>

      </View>
    </ScreenContainer>
  );
}
