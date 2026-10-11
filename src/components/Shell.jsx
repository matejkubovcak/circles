import { Link } from "react-router-dom";
import { firstName, useApp } from "../state";
import Mark from "./Mark";

export default function Shell({ children }) {
  const { state } = useApp();
  return (
    <>
      <div className="shell">
        <header className="top">
          <Mark />
          <p className="who">{firstName(state.name)}</p>
        </header>
        {children}
      </div>
      <div className="mode-bar mode-bar-fixed">
        <Link to="/home" className="on">
          Magazine
        </Link>
        <Link to="/app">Phone</Link>
      </div>
    </>
  );
}
