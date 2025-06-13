import {
  boolean,
  integer,
  pgTable,
  timestamp,
  text,
  varchar,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text("description"),
  price: doublePrecision().notNull(),
  inStock: boolean("in_stock").default(true),
  category: varchar({ length: 255 }).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
});
