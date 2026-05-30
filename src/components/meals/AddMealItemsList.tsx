import { Text, View, Pressable } from 'react-native';
import { Trash2 } from 'lucide-react-native'
import { useState } from 'react';

type AddMealItemsListProps = {
    items: MealItems[],
    onRemoveItem: (id: string) => void;
};

export function AddMealItemsList({
    items, onRemoveItem
}: AddMealItemsListProps) {
    return (
        <View className="mt-4 gap-2">
            {items.map((item) => (
                <View
                    key={item.id}
                    className="flex-row items-center justify-between rounded-lg border border-slate-300 bg-surface px-4 py-3"
                >
                    <View>
                        <Text className="text-base font-semibold text-text">
                            {item.name}
                        </Text>

                        <Text className="mt-1 text-sm text-muted">
                            {item.amountGrams} g · {item.calories} kcal
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => onRemoveItem(item.id)}
                        className="items-center justify-center rounded-full p-2 active:opacity-70"
                    >
                        <Text>
                            <Trash2 size={20} color="#ef4444" />
                        </Text>
                    </Pressable>
                </View>
            ))}
        </View>
    );
}