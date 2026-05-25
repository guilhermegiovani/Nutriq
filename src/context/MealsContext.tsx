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
  saveMeal: (meal: Meal) => void;
  /** Carrega as refeições  */
  loadMeal: () => void;
};

const MealsContext = createContext<MealsContextValue | null>(null);

export function MealsProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    loadMeals()
  }, [])

  const addMeal = useCallback((meal: Meal) => {
    const newMeals = [meal, ...meals]

    setMeals(newMeals);

    savedMealsStorage(newMeals);
  }, [meals]);

  const savedMealsStorage = useCallback(async (meals: Meal): Promise<void> => {
    try {
      const jsonData = JSON.stringify(meals);
      
      await AsyncStorage.setItem("meals", jsonData);
    } catch(err) {
      console.error("Erro ao salvar refeição: ", err);
    }
  }, []);

  const loadMeals = useCallback(async (): Promise<void> => {
    try {
      const savedMeals = await AsyncStorage.getItem("meals")
      const parsedMeals = savedMeals ? JSON.parse(savedMeals) : []
      setMeals(parsedMeals)
   
    } catch(err) {
      console.log("Erro ao carregar despesas.", err)
    }
  })

  const value = useMemo(() => ({ meals, addMeal, savedMealsStorage, loadMeals }), [meals, addMeal, savedMealsStorage, loadMeals]);

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
