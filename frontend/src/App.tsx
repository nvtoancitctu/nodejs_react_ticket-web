import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
//import Checkout from "./pages/Checkout";
import Events from "./pages/Organizer/Events";
import NewEvent from "./pages/Organizer/NewEvent";
import Dashboard from "./pages/Admin/Dashboard";
import { useAuth } from "./store/auth";

function Guard({ roles, children }: { roles?: string[], children: React.ReactNode }) {
  const role = useAuth(s=>s.role);
  if (!role) return <Navigate to="/" replace />;
  if (roles && !roles.includes(role)) return <Navigate to="/" replace />;
  return children;
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/events/:id" element={<EventDetail/>}/>
        {/* <Route path="/checkout/:id" element={<Checkout/>}/> */}
        <Route path="/organizer" element={<Guard roles={["ORGANIZER","ADMIN"]}><Events/></Guard>} />
        <Route path="/organizer/new" element={<Guard roles={["ORGANIZER","ADMIN"]}><NewEvent/></Guard>} />
        <Route path="/admin" element={<Guard roles={["ADMIN"]}><Dashboard/></Guard>} />
      </Routes>
    </BrowserRouter>
  )
}
