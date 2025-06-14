import {
  boolean,
  integer,
  pgTable,
  timestamp,
  text,
  varchar,
  doublePrecision,
  numeric,
} from "drizzle-orm/pg-core";

export const productTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text("description"),
  price: doublePrecision().notNull(),
  inStock: boolean("in_stock").default(true),
  category: varchar({ length: 255 }).notNull(),
  rating: numeric("rating", { precision: 2, scale: 1 }),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
});
