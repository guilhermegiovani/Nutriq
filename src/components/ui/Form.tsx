/**
 * Contêiner de formulário com espaçamento padrão.
 */
import { View } from "react-native";

export function Form({ children }: { children: React.ReactNode }) {

    return (
        <View className="gap-4">
            {children}
        </View>
    )
}