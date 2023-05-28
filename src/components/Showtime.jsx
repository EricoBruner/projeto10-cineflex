import { Link } from "react-router-dom";

export default function Showtime({ showtime }) {
  return (
    <Link to={`/assentos/${showtime.id}`}>
      <button>{showtime.name}</button>
    </Link>
  );
}
