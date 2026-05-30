import { View } from "react-native";

type ProgressBarProps = {
    percentage: number
}

export function ProgressBar({ percentage }: ProgressBarProps) {

    return (
        <View className="h-3 w-full rounded-full bg-slate-200">
            <View
                className="h-3 rounded-full bg-primary"
                style={{
                    width: `${percentage}%`,
                }}
            />
        </View>
    )
}