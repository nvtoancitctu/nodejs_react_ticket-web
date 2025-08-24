import { useState } from "react";
import http from "../../api/http";
import { useNavigate } from "react-router-dom";

type TicketType = {
  name: string;
  price: number;
  quantity: number;
};

type EventForm = {
  name: string;
  venue: string;
  city: string;
  startTime: string;
  endTime: string;
  ticketTypes: TicketType[];
};

export default function NewEvent(){
  const nav = useNavigate();
  const [form, setForm] = useState<EventForm>({
    name:"", venue:"", city:"", startTime:"", endTime:"",
    ticketTypes: [{ name:"Standard", price:250000, quantity:100 }]
  });
  return (
    <div style={{padding:24}}>
      <h3>Tạo sự kiện mới</h3>
      <input placeholder="Tên" onChange={e=>setForm({...form, name:e.target.value})}/>
      <input placeholder="Địa điểm" onChange={e=>setForm({...form, venue:e.target.value})}/>
      <input placeholder="Thành phố" onChange={e=>setForm({...form, city:e.target.value})}/>
      <input type="datetime-local" onChange={e=>setForm({...form, startTime:e.target.value})}/>
      <input type="datetime-local" onChange={e=>setForm({...form, endTime:e.target.value})}/>
      <button onClick={async ()=>{
        await http.post("/events", form);
        alert("Đã tạo, đang ở trạng thái DRAFT");
        nav("/organizer");
      }}>Lưu</button>
    </div>
  )
}
