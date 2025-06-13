import { z } from "zod";

export const signUpUserSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, "Minimum length of name should be 3"),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Minimum length of password should be 6"),
});

export const signInUserSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Minimum length of password should be 6"),
});
