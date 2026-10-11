import { Link } from "react-router-dom";

export default function Mark({ to = "/home" }) {
  return (
    <Link to={to} className="mark">
      <span className="mark-dot" aria-hidden="true" />
      Circles
    </Link>
  );
}
