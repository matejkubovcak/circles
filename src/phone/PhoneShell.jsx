import { NavLink, Navigate, Outlet } from "react-router-dom";
import { firstName, useApp } from "../state";

const tabs = [
  { to: "/app", label: "List", end: true },
  { to: "/app/find", label: "Find" },
  { to: "/app/curators", label: "Curators" },
];

export default function PhoneShell() {
  const { state } = useApp();
  if (!state.onboarded) return <Navigate to="/" replace />;
  return (
    <div className="app-stage">
      <div className="phone">
        <header className="phone-top">
          <p className="kicker">Circles</p>
          <p className="who">{firstName(state.name)}</p>
        </header>
        <div className="phone-scroll">
          <Outlet />
        </div>
        <nav className="phone-bottom" aria-label="Phone">
          <div className="tabbar">
            {tabs.map((tab) => (
              <NavLink key={tab.to} to={tab.to} end={tab.end} className={({ isActive }) => (isActive ? "on" : "")}>
                {tab.label}
              </NavLink>
            ))}
          </div>
          <div className="mode-bar">
            <NavLink to="/home">Magazine</NavLink>
            <NavLink to="/app" className="on">
              Phone
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
