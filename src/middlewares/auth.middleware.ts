import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { usersTable } from "../db/user.schema.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { JWTPayload } from "../types/index.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: number; role: string };
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized", data: null });
  } else {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as any;

      const [currentUser] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, Number(userId)));

      req.user = { id: Number(userId), role: currentUser.role as string };

      next();
    } catch (err) {
      res
        .status(400)
        .json({ success: false, message: "Invalid token", data: null });
    }
  }
};
