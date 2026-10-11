import { useRef } from "react";
import { Link } from "react-router-dom";
import PlaceCard from "./PlaceCard";

export default function Row({ title, subtitle, to, places, large = false }) {
  const scroller = useRef(null);

  function scrollBy() {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: Math.max(320, node.clientWidth * 0.8), behavior: "smooth" });
  }

  return (
    <section className="band">
      <div className="band-head">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="band-actions">
          {to && (
            <Link to={to} className="text-link">
              See all
            </Link>
          )}
          <button type="button" className="nudge" onClick={scrollBy} aria-label={`More in ${title}`}>
            →
          </button>
        </div>
      </div>
      <div className="scroller" ref={scroller}>
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} large={large} />
        ))}
      </div>
    </section>
  );
}
