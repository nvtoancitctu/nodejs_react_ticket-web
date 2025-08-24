import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth, requireRole } from "../middleware/auth.js";
const prisma = new PrismaClient();
const r = Router();

// Public: list/search
r.get("/current", async (req, res) => {
  const now = new Date();
  const events = await prisma.event.findMany({
    where: {
      status: "PUBLISHED",
      startTime: { lte: now },
      endTime: { gte: now },
    },
    orderBy: { startTime: "asc" },
    include: { ticketTypes: true },
  });
  res.json(events);
});

// Organizer: CRUD
r.post("/", requireAuth, requireRole("ORGANIZER", "ADMIN"), async (req: any, res) => {
  const { name, category, description, venue, city, startTime, endTime, ticketTypes } = req.body;
  const organizerId = req.user.sub;
  const event = await prisma.event.create({
    data: {
      organizerId,
      name, category, description, venue, city,
      startTime: new Date(startTime), endTime: new Date(endTime),
      status: "DRAFT",
      ticketTypes: { create: ticketTypes || [] }
    }
  });
  res.json(event);
});

r.patch("/:id/publish", requireAuth, requireRole("ORGANIZER","ADMIN"), async (req: any, res) => {
  const id = Number(req.params.id);
  const event = await prisma.event.update({ where: { id }, data: { status: "PUBLISHED" }});
  res.json(event);
});

export default r;
