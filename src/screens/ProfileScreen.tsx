import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ROUTES } from '@/constants/routes';
import { env } from '@/config/env';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.PROFILE>;

/**
 * Perfil do usuário, metas calóricas e configurações.
 */
export function ProfileScreen(_props: Props) {
  return (
    <ScreenContainer>
      <Text className="text-xl font-bold text-text">Perfil</Text>
      <Text className="mt-2 text-muted">
        Meta calórica, peso e preferências alimentares.
      </Text>
      <Text className="mt-4 text-xs text-muted">
        API configurada: {env.apiUrl}
      </Text>
    </ScreenContainer>
  );
}
