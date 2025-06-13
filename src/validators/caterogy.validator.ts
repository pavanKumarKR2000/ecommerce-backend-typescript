import { z } from "zod";

export const productCategorySchema = z.enum(
  [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Beauty & Personal Care",
    "Toys & Games",
    "Sports & Outdoors",
    "Automotive",
    "Health & Wellness",
    "Books, Movies & Music",
    "Office Supplies",
    "Pet Supplies",
    "Jewelry & Accessories",
    "Grocery & Gourmet Food",
    "Baby Products",
    "Tools & Home Improvement",
    "Furniture",
    "Party Supplies",
    "Watches",
    "Luggage & Bags",
    "Art & Craft Supplies",
  ],
  {
    required_error: "Product category is required",
    invalid_type_error: "Product category is invalid",
  },
);

export type ProductCategory = z.infer<typeof productCategorySchema>;
