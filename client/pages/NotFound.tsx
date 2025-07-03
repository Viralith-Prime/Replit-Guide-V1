import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Home,
  Search,
  ArrowLeft,
  BookOpen,
  Code,
  Bot,
  Users,
  CreditCard,
  Settings,
  Compass,
  RotateCcw,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SEO } from "@/components/seo";
import { useAdaptiveLayout } from "@/components/adaptive-layout-provider";

const popularPages = [
  {
    title: "Getting Started",
    description: "Learn the basics of Replit development",
    href: "/getting-started",
    icon: BookOpen,
  },
  {
    title: "Core Features",
    description: "Explore Replit's powerful development tools",
    href: "/core-features",
    icon: Code,
  },
  {
    title: "AI Tools",
    description: "Master Ghostwriter and AI Chat features",
    href: "/ai-tools",
    icon: Bot,
  },
  {
    title: "Community",
    description: "Connect with other developers",
    href: "/community",
    icon: Users,
  },
];

const quickActions = [
  {
    title: "Go to Homepage",
    description: "Return to the main guide",
    action: "/",
    icon: Home,
  },
  {
    title: "Browse All Sections",
    description: "View complete table of contents",
    action: "/",
    icon: Compass,
  },
  {
    title: "Search Guide",
    description: "Find specific topics",
    action: "search",
    icon: Search,
  },
  {
    title: "Go Back",
    description: "Return to previous page",
    action: "back",
    icon: ArrowLeft,
  },
];

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { getAdaptiveStyles, deviceInfo } = useAdaptiveLayout();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would search the guide content
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "back":
        window.history.back();
        break;
      case "search":
        document.getElementById("search-input")?.focus();
        break;
      default:
        navigate(action);
    }
  };

  return (
    <div className={getAdaptiveStyles("min-h-screen bg-background")}>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Find what you need in our comprehensive Replit guide."
        noindex={true}
      />

      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Replit Guide</span>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto py-16 px-4">
        {/* 404 Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <span className="text-4xl font-bold text-muted-foreground">
                404
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The page you're looking for doesn't exist or may have been moved.
              Let's help you find what you need.
            </p>
          </div>

          {/* Search */}
          <Card className="max-w-md mx-auto mb-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search the Guide</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <Input
                  id="search-input"
                  type="text"
                  placeholder="Search for topics, features, or tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Search Guide
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-center">
            Quick Actions
          </h2>
          <div
            className={`grid gap-4 ${deviceInfo.deviceType === "mobile" ? "grid-cols-1" : "grid-cols-2 md:grid-cols-4"}`}
          >
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => handleQuickAction(action.action)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Pages */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-center">
            Popular Sections
          </h2>
          <div
            className={`grid gap-6 ${deviceInfo.deviceType === "mobile" ? "grid-cols-1" : "md:grid-cols-2"}`}
          >
            {popularPages.map((page, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <page.icon className="h-5 w-5" />
                    </div>
                    <span className="group-hover:text-primary transition-colors">
                      {page.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {page.description}
                  </p>
                  <Button asChild size="sm" className="w-full">
                    <Link to={page.href}>
                      Visit Section
                      <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-center">Still Can't Find It?</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              If you're still having trouble finding what you need, here are
              some additional options:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" asChild>
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Browse All Sections
                </Link>
              </Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              You can also try refreshing the page or checking the URL for
              typos.
            </p>
          </CardContent>
        </Card>

        {/* URL Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            URL:{" "}
            <code className="bg-muted px-2 py-1 rounded text-xs">
              {window.location.pathname}
            </code>
          </p>
        </div>
      </main>
    </div>
  );
}
