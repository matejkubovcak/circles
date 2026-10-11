import { useState } from "react";
import Row from "../components/Row";
import Shell from "../components/Shell";
import Where from "../components/Where";
import { homeRows, nearby, portrait } from "../lib/recommend";
import { firstName, useApp } from "../state";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Home() {
  const { state, dispatch } = useApp();
  const rows = homeRows(state);
  const near = nearby(state);
  const [confirming, setConfirming] = useState(false);

  return (
    <Shell>
      <main className="home">
        <p className="kicker">The list</p>
        <h1>
          {greeting()}, {firstName(state.name)}.
        </h1>
        <p className="portrait">{portrait(state)}</p>
        <p className="lede home-lede">
          One circle, edited for you. The others are a kind of drink, a kitchen, a night. Where you are is its own list.
          Open a room — if you have been, say so.
        </p>
        <Where />
        {state.location && near.length > 0 && (
          <Row
            title={state.location.label}
            subtitle="Walking distance, still in your taste."
            to="/list/near"
            places={near}
            large
          />
        )}
        {state.location && near.length === 0 && (
          <p className="where-empty">Nothing walkable from there. The city list is still below.</p>
        )}
        {rows.map((row) => (
          <Row
            key={row.id}
            title={row.title}
            subtitle={row.subtitle}
            to={`/list/${row.id}`}
            places={row.places}
            large={row.large}
          />
        ))}
        <footer className="colophon">
          <p>Rooms in Prague. The picture is of the place when a freely licensed photograph exists.</p>
          {confirming ? (
            <p className="reset-row">
              Clear this circle?
              <button type="button" onClick={() => dispatch({ type: "reset" })}>
                Yes, start over
              </button>
              <button type="button" onClick={() => setConfirming(false)}>
                Keep it
              </button>
            </p>
          ) : (
            <button type="button" className="text-link" onClick={() => setConfirming(true)}>
              Start over
            </button>
          )}
        </footer>
      </main>
    </Shell>
  );
}
