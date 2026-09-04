export type MicroCategory = "VITAMINS" | "MINERALS" | "FATS" | "OTHER";
export type FoodCategory =
  | "DAIRY"
  | "EGGS"
  | "FISH_SEAFOOD"
  | "FRUITS"
  | "GRAINS"
  | "LEGUMES"
  | "NUTS_SEEDS"
  | "POULTRY"
  | "RED_MEAT"
  | "VEGETABLES"
  | "DRINKS";

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
  id: number;
  foodId: number;
  microId: number;
  amount: number;
  micro: Micro;
}

export interface Food {
  id: number;
  name: string;
  category: FoodCategory;
  serving: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  benefits: string[];
  warnings: string[];
  stocked: boolean;
  nutrients: FoodNutrient[];
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

export interface Goals {
  weight: number;
  cal: number;
  protein: number;
  carb: number;
  fat: number;
  fiber: number;
}
