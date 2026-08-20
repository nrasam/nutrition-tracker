export interface FoodSource {
  food: string;
  amount: number;
  unit: string;
}

export interface Micro {
  id: string;
  name: string;
  unit: string;
  current: number;
  goal: number;
  max?: number;
  sources: FoodSource[];
  category: "Vitamins" | "Minerals" | "Fats";
}

export interface FoodNutrient {
  key: string;
  label: string;
  value: number;
  unit: string;
  dailyMax?: number;
}

export interface Food {
  id: string;
  name: string;
  category: string;
  stocked: boolean;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  nutrients: FoodNutrient[];
  benefits: string[];
  warnings: string[];
}

export interface LogEntry {
  id: string;
  foodId: string;
  name: string;
  servings: number;
  serving: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  nutrients: FoodNutrient[];
}

export interface Totals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}
