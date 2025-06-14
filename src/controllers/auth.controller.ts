import { Request, Response } from "express";
import { userTable } from "../db/user.schema.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const [existingUser] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (existingUser) {
      res
        .status(400)
        .json({ status: false, message: "Email already exists", data: null });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { name, email, password: hashedPassword };
      console.log("new user", newUser);
      const [a] = await db.insert(userTable).values(newUser).returning();
      const accessToken = jwt.sign({ userId: a.id }, process.env.JWT_SECRET!, {
        expiresIn: `${24 * 30}h`,
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true, // Prevent client-side access
        secure: true, // Only send over HTTPS
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 3600000 * 24 * 30, // 1 hour in milliseconds
      });

      res.status(201).json({
        success: true,
        message: "User sign up successful!",
        data: null,
      });
    }
  } catch (error) {
    console.log("error", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const [existingUser] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  if (!existingUser) {
    res
      .status(404)
      .json({ success: false, message: "User not found!", data: null });
  } else {
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isValidPassword) {
      res
        .status(400)
        .json({ success: false, message: "Invalid credentials", data: null });
    } else {
      const accessToken = jwt.sign(
        { userId: existingUser.id },
        process.env.JWT_SECRET!,
        {
          expiresIn: `${24 * 30}h`,
        },
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true, // Prevent client-side access
        secure: true, // Only send over HTTPS
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 3600000 * 24 * 30, // 1 hour in milliseconds
      });

      res.status(201).json({
        success: true,
        message: "User sign in successful!",
        data: null,
      });
    }
  }
};

export const logOutController = (_: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.status(201).json({
    success: true,
    message: "User log out successful!",
    data: null,
  });
};
