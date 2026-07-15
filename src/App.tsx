import Dashboard from "./pages/dashboard";

const NAV = [
  { id: "dashboard", icon: "◈", label: "Dashboard" },
  { id: "micros", icon: "⬡", label: "Micronutrients" },
  { id: "foods", icon: "⊞", label: "Food Library" },
];

export default function App() {
  return (
    <div className="app">
      {/* Sidebar */}
      <aside>
        {/* sidebar logo */}
        <div>
          {/* sidebar logo mark */}
          <div className="sidebar-logo-mark">⬡</div>
          <h1>Nutri-Tracker</h1>
          <p>v1.0 - daily log</p>
        </div>
        {/* sidebar nav */}
        <nav>
          {NAV.map((n) => (
            <button key={n.id}>{n.label}</button>
          ))}
        </nav>
        {/* sidebar footer */}
        <div>
          {/* weight badge */}
          <div>Current Weight</div>
          <div>
            <span>CURRENT_WEIGHT_GOES_HERE</span>
            <span>lbs</span>
          </div>
          <div>Goal: GOAL_WEIGHT lbs</div>
        </div>
      </aside>

      {/* Main */}
      <main>
        {/* page header */}
        <div>
          <span>PAGE_TITLE</span>
          <span>07/15/2026</span>
        </div>
        {/* Page body */}
        <div>{true && <Dashboard />}</div>
      </main>
    </div>
  );
}
