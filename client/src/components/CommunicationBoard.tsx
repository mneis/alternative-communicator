import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CommunicationCard from "./CommunicationCard";
import { Card as CardType } from "@shared/schema";

interface CommunicationBoardProps {
  categoryId: number | null;
  onSelectCard: (card: CardType) => void;
}

export default function CommunicationBoard({ categoryId, onSelectCard }: CommunicationBoardProps) {
  const { data: cards, isLoading, error } = useQuery<CardType[]>({
    queryKey: categoryId ? [`/api/categories/${categoryId}/cards`] : null,
    enabled: categoryId !== null,
  });
  
  if (!categoryId) {
    return (
      <Card className="p-4">
        <p className="text-center text-muted-foreground">Please select a category.</p>
      </Card>
    );
  }
  
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <Skeleton className="h-24 w-24 rounded mb-2" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="bg-destructive/10">
        <CardContent className="p-4">
          <p className="text-destructive">Error loading cards: {(error as Error).message}</p>
        </CardContent>
      </Card>
    );
  }
  
  if (!cards || cards.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-center text-muted-foreground">No cards found for this category.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cards.map((card) => (
            <CommunicationCard
              key={card.id}
              card={card}
              onSelect={() => onSelectCard(card)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
