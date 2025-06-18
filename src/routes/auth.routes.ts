import express from "express";
import {
  getCurrentUser,
  signInController,
  signOutController,
  signUpController,
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validateDataMiddleware } from "../middlewares/validateData.middleware.js";
import {
  signInUserSchema,
  signUpUserSchema,
} from "../validators/user.validator.js";

const authRouter = express.Router();

authRouter.post(
  "/sign-up",
  validateDataMiddleware(signUpUserSchema),
  signUpController,
);

authRouter.post(
  "/sign-in",
  validateDataMiddleware(signInUserSchema),
  signInController,
);

authRouter.post("/sign-out", authenticateToken, signOutController);

authRouter.get("/me", getCurrentUser);

export default authRouter;
