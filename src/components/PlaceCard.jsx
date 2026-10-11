import { Link } from "react-router-dom";
import { kindLabel } from "../data/places";
import { whyShort } from "../lib/recommend";
import { useApp } from "../state";
import Photo from "./Photo";

export default function PlaceCard({ place, large = false, why = true, index }) {
  const { state } = useApp();
  const vote = state.visited?.[place.id];

  return (
    <Link to={`/place/${place.id}`} className={`card ${large ? "card-lg" : ""}`}>
      <div className="card-photo">
        <Photo src={place.photos[0]} alt="" />
        <span className="card-area">{place.area}</span>
        {vote === "up" && <span className="card-flag">Kept</span>}
        {typeof index === "number" && <span className="card-num">{index + 1}</span>}
      </div>
      <div className="card-copy">
        <p className="kicker">{kindLabel[place.kind]}</p>
        <h3>{place.name}</h3>
        {why && (
          <p className="card-why">
            {place.walk ? `${place.walk} · ` : ""}
            {whyShort(place, state)}
          </p>
        )}
      </div>
    </Link>
  );
}
