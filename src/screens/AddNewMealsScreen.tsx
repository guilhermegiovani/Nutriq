//type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.ADD_NEW_MEALS>;
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Text } from 'react-native';
import { MealForm } from '@/components/meals/MealForm';

export function AddNewMealsScreen() {

    return (
        <ScreenContainer>
            <Text className="text-xl font-bold text-text mb-4">Adicionar Nova Refeição</Text>
            <MealForm />
        </ScreenContainer>
    );
}