import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import MessageDisplay, { SelectedCard } from "@/components/MessageDisplay";
import CategoryTabs from "@/components/CategoryTabs";
import CommunicationBoard from "@/components/CommunicationBoard";
import { Card as CardType } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };
  
  const handleSelectCard = (card: CardType) => {
    // Add selected card to message with both language labels
    setSelectedCards(prev => [...prev, {
      id: card.id,
      label: card.label,
      labelPortuguese: card.labelPortuguese,
      imageUrl: card.imageUrl
    }]);
    
    // Visual feedback toast in current language
    const cardLabel = language === 'en-US' ? card.label : (card.labelPortuguese || card.label);
    
    toast({
      title: language === 'en-US' ? "Card added" : "Cartão adicionado",
      description: language === 'en-US' 
        ? `Added "${cardLabel}" to your message`
        : `Adicionado "${cardLabel}" à sua mensagem`,
      duration: 1500,
    });
  };
  
  const handleClearMessage = () => {
    setSelectedCards([]);
    
    toast({
      title: language === 'en-US' ? "Message cleared" : "Mensagem apagada",
      description: language === 'en-US' 
        ? "Your message has been cleared" 
        : "Sua mensagem foi apagada",
      duration: 1500,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      
      <main className="flex-grow container mx-auto p-4 flex flex-col gap-4">
        <MessageDisplay 
          selectedCards={selectedCards} 
          onClearMessage={handleClearMessage} 
        />
        
        <CategoryTabs 
          selectedCategoryId={selectedCategoryId} 
          onSelectCategory={handleSelectCategory} 
        />
        
        <CommunicationBoard 
          categoryId={selectedCategoryId} 
          onSelectCard={handleSelectCard} 
        />
      </main>
      
      <AppFooter />
    </div>
  );
}
