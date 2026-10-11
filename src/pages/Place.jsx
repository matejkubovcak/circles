import { useState } from "react";
import { Link, useMatch, useNavigate, useParams } from "react-router-dom";
import Photo from "../components/Photo";
import Shell from "../components/Shell";
import { asPhoto } from "../data/photos";
import { byId, kindLabel } from "../data/places";
import { describeShift, memberships, whyLong } from "../lib/recommend";
import { useApp } from "../state";

export default function Place() {
  const { id } = useParams();
  const navigate = useNavigate();
  const phone = Boolean(useMatch("/app/place/:id"));
  const { state, dispatch } = useApp();
  const place = byId[id];
  const [shot, setShot] = useState(0);
  const [flash, setFlash] = useState(null);

  if (!place) {
    return (
      <Shell>
        <main className="home">
          <h1>That room isn’t in the circle.</h1>
          <Link to="/home">Back</Link>
        </main>
      </Shell>
    );
  }

  const vote = state.visited?.[place.id] || null;
  const lists = memberships(place);
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${place.name} ${place.address} Prague`,
  )}`;

  function voteFor(next) {
    const applied = vote === next ? null : next;
    const shift = describeShift(state, place.id, applied);
    dispatch({ type: "visit", id: place.id, vote: applied });
    setFlash(shift);
  }

  const current = asPhoto(place.photos[shot]);
  const main = (
      <main className="place">
        <div className="place-media">
          <Photo src={current} alt={`${place.name} in ${place.area}`} className="hero" eager />
          <div className="thumbs">
            {place.photos.map((photo, index) => (
              <button
                key={`${place.id}-${index}`}
                type="button"
                className={index === shot ? "thumb on" : "thumb"}
                onClick={() => setShot(index)}
                aria-label={`Photograph ${index + 1}`}
              >
                <Photo src={photo} alt="" />
              </button>
            ))}
          </div>
          {current.real ? (
            <p className="fine">
              Photograph by <a href={current.href} className="text-link">{current.credit}</a>, {current.license}
            </p>
          ) : (
            <p className="fine">No freely licensed photograph of this room yet. This picture only suggests it.</p>
          )}
        </div>
        <div className="place-copy">
          <button type="button" className="text-link back-link" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <p className="kicker">
            {place.area} · {kindLabel[place.kind]}
          </p>
          <h1>{place.name}</h1>
          <p className="address">{place.address}</p>
          <section className="why-panel">
            <p className="kicker">Why it’s in your circle</p>
            <p>{whyLong(place, state)}</p>
          </section>
          <p className="description">{place.description}</p>
          <ul className="traits">
            {place.traits.map((trait) => (
              <li key={trait}>{trait}</li>
            ))}
          </ul>
          <dl className="facts">
            <div>
              <dt>Hours</dt>
              <dd>{place.hours}</dd>
            </div>
            <div>
              <dt>The bill</dt>
              <dd>{place.price}</dd>
            </div>
          </dl>
          <p className="also">
            Also in{" "}
            {lists.map((list, index) => (
              <span key={list.id}>
                {index > 0 && ", "}
                <Link to={phone ? `/app/find?kind=${list.id}` : `/list/${list.id}`}>{list.title}</Link>
              </span>
            ))}
          </p>
          <a className="text-link map-link" href={mapHref} target="_blank" rel="noreferrer">
            Open a map
          </a>
          <section className="visit">
            <p className="kicker">If you have been</p>
            <div className="visit-row">
              <button type="button" className={vote === "up" ? "vote on" : "vote"} aria-pressed={vote === "up"} onClick={() => voteFor("up")}>
                Loved it
              </button>
              <button type="button" className={vote === "down" ? "vote down on" : "vote"} aria-pressed={vote === "down"} onClick={() => voteFor("down")}>
                Not for me
              </button>
            </div>
            {flash && (
              <div className="shift">
                <p>{flash.title}</p>
                {flash.places.length > 0 && (
                  <ul>
                    {flash.places.map((item) => (
                      <li key={item.id}>
                        <Link to={phone ? `/app/place/${item.id}` : `/place/${item.id}`}>{item.name}</Link>
                        <span> moved in</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
  );

  if (phone) return main;
  return <Shell>{main}</Shell>;
}
