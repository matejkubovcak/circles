import { Link } from "react-router-dom";
import Photo from "../components/Photo";
import { kindLabel } from "../data/places";
import { whyShort } from "../lib/recommend";
import { useApp } from "../state";

export default function Tiles({ places, empty }) {
  const { state } = useApp();
  if (!places.length) {
    return <p className="where-empty">{empty || "Nothing in this circle."}</p>;
  }
  return (
    <div className="tiles">
      {places.map((place) => (
        <Link key={place.id} to={`/app/place/${place.id}`} className="tile">
          <div className="tile-photo">
            <Photo src={place.photos[0]} alt="" />
            <span className="card-area">{place.area}</span>
          </div>
          <p className="kicker">{kindLabel[place.kind]}</p>
          <h2>{place.name}</h2>
          <p>
            {place.walk ? `${place.walk} · ` : ""}
            {whyShort(place, state)}
          </p>
        </Link>
      ))}
    </div>
  );
}
