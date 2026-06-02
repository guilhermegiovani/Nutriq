import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { useMeals } from "@/context/MealsContext";
import { Text, View } from "react-native";
import { MEAL_TYPE_LABELS } from '@/constants/mealLabels';

export function HistoricalScreen() {
    const { meals } = useMeals();
    // const historicalMeals = meals.map((meal) => ({
    //     id: meal.id,
    //     items: meal.items,
    //     date: meal.date,
    // }));
    const sortedMeals = [...meals].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const groupedByDate = sortedMeals.reduce((acc, meal) => {
        const date = meal.date
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
                                        - {item.name} - {item.amountGrams}g - {item.calories} kcal
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

            {/* {sortedMeals.map((meal) => (
                <View key={meal.id} className="mt-2 rounded-lg bg-card p-4">
                    <Text className="mt-4 text-base text-muted">
                        {meal.date}
                    </Text>

                    <View className="mt-2 border-t border-gray-300" />

                    <Text className="text-lg font-semibold text-text mt-2">
                        {MEAL_TYPE_LABELS[meal.type]}
                    </Text>

                    {meal.items.map((item) => (
                        <View key={item.id} className="mt-2">
                            <Text className="text-base text-text">
                                - {item.name} - {item.amountGrams}g - {item.calories} kcal
                            </Text>
                        </View>
                    ))}

                    <Text className="text-base text-muted mt-2">
                        Total: {meal.totalCalories} kcal
                    </Text>
                </View>
            ))} */}
        </ScreenContainer>
    );
}
