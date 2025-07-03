import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Advanced() {
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
              <Settings className="h-5 w-5 text-primary" />
              <span className="font-semibold">Advanced Usage</span>
            </div>
          </div>
          <Badge variant="secondary">Section 6 of 6</Badge>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Card className="border-2 border-dashed border-muted-foreground/25">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-4">
              Advanced Usage Section
            </CardTitle>
            <p className="text-muted-foreground">
              This advanced section will cover:
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li>• Environment variables and configuration</li>
              <li>• Mastering the Replit shell and command line</li>
              <li>• Connecting to external APIs and services</li>
              <li>• Nix packages for system dependencies</li>
              <li>• Custom deployment configurations</li>
              <li>• Performance optimization techniques</li>
              <li>• Database integration and management</li>
              <li>• CI/CD workflows with Replit</li>
            </ul>

            <div className="flex justify-between pt-6">
              <Button variant="outline" asChild>
                <Link to="/pricing">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous: Plans & Pricing
                </Link>
              </Button>
              <Button asChild>
                <Link to="/">Complete Guide</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
