/**
 * Contêiner de formulário com espaçamento padrão.
 */
import { View } from "react-native";
import clsx from "clsx";

export function Form({ children, className }: { children: React.ReactNode; className?: string }) {

    return (
        <View className={clsx("gap-4", className)}>
            {children}
        </View>
    )
}