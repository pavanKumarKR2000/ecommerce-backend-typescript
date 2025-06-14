import {
  boolean,
  doublePrecision,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const productTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text("description"),
  price: doublePrecision().notNull(),
  inStock: boolean("in_stock").default(true),
  category: varchar({ length: 255 }).notNull(),
  rating: real().default(0),
  image: text("image"),
  featured: boolean().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
