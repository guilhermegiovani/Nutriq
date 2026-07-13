/**
 * Formulário de criação e edição de refeições.
 * Permite adicionar alimentos, escolher unidade e salvar total calórico.
 */
import { useEffect, useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { OptionButton } from '@/components/ui/OptionButton';
import { useMeals } from '@/context/MealsContext';
import { foods } from '@/data/foods';
import type { CreateMealRequest, FoodItem, Meal, MealItem, MealType } from '@/types/meal';
import {
  calculateFromFood,
  findFoodByName,
  toGrams,
} from '@/utils/nutrition';
import { AddMealItemsList } from './AddMealItemsList';
import { createMeal } from '@/services/api/meals';
import { Food } from '@/types/food';
import { getFoods } from '@/services/api/foods';
import { clsx } from 'clsx';

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
  const [mealType, setMealType] = useState<MealType>(initialData?.type || 'breakfast');
  const [error, setError] = useState('');
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const filteredFoods = useMemo(() => findFoodByName(name, foods), [name, foods]);
  const amount = Number(amountText.replace(',', '.'));

  const [mealItems, setMealItems] = useState<FoodItem[]>(initialData?.items || []);

  // Prévia de calorias enquanto o usuário preenche
  const preview = useMemo(() => {
    if (!selectedFood || !amount || amount <= 0) return null;
    const grams = toGrams(amount, unit);
    return calculateFromFood(selectedFood, grams);
  }, [selectedFood, amount, unit]);

  useEffect(() => {
    loadFoods();
  }, []);

  async function loadFoods() {
    try {
      const foodsData = await getFoods();
      setFoods(foodsData);
    } catch (error) {
      console.error('Error loading foods:', error);
    }
  }

  async function handleSave() {

    if (mealItems.length === 0) {
      setError('Adicione pelo menos um alimento.');
      return;
    }

    const totalCalories = mealItems.reduce(
      (sum, item) => sum + item.calories,
      0
    );

    // const meal: CreateMeal = {
    //   id: isEditing
    //     ? initialData!.id
    //     : String(Date.now()),
    //   type: mealType,
    //   meal_date: isEditing
    //     ? initialData!.meal_date
    //     : new Date().toISOString().slice(0, 10),
    //   items: mealItems.map(item => ({
    //     food_id: item.id,
    //     quantity_g: item.quantity_g,
    //   })),
    //   totalCalories,
    // };

    if (isEditing) {
      //updateMeal(meal)
      console.log("Em breve: Implementar atualização de refeição no backend.");
    } else {
      const mealRequest: CreateMealRequest = {
        type: mealType,
        meal_date: new Date().toISOString().slice(0, 10),
        items: mealItems.map(item => ({
          food_id: Number(item.id),
          quantity_g: item.quantity_g,
        })),
      };

      await createMeal(mealRequest)
    }

    navigation.goBack();
  }

  function addItem() {
    if (!selectedFood) return;
    if (!amount || amount <= 0) return;

    if (!amount || amount <= 0) {
      setError('Informe uma quantidade válida.');
      return;
    }

    const grams = toGrams(amount, unit);
    const nutrition = calculateFromFood(selectedFood, grams);

    const item = {
      id: selectedFood.id,
      name: selectedFood.name,
      quantity_g: grams,
      calories: nutrition.calories,
      protein: nutrition.protein,
      carbs: nutrition.carbs,
      fat: nutrition.fat,
    }

    console.log('Adding item: ', item.id);

    setMealItems((prev) => [...prev, item])
  }

  function removeItem(id: number) {
    setMealItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  function editItem(id: number) {
    const itemToEdit = mealItems.find((item) => item.id === id);
    if (!itemToEdit) return;

    setName(itemToEdit.name);
    setAmountText(String(itemToEdit.quantity_g));
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
          if (selectedFood?.name !== text) {
            setSelectedFood(null);
          }
          setName(text);
          setError('');
        }}
      />

      {filteredFoods.length > 0 && !selectedFood && (
        <View className="mt-1 overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm">
          {filteredFoods.map((food, index) => (
            <Pressable
              key={food.id}
              onPress={() => {
                setSelectedFood(food);
                setName(food.name);
              }}
              className={clsx(
                "px-4 py-3 active:bg-slate-100",
                index !== filteredFoods.length - 1 && "border-b border-slate-200"
              )}
            >
              <Text className="text-base text-text">
                {food.name}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

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
