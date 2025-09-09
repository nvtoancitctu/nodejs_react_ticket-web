import { useEffect, useState } from "react";
import { Calendar, MapPin /*Ticket, User*/ } from "lucide-react";
import http from "../api/http";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/vi";

dayjs.extend(utc);
dayjs.locale("vi");

type TicketType = { name: string };
type Organizer = { name: string };
type Event = {
  id: number;
  name: string;
  city: string;
  venue: string;
  startTime: string;
  endTime: string;
  coverImage?: string;
  ticketTypes?: TicketType[];
  organizer?: Organizer;
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    http.get("/events/current").then((r) => {
      console.log("Events from API:", r.data);
      setEvents(r.data);
    });
  }, []);

  const capitalizeFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const formatTimeRangeUTC = (start?: string, end?: string) => {
    if (!start || !end) return "Thời gian chưa xác định";

    // parse as UTC
    const s = dayjs.utc(start);
    const e = dayjs.utc(end);

    // weekday bằng tiếng Việt (ví dụ "thứ bảy") -> viết hoa chữ đầu -> "Thứ bảy"
    const weekday = capitalizeFirst(s.format("dddd"));

    return `${s.format("HH:mm")} - ${e.format("HH:mm")} • ${weekday}, ${s.format("DD/MM/YYYY")}`;
  };

  return (
    <div className="mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🎉 Sự kiện nổi bật</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {events.map((e) => (
          <div key={e.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
            {e.coverImage && <img src={e.coverImage} alt={e.name} className="h-48 w-full object-cover" />}

            <div className="p-4 flex-1 flex flex-col">
              {/* Tên sự kiện */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{e.name}</h3>

              <div className="grid grid-cols-[auto_1fr] gap-2 text-sm text-gray-600">
                {/* Thời gian */}
                <Calendar className="text-gray-500" size={18} />
                <p className="font-bold text-green-600">{formatTimeRangeUTC(e.startTime, e.endTime)}</p>

                {/* Địa điểm */}
                <MapPin className="text-gray-500" size={18} />
                <div>
                  <p className="font-bold text-green-600">{e.venue}</p>
                  <p className="text-gray-500">{e.city}</p>
                </div>

                {/* Nhà tổ chức */}
                {/* <User className="w-4 h-4 text-gray-500 mt-1" aria-label="Nhà tổ chức" />
                <p className="font-bold text-green-600">{e.organizer?.name || "Chưa có"}</p> */}

                {/* Loại vé */}
                {/* {e.ticketTypes && e.ticketTypes.length > 0 && (
                  <>
                    <Ticket className="w-4 h-4 text-gray-500 mt-1" aria-label="Loại vé" />
                    <span className="break-words font-bold text-green-600">{e.ticketTypes.map((t) => t.name).join(", ")}</span>
                  </>
                )} */}
              </div>

              {/* Nút chi tiết */}
              <Link to={`/events/${e.id}`} className="mt-3 inline-block bg-blue-600 text-white text-sm text-center px-4 py-2 rounded-xl hover:bg-blue-700 transition">
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
