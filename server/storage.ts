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
  createCard(card: Card): Promise<Card>;
}

/**
 * Classe responsável por gerenciar o armazenamento em memória das categorias e cards.
 * Implementa a interface IStorage para garantir consistência com outros tipos de armazenamento.
 */
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

  // Private initialization method
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
    
    const expressions = this.createCategorySync({
      name: "Expressions and Needs",
      namePortuguese: "Expressões e Necessidades",
      icon: "chat",
      displayOrder: 6
    });
    
    // Add cards for Expressions and Needs
    this.createCardSync({
      categoryId: expressions.id,
      label: "It hurts",
      labelPortuguese: "Está doendo",
      imageUrl: "https://telemedicinamorsch.com.br/wp-content/uploads/2021/05/dor-de-cabeca.jpeg",
      displayOrder: 1
    });
    
    this.createCardSync({
      categoryId: expressions.id,
      label: "It's good",
      labelPortuguese: "Está bom",
      imageUrl: "https://img.freepik.com/fotos-gratis/mulher-jovem-impressionada-mostrando-os-polegares-para-cima-e-sorrindo-maravilhada-elogiando-algo-legal-em-pe-sobre-uma-parede-branca_176420-37535.jpg?semt=ais_hybrid&w=740",
      displayOrder: 2
    });
    
    this.createCardSync({
      categoryId: expressions.id,
      label: "I don't like it",
      labelPortuguese: "Não gosto",
      imageUrl: "https://images.unsplash.com/photo-1693168058063-f8e3474ce214?w=200&h=200&fit=crop",
      displayOrder: 3
    });
    
    this.createCardSync({
      categoryId: expressions.id,
      label: "I want to change",
      labelPortuguese: "Quero mudar",
      imageUrl: "https://i.pinimg.com/736x/50/a4/2c/50a42c0a969d3d5a6cc04e12ce1b4dd0.jpg",
      displayOrder: 4
    });
    
    this.createCardSync({
      categoryId: expressions.id,
      label: "Can you repeat?",
      labelPortuguese: "Pode repetir?",
      imageUrl: "https://img.freepik.com/vetores-gratis/ilustracao-de-encolher-de-ombros-desenhada-de-mao_23-2149318020.jpg?semt=ais_hybrid&w=740",
      displayOrder: 5
    });
    
    this.createCardSync({
      categoryId: expressions.id,
      label: "Where is it?",
      labelPortuguese: "Onde está?",
      imageUrl: "https://i.pinimg.com/736x/d1/5d/4b/d15d4b0cadaa8f6784a44717a6394095.jpg",
      displayOrder: 6
    });
    
    this.createCardSync({
      categoryId: expressions.id,
      label: "I need help",
      labelPortuguese: "Preciso de ajuda",
      imageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=200&h=200&fit=crop",
      displayOrder: 7
    });
    
    this.createCardSync({
      categoryId: expressions.id,
      label: "I don't understand",
      labelPortuguese: "Não entendi",
      imageUrl: "https://cdn.wizard.com.br/wp-content/uploads/2023/05/04152207/palavra-do-ano-768x432.jpg",
      displayOrder: 8
    });
    
    this.createCardSync({
      categoryId: expressions.id,
      label: "It's difficult",
      labelPortuguese: "Está difícil",
      imageUrl: "https://images.unsplash.com/photo-1560785496-3c9d27877182?w=200&h=200&fit=crop",
      displayOrder: 9
    });
    
    this.createCardSync({
      categoryId: expressions.id,
      label: "I want to stop",
      labelPortuguese: "Quero parar",
      imageUrl: "https://img.freepik.com/fotos-gratis/menina-linda-em-um-casaco-cinza-olhando-para-a-camera-com-uma-expressao-desagradavel-fazendo-gesto-de-parar-em-pe-sobre-um-fundo-branco_141793-24329.jpg?semt=ais_hybrid&w=740",
      displayOrder: 10
    });
    
    this.createCardSync({
      categoryId: expressions.id,
      label: "I want to play",
      labelPortuguese: "Quero brincar",
      imageUrl: "https://aventurasmaternas.com.br/wp-content/uploads/2015/03/brincadeiras-tradicionais-encantam-a-garotada1.jpg",
      displayOrder: 11
    });
    
    this.createCardSync({
      categoryId: expressions.id,
      label: "I'm not well",
      labelPortuguese: "Não estou bem",
      imageUrl: "https://static.vecteezy.com/ti/fotos-gratis/t1/6783042-retrato-de-asiatico-raiva-triste-e-chora-menina-em-fundo-branco-isolado-a-emocao-de-uma-crianca-quando-birra-e-expressao-rabugenta-emocao-crianca-conceito-controle-emocional-foto.jpg",
      displayOrder: 12
    });
    
    this.createCardSync({
      categoryId: expressions.id,
      label: "It's too loud",
      labelPortuguese: "Está muito alto",
      imageUrl: "https://img.freepik.com/vetores-premium/mulher-estressada-sofre-de-barulho-alto_160308-4976.jpg",
      displayOrder: 13
    });
    
    this.createCardSync({
      categoryId: expressions.id,
      label: "It's cold",
      labelPortuguese: "Está frio",
      imageUrl: "https://thumbs.dreamstime.com/b/homem-se-sentindo-frio-durante-o-inverno-ilustra%C3%A7%C3%A3o-vetorial-do-idoso-sentir-usando-roupas-quentes-macho-s%C3%AAnior-l%C3%A1-fora-em-265328100.jpg",
      displayOrder: 14
    });
    
    this.createCardSync({
      categoryId: expressions.id,
      label: "It's hot",
      labelPortuguese: "Está quente",
      imageUrl: "https://img.freepik.com/vetores-gratis/ilustracao-de-calor-de-verao-plana-com-homem-suando-sob-o-sol_23-2149433187.jpg",
      displayOrder: 15
    });
    
    // Add cards for Basic Needs
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "I want",
      labelPortuguese: "Eu quero",
      imageUrl: "https://img.freepik.com/vetores-premium/jovem-sorrindo-e-apontando-com-expressao-de-bullying_1639-43829.jpg?semt=ais_hybrid&w=740",
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
      imageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=200&h=200&fit=crop",
      displayOrder: 4
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "Help",
      labelPortuguese: "Ajuda",
      imageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=200&h=200&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1693168058063-f8e3474ce214?w=200&h=200&fit=crop",
      displayOrder: 7
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "Please",
      labelPortuguese: "Por favor",
      imageUrl: "https://img.freepik.com/vetores-gratis/mao-desenhada-por-favor-ilustracao_23-2150232855.jpg",
      displayOrder: 8
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "Thank you",
      labelPortuguese: "Obrigado",
      imageUrl: "https://img.freepik.com/vetores-premium/obrigado-ilustracao-com-personagens-de-desenhos-animados_29937-3963.jpg",
      displayOrder: 9
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "More",
      labelPortuguese: "Mais",
      imageUrl: "https://static.vecteezy.com/ti/vetor-gratis/p1/14215574-sinal-de-mais-verde-icone-de-simbolo-cruzado-de-orientacao-de-seguranca-vetor.jpg",
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
      imageUrl: "https://i.pinimg.com/736x/54/c1/d1/54c1d16736785dbcba8f97f52fef8755.jpg",
      displayOrder: 12
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "I'm hungry",
      labelPortuguese: "Estou com fome",
      imageUrl: "https://i.pinimg.com/474x/4a/b9/db/4ab9db1ade64eee7673578b64227dc9b.jpg",
      displayOrder: 13
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "I'm thirsty",
      labelPortuguese: "Estou com sede",
      imageUrl: "https://s2-g1.glbimg.com/JiWgdzue9uoo_eriK99NzjPaEY0=/0x0:1000x667/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/k/0/9RCoAqRkA4OaJz3oABAQ/intestino-quiz5.jpg",
      displayOrder: 14
    });
    
    this.createCardSync({
      categoryId: basicNeeds.id,
      label: "I'm tired",
      labelPortuguese: "Estou cansado",
      imageUrl: "https://images.unsplash.com/photo-1519003300449-424ad0405076?w=200&h=200&fit=crop",
      displayOrder: 15
    });
    
    // Add cards for Feelings
    this.createCardSync({
      categoryId: feelings.id,
      label: "Happy",
      labelPortuguese: "Feliz",
      imageUrl: "https://media.istockphoto.com/id/1257101256/pt/vetorial/happy-people-jumping-celebrating-victory-flat-cartoon-characters-illustration.jpg?s=612x612&w=0&k=20&c=bA6NnvE5bjKBmPc0zTRs14j-pK8Rw8LMMtrnZ32Phfk=",
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
      imageUrl: "https://img.freepik.com/fotos-gratis/conceito-de-pessoas-e-agressao-jovem-modelo-irritada-com-penteado-curto-vestida-com-roupas-casuais-fecha-os-punhos-de-raiva-briga-com-o-marido_273609-3726.jpg",
      displayOrder: 3
    });
    
    this.createCardSync({
      categoryId: feelings.id,
      label: "Tired",
      labelPortuguese: "Cansado",
      imageUrl: "https://images.unsplash.com/photo-1519003300449-424ad0405076?w=200&h=200&fit=crop",
      displayOrder: 4
    });
    
    this.createCardSync({
      categoryId: feelings.id,
      label: "Scared",
      labelPortuguese: "Com medo",
      imageUrl: "https://conteudo.imguol.com.br/c/entretenimento/de/2021/02/04/medo-angustia-assustado-1612470058401_v2_1920x1297.jpg",
      displayOrder: 5
    });
    
    this.createCardSync({
      categoryId: feelings.id,
      label: "Excited",
      labelPortuguese: "Animado",
      imageUrl: "https://i.pinimg.com/736x/32/ac/03/32ac031b76191563054ffcfd760d8cdb.jpg",
      displayOrder: 6
    });
    
    this.createCardSync({
      categoryId: feelings.id,
      label: "In pain",
      labelPortuguese: "Com dor",
      imageUrl: "https://assets-sitesdigitais.dasa.com.br/strapi/sentir-dor_c92e50597a/sentir-dor_c92e50597a.jpg",
      displayOrder: 7
    });
    
    this.createCardSync({
      categoryId: feelings.id,
      label: "Bored",
      labelPortuguese: "Entediado",
      imageUrl: "https://www.shutterstock.com/image-photo/tired-student-portrait-bored-kid-260nw-2509001737.jpg",
      displayOrder: 8
    });
    
    this.createCardSync({
      categoryId: feelings.id,
      label: "Nervous",
      labelPortuguese: "Nervoso",
      imageUrl: "https://thumbs.dreamstime.com/b/cara-assustado-da-coberta-do-menino-terrificado-na-ocasional-equipamento-com-ambas-as-m%C3%A3os-e-vista-c%C3%A2mera-atrav%C3%A9s-dos-dedos-ao-142535480.jpg",
      displayOrder: 9
    });
    
    this.createCardSync({
      categoryId: feelings.id,
      label: "Embarrassed",
      labelPortuguese: "Envergonhado",
      imageUrl: "https://i.pinimg.com/736x/42/1d/18/421d18c6f8e139af122d337b199790fa.jpg",
      displayOrder: 10
    });
    
    this.createCardSync({
      categoryId: feelings.id,
      label: "Grateful",
      labelPortuguese: "Agradecido",
      imageUrl: "https://st3.depositphotos.com/9795234/15162/i/450/depositphotos_151620720-stock-photo-young-woman-showing-her-heartfelt.jpg",
      displayOrder: 11
    });
    
    this.createCardSync({
      categoryId: feelings.id,
      label: "Calm",
      labelPortuguese: "Calmo",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyDr8ID798UFeHSytCdBxPluxY2no4Z0KMmw&s",
      displayOrder: 12
    });
    
    // Add cards for Actions
    this.createCardSync({
      categoryId: actions.id,
      label: "Go",
      labelPortuguese: "Ir",
      imageUrl: "https://i.pinimg.com/736x/69/99/a0/6999a0e1959afb5741b718abf1613c70.jpg",
      displayOrder: 1
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Stop",
      labelPortuguese: "Parar",
      imageUrl: "https://us.123rf.com/450wm/erika8213/erika82132203/erika8213220300006/182705026-mulheres-violentas-e-abusadas-conceito-parar-a-viol%C3%AAncia-dom%C3%A9stica-contra-as-mulheres-e-o-tr%C3%A1fico.jpg?ver=6",
      displayOrder: 2
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Play",
      labelPortuguese: "Brincar",
      imageUrl: "https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=200&h=200&fit=crop",
      displayOrder: 3
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Eat",
      labelPortuguese: "Comer",
      imageUrl: "https://i.pinimg.com/736x/ec/ad/3f/ecad3f0dc689c36600004d75b2694cd2.jpg",
      displayOrder: 4
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Drink",
      labelPortuguese: "Beber",
      imageUrl: "https://i.pinimg.com/736x/be/6f/68/be6f68f66cc29466ac710f54e2ab3a94.jpg",
      displayOrder: 5
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Sleep",
      labelPortuguese: "Dormir",
      imageUrl: "https://i.pinimg.com/736x/8a/83/f9/8a83f9d2acc18d62874c8a2aa4e050ce.jpg",
      displayOrder: 6
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Read",
      labelPortuguese: "Ler",
      imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=200&h=200&fit=crop",
      displayOrder: 7
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Write",
      labelPortuguese: "Escrever",
      imageUrl: "https://img.freepik.com/vetores-gratis/mao-humana-com-caneta-escrevendo-em-papel_1308-116604.jpg?semt=ais_hybrid&w=740",
      displayOrder: 8
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Walk",
      labelPortuguese: "Caminhar",
      imageUrl: "https://images.theconversation.com/files/638645/original/file-20241206-15-bbhuk5.jpg?ixlib=rb-4.1.0&rect=11%2C0%2C7337%2C4902&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
      displayOrder: 9
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Sit",
      labelPortuguese: "Sentar",
      imageUrl: "https://previews.123rf.com/images/verkoka/verkoka1403/verkoka140300110/27156722-ni%C3%B1o-sentado-en-la-silla-aislados-en-blanco.jpg",
      displayOrder: 10
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Stand up",
      labelPortuguese: "Levantar",
      imageUrl: "https://images.unsplash.com/photo-1459347268516-3ed71100e718?w=200&h=200&fit=crop",
      displayOrder: 11
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Wait",
      labelPortuguese: "Esperar",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8uUwZO0aOvY1OgJSJ1nHCPpLoRnDbbxt0fFFXe3jNOq0lfUCjYIsjMqS2F2Jj6s9SQuQ&usqp=CAU",
      displayOrder: 12
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Watch TV",
      labelPortuguese: "Ver TV",
      imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=200&fit=crop",
      displayOrder: 13
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Listen to music",
      labelPortuguese: "Escutar música",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop",
      displayOrder: 14
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Study",
      labelPortuguese: "Estudar",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop",
      displayOrder: 15
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Take a shower",
      labelPortuguese: "Tomar banho",
      imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
      displayOrder: 16
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Brush teeth",
      labelPortuguese: "Escovar dentes",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG0EwEZdgh6teYLygAhRng9b_O_eeK5oawzwOswVhaRbqOe6tpOGSp2k7J0tTTIlmlmZA&usqp=CAU",
      displayOrder: 17
    });
    
    this.createCardSync({
      categoryId: actions.id,
      label: "Use phone",
      labelPortuguese: "Usar o celular",
      imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop",
      displayOrder: 18
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
    
    this.createCardSync({
      categoryId: pronouns.id,
      label: "My",
      labelPortuguese: "Meu",
      imageUrl: "https://images.unsplash.com/photo-1544168190-79c17527004f?w=200&h=200&fit=crop",
      displayOrder: 7
    });
    
    this.createCardSync({
      categoryId: pronouns.id,
      label: "My",
      labelPortuguese: "Minha",
      imageUrl: "https://images.unsplash.com/photo-1544168190-79c17527004f?w=200&h=200&fit=crop",
      displayOrder: 8
    });
    
    this.createCardSync({
      categoryId: pronouns.id,
      label: "Your",
      labelPortuguese: "Seu",
      imageUrl: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&h=200&fit=crop",
      displayOrder: 9
    });
    
    this.createCardSync({
      categoryId: pronouns.id,
      label: "Your",
      labelPortuguese: "Sua",
      imageUrl: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&h=200&fit=crop",
      displayOrder: 10
    });
    
    this.createCardSync({
      categoryId: pronouns.id,
      label: "With me",
      labelPortuguese: "Comigo",
      imageUrl: "https://images.unsplash.com/photo-1544168190-79c17527004f?w=200&h=200&fit=crop",
      displayOrder: 11
    });
    
    this.createCardSync({
      categoryId: pronouns.id,
      label: "With you",
      labelPortuguese: "Com você",
      imageUrl: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&h=200&fit=crop",
      displayOrder: 12
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
      label: "Hospital",
      labelPortuguese: "Hospital",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=200&fit=crop",
      displayOrder: 3
    });
    
    this.createCardSync({
      categoryId: places.id,
      label: "Room",
      labelPortuguese: "Quarto",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
      displayOrder: 4
    });
    
    this.createCardSync({
      categoryId: places.id,
      label: "Living Room",
      labelPortuguese: "Sala",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop",
      displayOrder: 5
    });
    
    this.createCardSync({
      categoryId: places.id,
      label: "Kitchen",
      labelPortuguese: "Cozinha",
      imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop",
      displayOrder: 6
    });
    
    this.createCardSync({
      categoryId: places.id,
      label: "Bathroom",
      labelPortuguese: "Banheiro",
      imageUrl: "https://images.unsplash.com/photo-1564540583246-934409427776?w=200&h=200&fit=crop",
      displayOrder: 7
    });
    
    this.createCardSync({
      categoryId: places.id,
      label: "Park",
      labelPortuguese: "Parque",
      imageUrl: "https://brubrinq.com.br/wp-content/uploads/2022/10/parque-infantil-1.jpg",
      displayOrder: 8
    });
    
    this.createCardSync({
      categoryId: places.id,
      label: "Car",
      labelPortuguese: "Carro",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=200&fit=crop",
      displayOrder: 9
    });
    
    this.createCardSync({
      categoryId: places.id,
      label: "Street",
      labelPortuguese: "Rua",
      imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=200&h=200&fit=crop",
      displayOrder: 10
    });
    
    this.createCardSync({
      categoryId: places.id,
      label: "Store",
      labelPortuguese: "Loja",
      imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&h=200&fit=crop",
      displayOrder: 11
    });
    
    this.createCardSync({
      categoryId: places.id,
      label: "Pharmacy",
      labelPortuguese: "Farmácia",
      imageUrl: "https://idec.org.br/sites/default/files/dicasedireitos/imagem_noticia_1_0.png",
      displayOrder: 12
    });
  }
}

export const storage = new MemStorage();
