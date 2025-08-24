import { create } from "zustand";
type Role = "CUSTOMER"|"ORGANIZER"|"ADMIN" | null;
type State = { token: string|null; role: Role; setAuth: (t:string,r:Role)=>void; logout: ()=>void; };
export const useAuth = create<State>(set=>({
  token: localStorage.getItem("token"),
  role: (localStorage.getItem("role") as Role) || null,
  setAuth: (t,r)=>{ localStorage.setItem("token", t); localStorage.setItem("role", r!); set({token:t, role:r}); },
  logout: ()=>{ localStorage.clear(); set({token:null, role:null}); }
}));
