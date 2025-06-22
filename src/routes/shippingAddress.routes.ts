import express from "express";
import {
  createShippingAddress,
  getShippingAddressesOfUser,
  updateShippingAddress,
} from "../controllers/shippingAddress.controller";

const shippingAddressRouter = express.Router();

shippingAddressRouter.post("/", createShippingAddress);
shippingAddressRouter.get("/", getShippingAddressesOfUser);
shippingAddressRouter.put("/:id", updateShippingAddress);

export default shippingAddressRouter;
