import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
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
      <main className="main">
        {/* page header */}
        <div className="page-header">
          <span className="page-title">PAGE_TITLE</span>
          <span className="page-date">07/15/2026</span>
        </div>
        {/* Page body */}
        <div className="page-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
