CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text,
	"price" double precision NOT NULL,
	"in_stock" boolean DEFAULT true,
	"category" varchar(255) NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now()
);
