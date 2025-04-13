import { 
  users, 
  categories, 
  cards,
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
    this.initializeDefaultData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).sort((a, b) => a.displayOrder - b.displayOrder);
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Card methods
  async getAllCards(): Promise<Card[]> {
    return Array.from(this.cards.values());
  }
  
  async getCardsByCategory(categoryId: number): Promise<Card[]> {
    return Array.from(this.cards.values())
      .filter(card => card.categoryId === categoryId)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }
  
  async createCard(insertCard: InsertCard): Promise<Card> {
    const id = this.cardCurrentId++;
    const card: Card = { ...insertCard, id };
    this.cards.set(id, card);
    return card;
  }
  
  // Initialize with default data
  private initializeDefaultData() {
    // Add categories
    const basicNeeds = this.createCategorySync({
      name: "Basic Needs",
      namePortuguese: "Necessidades Básicas",
      icon: "home",
      displayOrder: 1
    });
    
    const feelings = this.createCategorySync({
      name: "Feelings",
      namePortuguese: "Sentimentos",
      icon: "emoji_emotions",
      displayOrder: 2
    });
    
    const actions = this.createCategorySync({
      name: "Actions",
      namePortuguese: "Ações",
      icon: "directions_run",
      displayOrder: 3
    });
    
    const places = this.createCategorySync({
      name: "Places",
      namePortuguese: "Lugares",
      icon: "place",
      displayOrder: 4
    });
    
    const pronouns = this.createCategorySync({
      name: "Pronouns",
      namePortuguese: "Pronomes",
      icon: "person",
      displayOrder: 5
    });
    
    // Add cards for Basic Needs
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "I want",
      labelPortuguese: "Eu quero",
      imageUrl: "https://images.unsplash.com/photo-1563557046517-f701f1e17b7e?w=200&h=200&fit=crop",
      displayOrder: 1
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "Water",
      labelPortuguese: "Água",
      imageUrl: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=200&h=200&fit=crop",
      displayOrder: 2
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "Food",
      labelPortuguese: "Comida",
      imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop",
      displayOrder: 3
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "Bathroom",
      labelPortuguese: "Banheiro",
      imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426bcf0c?w=200&h=200&fit=crop",
      displayOrder: 4
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "Help",
      labelPortuguese: "Ajuda",
      imageUrl: "https://images.unsplash.com/photo-1469571486292-b53601010376?w=200&h=200&fit=crop",
      displayOrder: 5
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "Yes",
      labelPortuguese: "Sim",
      imageUrl: "https://images.unsplash.com/photo-1693168058020-fd7445ff87df?w=200&h=200&fit=crop",
      displayOrder: 6
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "No",
      labelPortuguese: "Não",
      imageUrl: "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=200&h=200&fit=crop",
      displayOrder: 7
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "Please",
      labelPortuguese: "Por favor",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
      displayOrder: 8
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "Thank you",
      labelPortuguese: "Obrigado",
      imageUrl: "https://images.unsplash.com/photo-1516575869513-3f418f8902ca?w=200&h=200&fit=crop",
      displayOrder: 9
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "More",
      labelPortuguese: "Mais",
      imageUrl: "https://images.unsplash.com/photo-1583542225715-473a32c9b0ef?w=200&h=200&fit=crop",
      displayOrder: 10
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "Done",
      labelPortuguese: "Pronto",
      imageUrl: "https://images.unsplash.com/photo-1560785496-3c9d27877182?w=200&h=200&fit=crop",
      displayOrder: 11
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "Rest",
      labelPortuguese: "Descansar",
      imageUrl: "https://images.unsplash.com/photo-1542728928-1413d1894ed1?w=200&h=200&fit=crop",
      displayOrder: 12
    });
    
    // Add cards for Feelings
    this.createCardSync({
      categoryId: feelings.id,
      label: "Happy",
      labelPortuguese: "Feliz",
      imageUrl: "https://images.unsplash.com/photo-1543084951-1650d1468e2d?w=200&h=200&fit=crop",
      displayOrder: 1
    });
    
    this.createCardSync({
      categoryId: feelings.id,
      label: "Sad",
      labelPortuguese: "Triste",
      imageUrl: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=200&h=200&fit=crop",
      displayOrder: 2
    });
    
    this.createCardSync({
      categoryId: feelings.id,
      label: "Angry",
      labelPortuguese: "Bravo",
      imageUrl: "https://images.unsplash.com/photo-1545231027-637d2f6210f8?w=200&h=200&fit=crop",
      displayOrder: 3
    });
    
    this.createCardSync({
      categoryId: feelings.id,
      label: "Tired",
      labelPortuguese: "Cansado",
      imageUrl: "https://images.unsplash.com/photo-1545932470-f888c5ea1e5a?w=200&h=200&fit=crop",
      displayOrder: 4
    });
    
    // Add cards for Actions
    this.createCardSync({
      categoryId: actions.id,
      label: "Go",
      labelPortuguese: "Ir",
      imageUrl: "https://images.unsplash.com/photo-1459347268516-3ed71100e718?w=200&h=200&fit=crop",
      displayOrder: 1
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Stop",
      labelPortuguese: "Parar",
      imageUrl: "https://images.unsplash.com/photo-1555661059-7e755c1c3c1d?w=200&h=200&fit=crop",
      displayOrder: 2
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Play",
      labelPortuguese: "Brincar",
      imageUrl: "https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=200&h=200&fit=crop",
      displayOrder: 3
    });
    
    // Add cards for Places
    this.createCardSync({
      categoryId: places.id,
      label: "Home",
      labelPortuguese: "Casa",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop",
      displayOrder: 1
    });
    
    this.createCardSync({
      categoryId: places.id,
      label: "School",
      labelPortuguese: "Escola",
      imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=200&fit=crop",
      displayOrder: 2
    });
    
    this.createCardSync({
      categoryId: places.id,
      label: "Park",
      labelPortuguese: "Parque",
      imageUrl: "https://images.unsplash.com/photo-1566146270727-b613f0df5b49?w=200&h=200&fit=crop",
      displayOrder: 3
    });
    
    // Add cards for Pronouns
    this.createCardSync({
      categoryId: pronouns.id,
      label: "I",
      labelPortuguese: "Eu",
      imageUrl: "https://images.unsplash.com/photo-1544168190-79c17527004f?w=200&h=200&fit=crop",
      displayOrder: 1
    });
    
    this.createCardSync({
      categoryId: pronouns.id,
      label: "You",
      labelPortuguese: "Você",
      imageUrl: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&h=200&fit=crop",
      displayOrder: 2
    });
    
    this.createCardSync({
      categoryId: pronouns.id,
      label: "He",
      labelPortuguese: "Ele",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
      displayOrder: 3
    });
    
    this.createCardSync({
      categoryId: pronouns.id,
      label: "She",
      labelPortuguese: "Ela",
      imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
      displayOrder: 4
    });
    
    this.createCardSync({
      categoryId: pronouns.id,
      label: "We",
      labelPortuguese: "Nós",
      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop",
      displayOrder: 5
    });
    
    this.createCardSync({
      categoryId: pronouns.id,
      label: "They",
      labelPortuguese: "Eles",
      imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=200&h=200&fit=crop",
      displayOrder: 6
    });
  }
  
  // Sync versions for internal use
  private createCategorySync(insertCategory: InsertCategory): Category {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  private createCardSync(insertCard: InsertCard): Card {
    const id = this.cardCurrentId++;
    const card: Card = { ...insertCard, id };
    this.cards.set(id, card);
    return card;
  }
}

export const storage = new MemStorage();
