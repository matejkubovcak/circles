import { forYou } from "../lib/recommend";
import { useApp } from "../state";
import Tiles from "./Tiles";

export default function ListTab() {
  const { state } = useApp();
  const places = forYou(state).slice(0, 12);
  return (
    <section className="phone-tab">
      <p className="kicker">Your circle</p>
      <Tiles places={places} />
    </section>
  );
}
