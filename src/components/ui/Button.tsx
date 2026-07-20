import { clsx } from "clsx";
import { Pressable, Text, View, ActivityIndicator } from "react-native";

type LoadingButtonProps = {
    title: string;
    loading?: boolean;
    disabled?: boolean;
    onPress: () => void | Promise<void>;
    className?: string;
};

export function Button({ title, loading = false, disabled = false, onPress, className }: LoadingButtonProps) {
    return (
        <Pressable
            className={clsx(
                "w-full items-center justify-center rounded-lg px-4 py-3 active:opacity-80",
                className
            )}
            disabled={disabled || loading}
            onPress={onPress}
        >
            <View className="h-6 items-center justify-center">
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text className="font-semibold text-white">
                        {title}
                    </Text>
                )}
            </View>
        </Pressable>
    )
}