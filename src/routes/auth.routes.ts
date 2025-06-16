import express from "express";
import {
  getCurrentUser,
  logOutController,
  signInController,
  signUpController,
} from "../controllers/auth.controller.js";
import { validateDataMiddleware } from "../middlewares/validateData.middleware.js";
import {
  signInUserSchema,
  signUpUserSchema,
} from "../validators/user.validator.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

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

authRouter.post("/log-out", authenticateToken, logOutController);

authRouter.get("/me", getCurrentUser);

export default authRouter;
