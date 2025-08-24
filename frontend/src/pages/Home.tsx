import { useEffect, useState } from "react";
import http from "../api/http";
import { Link } from "react-router-dom";

type TicketType = { name: string };
type Event = {
  id: number;
  name: string;
  city: string;
  venue: string;
  startTime: string;
  endTime: string;
  coverImage?: string;
  ticketTypes?: TicketType[];
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    http.get("/events/current").then((r) => setEvents(r.data));
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-heading">Sự kiện nổi bật</h2>
      <div className="home-grid">
        {events.map((e) => (
          <div key={e.id} className="home-card">
            {e.coverImage && <img src={e.coverImage} alt={e.name} className="home-image" />}
            <h3 className="home-title">{e.name}</h3>
            <p className="home-meta">
              {e.city} • {new Date(e.startTime).toLocaleString()}
            </p>
            <p className="home-tickets">
              {e.ticketTypes?.map((t) => t.name).join(", ")}
            </p>
            <Link to={`/events/${e.id}`} className="home-link">
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
