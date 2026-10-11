import { useEffect, useId, useRef, useState } from "react";
import { hubs } from "../data/places";
import { searchLocations } from "../lib/geo";
import { useApp } from "../state";

export default function Where() {
  const { state, dispatch } = useApp();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const [note, setNote] = useState("");
  const box = useRef(null);
  const listId = useId();
  const matches = searchLocations(query);
  const location = state.location;

  useEffect(() => {
    function onPointer(event) {
      if (!box.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, []);

  function choose(next) {
    dispatch({ type: "location", location: next });
    setQuery("");
    setOpen(false);
    setNote("");
  }

  function clear() {
    dispatch({ type: "location", location: null });
    setNote("");
  }

  function locate() {
    if (!navigator.geolocation) {
      setNote("This browser can't share a location. Pick a hub, or search.");
      return;
    }
    setLocating(true);
    setNote("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        choose({
          source: "here",
          id: null,
          pinId: null,
          label: "Near you",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocating(false);
      },
      () => {
        setLocating(false);
        setNote("Location stayed off. Pick a hub, or search a street.");
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    );
  }

  function onKeyDown(event) {
    if (event.key === "Escape") setOpen(false);
    if (event.key === "Enter" && matches[0]) {
      event.preventDefault();
      choose(matches[0]);
    }
  }

  return (
    <section className="where">
      <p className="kicker">Where</p>
      <p className="where-line">Near you, a hub, or somewhere you type.</p>
      <div className="bubbles">
        <button type="button" className={location?.source === "here" ? "chip on" : "chip"} onClick={locate}>
          {locating ? "Finding you" : "Near you"}
        </button>
        {hubs.map((hub) => (
          <button
            key={hub.id}
            type="button"
            className={location?.source === "hub" && location.id === hub.id ? "chip on" : "chip"}
            onClick={() =>
              choose({
                source: "hub",
                id: hub.id,
                pinId: null,
                label: hub.name,
                lat: hub.lat,
                lng: hub.lng,
              })
            }
          >
            {hub.name}
          </button>
        ))}
      </div>
      <div className="where-search" ref={box}>
        <input
          value={query}
          placeholder="A street, a square, a room"
          aria-label="Search a location"
          aria-expanded={open && matches.length > 0}
          aria-controls={listId}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        {open && matches.length > 0 && (
          <div className="suggest" id={listId} role="listbox">
            {matches.map((match) => (
              <button key={match.key} type="button" role="option" onClick={() => choose(match)}>
                <strong>{match.label}</strong>
                <span>{match.detail}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="where-status">
        {location && (
          <p>
            Showing {location.label}.
            <button type="button" className="text-link" onClick={clear}>
              Whole city
            </button>
          </p>
        )}
        {note && <p className="form-error">{note}</p>}
      </div>
    </section>
  );
}
