import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Photo from "../components/Photo";
import Mark from "../components/Mark";
import { kindLabel, places } from "../data/places";
import { homePath, useApp } from "../state";

const filters = [
  { id: "all", label: "All" },
  { id: "coffee", label: "Coffee" },
  { id: "drinks", label: "Drinks" },
  { id: "food", label: "Food" },
  { id: "club", label: "Night" },
];

export default function Pass() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const pool = useMemo(() => places.filter((place) => !state.likes.includes(place.id)), [state.likes]);
  const visible = filter === "all" ? pool : pool.filter((place) => place.kind === filter);

  function finish() {
    dispatch({ type: "finish" });
    navigate(homePath);
  }

  return (
    <main className="pick-page">
      <header className="gate-top">
        <Mark to="/" />
        <p className="kicker">Optional</p>
      </header>
      <div className="pick-intro">
        <h1>Any that aren’t you.</h1>
        <p>Skip this if you like. A few nos keep the list from being polite in the wrong direction.</p>
      </div>
      <div className="filters">
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
          const on = state.dislikes.includes(place.id);
          return (
            <button
              key={place.id}
              type="button"
              className={on ? "pick pass on" : "pick"}
              onClick={() => dispatch({ type: "dislike", id: place.id })}
              aria-pressed={on}
            >
              <div className="pick-photo">
                <Photo src={place.photos[0]} alt="" />
                {on && <span className="pick-num">×</span>}
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
          <p className="dock-count">{state.dislikes.length === 0 ? "None yet" : `${state.dislikes.length} set aside`}</p>
          <Link to="/likes" className="text-link">
            Back
          </Link>
        </div>
        <button type="button" className="solid" onClick={finish}>
          See your circle
        </button>
      </div>
    </main>
  );
}
