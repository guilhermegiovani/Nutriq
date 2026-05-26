import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ROUTES } from '@/constants/routes';
import { env } from '@/config/env';
import type { RootStackParamList } from '@/navigation/types';
import { useMeals } from '@/context/MealsContext';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.PROFILE>;

/**
 * Perfil do usuário, metas calóricas e configurações.
 */
export function ProfileScreen(_props: Props) {
  const { dailyGoal, setDailyGoal } = useMeals();
  const [isActive, setIsActive] = useState<boolean>(false)

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
        <Text className="text-xl font-bold text-text">
          Meta Calórica
        </Text>

        <View className='flex flex-row justify-between'>
          {isActive
            ? <Input
              placeholder='Meta kcal'
              value={String(dailyGoal)}
              onChange={(goal) => setDailyGoal(Number(goal))}
              className='w-[100px]'
            />
            : <Text className='items-center px-4 py-3'>
              {dailyGoal} kcal
            </Text>

          }

          <Pressable
            className="items-center bg-primary justify-center rounded-lg px-4 py-3 w-[200px] active:opacity-80"
            onPress={() => setIsActive(!isActive)}
          >
            {isActive
              ? <Text className='font-semibold text-white'>Salvar meta</Text>
              : <Text className='font-semibold text-white'>Editar meta</Text>
            }
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}
