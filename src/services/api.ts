import type {
  Food,
  FoodEntry,
  Goals,
  Micro,
  NewFood,
  GoalsInput,
} from "../types";

const API_BASE = import.meta.env.VITE_API_BASE;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

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

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      typeof body?.error === "string" ? body.error : "Failed to create food.";
    throw new ApiError(message, res.status);
  }

  return body;
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

  // Get body, if no body do nothing
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      typeof body?.error === "string"
        ? body.error
        : "Failed to log food entry.";
    throw new ApiError(message, res.status);
  }

  return body;
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

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    // In case the body or the error property is null
    // Otherwise the body should have proper error info
    throw new Error(body?.error ?? "Failed to delete food entry");
  }

  return body;
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
