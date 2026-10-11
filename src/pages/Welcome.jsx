import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Mark from "../components/Mark";
import { resumePath, useApp } from "../state";

export default function Welcome() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState(state.name);
  const [email, setEmail] = useState(state.email);
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    const nextName = name.trim();
    const nextEmail = email.trim();
    if (nextName.length < 1) {
      setError("A name is enough to start.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      setError("Leave an email, even a quiet one.");
      return;
    }
    dispatch({ type: "identity", name: nextName, email: nextEmail });
    const next = { ...state, name: nextName, email: nextEmail };
    const path = resumePath(next);
    navigate(path === "/" ? "/questions" : path);
  }

  const returning = state.answers.length > 0 || state.likes.length > 0;

  return (
    <main className="gate">
      <header className="gate-top">
        <Mark to="/" />
        <p className="kicker">Praha</p>
      </header>
      <div className="gate-body">
        <h1>
          A list of rooms
          <br />
          worth <em>returning</em> to.
        </h1>
        <p className="lede">
          Five questions. Five places you already like. Then one circle of coffee, drinks, tables, and nights in Prague
          — edited again each time you say you have been.
        </p>
        <form onSubmit={submit} className="signup">
          <label>
            <span>Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              autoFocus
              placeholder="Your name"
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="you@somewhere.com"
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="solid">
            {returning ? "Continue" : "Enter"}
          </button>
          <p className="fine">Stays on this device. Nothing is sent.</p>
        </form>
      </div>
      <footer className="gate-foot">
        <span>Coffee</span>
        <span>Drink</span>
        <span>Table</span>
        <span>Night</span>
      </footer>
    </main>
  );
}
