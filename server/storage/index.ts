import { 
  type User, 
  type InsertUser,
  type Category,
  type InsertCategory,
  type Card,
  type InsertCard 
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getAllCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Card methods
  getAllCards(): Promise<Card[]>;
  getCardsByCategory(categoryId: number): Promise<Card[]>;
  createCard(card: InsertCard): Promise<Card>;
}

export { MemStorage } from './memory';
export type { User, InsertUser, Category, InsertCategory, Card, InsertCard }; 