import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { validateDataMiddleware } from "../middlewares/validateData.middleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  authenticateToken,
  validateDataMiddleware(createProductSchema),
  createProduct,
);

productRouter.get("/", authenticateToken, getProducts);

productRouter.get("/:id", authenticateToken, getProduct);

productRouter.put(
  "/:id",
  authenticateToken,
  validateDataMiddleware(updateProductSchema),
  updateProduct,
);

productRouter.delete("/:id", authenticateToken, deleteProduct);

export default productRouter;
