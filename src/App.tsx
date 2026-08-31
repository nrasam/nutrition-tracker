import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/dashboard";
import Nutrients from "./pages/nutrients/nutrients";
import Foods from "./pages/foods/foods";
import Layout from "./components/layout";

import "./App.css";
import TodayLog from "./pages/TodayLog/TodayLog";
import { useMemo, useState } from "react";
import type { Totals, LogEntry, Goals } from "./types";
import { MICROS, INITIAL_GOALS, CURRENT_WEIGHT } from "./data/mockData";
import Settings from "./pages/settings/Settings";

export default function App() {
  const [log, setLog] = useState<LogEntry[]>([]);
  const [goals, setGoals] = useState<Goals>(INITIAL_GOALS);
  const [currentWeight, setCurrWeight] = useState<number>(CURRENT_WEIGHT);

  const macroTotals = useMemo<Totals>(
    () =>
      log.reduce(
        (acc, entry) => ({
          calories: acc.calories + entry.calories * entry.servings,
          protein: acc.protein + entry.protein * entry.servings,
          carbs: acc.carbs + entry.carbs * entry.servings,
          fat: acc.fat + entry.fat * entry.servings,
          fiber: acc.fiber + entry.fiber * entry.servings,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
      ),
    [log],
  );

  // Calculate total micros
  const microTotals = useMemo<Record<string, number>>(() => {
    const total: Record<string, number> = {};
    log.forEach((entry) => {
      entry.nutrients.forEach((nutrient) => {
        total[nutrient.key] =
          (total[nutrient.key] ?? 0) + nutrient.value * entry.servings;
      });
    });
    return total;
  }, [log]);

  // Merge microTotals into MICRO list
  const microList = useMemo(
    () => MICROS.map((m) => ({ ...m, current: microTotals[m.id] ?? 0 })),
    [microTotals],
  );

  function handleClear(id: string) {
    setLog((prev) => prev.filter((entry) => entry.id !== id));
  }

  function handleEat(entry: LogEntry) {
    setLog((prev) => [...prev, entry]);
  }

  function handleSave(w: number, g: Goals) {
    setGoals(g);
    setCurrWeight(w);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            logCount={log.length}
            currWeight={currentWeight}
            goalWeight={goals.weight}
          />
        }
      >
        <Route
          index
          element={
            <Dashboard
              totals={macroTotals}
              microTotals={microTotals}
              goals={goals}
              currentWeight={currentWeight}
            />
          }
        />
        <Route path="nutrients" element={<Nutrients microList={microList} />} />
        <Route path="foods" element={<Foods onEat={handleEat} />} />
        <Route
          path="log"
          element={
            <TodayLog
              log={log}
              totals={macroTotals}
              onClear={handleClear}
              onClearAll={() => setLog([])}
            />
          }
        />
        <Route
          path="settings"
          element={
            <Settings
              goals={goals}
              onSave={handleSave}
              currWeightInitial={currentWeight}
            />
          }
        />
      </Route>
    </Routes>
  );
}
