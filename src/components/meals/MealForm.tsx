import { Form } from "../ui/Form";
import { Input } from "../ui/Input";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { OptionButton } from "../ui/OptionButton";

export function MealForm() {

    const [name, setName] = useState<string>('');

    const [amount, setAmount] = useState<number>(0);

    const [unit, setUnit] = useState<string>('g');

    const [mealType, setMealType] = useState<MealType>('breakfast');


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
                <OptionButton
                    text="Gramas (g)"
                    active={unit === "g"}
                    onPressButton={() => setUnit('g')}
                />

                <OptionButton
                    text="Quilogramas (kg)"
                    active={unit === "kg"}
                    onPressButton={() => setUnit('kg')}
                />
            </View>

            <View className="flex-row flex-wrap justify-between gap-2.5 w-full">

                <OptionButton
                    text="Café da manhã"
                    active={mealType === "breakfast"}
                    onPressButton={() => setMealType('breakfast')}
                />

                <OptionButton
                    text="Almoço"
                    active={mealType === "lunch"}
                    onPressButton={() => setMealType('lunch')}
                />

                <OptionButton
                    text="Lanche"
                    active={mealType === "snack"}
                    onPressButton={() => setMealType('snack')}
                />

                <OptionButton
                    text="Jantar"
                    active={mealType === "dinner"}
                    onPressButton={() => setMealType('dinner')}
                />
            </View>
        </Form>
    )
}