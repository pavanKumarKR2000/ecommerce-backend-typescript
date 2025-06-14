import {
  integer,
  pgTable,
  timestamp,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { cartTable } from "./cart.schema";
import { productTable } from "./product.schema";

export const cartItemTable = pgTable("cartItems", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cartId: integer("cart_id")
    .references(() => cartTable.id)
    .notNull(),
  productId: integer("product_id")
    .references(() => productTable.id)
    .notNull(),
  quantity: integer().notNull(),
  total: doublePrecision().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
