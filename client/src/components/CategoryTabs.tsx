import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Home, Smile, Footprints, MapPin, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryTabsProps {
  selectedCategoryId: number | null;
  onSelectCategory: (id: number) => void;
}

// Map category icon names to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="h-5 w-5" />,
  emoji_emotions: <Smile className="h-5 w-5" />,
  directions_run: <Footprints className="h-5 w-5" />,
  place: <MapPin className="h-5 w-5" />,
  person: <User className="h-5 w-5" />,
};

export default function CategoryTabs({ selectedCategoryId, onSelectCategory }: CategoryTabsProps) {
  const { language } = useLanguage();
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  // Select the first category by default if none is selected
  useEffect(() => {
    if (categories && categories.length > 0 && selectedCategoryId === null) {
      onSelectCategory(categories[0].id);
    }
  }, [categories, selectedCategoryId, onSelectCategory]);
  
  if (isLoading) {
    return (
      <div className="flex gap-2 my-2 overflow-x-auto py-2">
        {[1, 2, 3, 4].map((i) => (
          <Button key={i} variant="outline" className="animate-pulse h-12 w-32" disabled>
            Loading...
          </Button>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-destructive/10 p-4 rounded-lg my-2">
        <p className="text-destructive">Error loading categories: {(error as Error).message}</p>
      </div>
    );
  }
  
  if (!categories || categories.length === 0) {
    return (
      <div className="bg-amber-100 p-4 rounded-lg my-2">
        <p className="text-amber-800">No communication categories found.</p>
      </div>
    );
  }
  
  return (
    <nav aria-label="Communication categories" className="flex flex-wrap gap-2 my-2 overflow-x-auto py-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategoryId === category.id ? "default" : "outline"}
          className={`flex items-center gap-2 py-3 ${
            selectedCategoryId === category.id 
              ? "bg-primary text-white" 
              : "bg-gray-200 text-darkText hover:bg-gray-300"
          }`}
          onClick={() => onSelectCategory(category.id)}
          aria-pressed={selectedCategoryId === category.id}
        >
          {iconMap[category.icon] || <span className="h-5 w-5" />}
          <span>
            {language === 'en-US' 
              ? category.name 
              : (category.namePortuguese || category.name)}
          </span>
        </Button>
      ))}
    </nav>
  );
}
