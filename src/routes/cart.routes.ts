import express from "express";
import {
  addCartItem,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../controllers/cart.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { validateDataMiddleware } from "../middlewares/validateData.middleware";
import {
  createCartItemSchema,
  updateCartItemSchema,
} from "../validators/cartItem.validator";

const cartRouter = express.Router();

cartRouter.post(
  "/items",
  authenticateToken,
  validateDataMiddleware(createCartItemSchema),
  addCartItem,
);

cartRouter.get("/items", authenticateToken, getCartItems);

cartRouter.put(
  "/items/:id",
  authenticateToken,
  validateDataMiddleware(updateCartItemSchema),
  updateCartItem,
);

cartRouter.delete("/items/:id", authenticateToken, deleteCartItem);

export default cartRouter;
