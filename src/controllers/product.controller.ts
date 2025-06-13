import { Request, Response } from "express";
import { db } from "../db/index.js";
import { productsTable } from "../db/product.schema.js";
import { eq } from "drizzle-orm";

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, inStock, category, image } = req.body;

  res.status(200).json({
    success: true,
    message: "Product created successfully!",
    data: null,
  });
};

export const getProducts = async (_: Request, res: Response) => {
  try {
    const products = await db.select().from(productsTable);
    res.status(200).json({ success: true, message: "", data: products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product) {
      res.status(404).json({
        success: false,
        message: `Product with id ${id} does not exist`,
        data: null,
      });
    } else {
      res.status(200).json({ success: true, message: "", data: product });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, inStock, category, image } = req.body;

  try {
    const [product] = await db
      .update(productsTable)
      .set({ name, description, price, inStock, category, image })
      .where(eq(productsTable.id, Number(id)))
      .returning();

    if (!product) {
      res.status(404).json({
        success: false,
        message: `Product with id ${id} does not exist`,
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Product with id ${id} updated successfully`,
        data: product,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const products = await db.select().from(productsTable);
    res.status(200).json({ success: true, message: "", data: products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};
