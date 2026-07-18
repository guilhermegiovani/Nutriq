import { clsx } from "clsx";
import { Pressable, Text, View } from "react-native";

type HomeActionCardProps = {
  title: string;
  icon?: React.ReactNode;
  onPress: () => void;
  classNamePress?: string;
  classNameText?: string;
};

export function HomeActionCard({
  title,
  icon,
  onPress,
  classNamePress,
  classNameText,
}: HomeActionCardProps) {
  return (
    <Pressable
      className={clsx("px-4 py-3 rounded-xl active:opacity-80", classNamePress)}
      onPress={onPress}
    >
      {icon && <View className="mb-2">{icon}</View>}
      <Text className={clsx("text-center font-semibold", classNameText)}>
        {title}
      </Text>
    </Pressable>
  );
}
