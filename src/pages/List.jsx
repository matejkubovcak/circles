import { Link, useParams } from "react-router-dom";
import Photo from "../components/Photo";
import Shell from "../components/Shell";
import { kindLabel } from "../data/places";
import { playlistById, whyShort } from "../lib/recommend";
import { useApp } from "../state";

export default function List() {
  const { id } = useParams();
  const { state } = useApp();
  const playlist = playlistById(id, state);

  if (!playlist) {
    return (
      <Shell>
        <main className="home">
          <h1>That circle isn’t here.</h1>
          <Link to="/home" className="text-link">
            Back to the list
          </Link>
        </main>
      </Shell>
    );
  }

  return (
    <Shell>
      <main className="home list-page">
        <Link to="/home" className="text-link back-link">
          ← The list
        </Link>
        <p className="kicker">Playlist</p>
        <h1>{playlist.title}</h1>
        {playlist.subtitle && <p className="lede home-lede">{playlist.subtitle}</p>}
        <p className="count">{playlist.places.length} rooms</p>
        <div className="catalog">
          {playlist.places.map((place) => (
            <Link key={place.id} to={`/place/${place.id}`} className="catalog-row">
              <Photo src={place.photos[0]} alt="" />
              <div>
                <p className="kicker">
                  {place.area} · {kindLabel[place.kind]}
                </p>
                <h2>{place.name}</h2>
                <p>
                    {place.walk ? `${place.walk} · ` : ""}
                    {whyShort(place, state)}
                  </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Shell>
  );
}
