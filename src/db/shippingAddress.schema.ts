import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { userTable } from "./user.schema";

export const shippingAddressTable = pgTable("shipping_addresses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar({ length: 255 }).notNull(),
  address: text("address").notNull(),
  state: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 255 }).notNull(),
  postalCode: integer("postal_code").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
