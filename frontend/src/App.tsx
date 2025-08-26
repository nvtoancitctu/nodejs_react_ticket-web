import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import Events from "./pages/Organizer/Events";
import NewEvent from "./pages/Organizer/NewEvent";
import Dashboard from "./pages/Admin/Dashboard";
import { useAuth } from "./store/auth";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Layout chung có Header
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

// Guard component
function Guard({ roles, children }: { roles?: string[]; children: React.ReactNode }) {
  const role = useAuth((s) => s.role);
  if (!role) return <Navigate to="/" replace />;
  if (roles && !roles.includes(role)) return <Navigate to="/" replace />;
  return children;
}

// HOC để wrap nhanh với Guard + Layout
function withGuard(Component: React.FC, roles?: string[]) {
  return (
    <Guard roles={roles}>
      <Layout>
        <Component />
      </Layout>
    </Guard>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/events/:id"
          element={
            <Layout>
              <EventDetail />
            </Layout>
          }
        />
        {/* <Route path="/checkout/:id" element={<Layout><Checkout /></Layout>} /> */}

        {/* Organizer */}
        <Route path="/organizer" element={withGuard(Events, ["ORGANIZER", "ADMIN"])} />
        <Route path="/organizer/new" element={withGuard(NewEvent, ["ORGANIZER", "ADMIN"])} />

        {/* Admin */}
        <Route path="/admin" element={withGuard(Dashboard, ["ADMIN"])} />
      </Routes>
    </BrowserRouter>
  );
}
