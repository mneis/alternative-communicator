import { Link } from "wouter";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      
      <main className="flex-grow container mx-auto p-4">
        <Card className="max-w-4xl mx-auto my-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">About Comunitech</CardTitle>
            <CardDescription>
              Alternative and Augmentative Communication for everyone
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <section>
              <h2 className="text-2xl font-semibold mb-2">What is AAC?</h2>
              <p className="text-gray-700 leading-relaxed">
                AAC (Augmentative and Alternative Communication) is a set of tools and strategies that help people with speech and language problems to communicate. This application provides visual communication boards with images that users can select to express their thoughts, needs, and feelings.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-2">How to Use This App</h2>
              <p className="text-gray-700 leading-relaxed">
                Select category tabs to view different communication boards. Click on image cards to add them to your message. When you've composed your message, you can use the "Speak Message" button to have your device speak the message aloud.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-2">Who Can Benefit</h2>
              <ul className="list-disc pl-5 text-gray-700 leading-relaxed">
                <li>Individuals with speech and language difficulties</li>
                <li>People recovering from stroke or injury affecting speech</li>
                <li>Children with developmental disabilities</li>
                <li>Anyone who needs support communicating their needs and preferences</li>
              </ul>
            </section>
            
            <div className="mt-8 flex justify-center">
              <Link href="/">
                <Button className="mr-4">
                  Return to Communication Board
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="outline">
                  View Help Guide
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
