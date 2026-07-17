import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/nutrients"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            Micronutrients
          </NavLink>
          <NavLink
            to="/foods"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            Food Library
          </NavLink>
        </nav>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
