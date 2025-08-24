import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../api/http";

type TicketType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  sold: number;
};

type Event = {
  id: number;
  name: string;
  description: string;
  ticketTypes: TicketType[];
};

export default function EventDetail(){
  const { id } = useParams();
  const nav = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [qtyMap, setQtyMap] = useState<Record<number, number>>({});
  useEffect(()=>{ http.get(`/events`, { params: { id }}) ; },[id]);
  useEffect(()=>{
    http.get("/events").then(r=>{
      setEvent(r.data.find((e: Event)=> String(e.id)===String(id)));
    });
  },[id]);

  if(!event) return <div>Loading...</div>;
  return (
    <div style={{padding:24}}>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <h3>Chọn vé</h3>
      {event.ticketTypes.map((t: TicketType)=>(
        <div key={t.id} style={{display:"flex", gap:8, alignItems:"center"}}>
          <div style={{width:200}}>{t.name} - {Number(t.price).toLocaleString()}đ</div>
          <input type="number" min={0} max={t.quantity - t.sold}
            value={qtyMap[t.id]||0}
            onChange={e=>setQtyMap({...qtyMap, [t.id]: Number(e.target.value)})}/>
        </div>
      ))}
      <button onClick={()=>{
        const items = Object.entries(qtyMap)
  .filter(([, q]) => Number(q) > 0)
  .map(([ticketTypeId, qty]) => ({
    ticketTypeId: Number(ticketTypeId),
    qty: Number(qty)
  }));
        if(items.length === 0){
          alert("Chưa chọn vé");
          return;
        }
        localStorage.setItem("cart", JSON.stringify({ eventId: event.id, items }));
        nav(`/checkout/${event.id}`);
      }}>Mua vé</button>
    </div>
  )
}
