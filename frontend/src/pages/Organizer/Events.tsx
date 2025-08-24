import { useEffect, useState } from "react";
import http from "../../api/http";
import { Link } from "react-router-dom";

type Event = {
  id: number;
  name: string;
  status: string;
};

export default function Events(){
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(()=>{ http.get("/events").then(r=> setEvents(r.data)); },[]);
  return (
    <div style={{padding:24}}>
      <h2>Organizer - Sự kiện</h2>
      <Link to="/organizer/new">Tạo sự kiện</Link>
      <ul>
        {events.map(e=> <li key={e.id}>{e.name} - {e.status}</li>)}
      </ul>
    </div>
  )
}
