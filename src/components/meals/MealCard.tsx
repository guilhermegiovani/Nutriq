import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Trash2, Pencil } from 'lucide-react-native'

import { MEAL_TYPE_LABELS } from '@/constants/mealLabels';
import type { Meal } from '@/types/meal';
import { useMeals } from '@/context/MealsContext';
import { ROUTES } from '@/constants/routes';

//type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.MEALS>;
type MealCardProps = {
  meal: Meal;
  //navigation: Props;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

/** Card de uma refeição salva na lista */
export function MealCard({ meal }: MealCardProps) {
  const navigation = useNavigation<NavigationProps>()

  const item = meal.items[0];
  const { deleteMeal } = useMeals()

  return (
    <View className="flex flex-row justify-between rounded-lg border border-slate-300 bg-surface px-4 py-3">
      <View>
        <Text className="text-xs font-medium text-muted">
          {MEAL_TYPE_LABELS[meal.type]}
        </Text>
        <Text className="mt-1 text-base font-semibold text-text">{item.name}</Text>
        <Text className="mt-1 text-sm text-muted">
          {item.amountGrams} g · {meal.totalCalories} kcal
        </Text>
      </View>

      <View className='flex justify-center'>
        <Pressable
          onPress={() => deleteMeal(item)}
          className="items-center justify-center rounded-full p-2 active:opacity-70"
        >
          <Text>
            <Trash2 size={20} color="#ef4444" />
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate(ROUTES.UPDATE_MEALS)}
          className="items-center justify-center rounded-full p-2 active:opacity-70"
        >
          <Text>
            <Pencil size={20} color="#3B82F6" />
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
