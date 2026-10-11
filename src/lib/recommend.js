import { places, byId, areas } from "../data/places";
import { questions, axisCopy, categoryPlaylists } from "../data/copy";
import { distanceKm, walkLabel } from "./geo";

export const AXES = [
  "quiet",
  "social",
  "late",
  "counter",
  "coffee",
  "beer",
  "wine",
  "cocktail",
  "czech",
  "asian",
  "plates",
  "neighborhood",
  "hidden",
  "grand",
  "rough",
  "linger",
  "music",
];

const optionById = Object.fromEntries(
  questions.flatMap((question) => question.options.map((option) => [option.id, option])),
);

export function answerOption(id) {
  return optionById[id];
}

function zero() {
  return Object.fromEntries(AXES.map((axis) => [axis, 0]));
}

function add(target, weights, scale) {
  if (!weights) return;
  for (const [key, value] of Object.entries(weights)) {
    if (key in target) target[key] += value * scale;
  }
}

export function tasteVector(state) {
  const vector = zero();
  for (const id of state.answers || []) {
    add(vector, optionById[id]?.weights, 1.15);
  }
  for (const id of state.likes || []) add(vector, byId[id]?.attrs, 1);
  for (const id of state.dislikes || []) add(vector, byId[id]?.attrs, -0.9);
  for (const [id, vote] of Object.entries(state.visited || {})) {
    add(vector, byId[id]?.attrs, vote === "up" ? 1.7 : -1.8);
  }
  return vector;
}

function dot(a, b) {
  let score = 0;
  for (const axis of AXES) score += (a[axis] || 0) * (b[axis] || 0);
  return score;
}

function likedIds(state) {
  const ids = new Set(state.likes || []);
  for (const [id, vote] of Object.entries(state.visited || {})) {
    if (vote === "up") ids.add(id);
  }
  return [...ids];
}

export function scorePlace(place, state, vector = tasteVector(state)) {
  let score = dot(place.attrs, vector);
  const likes = likedIds(state).map((id) => byId[id]).filter(Boolean);
  if (likes.some((item) => item.areaId === place.areaId)) score += 0.45;
  if (likes.some((item) => item.kind === place.kind)) score += 0.3;
  if ((state.dislikes || []).includes(place.id)) score -= 4;
  if (state.visited?.[place.id] === "down") score -= 6;
  return score;
}

function ranked(state, list = places) {
  const vector = tasteVector(state);
  return [...list].sort((a, b) => {
    const delta = scorePlace(b, state, vector) - scorePlace(a, state, vector);
    if (delta !== 0) return delta;
    return a.name.localeCompare(b.name);
  });
}

function hiddenFromDiscovery(state, place) {
  if ((state.dislikes || []).includes(place.id)) return true;
  if (state.visited?.[place.id] === "down") return true;
  return false;
}

export function forYou(state) {
  return ranked(state).filter((place) => {
    if (hiddenFromDiscovery(state, place)) return false;
    if ((state.likes || []).includes(place.id)) return false;
    if (state.visited?.[place.id] === "up") return false;
    return true;
  });
}

export function kept(state) {
  return ranked(state).filter((place) => state.visited?.[place.id] === "up");
}

export function startedWith(state) {
  return (state.likes || []).map((id) => byId[id]).filter(Boolean);
}

export function portrait(state) {
  return (state.answers || [])
    .map((id) => optionById[id]?.portrait)
    .filter(Boolean)
    .join(" ");
}

export function topAxis(place, vector) {
  let best = null;
  let bestScore = 0;
  for (const axis of AXES) {
    const weight = place.attrs[axis] || 0;
    if (weight < 0.45) continue;
    const score = weight * Math.max(vector[axis] || 0, 0);
    if (score > bestScore) {
      best = axis;
      bestScore = score;
    }
  }
  if (best) return best;
  return AXES.reduce((lead, axis) => ((place.attrs[axis] || 0) > (place.attrs[lead] || 0) ? axis : lead), "neighborhood");
}

export function nearestKept(place, state) {
  let best = null;
  let bestScore = -Infinity;
  for (const id of likedIds(state)) {
    if (id === place.id) continue;
    const other = byId[id];
    if (!other) continue;
    const score = dot(place.attrs, other.attrs);
    if (score > bestScore) {
      best = other;
      bestScore = score;
    }
  }
  return best;
}

export function whyShort(place, state) {
  const axis = topAxis(place, tasteVector(state));
  return axisCopy[axis]?.short || "It sits close to the rooms you already kept.";
}

export function whyLong(place, state) {
  const axis = topAxis(place, tasteVector(state));
  const line = axisCopy[axis]?.long || "It sits close to how you described going out.";
  const nearest = nearestKept(place, state);
  const tail = nearest ? ` Closest to ${nearest.name}, which you already kept.` : "";
  return `${line} ${place.hook}${tail}`;
}

export function withVisit(state, id, vote) {
  const visited = { ...(state.visited || {}) };
  if (vote == null) delete visited[id];
  else visited[id] = vote;
  return { ...state, visited };
}

export function describeShift(state, id, vote) {
  const before = forYou(state);
  const after = forYou(withVisit(state, id, vote));
  const entered = after.filter((place) => !before.some((item) => item.id === place.id)).slice(0, 3);
  const firstChanged = before[0] && after[0] && before[0].id !== after[0].id;
  const sameOrder = before.slice(0, 8).map((place) => place.id).join() === after.slice(0, 8).map((place) => place.id).join();
  if (vote == null) {
    return { title: "Taken back. The list relaxed.", places: [] };
  }
  if (sameOrder && entered.length === 0) {
    return {
      title: vote === "up" ? "Kept. Your circle already leaned this way." : "Noted. The list was already looking elsewhere.",
      places: [],
    };
  }
  if (vote === "down") {
    return {
      title: firstChanged && after[0] ? `${after[0].name} moved into the lead.` : "Dropped. Nearby rooms stepped back.",
      places: entered,
    };
  }
  return {
    title: firstChanged && after[0] ? `${after[0].name} is now first.` : "Kept. Similar rooms moved up.",
    places: entered,
  };
}

function playlistScore(list, state) {
  if (!list.length) return -Infinity;
  const vector = tasteVector(state);
  const top = [...list]
    .map((place) => scorePlace(place, state, vector))
    .sort((a, b) => b - a)
    .slice(0, 3);
  return top.reduce((sum, value) => sum + value, 0) / top.length;
}

export function nearby(state) {
  const origin = state.location;
  if (!origin) return [];
  const quarter = areas.some((area) => area.id === origin.id);
  const rankedNear = places
    .filter((place) => place.id !== origin.pinId && !hiddenFromDiscovery(state, place))
    .map((place) => {
      const km = distanceKm(origin, place);
      return { place, km, score: scorePlace(place, state) - km * 0.85 };
    });
  const within = (km) => rankedNear.filter((item) => item.km <= km || (quarter && item.place.areaId === origin.id));
  let list = within(1.05);
  if (list.length < 3) list = within(1.6);
  return list
    .sort((a, b) => b.score - a.score || a.km - b.km)
    .slice(0, 10)
    .map((item) => ({ ...item.place, walk: walkLabel(item.km) }));
}

export function playlistById(id, state) {
  if (id === "for-you") {
    return {
      id,
      title: "Your circle",
      subtitle: portrait(state),
      places: forYou(state),
    };
  }
  if (id === "kept") {
    return { id, title: "You kept", subtitle: "Places you already stood by.", places: kept(state) };
  }
  if (id === "started") {
    return {
      id,
      title: "You started with",
      subtitle: "The five that opened the list.",
      places: startedWith(state),
    };
  }
  if (id === "near") {
    const list = nearby(state);
    return {
      id,
      title: state.location?.label || "Nearby",
      subtitle: "Walking distance, still in your taste.",
      places: list,
    };
  }
  const category = categoryPlaylists.find((item) => item.id === id);
  if (category) {
    const list = ranked(state, places.filter(category.test)).filter((place) => !hiddenFromDiscovery(state, place));
    return { id, title: category.title, subtitle: category.subtitle, places: list };
  }
  const area = areas.find((item) => item.id === id);
  if (area) {
    const list = ranked(state, places.filter((place) => place.areaId === area.id)).filter(
      (place) => !hiddenFromDiscovery(state, place),
    );
    return { id, title: area.name, subtitle: "A walkable circle", places: list };
  }
  return null;
}

export function homeRows(state) {
  const rows = [
    {
      id: "for-you",
      title: "Your circle",
      subtitle: "The one list. It moves when you do.",
      places: forYou(state).slice(0, 12),
      large: true,
    },
  ];

  const keptPlaces = kept(state);
  if (keptPlaces.length) {
    rows.push({
      id: "kept",
      title: "You kept",
      subtitle: "Marked after you had been.",
      places: keptPlaces,
    });
  }

  const seed = startedWith(state);
  if (seed.length) {
    rows.push({
      id: "started",
      title: "You started with",
      subtitle: "The five that opened the list.",
      places: seed,
    });
  }

  const dynamic = [];

  for (const category of categoryPlaylists) {
    const list = ranked(state, places.filter(category.test)).filter((place) => !hiddenFromDiscovery(state, place));
    if (list.length >= 3) {
      dynamic.push({
        id: category.id,
        title: category.title,
        subtitle: category.subtitle,
        places: list.slice(0, 12),
        affinity: playlistScore(list, state),
      });
    }
  }

  dynamic.sort((a, b) => b.affinity - a.affinity || a.title.localeCompare(b.title));
  return [...rows, ...dynamic];
}

export function memberships(place) {
  const lists = categoryPlaylists
    .filter((category) => category.test(place))
    .map((category) => ({ id: category.id, title: category.title }));
  return lists;
}
