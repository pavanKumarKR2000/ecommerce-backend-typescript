import { Request, Response } from "express";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { cartItemTable } from "../db/cartItem.schema.js";
import { cartTable } from "../db/cart.schema.js";
import { productTable } from "../db/product.schema.js";

export const addCartItem = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  let total = 0;

  try {
    const [cart] = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.userId, Number(req.user?.id)));

    const [product] = await db
      .select()
      .from(productTable)
      .where(eq(productTable.id, Number(productId)));

    if (!product) {
      res.status(404).json({
        success: false,
        message: `Product with id ${productId} does not exist`,
        data: null,
      });

      return;
    }

    total = product.price * quantity;

    const [cartItem] = await db
      .insert(cartItemTable)
      .values({
        productId: Number(productId),
        quantity: Number(quantity),
        cartId: cart.id,
        total,
      })
      .returning();

    res.status(201).json({ success: true, message: "", data: cartItem });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const getCartItems = async (req: Request, res: Response) => {
  try {
    const cartItems = await db.select().from(cartItemTable);

    res.status(200).json({ success: true, message: "", data: cartItems });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;
  let total = 0;

  try {
    const [cart] = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.userId, Number(req.user?.id)));

    const [product] = await db
      .select()
      .from(productTable)
      .where(eq(productTable.id, Number(productId)));

    if (!product) {
      res.status(404).json({
        success: false,
        message: `Product with id ${productId} does not exist`,
        data: null,
      });

      return;
    }

    total = product.price * quantity;

    const [cartItem] = await db
      .update(cartItemTable)
      .set({
        productId: Number(productId),
        quantity: Number(quantity),
        cartId: cart.id,
        total,
      })
      .where(eq(cartItemTable.id, Number(id)))
      .returning();

    res.status(200).json({ success: true, message: "", data: cartItem });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [cartItem] = await db
      .select()
      .from(cartItemTable)
      .where(eq(cartItemTable.id, Number(id)));

    if (!cartItem) {
      res.status(404).json({
        success: false,
        message: `Cart item with id ${id} does not exist`,
        data: null,
      });
      return;
    }

    await db
      .delete(cartItemTable)
      .where(eq(cartItemTable.id, Number(id)))
      .returning();

    res.status(200).json({
      success: true,
      message: `Cart item with id ${id} deleted successfully`,
      data: null,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};
