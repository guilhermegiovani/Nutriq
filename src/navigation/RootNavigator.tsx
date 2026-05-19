import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from '@/constants/routes';
import type { RootStackParamList } from '@/navigation/types';
import { HomeScreen } from '@/screens/HomeScreen';
import { MealsScreen } from '@/screens/MealsScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';

/** Pilha nativa tipada com as rotas do app */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Navegação principal do Nutriq.
 * Stack simples por enquanto; depois pode virar tabs + stack.
 */
export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.HOME}
        screenOptions={{
          headerStyle: { backgroundColor: '#16a34a' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Stack.Screen
          name={ROUTES.HOME}
          component={HomeScreen}
          options={{ title: 'Início' }}
        />
        <Stack.Screen
          name={ROUTES.MEALS}
          component={MealsScreen}
          options={{ title: 'Refeições' }}
        />
        <Stack.Screen
          name={ROUTES.PROFILE}
          component={ProfileScreen}
          options={{ title: 'Perfil' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
