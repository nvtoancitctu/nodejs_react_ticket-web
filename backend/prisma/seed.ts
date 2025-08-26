import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1️⃣ USERS
  const passwordHash = await bcrypt.hash("123456", 10);

  // 2️⃣ ORGANIZER PROFILE
  await prisma.organizerProfile.createMany({
    data: [
      { userId: 6, companyName: "EventMaster Co.", taxCode: "123456789", verified: true },
      { userId: 7, companyName: "FunEvents Ltd.", taxCode: "987654321", verified: false },
    ],
  });
  console.log("Organizer profiles created");

  // 3️⃣ EVENTS
  await prisma.event.createMany({
    data: [
      {
        organizerId: 6,
        name: "Nhac hoi rock",
        category: "Nhạc",
        description: "Đêm nhạc rock đầy sôi động",
        venue: "San khau Lan Anh",
        city: "Ho Chi Minh",
        startTime: new Date("2025-09-15T19:00:00"),
        endTime: new Date("2025-09-15T22:00:00"),
        status: "PUBLISHED",
        coverImage: "rock.jpg",
        updatedAt: new Date(),
      },
      {
        organizerId: 6,
        name: "Workshop Coding",
        category: "Giáo dục",
        description: "Học lập trình với chuyên gia",
        venue: "TechHub",
        city: "Ho Chi Minh",
        startTime: new Date("2025-09-20T08:00:00"),
        endTime: new Date("2025-09-20T12:00:00"),
        status: "DRAFT",
        coverImage: "coding.jpg",
        updatedAt: new Date(),
      },
      {
        organizerId: 7,
        name: "Festival Ẩm thực",
        category: "Ẩm thực",
        description: "Thưởng thức món ngon từ nhiều nơi",
        venue: "Công viên Tao Đàn",
        city: "Ho Chi Minh",
        startTime: new Date("2025-09-25T10:00:00"),
        endTime: new Date("2025-09-25T20:00:00"),
        status: "PUBLISHED",
        coverImage: "foodfest.jpg",
        updatedAt: new Date(),
      },
    ],
  });
  console.log("Events created");

  // 4️⃣ TICKET TYPES
  await prisma.ticketType.createMany({
    data: [
      { eventId: 6, name: "Vé thường", price: 200000, quantity: 100, sold: 0, isSeatMap: false },
      { eventId: 6, name: "Vé VIP", price: 500000, quantity: 50, sold: 0, isSeatMap: false },
      { eventId: 7, name: "Vé tham dự", price: 100000, quantity: 30, sold: 0, isSeatMap: false },
      { eventId: 7, name: "Vé người lớn", price: 150000, quantity: 200, sold: 0, isSeatMap: false },
      { eventId: 7, name: "Vé trẻ em", price: 80000, quantity: 100, sold: 0, isSeatMap: false },
    ],
  });
  console.log("Ticket types created");

  console.log("✅ Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
