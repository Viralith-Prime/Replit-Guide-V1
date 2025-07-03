import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Bot, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function AITools() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Guide
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-semibold">AI Tools</span>
            </div>
          </div>
          <Badge variant="secondary">Section 3 of 6</Badge>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Card className="border-2 border-dashed border-muted-foreground/25">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-4">
              Replit AI Tools Section
            </CardTitle>
            <p className="text-muted-foreground">
              This section will comprehensively cover:
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li>• Introduction to Replit AI Agent and its capabilities</li>
              <li>• Effective prompting strategies with practical examples</li>
              <li>• Code generation and intelligent editing features</li>
              <li>• Understanding Claude Sonnet integration and limitations</li>
              <li>• Token management and usage optimization</li>
              <li>• Interactive exercises with copy-paste prompts</li>
            </ul>

            <div className="flex justify-between pt-6">
              <Button variant="outline" asChild>
                <Link to="/core-features">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous: Core Features
                </Link>
              </Button>
              <Button asChild>
                <Link to="/community">
                  Next: Community
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
