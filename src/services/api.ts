import type {
  Food,
  FoodEntry,
  Goals,
  Micro,
  NewFood,
  GoalsInput,
} from "../types";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

function authHeaders(): HeadersInit {
  const password = localStorage.getItem("adminPassword");
  return password ? { "x-admin-password": password } : {};
}

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

export async function getGoals(): Promise<Goals> {
  const res = await fetch(`${API_BASE}/goals`);

  if (!res.ok) {
    throw new Error("Failed to fetch goals");
  }

  return res.json();
}

export async function createFood(newFood: NewFood): Promise<Food> {
  const res = await fetch(`${API_BASE}/foods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
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
      ...authHeaders(),
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
    headers: {
      ...authHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete food");
  }
}

export async function deleteFoodEntry(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/entries/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
    },
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
    headers: {
      ...authHeaders(),
    },
  });
}

// Gets the start and end of the day
function getTodaysRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start: start.toISOString(), end: end.toISOString() };
}

export async function updateGoals(goals: GoalsInput): Promise<Goals> {
  const res = await fetch(`${API_BASE}/goals`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(goals),
  });
  return res.json();
}

export async function updateFood(id: number, food: NewFood): Promise<Food> {
  const res = await fetch(`${API_BASE}/foods/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(food),
  });
  return res.json();
}
