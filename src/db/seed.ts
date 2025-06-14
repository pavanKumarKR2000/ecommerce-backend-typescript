import bcrypt from "bcrypt";
import { db } from "../db/index.js";
import { productTable } from "../db/product.schema.js";
const seedProducts = [
  {
    name: "Tshirt",
    description: "Tshirt description",
    price: 450,
    inStock: true,
    category: "Fashion",
    image: "",
  },
  {
    name: "Laptop",
    description: "Laptop description",
    price: 80000,
    inStock: true,
    category: "Electronics",
    image: "",
  },
  {
    name: "Cap",
    description: "Cap description",
    price: 120,
    inStock: true,
    category: "Fashion",
    image: "",
  },
  {
    name: "Bottle",
    description: "Bottle description",
    price: 40,
    inStock: true,
    category: "Home & Garden",
    image: "",
  },
  {
    name: "Phone",
    description: "Phone description",
    price: 20000,
    inStock: true,
    category: "Electronics",
    image: "",
  },
];

const seedUsers = [
  {
    name: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
  {
    name: "user",
    email: "user@example.com",
    password: bcrypt.hashSync("user123", 10),
    role: "user",
  },
];

export const seedDB = async () => {
  try {
    // await db.insert(usersTable).values(seedUsers);

    await db.insert(productTable).values(seedProducts);
    console.log("database seeded successfully!");
  } catch (error) {
    console.log(error);
    console.log("Unable to seed database!");
  }
};
