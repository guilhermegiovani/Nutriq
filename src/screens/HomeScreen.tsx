import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ROUTES } from '@/constants/routes';
import type { RootStackParamList } from '@/navigation/types';

/** Props injetadas pelo React Navigation nesta tela */
type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.HOME>;

/**
 * Tela inicial — resumo do dia (calorias, meta, atalhos).
 * Dados virão da API quando o backend estiver pronto.
 */
export function HomeScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <Text className="text-2xl font-bold text-text">Nutriq</Text>
      <Text className="mt-2 text-base text-muted">
        Controle suas calorias e refeições no dia a dia.
      </Text>

      <View className="mt-8 gap-3">
        <Pressable
          className="rounded-xl bg-primary px-4 py-3 active:opacity-80"
          onPress={() => navigation.navigate(ROUTES.MEALS)}
        >
          <Text className="text-center font-semibold text-white">
            Ver refeições
          </Text>
        </Pressable>

        <Pressable
          className="rounded-xl border border-secondary px-4 py-3 active:opacity-80"
          onPress={() => navigation.navigate(ROUTES.PROFILE)}
        >
          <Text className="text-center font-semibold text-secondary">
            Meu perfil
          </Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
