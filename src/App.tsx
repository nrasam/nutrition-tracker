import { useEffect, useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/dashboard";
import Nutrients from "./pages/nutrients/nutrients";
import Foods from "./pages/foods/foods";
import Layout from "./components/layout";

import "./App.css";
import TodayLog from "./pages/TodayLog/TodayLog";
import {
  type Food,
  type Totals,
  type FoodEntry,
  type Goals,
  type Micro,
} from "./types";
import { CURRENT_WEIGHT } from "./data/mockData";
import Settings from "./pages/settings/Settings";
import sharedStyles from "./pages/shared.module.css";

import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  getFoodEntries,
  getFoods,
  getGoals,
  getMicros,
} from "./services/api";

export default function App() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [foodsLoading, setfoodsLoading] = useState(true);
  const [micros, setMicros] = useState<Micro[]>([]);
  const [log, setLog] = useState<FoodEntry[]>([]);
  const [goals, setGoals] = useState<Goals>();

  const [currentWeight, setCurrWeight] = useLocalStorage<number>(
    "current-weight",
    CURRENT_WEIGHT,
  );

  useEffect(() => {
    getFoods()
      .then((foods) => {
        setFoods(foods);
      })
      .finally(() => {
        setfoodsLoading(false);
      });

    getMicros().then((micros) => {
      setMicros(
        micros.sort((a: Micro, b: Micro) => a.name.localeCompare(b.name)),
      );
    });

    getFoodEntries().then((entries) => {
      setLog(entries);
    });

    getGoals().then((goals) => setGoals(goals));
  }, []);

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
  const microTotals = useMemo<Record<number, number>>(() => {
    const total: Record<number, number> = {};

    log.forEach((entry) => {
      entry.foodEntryNutrients.forEach((fen) => {
        total[fen.microId] =
          (total[fen.microId] ?? 0) + fen.amount * entry.servings;
      });
    });
    return total;
  }, [log]);

  // Merge microTotals into MICRO list
  const microList = useMemo(
    () => micros.map((m) => ({ ...m, current: microTotals[m.id] ?? 0 })),
    [micros, microTotals],
  );

  function handleClear(id: number) {
    setLog((prev) => prev.filter((entry) => entry.id !== id));
  }

  function handleEat(entry: FoodEntry) {
    setLog((prev) => [...prev, entry]);
  }

  function handleSettingsSave(newWeight: number, updatedGoals: Goals) {
    setCurrWeight(newWeight);
    setGoals(updatedGoals);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            logCount={log.length}
            currWeight={currentWeight}
            goalWeight={goals?.weightGoal}
          />
        }
      >
        <Route
          index
          element={
            goals ? (
              <Dashboard
                totals={macroTotals}
                microTotals={microTotals}
                goals={goals}
                currentWeight={currentWeight}
                microList={microList}
              />
            ) : (
              <div className={sharedStyles.pageLoading} role="status">
                Loading...
              </div>
            )
          }
        />
        <Route path="nutrients" element={<Nutrients microList={microList} />} />
        <Route
          path="foods"
          element={
            <Foods
              foodsList={foods}
              loading={foodsLoading}
              onEat={handleEat}
              microList={micros}
            />
          }
        />
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
            goals ? (
              <Settings
                goals={goals}
                onSave={handleSettingsSave}
                currWeightInitial={currentWeight}
              />
            ) : (
              <div className={sharedStyles.pageLoading} role="status">
                Loading...
              </div>
            )
          }
        />
      </Route>
    </Routes>
  );
}
