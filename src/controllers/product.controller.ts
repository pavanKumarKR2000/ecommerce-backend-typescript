import { Request, Response } from "express";
import { db } from "../db/index.js";
import { productTable } from "../db/product.schema.js";
import { eq } from "drizzle-orm";

export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    stock,
    category,
    images,
    isFeatured,
    slug,
    brand,
  } = req.body;

  try {
    const [product] = await db
      .insert(productTable)
      .values({
        name,
        description,
        price,
        stock,
        category,
        isFeatured,
        images,
        slug,
        brand,
      })
      .returning();
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let products;

    if (!category) {
      products = await db
        .select()
        .from(productTable)
        .limit(Number(limit))
        .offset(offset);
    } else {
      products = await db
        .select()
        .from(productTable)
        .where(eq(productTable.category, category as string))
        .limit(Number(limit))
        .offset(offset);
    }

    res.status(200).json({ success: true, message: "", data: products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const products = await db
      .select()
      .from(productTable)
      .where(eq(productTable.isFeatured, true))
      .limit(Number(limit))
      .offset(offset);

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
      .from(productTable)
      .where(eq(productTable.id, Number(id)));

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
  const {
    name,
    description,
    price,
    stock,
    category,
    // images,
    isFeatured,
    slug,
    brand,
  } = req.body;

  try {
    const [product] = await db
      .update(productTable)
      .set({
        name,
        description,
        price,
        stock,
        category,
        // images,
        isFeatured,
        slug,
        brand,
      })
      .where(eq(productTable.id, Number(id)))
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
  const { id } = req.params;

  try {
    const [product] = await db
      .delete(productTable)
      .where(eq(productTable.id, Number(id)))
      .returning();

    if (!product) {
      res.status(404).json({
        success: false,
        message: `Product with id ${id} does not exist`,
        data: null,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: `Product with id ${id} deleted successfully`,
      data: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};
