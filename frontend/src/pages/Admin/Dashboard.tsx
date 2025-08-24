import { useEffect, useState } from "react";
import http from "../../api/http";

export default function Dashboard(){
  type DashboardStats = {
    totalUsers: number;
    totalEvents: number;
    totalOrders: number;
    revenue: number;
  };
  const [data, setData] = useState<DashboardStats | null>(null);
  useEffect(()=>{ http.get("/admin/stats").then(r=>setData(r.data)); },[]);
  if(!data) return <div>Loading...</div>;
  return (
    <div style={{padding:24}}>
      <h2>Admin Dashboard</h2>
      <div>Tổng user: {data.totalUsers}</div>
      <div>Tổng event: {data.totalEvents}</div>
      <div>Đơn đã thanh toán: {data.totalOrders}</div>
      <div>Doanh thu: {Number(data.revenue).toLocaleString()}đ</div>
    </div>
  )
}
