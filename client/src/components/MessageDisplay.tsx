import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveUp, Trash2, Globe } from "lucide-react";
import useSpeech from "@/hooks/useSpeech";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";

export interface SelectedCard {
  id: number;
  label: string;
  labelPortuguese?: string | null;
  imageUrl: string;
}

interface MessageDisplayProps {
  selectedCards: SelectedCard[];
  onClearMessage: () => void;
}

export default function MessageDisplay({ selectedCards, onClearMessage }: MessageDisplayProps) {
  const { language, setLanguage } = useLanguage();
  const { speak, speaking, supported } = useSpeech({ lang: language });
  const { toast } = useToast();
  const [message, setMessage] = useState<string>("");
  
  // Update message text when selected cards change
  useEffect(() => {
    if (language === 'en-US') {
      setMessage(selectedCards.map(card => card.label).join(" "));
    } else {
      setMessage(selectedCards.map(card => card.labelPortuguese || card.label).join(" "));
    }
  }, [selectedCards, language]);
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'en-US' | 'pt-BR');
    
    toast({
      title: value === 'en-US' ? "English selected" : "Português selecionado",
      description: value === 'en-US' 
        ? "Speech will be in English" 
        : "A fala será em Português Brasileiro",
      duration: 2000,
    });
  };
  
  const handleSpeak = () => {
    if (!supported) {
      toast({
        title: language === 'en-US' 
          ? "Speech synthesis not supported" 
          : "Síntese de voz não suportada",
        description: language === 'en-US'
          ? "Your browser does not support speech synthesis."
          : "Seu navegador não suporta síntese de voz.",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedCards.length === 0) {
      toast({
        title: language === 'en-US' ? "No cards selected" : "Nenhum cartão selecionado",
        description: language === 'en-US'
          ? "Please select some cards to create a message."
          : "Por favor, selecione alguns cartões para criar uma mensagem.",
        variant: "destructive",
      });
      return;
    }
    
    speak(message);
  };
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h2 className="sr-only">Message Display</h2>
        
        <div 
          aria-live="polite" 
          className="flex flex-wrap gap-2 min-h-[60px] mb-4"
        >
          {selectedCards.length === 0 ? (
            <p className="text-muted-foreground italic w-full text-center my-2">
              {language === 'en-US' 
                ? "Select cards below to build your message" 
                : "Selecione cartões abaixo para construir sua mensagem"}
            </p>
          ) : (
            selectedCards.map((card, index) => (
              <div 
                key={`${card.id}-${index}`}
                className="flex items-center gap-1 bg-background p-2 rounded"
              >
                <img 
                  src={card.imageUrl} 
                  alt={language === 'en-US' ? card.label : (card.labelPortuguese || card.label)} 
                  className="w-10 h-10 rounded object-cover"
                />
                <span className="font-semibold">
                  {language === 'en-US' 
                    ? card.label 
                    : (card.labelPortuguese || card.label)}
                </span>
              </div>
            ))
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 justify-between">
          <div className="flex gap-2">
            <Button 
              variant="default" 
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold"
              onClick={handleSpeak}
              disabled={selectedCards.length === 0 || speaking}
            >
              <MoveUp className="mr-2 h-5 w-5" />
              {speaking ? (language === 'en-US' ? "Speaking..." : "Falando...") : 
                         (language === 'en-US' ? "Speak Message" : "Falar Mensagem")}
            </Button>
            
            <Button 
              variant="destructive"
              onClick={onClearMessage}
              disabled={selectedCards.length === 0}
            >
              <Trash2 className="mr-2 h-5 w-5" />
              {language === 'en-US' ? "Clear" : "Limpar"}
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Globe className="text-muted-foreground h-5 w-5" />
            <Select 
              value={language} 
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English</SelectItem>
                <SelectItem value="pt-BR">Português (BR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
