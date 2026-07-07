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

type Props = NativeStackScreenProps<AppStackParamList, typeof ROUTES.PROFILE>;

/**
 * Perfil do usuário, metas calóricas e configurações.
 */
export function ProfileScreen(_props: Props) {
  const { meals, dailyGoal, setDailyGoal } = useMeals()
  const today = new Date().toISOString().slice(0, 10);
  const [isActive, setIsActive] = useState<boolean>(false)

  const consumedToday = meals.filter((meal) => meal.date === today)
  const totalConsumed = consumedToday?.reduce((sum, meal) => sum + meal.totalCalories, 0);
  const remainingCalories = dailyGoal - totalConsumed;
  const progressPercentage = dailyGoal > 0
    ? (totalConsumed / dailyGoal) * 100
    : 0;

  const progressWidth = Math.min(progressPercentage, 100);

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

      <View className='flex gap-2 mt-4'>

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

        <InfoCard title="Consumido hoje">
          <Text className="text-2xl font-bold text-text">
            {totalConsumed} kcal
          </Text>
        </InfoCard>

        <InfoCard title="Restante">
          <Text className="text-2xl font-bold text-text">
            {remainingCalories} kcal
          </Text>
        </InfoCard>

        <InfoCard title="Progresso">
          <Text className="text-2xl font-bold text-primary">
            {progressPercentage.toFixed(0)}%
          </Text>
          
          <ProgressBar percentage={progressWidth} />
        </InfoCard>

      </View>
    </ScreenContainer>
  );
}
