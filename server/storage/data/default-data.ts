import { type InsertCategory, type InsertCard } from "@shared/schema";
import { MemStorage } from "../memory";

export function initializeDefaultData(storage: MemStorage) {
  // Add categories
  const basicNeeds = storage.createCategorySync({
    name: "Basic Needs",
    namePortuguese: "Necessidades Básicas",
    icon: "home",
    displayOrder: 1
  });
  
  const feelings = storage.createCategorySync({
    name: "Feelings",
    namePortuguese: "Sentimentos",
    icon: "emoji_emotions",
    displayOrder: 2
  });
  
  const actions = storage.createCategorySync({
    name: "Actions",
    namePortuguese: "Ações",
    icon: "directions_run",
    displayOrder: 3
  });
  
  const places = storage.createCategorySync({
    name: "Places",
    namePortuguese: "Lugares",
    icon: "place",
    displayOrder: 4
  });
  
  const pronouns = storage.createCategorySync({
    name: "Pronouns",
    namePortuguese: "Pronomes",
    icon: "person",
    displayOrder: 5
  });
  
  const expressions = storage.createCategorySync({
    name: "Expressions and Needs",
    namePortuguese: "Expressões e Necessidades",
    icon: "chat",
    displayOrder: 6
  });

  // Add cards for each category
  addExpressionCards(storage, expressions.id);
  addBasicNeedsCards(storage, basicNeeds.id);
  addFeelingCards(storage, feelings.id);
  addActionCards(storage, actions.id);
  addPronounCards(storage, pronouns.id);
  addPlaceCards(storage, places.id);
}

function addExpressionCards(storage: MemStorage, categoryId: number) {
  const cards: InsertCard[] = [
    {
      categoryId,
      label: "It hurts",
      labelPortuguese: "Está doendo",
      imageUrl: "https://telemedicinamorsch.com.br/wp-content/uploads/2021/05/dor-de-cabeca.jpeg",
      displayOrder: 1
    },
    // ... add all expression cards here
  ];
  
  cards.forEach(card => storage.createCardSync(card));
}

function addBasicNeedsCards(storage: MemStorage, categoryId: number) {
  const cards: InsertCard[] = [
    {
      categoryId,
      label: "I want",
      labelPortuguese: "Eu quero",
      imageUrl: "https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?w=200&h=200&fit=crop",
      displayOrder: 1
    },
    // ... add all basic needs cards here
  ];
  
  cards.forEach(card => storage.createCardSync(card));
}

function addFeelingCards(storage: MemStorage, categoryId: number) {
  const cards: InsertCard[] = [
    {
      categoryId,
      label: "Happy",
      labelPortuguese: "Feliz",
      imageUrl: "https://media.istockphoto.com/id/1257101256/pt/vetorial/happy-people-jumping-celebrating-victory-flat-cartoon-characters-illustration.jpg?s=612x612&w=0&k=20&c=bA6NnvE5bjKBmPc0zTRs14j-pK8Rw8LMMtrnZ32Phfk=",
      displayOrder: 1
    },
    // ... add all feeling cards here
  ];
  
  cards.forEach(card => storage.createCardSync(card));
}

function addActionCards(storage: MemStorage, categoryId: number) {
  const cards: InsertCard[] = [
    {
      categoryId,
      label: "Go",
      labelPortuguese: "Ir",
      imageUrl: "https://images.unsplash.com/photo-1459347268516-3ed71100e718?w=200&h=200&fit=crop",
      displayOrder: 1
    },
    // ... add all action cards here
  ];
  
  cards.forEach(card => storage.createCardSync(card));
}

function addPronounCards(storage: MemStorage, categoryId: number) {
  const cards: InsertCard[] = [
    {
      categoryId,
      label: "I",
      labelPortuguese: "Eu",
      imageUrl: "https://images.unsplash.com/photo-1544168190-79c17527004f?w=200&h=200&fit=crop",
      displayOrder: 1
    },
    // ... add all pronoun cards here
  ];
  
  cards.forEach(card => storage.createCardSync(card));
}

function addPlaceCards(storage: MemStorage, categoryId: number) {
  const cards: InsertCard[] = [
    {
      categoryId,
      label: "Home",
      labelPortuguese: "Casa",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop",
      displayOrder: 1
    },
    // ... add all place cards here
  ];
  
  cards.forEach(card => storage.createCardSync(card));
} 