import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categoryPlaylists } from "../data/copy";
import { hubs } from "../data/places";
import { nearby, playlistById } from "../lib/recommend";
import { useApp } from "../state";
import Tiles from "./Tiles";

export default function FindTab() {
  const { state, dispatch } = useApp();
  const [params, setParams] = useSearchParams();
  const [locating, setLocating] = useState(false);
  const [note, setNote] = useState("");
  const kind = params.get("kind");
  const location = state.location;

  function chooseHub(hub) {
    const same = location?.source === "hub" && location.id === hub.id;
    dispatch({
      type: "location",
      location: same
        ? null
        : { source: "hub", id: hub.id, pinId: null, label: hub.name, lat: hub.lat, lng: hub.lng },
    });
    setNote("");
  }

  function locate() {
    if (location?.source === "here") {
      dispatch({ type: "location", location: null });
      return;
    }
    if (!navigator.geolocation) {
      setNote("This browser can't share a location.");
      return;
    }
    setLocating(true);
    setNote("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: "location",
          location: {
            source: "here",
            id: null,
            pinId: null,
            label: "Near you",
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
        setLocating(false);
      },
      () => {
        setLocating(false);
        setNote("Location stayed off. Pick a hub.");
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    );
  }

  function chooseKind(id) {
    const next = new URLSearchParams(params);
    if (kind === id) next.delete("kind");
    else next.set("kind", id);
    setParams(next, { replace: true });
  }

  const located = location ? nearby(state) : null;
  const category = kind ? playlistById(kind, state)?.places || [] : null;
  let places = [];
  let empty = "Pick a bubble.";
  if (located && category) {
    const ids = new Set(category.map((place) => place.id));
    places = located.filter((place) => ids.has(place.id));
    empty = "Nothing in that walk matches.";
  } else if (located) {
    places = located;
    empty = "Nothing walkable from there.";
  } else if (category) {
    places = category;
    empty = "Nothing in that circle.";
  }

  return (
    <section className="phone-tab">
      <p className="kicker">Where</p>
      <div className="bubbles">
        <button type="button" className={location?.source === "here" ? "chip on" : "chip"} onClick={locate}>
          {locating ? "Finding you" : "Near you"}
        </button>
        {hubs.map((hub) => (
          <button
            key={hub.id}
            type="button"
            className={location?.source === "hub" && location.id === hub.id ? "chip on" : "chip"}
            onClick={() => chooseHub(hub)}
          >
            {hub.name}
          </button>
        ))}
      </div>
      <p className="kicker find-kind">Kind</p>
      <div className="bubbles">
        {categoryPlaylists.map((item) => (
          <button key={item.id} type="button" className={kind === item.id ? "chip on" : "chip"} onClick={() => chooseKind(item.id)}>
            {item.title}
          </button>
        ))}
      </div>
      {note && <p className="form-error find-note">{note}</p>}
      <Tiles places={places} empty={empty} />
    </section>
  );
}
