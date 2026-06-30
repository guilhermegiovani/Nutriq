import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import { ROUTES } from "@/constants/routes";
import { RegisterScreen } from "@/screens/register/RegisterScreen";
import { LoginScreen } from "@/screens/login/LoginScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {

    return (
        <Stack.Navigator
        initialRouteName={ROUTES.LOGIN}
        screenOptions={{
          headerStyle: { backgroundColor: '#16a34a' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Stack.Screen
          name={ROUTES.LOGIN}
          component={LoginScreen}
          options={{ title: 'Entrar' }}
        />
        <Stack.Screen
          name={ROUTES.REGISTER}
          component={RegisterScreen}
          options={{ title: 'Criar conta' }}
        />
      </Stack.Navigator>
    )
}