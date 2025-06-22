import { z } from "zod";

export const createCartItemSchema = z.object({
  productId: z.number({
    required_error: "Product ID is required",
    invalid_type_error: "Product ID  should be a number",
  }),
  quantity: z.number({
    required_error: "Quantity is required",
    invalid_type_error: "Quantity should be a number",
  }),
});

export const updateCartItemSchema = z.object({
  productId: z.number({
    required_error: "Product ID is required",
    invalid_type_error: "Product ID  should be a number",
  }),
  quantity: z.number({
    required_error: "Quantity is required",
    invalid_type_error: "Quantity should be a number",
  }),
});
