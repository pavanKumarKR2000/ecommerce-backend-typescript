import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";

export const cartTable = pgTable("carts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .references(() => userTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
