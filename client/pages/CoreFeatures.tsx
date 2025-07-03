import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Code, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function CoreFeatures() {
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
              <Code className="h-5 w-5 text-primary" />
              <span className="font-semibold">Core Features</span>
            </div>
          </div>
          <Badge variant="secondary">Section 2 of 6</Badge>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Card className="border-2 border-dashed border-muted-foreground/25">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-4">
              Core Features Section
            </CardTitle>
            <p className="text-muted-foreground">
              This section is coming soon! It will cover:
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li>• Language Support: Overview of 50+ supported languages</li>
              <li>• Autocomplete and Code Intelligence</li>
              <li>• Real-time Multi-user Collaboration</li>
              <li>• Version Control with Git integration</li>
              <li>• Secrets Management for API keys</li>
              <li>• Deployment options: Static, Web Apps, Always-On</li>
              <li>• Package and Library Management</li>
              <li>• Replit Database integration</li>
            </ul>

            <div className="flex justify-between pt-6">
              <Button variant="outline" asChild>
                <Link to="/getting-started">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous: Getting Started
                </Link>
              </Button>
              <Button asChild>
                <Link to="/ai-tools">
                  Next: AI Tools
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
