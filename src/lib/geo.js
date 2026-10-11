import { areas, places } from "../data/places";

export function fold(value) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function distanceKm(a, b) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function walkLabel(km) {
  const minutes = Math.max(1, Math.round((km * 1000) / 80));
  return `${minutes} min walk`;
}

export function searchLocations(query) {
  const q = fold(query.trim());
  if (q.length < 2) return [];
  const quarters = areas
    .filter((area) => fold(area.name).includes(q))
    .map((area) => ({
      key: `area-${area.id}`,
      source: "hub",
      id: area.id,
      label: area.name,
      detail: area.hub ? "Hub" : "Quarter",
      lat: area.lat,
      lng: area.lng,
      pinId: null,
    }));
  const rooms = places
    .filter((place) => fold(`${place.name} ${place.address} ${place.area}`).includes(q))
    .slice(0, 6)
    .map((place) => ({
      key: `place-${place.id}`,
      source: "search",
      id: place.id,
      label: `Near ${place.name}`,
      detail: `${place.address}, ${place.area}`,
      lat: place.lat,
      lng: place.lng,
      pinId: place.id,
    }));
  return [...quarters, ...rooms].slice(0, 7);
}
