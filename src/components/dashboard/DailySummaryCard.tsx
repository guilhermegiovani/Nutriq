import { Text, View } from "react-native";

import { InfoCard } from "../ui/InfoCard";
import { ProgressBar } from "../ui/ProgressBar";

type DailySummaryCardProps = {
    consumed: number;
    goal: number;
    showGoal?: boolean;
};

export function DailySummaryCard({
    consumed,
    goal,
    showGoal = true,
}: DailySummaryCardProps) {
    const remaining = Math.max(goal - consumed, 0);

    const progressPercentage =
        goal > 0 ? (consumed / goal) * 100 : 0;

    const progressWidth = Math.min(progressPercentage, 100);

    return (
        <View className="mt-2 gap-2">
            {showGoal && (
                <InfoCard title="Meta Calórica Diária">
                    <Text className="text-2xl font-bold text-text">
                        {goal} kcal
                    </Text>
                </InfoCard>
            )}

            <InfoCard title="Consumido hoje">
                <Text className="text-2xl font-bold text-text">
                    {consumed} kcal
                </Text>
            </InfoCard>

            <InfoCard title="Restante">
                <Text className="text-2xl font-bold text-text">
                    {remaining} kcal
                </Text>
            </InfoCard>

            <InfoCard title="Progresso">
                <Text className="text-2xl font-bold text-primary">
                    {progressPercentage.toFixed(0)}%
                </Text>

                <ProgressBar percentage={progressWidth} />
            </InfoCard>
        </View>
    );
}