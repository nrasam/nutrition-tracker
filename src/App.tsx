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
  deleteFoodEntry,
  getFoodEntries,
  getFoods,
  getGoals,
  getMicros,
} from "./services/api";

export default function App() {
  const [foods, setFoods] = useState<Food[]>();
  const [micros, setMicros] = useState<Micro[]>([]);
  const [log, setLog] = useState<FoodEntry[]>([]);
  const [goals, setGoals] = useState<Goals>();

  const [currentWeight, setCurrWeight] = useLocalStorage<number>(
    "current-weight",
    CURRENT_WEIGHT,
  );

  useEffect(() => {
    getFoods().then((foods) => {
      setFoods(foods);
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
          calories: acc.calories + entry.calories,
          protein: acc.protein + entry.protein,
          carbs: acc.carbs + entry.carbs,
          fat: acc.fat + entry.fat,
          fiber: acc.fiber + entry.fiber,
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
        total[fen.microId] = (total[fen.microId] ?? 0) + fen.amount;
      });
    });
    return total;
  }, [log]);

  // Merge microTotals into MICRO list
  const microList = useMemo(
    () => micros.map((m) => ({ ...m, current: microTotals[m.id] ?? 0 })),
    [micros, microTotals],
  );

  async function handleClear(id: number) {
    if (!id) {
      console.error("Can't clear food entry, id is null!");
    } else {
      try {
        await deleteFoodEntry(id);
        setLog((prev) => prev.filter((entry) => entry.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
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
                Loading... (this may take up to 30s)
              </div>
            )
          }
        />
        <Route
          path="nutrients"
          element={
            microList.length > 0 ? (
              <Nutrients microList={microList} />
            ) : (
              <div className={sharedStyles.pageLoading} role="status">
                Loading Nutrients...
              </div>
            )
          }
        />
        <Route
          path="foods"
          element={
            foods ? (
              <Foods
                foods={foods}
                // If prev is undefined (list hasn't loaded) then don't run update
                setFoods={(update) => setFoods((prev) => prev && update(prev))}
                onEat={handleEat}
                microList={micros}
              />
            ) : (
              <div className={sharedStyles.pageLoading} role="status">
                Loading Foods...
              </div>
            )
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
