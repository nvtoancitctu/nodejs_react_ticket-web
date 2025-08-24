import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function run() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@local.dev" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@local.dev",
      passwordHash: await bcrypt.hash("Admin@123", 10),
      role: "ADMIN",
    },
  });

  const orgUser = await prisma.user.upsert({
    where: { email: "org@local.dev" },
    update: {},
    create: {
      name: "Organizer Demo",
      email: "org@local.dev",
      passwordHash: await bcrypt.hash("Org@123", 10),
      role: "ORGANIZER",
      organizerProfile: { create: { companyName: "Demo Co", verified: true } },
    },
  });

  const event = await prisma.event.create({
    data: {
      organizerId: orgUser.id,
      name: "Live Show Acoustic",
      category: "Music",
      description: "Đêm nhạc ấm áp",
      venue: "Nhà hát A",
      city: "HCMC",
      startTime: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      endTime: new Date(
        Date.now() + 7 * 24 * 3600 * 1000 + 2 * 3600 * 1000
      ),
      status: "PUBLISHED",
      ticketTypes: {
        create: [
          { name: "Early Bird", price: "150000", quantity: 100 },
          { name: "Standard", price: "250000", quantity: 300 },
        ],
      },
    },
  });

  console.log({ admin, orgUser, event });
}

run().finally(() => prisma.$disconnect());
