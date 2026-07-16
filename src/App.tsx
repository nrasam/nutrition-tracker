import Dashboard from "./pages/dashboard/dashboard";

import "./App.css";

const NAV = [
  { id: "dashboard", icon: "◈", label: "Dashboard" },
  { id: "micros", icon: "⬡", label: "Micronutrients" },
  { id: "foods", icon: "⊞", label: "Food Library" },
];

export default function App() {
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        {/* sidebar logo */}
        <div className="sidebar-logo">
          {/* sidebar logo mark */}
          <div className="sidebar-logo-mark">⬡</div>
          <h1>Nutri-Tracker</h1>
          <p>v1.0 - daily log</p>
        </div>
        {/* sidebar nav */}
        <nav className="sidebar-nav">
          {NAV.map((n) => (
            <button
              key={n.id}
              className="nav-item"
              onClick={() => console.log("nav button clicked")}
            >
              <span className="nav-icon">{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>
        {/* sidebar footer */}
        <div className="sidebar-footer">
          {/* weight badge */}
          <div className="weight-badge">
            <div className="weight-badge-lbl">Current Weight</div>
            <div>
              <span className="weight-badge-val">150</span>
              <span className="weight-badge-unit">lbs</span>
            </div>
            <div className="weight-badge-goal">Goal: 145 lbs</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        {/* page header */}
        <div className="page-header">
          <span className="page-title">PAGE_TITLE</span>
          <span className="page-date">07/15/2026</span>
        </div>
        {/* Page body */}
        <div className="page-body">{true && <Dashboard />}</div>
      </main>
    </div>
  );
}
