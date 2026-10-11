import { Link, useParams } from "react-router-dom";
import { curatorById, curators } from "../data/curators";
import { byId } from "../data/places";
import Tiles from "./Tiles";

export default function CuratorsTab() {
  return (
    <section className="phone-tab">
      <p className="kicker">Curators</p>
      <p className="find-note">Editorial circles. Not a signed list.</p>
      <div className="curators">
        {curators.map((curator) => (
          <Link key={curator.id} to={`/app/curators/${curator.id}`} className="curator">
            <p className="kicker">{curator.role}</p>
            <h2>{curator.name}</h2>
            <p>{curator.line}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CuratorView() {
  const { id } = useParams();
  const curator = curatorById[id];
  if (!curator) {
    return (
      <section className="phone-tab">
        <Link to="/app/curators" className="text-link">
          ← Curators
        </Link>
        <h2 className="tile-title">That list isn’t here.</h2>
      </section>
    );
  }
  const places = curator.places.map((placeId) => byId[placeId]).filter(Boolean);
  return (
    <section className="phone-tab">
      <Link to="/app/curators" className="text-link back-link">
        ← Curators
      </Link>
      <p className="kicker">{curator.role}</p>
      <h2 className="tile-title">{curator.name}</h2>
      <p className="curator-line">{curator.line}</p>
      <Tiles places={places} />
    </section>
  );
}
