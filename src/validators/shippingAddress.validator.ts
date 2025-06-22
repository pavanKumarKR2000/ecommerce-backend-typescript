import { z } from "zod";

export const createShippingAddressSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name should be a string",
    })
    .min(1, { message: "Name is required" })
    .trim(),
  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address should be a string",
    })
    .min(1, { message: "Address is required" })
    .trim(),
  state: z
    .string({
      required_error: "State is required",
      invalid_type_error: "State should be a string",
    })
    .min(1, { message: "State is required" })
    .trim(),
  city: z
    .string({
      required_error: "City is required",
      invalid_type_error: "City should be a string",
    })
    .min(1, { message: "City is required" })
    .trim(),
  postalCode: z
    .number({
      required_error: "Postal code is required",
      invalid_type_error: "Postal code should be a number",
    })
    .min(1, { message: "Postal code is required" }),
});

export const updateShippingAddressSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name should be a string",
    })
    .min(1, { message: "Name is required" })
    .trim(),
  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address should be a string",
    })
    .min(1, { message: "Address is required" })
    .trim(),
  state: z
    .string({
      required_error: "State is required",
      invalid_type_error: "State should be a string",
    })
    .min(1, { message: "State is required" })
    .trim(),
  city: z
    .string({
      required_error: "City is required",
      invalid_type_error: "City should be a string",
    })
    .min(1, { message: "City is required" })
    .trim(),
  postalCode: z
    .number({
      required_error: "Postal code is required",
      invalid_type_error: "Postal code should be a number",
    })
    .min(1, { message: "Postal code is required" }),
});
