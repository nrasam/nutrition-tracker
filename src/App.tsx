import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/dashboard";
import Nutrients from "./pages/nutrients/nutrients";
import Foods from "./pages/foods/foods";
import Layout from "./components/layout";

import "./App.css";
import TodayLog from "./pages/TodayLog/TodayLog";
import { useState } from "react";
import type { LogEntry } from "./types";
import { INITIAL_LOG } from "./data/mockData";

export default function App() {
  const [log, setLog] = useState<LogEntry[]>(INITIAL_LOG);

  const totals = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };

  function handleRemove(id: string) {}

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="nutrients" element={<Nutrients />} />
        <Route path="foods" element={<Foods />} />
        <Route
          path="log"
          element={
            <TodayLog
              log={log}
              totals={totals}
              onRemove={handleRemove}
              onClear={() => setLog([])}
            />
          }
        />
      </Route>
    </Routes>
  );
}
