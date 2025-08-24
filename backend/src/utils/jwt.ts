import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET!;
export const signJwt = (payload: object) => jwt.sign(payload, secret, { expiresIn: "7d" });
export const verifyJwt = (token: string) => jwt.verify(token, secret);
