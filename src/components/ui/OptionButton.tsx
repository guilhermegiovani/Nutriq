import { Pressable, Text, View } from "react-native";
import clsx from "clsx"


export function OptionButton({ text, active, onPressButton }: { text: string, active: boolean, onPressButton: () => void }) {

    return (
        <Pressable
            className={clsx(
                "items-center justify-center rounded-lg px-4 py-3 w-[48%] active:opacity-80",
                active ? 'bg-primary' : 'border border-slate-300 bg-slate-200'
            )}
            onPress={onPressButton}
        >
            <Text
                className={
                    active ? 'font-semibold text-white' : 'text-text'
                }
            >
                {text}
            </Text>
        </Pressable>
    )
}