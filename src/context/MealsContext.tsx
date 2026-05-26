import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

import type { Meal } from '@/types/meal';
import AsyncStorage from "@react-native-async-storage/async-storage";

type MealsContextValue = {
  /** Lista temporária em memória (some ao fechar o app) */
  meals: Meal[];
  /** Adiciona uma refeição ao array */
  addMeal: (meal: Meal) => void;
  /** Salva no AsyncStorage  */
  savedMealsStorage: (meal: Meal) => void;
  /** Deletar refeição */
  deleteMeal: (meal: Meal) => void
  /** Deletar refeição */
  updateMeal: (meal: Meal) => void
  /** Carrega as refeições  */
  loadMeals: () => void;

  /** Meta calórica */
  dailyGoal: number;
  setDailyGoal: (goal: number) => void;
};

const MealsContext = createContext<MealsContextValue | null>(null);

export function MealsProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [dailyGoal, setDailyGoal] = useState(0);

  useEffect(() => {
    loadMeals()
  }, [])

  const savedMealsStorage = useCallback(async (meals: Meal): Promise<void> => {
    try {
      const jsonData = JSON.stringify(meals);
      
      await AsyncStorage.setItem("meals", jsonData);
    } catch(err) {
      console.error("Erro ao salvar refeição: ", err);
    }
  }, []);

  useEffect(() => {
    savedMealsStorage(meals);
  }, [meals]);

  const addMeal = useCallback((meal: Meal) => {
    try {
      const newMeals = [meal, ...meals]

      setMeals(newMeals);
    } catch(err) {
      console.log("Erro ao adicionar refeição", err)
    }
  }, [meals]);

  const loadMeals = useCallback(async (): Promise<void> => {
    try {
      const savedMeals = await AsyncStorage.getItem("meals")
      const parsedMeals = savedMeals ? JSON.parse(savedMeals) : []
      setMeals(parsedMeals)
    } catch(err) {
      console.log("Erro ao carregar refeições.", err)
    }
  })

  const deleteMeal = useCallback(async (mealItem: Meal): Promise<void> => {
    try {
      const newArray = meals.filter((item) => item.items[0].id !== mealItem.id)
      setMeals(newArray)
   
    } catch(err) {
      console.log("Erro ao deletar refeição.", err)
    }
  })

  const updateMeal = useCallback(async (meal: Meal): Promise<void> => {
    try {
      const updateMeals = meals.map((m) => {
        if(m.id === meal.id) {
          return meal
        }

        return m
      })

      setMeals(updateMeals)
   
    } catch(err) {
      console.log("Erro ao deletar refeição.", err)
    }
  })

  const value = useMemo(() => ({
    meals,
    addMeal,
    savedMealsStorage,
    loadMeals,
    deleteMeal,
    updateMeal,
    dailyGoal,
    setDailyGoal
  }), [meals, addMeal, savedMealsStorage, loadMeals, deleteMeal, updateMeal, dailyGoal, setDailyGoal]);

  return (
    <MealsContext.Provider value={value}>{children}</MealsContext.Provider>
  );
}

export function useMeals() {
  const context = useContext(MealsContext);

  if (!context) {
    throw new Error('useMeals deve ser usado dentro de MealsProvider');
  }

  return context;
}
