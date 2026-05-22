import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Meal } from '@/types/meal';

type MealsContextValue = {
  /** Lista temporária em memória (some ao fechar o app) */
  meals: Meal[];
  /** Adiciona uma refeição ao array */
  addMeal: (meal: Meal) => void;
};

const MealsContext = createContext<MealsContextValue | null>(null);

export function MealsProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  const addMeal = useCallback((meal: Meal) => {
    setMeals((prevMeals) => [meal, ...prevMeals]);
  }, []);

  const value = useMemo(() => ({ meals, addMeal }), [meals, addMeal]);

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
