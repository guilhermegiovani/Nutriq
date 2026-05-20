import { Form } from "../ui/Form";
import { Input } from "../ui/Input";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export function MealForm() {

    const [name, setName] = useState<string>('');

    const [amount, setAmount] = useState<number>(0);

    const [unit, setUnit] = useState<string>('g');

    return (
        <Form>
            <Input
                placeholder="Nome do alimento"
                value={name}
                onChange={setName}
            />

            <Input
                placeholder="Quantidade"
                value={amount}
                onChange={setAmount}
            />

            <View className="flex-row gap-2.5">
                <Pressable
                    className={`flex-1 items-center justify-center rounded-lg px-4 py-3 active:opacity-80 ${
                        unit === 'g'
                            ? 'bg-primary'
                            : 'border border-zinc-300 bg-zinc-200'
                    }`}
                    onPress={() => setUnit('g')}
                >
                    <Text
                        className={
                            unit === 'g'
                                ? 'font-semibold text-white'
                                : 'text-text'
                        }
                    >
                        Gramas (g)
                    </Text>
                </Pressable>

                <Pressable
                    className={`flex-1 items-center justify-center rounded-lg px-4 py-3 active:opacity-80 ${
                        unit === 'kg'
                            ? 'bg-primary'
                            : 'border border-zinc-300 bg-zinc-200'
                    }`}
                    onPress={() => setUnit('kg')}
                >
                    <Text
                        className={
                            unit === 'kg'
                                ? 'font-semibold text-white'
                                : 'text-text'
                        }
                    >
                        Quilogramas (kg)
                    </Text>
                </Pressable>
            </View>
        </Form>
    )
}