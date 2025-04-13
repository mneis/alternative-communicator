import { Link } from "wouter";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MoveUp, Trash2, Home, Smile, Footprints, MapPin } from "lucide-react";

export default function Help() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="max-w-4xl mx-auto my-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Help Guide</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
              <p className="mb-4">
                This AAC (Augmentative and Alternative Communication) app helps users communicate by selecting images to express thoughts, needs, and feelings.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">How to Use the App</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-bold text-lg flex items-center mb-2">
                    <span className="bg-primary text-white p-2 rounded-full mr-2 inline-flex items-center justify-center">1</span>
                    Select a Category
                  </h3>
                  <div className="flex items-center gap-2 ml-10 mb-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      <span>Basic Needs</span>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Smile className="h-5 w-5" />
                      <span>Feelings</span>
                    </Button>
                  </div>
                  <p className="ml-10 text-gray-700">
                    Click on one of the category tabs to view the communication cards for that category.
                  </p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-bold text-lg flex items-center mb-2">
                    <span className="bg-primary text-white p-2 rounded-full mr-2 inline-flex items-center justify-center">2</span>
                    Select Cards to Build Your Message
                  </h3>
                  <p className="ml-10 text-gray-700 mb-2">
                    Click on the image cards to add them to your message. Each card will appear in the message display area at the top of the screen.
                  </p>
                  <p className="ml-10 text-gray-700">
                    For example, you might select "I want", then "water", then "please" to create a complete message.
                  </p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-bold text-lg flex items-center mb-2">
                    <span className="bg-primary text-white p-2 rounded-full mr-2 inline-flex items-center justify-center">3</span>
                    Speak or Clear Your Message
                  </h3>
                  <div className="flex items-center gap-2 ml-10 mb-2">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center gap-2">
                      <MoveUp className="h-5 w-5" />
                      <span>Speak Message</span>
                    </Button>
                    <Button variant="destructive" className="flex items-center gap-2">
                      <Trash2 className="h-5 w-5" />
                      <span>Clear</span>
                    </Button>
                  </div>
                  <p className="ml-10 text-gray-700">
                    Click "Speak Message" to have your device read the message aloud. Click "Clear" to remove all cards and start a new message.
                  </p>
                </div>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-2">Accessibility Features</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>High-contrast visuals for better visibility</li>
                <li>Large touch targets for easier selection</li>
                <li>Text-to-speech functionality for audible communication</li>
                <li>Simple navigation between different communication categories</li>
                <li>Clear visual feedback when cards are selected</li>
              </ul>
            </section>
            
            <div className="mt-8 flex justify-center">
              <Link href="/">
                <Button>
                  Return to Communication Board
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <AppFooter />
    </div>
  );
}
