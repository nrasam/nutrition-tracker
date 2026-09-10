import type { Food, FoodEntry, Micro, NewFood } from "../types";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

export async function getFoods(): Promise<Food[]> {
  const res = await fetch(`${API_BASE}/foods`);

  if (!res.ok) {
    throw new Error("Failed to fetch foods");
  }

  return res.json();
}

export async function getMicros(): Promise<Micro[]> {
  const res = await fetch(`${API_BASE}/micros`);

  if (!res.ok) {
    throw new Error("Failed to fetch micros");
  }

  return res.json();
}

export async function getFoodEntries(): Promise<FoodEntry[]> {
  const { start, end } = getTodaysRange();
  const res = await fetch(`${API_BASE}/entries?start=${start}&end=${end}`);

  if (!res.ok) {
    throw new Error("Failed to fetch food entries");
  }

  return res.json();
}

export async function createFood(newFood: NewFood): Promise<Food> {
  const res = await fetch(`${API_BASE}/foods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFood),
  });

  if (!res.ok) {
    throw new Error("Failed to create food");
  }

  return res.json();
}

export async function createFoodEntry(
  foodId: number,
  servings: number,
): Promise<FoodEntry> {
  const res = await fetch(`${API_BASE}/entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      foodId,
      servings,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create food entry");
  }

  return res.json();
}

export async function deleteFood(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/foods/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete food");
  }
}

export async function deleteFoodEntry(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/entries/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete food entry");
  }

  return res.json();
}

export async function clearTodaysEntries(): Promise<void> {
  const { start, end } = getTodaysRange();
  await fetch(`${API_BASE}/entries?start=${start}&end=${end}`, {
    method: "DELETE",
  });
}

function getTodaysRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start: start.toISOString(), end: end.toISOString() };
}
