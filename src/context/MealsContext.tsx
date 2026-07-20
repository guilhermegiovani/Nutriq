/**
 * Contexto global de refeições e meta calórica.
 * Mantém estado em memória e persiste dados no AsyncStorage.
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

import type { CreateMealRequest, Meal } from '@/types/meal';
import type { Dispatch, SetStateAction } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMeal, deleteMealApi, getMeals } from '@/services/api/meals';
import { Alert } from 'react-native';

type MealsContextValue = {
  /** Lista temporária em memória (some ao fechar o app) */
  meals: Meal[];
  /** Carrega as refeições  */
  loadMeals: () => Promise<void>;
  /** Adiciona uma refeição ao array */
  addMeal: (meal: CreateMealRequest) => Promise<void>;
  /** Atualizar refeição */
  updateMeal: (id: number, meal: Meal) => Promise<void>; // meal: UpdateMealRequest
  /** Deletar refeição */
  deleteMeal: (id: number) => void;

  /** Meta calórica */
  dailyGoal: number;
  setDailyGoal: Dispatch<SetStateAction<number>>;
  /** Salva no AsyncStorage  */
  //savedMealsStorage: (meals: Meal[]) => void;
};

const MealsContext = createContext<MealsContextValue | null>(null);

export function MealsProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([]);
  //const [mealsApi, setMealsApi] = useState<Meal[]>([])
  const [dailyGoal, setDailyGoal] = useState(0);

  const loadMeals = useCallback(async (): Promise<void> => {
    try {
      const meals = await getMeals();
      setMeals(meals)

    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    loadMeals()
  }, [loadMeals])

  useEffect(() => {
    loadDailyGoal()
  }, [])

  // const savedMealsStorage = useCallback(async (meals: Meal[]): Promise<void> => {
  //   try {
  //     const jsonData = JSON.stringify(meals);

  //     await AsyncStorage.setItem("meals", jsonData);
  //   } catch (err) {
  //     console.error("Erro ao salvar refeição: ", err);
  //   }
  // }, []);

  const savedDailyGoalStorage = useCallback(async (goal: number): Promise<void> => {
    try {
      const jsonData = JSON.stringify(goal);

      await AsyncStorage.setItem("dailyGoal", jsonData);
    } catch (err) {
      console.error("Erro ao salvar meta calórica: ", err);
    }
  }, []);

  useEffect(() => {
    savedDailyGoalStorage(dailyGoal);
  }, [dailyGoal]);

  const addMeal = useCallback(async (meal: CreateMealRequest) => {
    try {
      await createMeal(meal);
      await loadMeals();
    } catch (err) {
      console.log("Erro ao adicionar refeição", err)
    }
  }, [loadMeals]);

  const loadDailyGoal = useCallback(async (): Promise<void> => {
    try {
      const savedGoal = await AsyncStorage.getItem("dailyGoal")
      const parsedGoal = savedGoal ? JSON.parse(savedGoal) : 0
      setDailyGoal(parsedGoal)
    } catch (err) {
      console.log("Erro ao carregar meta calórica.", err)
    }
  }, [])

  const deleteMeal = useCallback((id: number): void => {
    Alert.alert(
      "Excluir refeição",
      "Tem certeza que deseja excluir esta refeição?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteMealApi(id);
              await loadMeals();
            } catch (err) {
              console.log("Erro ao deletar refeição.", err);
            }
          },
        },
      ]
    );
    // try {
    //   // await deleteMealApi(id);
    //   await loadMeals();

    // } catch (err) {
    //   console.log("Erro ao deletar refeição.", err)
    // }
  }, [loadMeals])

  const updateMeal = useCallback(async (id: number, meal: Meal): Promise<void> => {
    try {
      const updateMeals = meals.map((m) => {
        if (m.id === id) {
          return meal
        }

        return m
      })

      setMeals(updateMeals)

    } catch (err) {
      console.log("Erro ao atualizar refeição.", err)
    }
  }, [meals])

  const value = useMemo(() => ({
    meals,
    addMeal,
    //savedMealsStorage,
    loadMeals,
    deleteMeal,
    updateMeal,
    dailyGoal,
    setDailyGoal
  }), [meals, addMeal, loadMeals, deleteMeal, updateMeal, dailyGoal, setDailyGoal]); // savedMealsStorage

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
