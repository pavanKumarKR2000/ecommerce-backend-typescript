ALTER TABLE "products" RENAME COLUMN "image" TO "images";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "stock" integer DEFAULT 100 NOT NULL;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "in_stock";