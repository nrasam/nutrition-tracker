import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/dashboard";
import Nutrients from "./pages/nutrients/nutrients";
import Foods from "./pages/foods/foods";
import Layout from "./components/layout";

import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="nutrients" element={<Nutrients />} />
        <Route path="foods" element={<Foods />} />
      </Route>
    </Routes>
  );
}
