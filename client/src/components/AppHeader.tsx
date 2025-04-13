import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function AppHeader() {
  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer">Comunitech</h1>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Settings"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
