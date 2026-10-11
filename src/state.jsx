import { createContext, useContext, useEffect, useReducer } from "react";

const KEY = "circles-v1";

const empty = {
  name: "",
  email: "",
  answers: [],
  likes: [],
  dislikes: [],
  visited: {},
  onboarded: false,
  location: null,
};

function sanitize(raw) {
  if (!raw || typeof raw !== "object") return empty;
  return {
    name: typeof raw.name === "string" ? raw.name : "",
    email: typeof raw.email === "string" ? raw.email : "",
    answers: Array.isArray(raw.answers) ? raw.answers.filter((id) => typeof id === "string") : [],
    likes: Array.isArray(raw.likes) ? raw.likes.filter((id) => typeof id === "string").slice(0, 5) : [],
    dislikes: Array.isArray(raw.dislikes) ? raw.dislikes.filter((id) => typeof id === "string").slice(0, 8) : [],
    visited: raw.visited && typeof raw.visited === "object" ? raw.visited : {},
    onboarded: Boolean(raw.onboarded),
    location: sanitizeLocation(raw.location),
  };
}

function sanitizeLocation(raw) {
  if (!raw || typeof raw !== "object") return null;
  const lat = Number(raw.lat);
  const lng = Number(raw.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (!["here", "hub", "search"].includes(raw.source)) return null;
  return {
    source: raw.source,
    id: typeof raw.id === "string" ? raw.id : null,
    pinId: typeof raw.pinId === "string" ? raw.pinId : null,
    label: typeof raw.label === "string" && raw.label.trim() ? raw.label : "Nearby",
    lat,
    lng,
  };
}

function load() {
  try {
    return sanitize(JSON.parse(localStorage.getItem(KEY) || "null"));
  } catch {
    return empty;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "identity":
      return { ...state, name: action.name, email: action.email };
    case "answer": {
      const prefix = action.id.split("-")[0];
      const answers = state.answers.filter((id) => !id.startsWith(`${prefix}-`));
      answers.push(action.id);
      return { ...state, answers };
    }
    case "like": {
      const likes = state.likes.includes(action.id)
        ? state.likes.filter((id) => id !== action.id)
        : state.likes.length >= 5
          ? state.likes
          : [...state.likes, action.id];
      return { ...state, likes, dislikes: state.dislikes.filter((id) => id !== action.id) };
    }
    case "dislike": {
      if (state.likes.includes(action.id)) return state;
      const dislikes = state.dislikes.includes(action.id)
        ? state.dislikes.filter((id) => id !== action.id)
        : state.dislikes.length >= 8
          ? state.dislikes
          : [...state.dislikes, action.id];
      return { ...state, dislikes };
    }
    case "visit": {
      const visited = { ...state.visited };
      if (action.vote == null) delete visited[action.id];
      else visited[action.id] = action.vote;
      return { ...state, visited };
    }
    case "location":
      return { ...state, location: action.location };
    case "finish":
      return { ...state, onboarded: true };
    case "reset":
      return empty;
    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppState({ children }) {
  const [state, dispatch] = useReducer(reducer, null, load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error("useApp outside provider");
  return value;
}

export function firstName(name) {
  const clean = (name || "").trim();
  if (!clean) return "there";
  return clean.split(/\s+/)[0];
}

export const homePath = import.meta.env.VITE_PHONE === "1" ? "/app" : "/home";

export function resumePath(state) {
  if (state.onboarded) return homePath;
  if (state.likes.length === 5) return "/pass";
  if (state.answers.length === 5) return "/likes";
  if (state.name) return "/questions";
  return "/";
}
