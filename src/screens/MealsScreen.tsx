import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Pressable, View } from 'react-native';

import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ROUTES } from '@/constants/routes';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.MEALS>;

/**
 * Lista e cadastro de refeições.
 * Integrará GET/POST /meals quando o backend existir.
 */
export function MealsScreen({ navigation }: Props) {
  return (
    <ScreenContainer scrollable>
      <Text className="text-xl font-bold text-text">Refeições</Text>
      <Text className="mt-2 text-muted">
        Em breve: café, almoço, jantar e lanches com totais de macros.
      </Text>

      <View className="mt-8 gap-3">
        <Pressable onPress={() => navigation.navigate(ROUTES.ADD_NEW_MEALS)} className="rounded-xl bg-primary px-4 py-3 active:opacity-80">
          <Text className="text-center font-semibold text-white">
            Adicionar refeição
          </Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
