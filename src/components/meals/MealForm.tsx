import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { OptionButton } from '@/components/ui/OptionButton';
import { useMeals } from '@/context/MealsContext';
import { foods } from '@/data/foods';
import type { FoodItem, Meal, MealType } from '@/types/meal';
import {
  calculateFromFood,
  findFoodByName,
  toGrams,
} from '@/utils/nutrition';
import { AddMealItemsList } from './AddMealItemsList';

// type MealFormData = {

// };

type MealFormProps = {
  initialData?: Meal;
  isEditing?: boolean;
};

export function MealForm({ initialData, isEditing }: MealFormProps) {
  const navigation = useNavigation();
  const { addMeal, updateMeal } = useMeals();

  // Estados dos campos do formulário
  const [name, setName] = useState('');
  const [amountText, setAmountText] = useState('');
  const [unit, setUnit] = useState<'g' | 'kg'>('g');
  const [mealType, setMealType] = useState<MealType>('breakfast');
  const [error, setError] = useState('');

  const food = useMemo(() => findFoodByName(name), [name]);
  const amount = Number(amountText.replace(',', '.'));

  const [mealItems, setMealItems] = useState<FoodItem[]>(initialData?.items || []);

  // Prévia de calorias enquanto o usuário preenche
  const preview = useMemo(() => {
    if (!food || !amount || amount <= 0) return null;
    const grams = toGrams(amount, unit);
    return calculateFromFood(food, grams);
  }, [food, amount, unit]);

  function handleSave() {
    if (!food) {
      setError(`Alimento não encontrado. Use: ${foods.map((f) => f.name).join(', ')}`);
      return;
    }

    if (!amount || amount <= 0) {
      setError('Informe uma quantidade válida.');
      return;
    }

    const grams = toGrams(amount, unit);
    const nutrition = calculateFromFood(food, grams);

    if (mealItems.length === 0) {
      setError('Adicione pelo menos um alimento.');
      return;
    }

    const totalCalories = mealItems.reduce(
      (sum, item) => sum + item.calories,
      0
    );

    const meal: Meal = {
      id: isEditing
        ? initialData!.id
        : String(Date.now()),
      type: mealType,
      date: new Date().toISOString().slice(0, 10),
      items: mealItems,
      totalCalories,
    };

    if (isEditing) {
      updateMeal(meal)
    } else {
      addMeal(meal);
    }

    navigation.goBack();
  }

  function addItem() {
    if (!food) return;
    if (!amount || amount <= 0) return;

    if (!amount || amount <= 0) {
      setError('Informe uma quantidade válida.');
      return;
    }

    const grams = toGrams(amount, unit);
    const nutrition = calculateFromFood(food, grams);

    const item = {
      id: String(food.id),
      name: food.name,
      amountGrams: grams,
      calories: nutrition.calories,
      protein: nutrition.protein,
      carbs: nutrition.carbs,
      fat: nutrition.fat,
    }

    setMealItems((prev) => [...prev, item])
  }

  function removeItem(id: string) {
    setMealItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  function editItem(id: string) {
    const itemToEdit = mealItems.find((item) => item.id === id);
    if (!itemToEdit) return;

    setName(itemToEdit.name);
    setAmountText(String(itemToEdit.amountGrams));
    setUnit('g');
    setMealType(mealType);
    removeItem(id);
  }

  return (
    <Form>
      <Input
        placeholder="Nome do alimento (ex.: Arroz)"
        value={name}
        onChange={(text) => {
          setName(text);
          setError('');
        }}
      />

      <Input
        placeholder="Quantidade"
        value={amountText}
        onChange={(text) => {
          setAmountText(text);
          setError('');
        }}
        keyboardType="decimal-pad"
      />

      <View className="flex-row justify-between gap-2.5">
        <OptionButton
          text="Gramas (g)"
          active={unit === 'g'}
          onPressButton={() => setUnit('g')}
        />
        <OptionButton
          text="Quilogramas (kg)"
          active={unit === 'kg'}
          onPressButton={() => setUnit('kg')}
        />
      </View>

      {preview && (
        <Text className="text-sm text-muted">
          Prévia: {preview.calories} kcal (P {preview.protein}g · C {preview.carbs}g · G{' '}
          {preview.fat}g)
        </Text>
      )}

      <View className="w-full flex-row flex-wrap justify-between gap-2.5">
        <OptionButton
          text="Café da manhã"
          active={mealType === 'breakfast'}
          onPressButton={() => setMealType('breakfast')}
        />
        <OptionButton
          text="Almoço"
          active={mealType === 'lunch'}
          onPressButton={() => setMealType('lunch')}
        />
        <OptionButton
          text="Lanche"
          active={mealType === 'snack'}
          onPressButton={() => setMealType('snack')}
        />
        <OptionButton
          text="Jantar"
          active={mealType === 'dinner'}
          onPressButton={() => setMealType('dinner')}
        />
      </View>

      {error ? <Text className="text-sm text-red-600">{error}</Text> : null}

      <Pressable
        className="w-full items-center justify-center rounded-lg bg-secondary px-4 py-3 active:opacity-80"
        onPress={addItem}
      >
        <Text className="font-semibold text-white">Adicionar alimento</Text>
      </Pressable>

      <AddMealItemsList items={mealItems} onRemoveItem={removeItem} onEditItem={editItem} />

      <Pressable
        className="w-full items-center justify-center rounded-lg bg-secondary px-4 py-3 active:opacity-80"
        onPress={handleSave}
      >
        <Text className="font-semibold text-white">Salvar</Text>
      </Pressable>
    </Form>
  );
}
