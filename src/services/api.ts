import type { Food, NewFood } from "../types";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

export async function getFoods() {
  const res = await fetch(`${API_BASE}/foods`);

  if (!res.ok) {
    throw new Error("Failed to fetch foods");
  }

  return res.json();
}

export async function getMicros() {
  const res = await fetch(`${API_BASE}/micros`);

  if (!res.ok) {
    throw new Error("Failed to fetch micros");
  }

  return res.json();
}

export async function getFoodEntries() {
  const res = await fetch(`${API_BASE}/entries`);

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

export async function createFoodEntry(foodId: number, servings: number) {
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

export async function deleteFood(id: number) {
  const res = await fetch(`${API_BASE}/foods/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete food");
  }
}

export async function deleteFoodEntry(id: number) {
  const res = await fetch(`${API_BASE}/entries/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete food entry");
  }

  return res.json();
}
