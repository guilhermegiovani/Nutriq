import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './types';

import { ROUTES } from '@/constants/routes';
import { HomeScreen } from '@/screens/HomeScreen';
import { MealsScreen } from '@/screens/MealsScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { AddNewMealsScreen } from '@/screens/AddNewMealsScreen';
import { UpdateMealsScreen } from '@/screens/UpdateMealsScreen';
import { HistoricalScreen } from '@/screens/HistoricalScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
    return (
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
        <Stack.Screen
          name={ROUTES.HISTORICAL}
          component={HistoricalScreen}
          options={{ title: 'Histórico de Refeições' }}
        />
        <Stack.Screen
          name={ROUTES.ADD_NEW_MEALS}
          component={AddNewMealsScreen}
          options={{ title: 'Adicionar Nova Refeição' }}
        />
        <Stack.Screen
          name={ROUTES.UPDATE_MEALS}
          component={UpdateMealsScreen}
          options={{ title: 'Editar Refeição' }}
        />
      </Stack.Navigator>
    )
}