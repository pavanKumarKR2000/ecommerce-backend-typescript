import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: [
    "./src/db/user.schema.ts",
    "./src/db/product.schema.ts",
    "./src/db/cart.schema.ts",
    "./src/db/cartItem.schema.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
