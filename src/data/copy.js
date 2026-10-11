export const questions = [
  {
    id: "tuesday",
    kicker: "01",
    prompt: "A Tuesday, if you choose it.",
    options: [
      {
        id: "q1-window",
        label: "A window and something to read",
        portrait: "You like a window.",
        weights: { quiet: 1.2, linger: 1, coffee: 0.35 },
      },
      {
        id: "q1-table",
        label: "A long table",
        portrait: "You like a table that fills.",
        weights: { social: 1.25, plates: 0.45, beer: 0.25 },
      },
      {
        id: "q1-late",
        label: "Nowhere good until late",
        portrait: "Your evening starts late.",
        weights: { late: 1.35, music: 0.7 },
      },
      {
        id: "q1-counter",
        label: "The counter, watching it happen",
        portrait: "You sit where the work is.",
        weights: { counter: 1.35, coffee: 0.3 },
      },
    ],
  },
  {
    id: "drink",
    kicker: "02",
    prompt: "The drink you don’t have to think about.",
    options: [
      {
        id: "q2-coffee",
        label: "Coffee, taken seriously",
        portrait: "Coffee, taken seriously.",
        weights: { coffee: 1.7 },
      },
      {
        id: "q2-beer",
        label: "A beer that belongs to the room",
        portrait: "A beer that belongs to the house.",
        weights: { beer: 1.7, czech: 0.25 },
      },
      {
        id: "q2-wine",
        label: "Wine with a point of view",
        portrait: "Wine with a point of view.",
        weights: { wine: 1.7 },
      },
      {
        id: "q2-cocktail",
        label: "A cocktail",
        portrait: "A proper drink is enough of a plan.",
        weights: { cocktail: 1.7, late: 0.35 },
      },
    ],
  },
  {
    id: "food",
    kicker: "03",
    prompt: "If there is food.",
    options: [
      {
        id: "q3-czech",
        label: "Czech, the honest version",
        portrait: "Czech, when you eat.",
        weights: { czech: 1.6 },
      },
      {
        id: "q3-asian",
        label: "Somewhere east of here",
        portrait: "You look east for dinner.",
        weights: { asian: 1.6 },
      },
      {
        id: "q3-plates",
        label: "Small plates, passed around",
        portrait: "You’d rather share the table.",
        weights: { plates: 1.35, wine: 0.35 },
      },
      {
        id: "q3-later",
        label: "I’ll eat later",
        portrait: "Food can wait.",
        weights: { late: 0.55, cocktail: 0.35, music: 0.3 },
      },
    ],
  },
  {
    id: "room",
    kicker: "04",
    prompt: "The room.",
    options: [
      {
        id: "q4-neighborhood",
        label: "Already part of the neighborhood",
        portrait: "Rooms that belong to the street.",
        weights: { neighborhood: 1.45 },
      },
      {
        id: "q4-hidden",
        label: "You have to be told",
        portrait: "You’d rather be told than find the square.",
        weights: { hidden: 1.45 },
      },
      {
        id: "q4-grand",
        label: "A little grand",
        portrait: "A little ceremony is welcome.",
        weights: { grand: 1.45 },
      },
      {
        id: "q4-rough",
        label: "Rough, on purpose",
        portrait: "The room can be unfinished.",
        weights: { rough: 1.45 },
      },
    ],
  },
  {
    id: "leave",
    kicker: "05",
    prompt: "You leave when.",
    options: [
      {
        id: "q5-light",
        label: "The light changes",
        portrait: "You stay until the light changes.",
        weights: { linger: 1.35, quiet: 0.55 },
      },
      {
        id: "q5-second",
        label: "The second round arrives",
        portrait: "You stay for the second round.",
        weights: { social: 0.7, beer: 0.45, wine: 0.35 },
      },
      {
        id: "q5-music",
        label: "The music comes up",
        portrait: "You stay when the sound comes up.",
        weights: { music: 1.35, late: 0.75 },
      },
      {
        id: "q5-elsewhere",
        label: "You have somewhere else to be",
        portrait: "You don’t need the afternoon.",
        weights: { counter: 0.55, late: 0.15 },
      },
    ],
  },
];

export const axisCopy = {
  coffee: {
    short: "The coffee is the reason to sit.",
    long: "You keep choosing rooms where the coffee is the point, not a side.",
  },
  beer: {
    short: "A beer that belongs to the house.",
    long: "You want a beer poured like it belongs to the room.",
  },
  wine: {
    short: "Wine with a point of view.",
    long: "You asked for a glass with a point of view, not a famous label.",
  },
  cocktail: {
    short: "A drink that can carry the night.",
    long: "A proper drink is enough of a plan for you.",
  },
  czech: {
    short: "Czech, without the costume.",
    long: "You asked for Czech food without the costume.",
  },
  asian: {
    short: "A table that looks east.",
    long: "You pointed east when the question turned to dinner.",
  },
  late: {
    short: "Better after ten.",
    long: "Your evenings start when other rooms are closing.",
  },
  quiet: {
    short: "A seat you don’t perform in.",
    long: "You want a seat you don’t have to perform in.",
  },
  social: {
    short: "A table that fills up.",
    long: "You like a table that fills, and a room that knows it.",
  },
  hidden: {
    short: "You have to be told.",
    long: "You’d rather be told about a room than find it on a square.",
  },
  grand: {
    short: "A little ceremony.",
    long: "A little ceremony doesn’t bother you.",
  },
  rough: {
    short: "Unfinished, on purpose.",
    long: "You don’t need the room to be finished.",
  },
  neighborhood: {
    short: "It belongs to the street.",
    long: "You like rooms that belong to their street.",
  },
  counter: {
    short: "Sit where the work is.",
    long: "You like a seat where you can watch the work.",
  },
  linger: {
    short: "Stay until the light changes.",
    long: "You stay until the light changes, or until they hint.",
  },
  music: {
    short: "Stay for the sound.",
    long: "You stay when the sound comes up.",
  },
  plates: {
    short: "Small plates, passed around.",
    long: "You’d rather share a few plates than order a monument.",
  },
};

export const categoryPlaylists = [
  {
    id: "coffee",
    title: "Coffee",
    subtitle: "Cups worth sitting for",
    test: (place) => place.kind === "coffee" || place.attrs.coffee >= 0.75,
  },
  {
    id: "drinks",
    title: "Drinks",
    subtitle: "The second round",
    test: (place) => place.kind === "drinks",
  },
  {
    id: "czech",
    title: "Czech tables",
    subtitle: "Without the costume",
    test: (place) => place.attrs.czech >= 0.55,
  },
  {
    id: "asian",
    title: "Asian",
    subtitle: "East of here, on the plate",
    test: (place) => place.attrs.asian >= 0.55,
  },
  {
    id: "wine",
    title: "Wine",
    subtitle: "A glass with a point of view",
    test: (place) => place.attrs.wine >= 0.6,
  },
  {
    id: "late",
    title: "After ten",
    subtitle: "When the city thins out",
    test: (place) => place.attrs.late >= 0.6,
  },
  {
    id: "clubs",
    title: "Clubs",
    subtitle: "Sound, not a soundtrack",
    test: (place) => place.kind === "club",
  },
  {
    id: "hidden",
    title: "You have to be told",
    subtitle: "Not on the square",
    test: (place) => place.attrs.hidden >= 0.6,
  },
  {
    id: "grand",
    title: "A little grand",
    subtitle: "Ceremony, not costume",
    test: (place) => place.attrs.grand >= 0.7,
  },
];
