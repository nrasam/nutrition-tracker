import { NavLink, Outlet, useLocation } from "react-router-dom";

// Associates a page title to a pathname
const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/nutrients": "Micronutrients",
  "/foods": "Food Library",
  "/log": "Today's Log",
  "/settings": "Set Goals",
};

export default function Layout({
  logCount,
  currWeight,
  goalWeight,
}: {
  logCount: number;
  currWeight: number;
  goalWeight: number;
}) {
  const location = useLocation();
  // Finds the corresponding page title
  const pageTitle = pageTitles[location.pathname] ?? "Page Title Not Found";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="layout">
      <aside className="sidebar">
        {/* sidebar logo */}
        <div className="sidebar-logo">
          {/* sidebar logo mark */}
          <div className="sidebar-logo-mark">⬡</div>
          <h1>Nutri-Tracker</h1>
          <p>v1.0 - daily log</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">◈</span>
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/nutrients"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">⬡</span>
            <span>Micronutrients</span>
          </NavLink>
          <NavLink
            to="/foods"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">⊞</span>
            <span>Food Library</span>
          </NavLink>
          <NavLink
            to="/log"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">◷</span>
            <span>Today's Log</span>
            {logCount > 0 && <span className="log-count">{logCount}</span>}
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">⚙</span>
            <span>Settings</span>
          </NavLink>
        </nav>
        {/* sidebar footer */}
        <div className="sidebar-footer">
          {/* weight badge */}
          <div className="weight-badge">
            <div className="weight-badge-lbl">Current Weight</div>
            <div>
              <span className="weight-badge-val">{currWeight}</span>
              <span className="weight-badge-unit">lbs</span>
            </div>
            <div className="weight-badge-goal">Goal: {goalWeight} lbs</div>
          </div>
        </div>
      </aside>
      <main className="main">
        {/* page header */}
        <div className="page-header">
          <span className="page-title">{pageTitle}</span>
          <span className="page-date">{today.toUpperCase()}</span>
        </div>
        {/* Page body */}
        <div className="page-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
