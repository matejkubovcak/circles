import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Photo from "../components/Photo";
import Mark from "../components/Mark";
import { kindLabel, places } from "../data/places";
import { useApp } from "../state";

const filters = [
  { id: "all", label: "All" },
  { id: "coffee", label: "Coffee" },
  { id: "drinks", label: "Drinks" },
  { id: "food", label: "Food" },
  { id: "club", label: "Night" },
];

export default function Likes() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const visible = useMemo(
    () => (filter === "all" ? places : places.filter((place) => place.kind === filter)),
    [filter],
  );
  const ready = state.likes.length === 5;

  return (
    <main className="pick-page">
      <header className="gate-top">
        <Mark to="/" />
        <p className="kicker">Five you already like</p>
      </header>
      <div className="pick-intro">
        <h1>Five that are already you.</h1>
        <p>Tap a room. The list needs five before it can lean toward the rest of the city.</p>
      </div>
      <div className="filters" role="tablist">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={filter === item.id ? "chip on" : "chip"}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="pick-grid">
        {visible.map((place) => {
          const index = state.likes.indexOf(place.id);
          const on = index >= 0;
          return (
            <button
              key={place.id}
              type="button"
              className={on ? "pick on" : "pick"}
              onClick={() => dispatch({ type: "like", id: place.id })}
              aria-pressed={on}
            >
              <div className="pick-photo">
                <Photo src={place.photos[0]} alt="" />
                {on && <span className="pick-num">{index + 1}</span>}
              </div>
              <span className="kicker">{place.area}</span>
              <strong>{place.name}</strong>
              <em>{kindLabel[place.kind]}</em>
            </button>
          );
        })}
      </div>
      <div className="dock">
        <div>
          <p className="dock-count">{state.likes.length} of 5</p>
          {ready && <p className="fine">Untap one to change it.</p>}
          <Link to="/questions" className="text-link">
            Back
          </Link>
        </div>
        <button type="button" className="solid" disabled={!ready} onClick={() => navigate("/pass")}>
          Continue
        </button>
      </div>
    </main>
  );
}
