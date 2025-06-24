import { Request, Response } from "express";
import { shippingAddressTable } from "../db/shippingAddress.schema";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";

export const createShippingAddress = async (req: Request, res: Response) => {
  const { name, address, state, city, postalCode } = req.body;
  const userId = req.user?.id as number;

  try {
    const [shippingAddress] = await db
      .insert(shippingAddressTable)
      .values({ name, address, state, city, postalCode, userId })
      .returning();

    res.status(201).json({
      success: true,
      message: "Shipping address added successfully",
      data: shippingAddress,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const getShippingAddressesOfUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const shippingAddresses = await db
      .select()
      .from(shippingAddressTable)
      .where(eq(shippingAddressTable.userId, Number(req.user?.id)));

    res.status(200).json({
      success: true,
      message: "",
      data: shippingAddresses,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const updateShippingAddress = async (req: Request, res: Response) => {};
