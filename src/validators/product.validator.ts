// src/productSchema.ts
import { z } from "zod";
import { productCategorySchema } from "./caterogy.validator";

export const createProductSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name should be a string",
    })
    .min(1, { message: "Name is required" })
    .trim(),
  description: z.string().optional(),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price should be a number",
    })
    .positive({ message: "Price must be a positive number" }),
  stock: z.number({
    required_error: "Stock is required",
    invalid_type_error: "Stock should be a number",
  }),
  category: productCategorySchema,
  images: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
  slug: z.string({
    required_error: "Slug is required",
    invalid_type_error: "Slug should be a string",
  }),
  brand: z.string({
    required_error: "Brand is required",
    invalid_type_error: "Brand should be a string",
  }),
});

export const updateProductSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name should be a string",
    })
    .min(1, { message: "Name is required" })
    .trim(),
  description: z.string().optional(),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price should be a number",
    })
    .positive({ message: "Price must be a positive number" }),
  stock: z.number({
    required_error: "Stock is required",
    invalid_type_error: "Stock should be a number",
  }),
  category: productCategorySchema,
  // images: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
  slug: z.string({
    required_error: "Slug is required",
    invalid_type_error: "Slug should be a string",
  }),
  brand: z.string({
    required_error: "Brand is required",
    invalid_type_error: "Brand should be a string",
  }),
});
