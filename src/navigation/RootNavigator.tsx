import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

/** Pilha nativa tipada com as rotas do app */
//const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Navegação principal do Nutriq.
 * Stack simples por enquanto; depois pode virar tabs + stack.
 */
export function RootNavigator() {
  const isAuthenticated = false

  return (
    <NavigationContainer>
      {isAuthenticated
        ? <AppNavigator />
        : <AuthNavigator />}
    </NavigationContainer>
  );
}
