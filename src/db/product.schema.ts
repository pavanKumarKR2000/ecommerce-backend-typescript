import { sql } from "drizzle-orm";
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
  stock: integer().notNull().default(100),
  category: varchar({ length: 255 }).notNull(),
  rating: real().default(0),
  images: text("images")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  isFeatured: boolean("is_featured").default(false),
  slug: text("slug"),
  createdAt: timestamp("created_at").defaultNow(),
});
