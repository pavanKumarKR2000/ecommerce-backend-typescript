import { Request, Response } from "express";
import { userTable } from "../db/user.schema.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getToken } from "../lib/utils.js";
import { cartTable } from "../db/cart.schema.js";

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
      const [user] = await db.insert(userTable).values(newUser).returning();
      await db.insert(cartTable).values({ userId: user.id });
      const accessToken = jwt.sign(
        { userId: user.id },
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
        message: "User sign up successful",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
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

  try {
    const [existingUser] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!existingUser) {
      res
        .status(404)
        .json({ success: false, message: "User not found", data: null });
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
          message: "User sign in successful",
          data: {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
          },
        });
      }
    }
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const token = getToken(req);

  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized", data: null });
  } else {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as any;

      const [currentUser] = await db
        .select({
          id: userTable.id,
          name: userTable.name,
          email: userTable.email,
          role: userTable.role,
        })
        .from(userTable)
        .where(eq(userTable.id, Number(userId)));

      if (!currentUser) {
        res
          .status(401)
          .json({ success: false, message: "User not found", data: null });
      } else {
        res.status(200).json({
          success: true,
          message: "",
          data: currentUser,
        });
      }
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error", data: null });
    }
  }
};

export const signOutController = (_: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.status(201).json({
    success: true,
    message: "User log out successful",
    data: null,
  });
};
