import { pgTable, text, serial, integer, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Categories table for different communication board types
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  namePortuguese: text("name_portuguese"),
  icon: text("icon").notNull(), // Material icon name
  displayOrder: integer("display_order").notNull().default(0),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  namePortuguese: true,
  icon: true,
  displayOrder: true,
});

// Communication cards table
export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  label: text("label").notNull(),
  labelPortuguese: text("label_portuguese"),
  imageUrl: text("image_url").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
});

export const insertCardSchema = createInsertSchema(cards).pick({
  categoryId: true,
  label: true,
  labelPortuguese: true,
  imageUrl: true,
  displayOrder: true,
});

// User schemas (for authentication later)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Define types
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Card = typeof cards.$inferSelect;
export type InsertCard = z.infer<typeof insertCardSchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
