import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/auth.js";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();
const r = Router();

r.post("/", requireAuth, async (req: any, res) => {
  const { eventId, items, paymentMethod } = req.body; // items: [{ticketTypeId, qty}]
  const tt = await prisma.ticketType.findMany({ where: { id: { in: items.map((i:any)=>i.ticketTypeId) } } });
  // check tồn kho
  for (const i of items) {
    const t = tt.find((x: typeof tt[0]) => x.id === i.ticketTypeId)!;
    if (t.sold + i.qty > t.quantity) return res.status(400).json({ message: `Hết vé: ${t.name}` });
  }
  const total = tt.reduce((sum: number, t: typeof tt[0]) => {
    const qty = items.find((i:any)=>i.ticketTypeId===t.id)?.qty || 0;
    return sum + Number(t.price) * qty;
  }, 0);

  const order = await prisma.$transaction(async (tx: PrismaClient) => {
    const o = await tx.order.create({
      data: { userId: req.user.sub, eventId, status: "PENDING", total, paymentMethod }
    });
    for (const i of items) {
      const t = tt.find((x: typeof tt[0]) => x.id === i.ticketTypeId)!;
      const oi = await tx.orderItem.create({
        data: { orderId: o.id, ticketTypeId: t.id, qty: i.qty, unitPrice: t.price }
      });
      // tạo vé (1 vé / 1 qty)
      for (let k = 0; k < i.qty; k++) {
        await tx.ticket.create({
          data: { orderItemId: oi.id, code: randomUUID() }
        });
      }
      await tx.ticketType.update({ where: { id: t.id }, data: { sold: { increment: i.qty } } });
    }
    return o;
  });

  res.json(order);
});

r.post("/:id/pay", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  // thanh toán giả lập (luôn thành công)
  const order = await prisma.order.update({ where: { id }, data: { status: "PAID" }});
  await prisma.payment.create({ data: { orderId: id, amount: order.total, provider: "FAKE", status: "SUCCESS" }});
  res.json({ ok: true });
});

export default r;
