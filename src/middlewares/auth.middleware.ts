import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../db/index.js";
import { userTable } from "../db/user.schema.js";
import { getToken } from "../lib/utils.js";

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
  const token = getToken(req);

  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized", data: null });
  } else {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as any;

      const [currentUser] = await db
        .select()
        .from(userTable)
        .where(eq(userTable.id, Number(userId)));

      req.user = { id: currentUser.id, role: currentUser.role as string };

      next();
    } catch (err) {
      res
        .status(400)
        .json({ success: false, message: "Invalid token", data: null });
    }
  }
};
