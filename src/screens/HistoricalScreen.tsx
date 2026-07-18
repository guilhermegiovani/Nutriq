/**
 * Tela de histórico agrupado por data.
 * Calcula totais diários de calorias e exibe o consumo por refeição.
 */
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { useMeals } from "@/context/MealsContext";
import { Text, View } from "react-native";
import { MEAL_TYPE_LABELS } from '@/constants/mealLabels';

export function HistoricalScreen() {
    const { meals } = useMeals();
    
    const sortedMeals = [...meals].sort(
        (a, b) => new Date(b.meal_date).getTime() - new Date(a.meal_date).getTime()
    );

    const groupedByDate = sortedMeals.reduce((acc, meal) => {
        const date = new Date(meal.meal_date).toLocaleDateString('pt-BR')
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(meal);
        return acc;
    }, {} as Record<string, typeof sortedMeals>);

    const totalCaloriesForDate = (dayMeals: typeof sortedMeals) => {
        return dayMeals.reduce((total, meal) => total + meal.totalCalories, 0);
    }

    return (
        <ScreenContainer scrollable>
            <Text className="text-2xl font-bold text-text">Histórico de Refeições</Text>
            {Object.entries(groupedByDate).map(([date, dayMeals]) => (
                <View key={date} className="mt-4">
                    <Text className="text-lg font-semibold text-muted">{date}</Text>
                    {dayMeals.map((meal) => (
                        <View key={meal.id} className="mt-2 rounded-lg bg-card p-4">
                            <Text className="text-lg font-semibold text-text mt-2">
                                {MEAL_TYPE_LABELS[meal.type]}
                            </Text>
                            {meal.items.map((item) => (
                                <View key={item.id} className="mt-2">
                                    <Text className="text-base text-text">
                                        - {item.name} - {item.quantity_g}g - {item.calories} kcal
                                    </Text>
                                </View>
                            ))}

                            <Text className="text-base text-muted mt-2">
                                Total: {meal.totalCalories} kcal
                            </Text>
                        </View>
                    ))}

                    <Text className="mt-4 text-lg font-bold text-primary">
                        Total do dia: {totalCaloriesForDate(dayMeals)} kcal
                    </Text>

                    <View className="mt-4 border-t border-gray-300" />

                </View>
            ))}
        </ScreenContainer>
    );
}
