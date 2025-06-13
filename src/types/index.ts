import {
  signInUserSchema,
  signUpUserSchema,
} from "../validators/user.validator";
import { z } from "zod";
export type signUpUserRequestBodyType = z.infer<typeof signUpUserSchema>;
export type signInUserRequestBodyType = z.infer<typeof signInUserSchema>;
export type JWTPayload = {
  userId: number;
  iat: number | undefined;
  exp: number | undefined;
};
