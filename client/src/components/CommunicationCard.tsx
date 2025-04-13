import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card as CardType } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

interface CommunicationCardProps {
  card: CardType;
  onSelect: () => void;
}

export default function CommunicationCard({ card, onSelect }: CommunicationCardProps) {
  const [isSelected, setIsSelected] = useState(false);
  const { language } = useLanguage();
  
  const handleClick = () => {
    // Visual feedback when selected
    setIsSelected(true);
    
    // Reset the visual feedback after a short delay
    setTimeout(() => {
      setIsSelected(false);
    }, 300);
    
    onSelect();
  };
  
  return (
    <Button
      className={`flex flex-col items-center h-auto bg-background border-2 ${
        isSelected ? 'border-primary' : 'border-gray-300'
      } rounded-lg p-4 hover:border-primary min-h-[150px] transition-colors`}
      variant="ghost"
      onClick={handleClick}
    >
      <div className="w-24 h-24 rounded mb-2 overflow-hidden">
        <img
          src={card.imageUrl}
          alt={language === 'en-US' ? card.label : (card.labelPortuguese || card.label)}
          className="w-full h-full object-cover"
          loading="lazy" 
        />
      </div>
      <span className="font-semibold text-lg text-center">
        {language === 'en-US' 
          ? card.label 
          : (card.labelPortuguese || card.label)}
      </span>
    </Button>
  );
}
