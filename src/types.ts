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
  id: number;
  name: string;
  unit: string;
  limit?: number;
  goal: number;
  benefits: string[];
  warnings: string[];
  category: MicroCategory;
  foodEntryNutrients: FoodEntryNutrient[];
  foodNutrients: FoodNutrient[];
  current: number;
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
export interface FoodNutrient {
  id: number;
  foodId: number;
  microId: number;
  amount: number;
  micro: Micro;
  food: Food;
}

export interface FoodEntry {
  id: number;
  foodId?: number;
  servings: number;
  loggedAt: Date;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  food?: Food;
  foodEntryNutrients: FoodEntryNutrient[];
}

export interface FoodEntryNutrient {
  id: number;
  foodEntryId: number;
  microId: number;
  amount: number;

  foodEntry: FoodEntry;
  micro: Micro;
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
