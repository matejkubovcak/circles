export const curators = [
  {
    id: "hrabal",
    name: "Bohumil Hrabal",
    role: "Writer",
    line: "U Zlatého tygra was his pub. The other rooms keep that hour: beer, a counter, no performance.",
    places: ["tygra", "lokal-dlouha", "lokal-kuzelka", "sudu", "kohouti", "kantyna", "bukowski"],
  },
  {
    id: "kafka",
    name: "Franz Kafka",
    role: "Writer",
    line: "He wrote in rented rooms and sat in the city’s cafés. These still behave like places for staying too long.",
    places: ["louvre", "imperial", "savoy"],
  },
  {
    id: "cerny",
    name: "David Černý",
    role: "Sculptor",
    line: "He co-founded MeetFactory. The other addresses run at the same temperature: industry, a late door, a room that isn’t finished.",
    places: ["meetfactory", "cross", "akropolis", "ankali", "vlese"],
  },
  {
    id: "karpisek",
    name: "Tomáš Karpíšek",
    role: "Ambiente",
    line: "He started the Ambiente kitchens. These are rooms that group actually runs — beer, beef, bread, a bottle.",
    places: ["kantyna", "cestr", "eska", "eska-letna", "nase-maso", "lokal-dlouha", "lokal-kuzelka", "bokovka", "kohouti"],
  },
];

export const curatorById = Object.fromEntries(curators.map((curator) => [curator.id, curator]));
