import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth, requireRole } from "../middleware/auth.js";
const prisma = new PrismaClient();
const r = Router();

r.get("/stats", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const totalUsers = await prisma.user.count();
  const totalEvents = await prisma.event.count();
  const totalOrders = await prisma.order.count({ where: { status: "PAID" }});
  const revenue = await prisma.payment.aggregate({ _sum: { amount: true }});
  res.json({ totalUsers, totalEvents, totalOrders, revenue: revenue._sum.amount || 0 });
});

export default r;
