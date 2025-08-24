import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signJwt } from "../utils/jwt.js";
const prisma = new PrismaClient();
const r = Router();

// Example route
r.get("/", (req, res) => {
  res.send("Auth route works!");
});

// Register & Login
r.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, passwordHash: hash, role: role ?? "CUSTOMER" }});
  res.json({ id: user.id });
});

r.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email }});
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return res.status(401).json({ message: "Invalid credentials" });
  const token = signJwt({ sub: user.id, role: user.role, name: user.name, email: user.email });
  res.json({ token, role: user.role });
});

export default r;
