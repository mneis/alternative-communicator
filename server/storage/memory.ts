import { 
  type User, 
  type InsertUser,
  type Category,
  type InsertCategory,
  type Card,
  type InsertCard 
} from "@shared/schema";
import { IStorage } from "./index";
import { initializeDefaultData } from "./data/default-data";

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private cards: Map<number, Card>;
  
  private userCurrentId: number;
  private categoryCurrentId: number;
  private cardCurrentId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.cards = new Map();
    
    this.userCurrentId = 1;
    this.categoryCurrentId = 1;
    this.cardCurrentId = 1;
    
    // Initialize with default data
    initializeDefaultData(this);
  }

  // Private utility methods
  private createCategorySync(insertCategory: InsertCategory): Category {
    const id = this.categoryCurrentId++;
    const category: Category = { 
      ...insertCategory, 
      id,
      namePortuguese: insertCategory.namePortuguese || "",
      displayOrder: insertCategory.displayOrder || 0
    };
    this.categories.set(id, category);
    return category;
  }
  
  private createCardSync(insertCard: InsertCard): Card {
    const id = this.cardCurrentId++;
    const card: Card = { 
      ...insertCard, 
      id,
      labelPortuguese: insertCard.labelPortuguese || "",
      displayOrder: insertCard.displayOrder || 0
    };
    this.cards.set(id, card);
    return card;
  }

  // Public User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Public Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    try {
      if (!insertCategory.name) {
        throw new Error("O nome da categoria é obrigatório");
      }
      
      if (!insertCategory.icon) {
        throw new Error("O ícone da categoria é obrigatório");
      }
      
      const id = this.categoryCurrentId++;
      const category: Category = { 
        ...insertCategory, 
        id,
        namePortuguese: insertCategory.namePortuguese || "",
        displayOrder: insertCategory.displayOrder || 0
      };
      this.categories.set(id, category);
      return category;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erro ao criar categoria: ${error.message}`);
      }
      throw new Error('Erro desconhecido ao criar categoria');
    }
  }
  
  // Public Card methods
  async getAllCards(): Promise<Card[]> {
    return Array.from(this.cards.values());
  }
  
  async getCardsByCategory(categoryId: number): Promise<Card[]> {
    return Array.from(this.cards.values())
      .filter(card => card.categoryId === categoryId)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }
  
  async createCard(card: InsertCard): Promise<Card> {
    try {
      if (!card.categoryId) {
        throw new Error("O ID da categoria é obrigatório");
      }

      if (!card.label || card.label.trim().length === 0) {
        throw new Error("O rótulo do card é obrigatório");
      }

      if (!card.labelPortuguese || card.labelPortuguese.trim().length === 0) {
        throw new Error("O rótulo em português é obrigatório");
      }

      if (!card.imageUrl || !card.imageUrl.startsWith('http')) {
        throw new Error("Uma URL de imagem válida é obrigatória");
      }

      const category = this.categories.get(card.categoryId);
      if (!category) {
        throw new Error(`Categoria com ID ${card.categoryId} não encontrada`);
      }

      const id = this.cardCurrentId++;
      const newCard: Card = {
        id,
        categoryId: card.categoryId,
        label: card.label,
        labelPortuguese: card.labelPortuguese || "",
        imageUrl: card.imageUrl,
        displayOrder: card.displayOrder || 0
      };

      this.cards.set(id, newCard);
      return newCard;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erro ao criar card: ${error.message}`);
      }
      throw new Error('Erro desconhecido ao criar card');
    }
  }
} 