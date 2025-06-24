import express from "express";
import {
  createShippingAddress,
  getShippingAddressesOfUser,
  updateShippingAddress,
} from "../controllers/shippingAddress.controller";
import {
  createShippingAddressSchema,
  updateShippingAddressSchema,
} from "../validators/shippingAddress.validator";
import { validateDataMiddleware } from "../middlewares/validateData.middleware";
import { authenticateToken } from "../middlewares/auth.middleware";

const shippingAddressRouter = express.Router();

shippingAddressRouter.post(
  "/",
  authenticateToken,
  validateDataMiddleware(createShippingAddressSchema),
  createShippingAddress,
);
shippingAddressRouter.get("/", authenticateToken, getShippingAddressesOfUser);
shippingAddressRouter.put(
  "/:id",
  authenticateToken,
  validateDataMiddleware(updateShippingAddressSchema),
  updateShippingAddress,
);

export default shippingAddressRouter;
