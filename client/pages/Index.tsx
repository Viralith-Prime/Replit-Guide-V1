import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Code,
  Users,
  Zap,
  CreditCard,
  Settings,
  ArrowRight,
  Play,
  GitBranch,
  Bot,
  Globe,
  Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { AccessibilityPanel } from "@/components/accessibility-panel";
import { SEO } from "@/components/seo";
import { SkipLinks } from "@/components/skip-links";

const features = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description:
      "Learn the basics of Replit, from creating your first account to running your first program.",
    href: "/getting-started",
    level: "Beginner",
  },
  {
    icon: Code,
    title: "Core Features",
    description:
      "Explore Replit's powerful development environment, collaboration tools, and deployment options.",
    href: "/core-features",
    level: "Intermediate",
  },
  {
    icon: Bot,
    title: "AI Tools",
    description:
      "Master Replit's AI Agent for code generation, debugging, and learning assistance.",
    href: "/ai-tools",
    level: "All Levels",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Connect with other developers through teams, bounties, and the Replit community.",
    href: "/community",
    level: "All Levels",
  },
  {
    icon: CreditCard,
    title: "Plans & Pricing",
    description:
      "Explore Free, Core ($20/month), and Teams ($35/month) plans to find your perfect fit.",
    href: "/pricing",
    level: "All Levels",
  },
  {
    icon: Settings,
    title: "Advanced Usage",
    description:
      "Dive deep into environment variables, shell commands, and external integrations.",
    href: "/advanced",
    level: "Advanced",
  },
];

const quickStats = [
  { icon: Code, label: "Languages Supported", value: "50+" },
  { icon: Users, label: "Active Users", value: "20M+" },
  { icon: Globe, label: "Projects Created", value: "100M+" },
  { icon: Terminal, label: "Lines of Code", value: "1B+" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Interactive Replit Learning Guide"
        description="Master Replit with our comprehensive, interactive guide. Learn cloud development, AI tools, collaboration, and deployment with hands-on exercises."
        keywords="Replit guide, cloud development, online IDE, coding tutorial, programming guide, collaborative coding, AI programming"
      />
      <SkipLinks />

      {/* Header */}
      <header
        id="navigation"
        className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
        role="banner"
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Replit Guide</span>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/getting-started"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Getting Started
              </Link>
              <Link
                to="/core-features"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                to="/ai-tools"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                AI Tools
              </Link>
              <Link
                to="/community"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Community
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <AccessibilityPanel />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main">
        {/* Hero Section */}
        <section
          className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20"
          aria-labelledby="hero-title"
        >
          <div className="container max-w-4xl mx-auto">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-3 h-3 mr-1" />
                Interactive Learning Guide
              </Badge>
            </div>
            <h1 id="hero-title" className="text-4xl md:text-6xl font-bold mb-6">
              Master <span className="gradient-text">Replit</span> with
              Confidence
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your comprehensive, interactive guide to becoming a Replit expert.
              From your first program to advanced deployments and AI-powered
              development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="group">
                <Link to="/getting-started">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/core-features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-muted/20">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {quickStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to Know
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive guide covers every aspect of Replit, from
                basic concepts to advanced techniques.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {feature.level}
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between group"
                    >
                      <Link to={feature.href}>
                        Start Section
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Preview */}
        <section className="py-20 px-4 bg-muted/20">
          <div className="container max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Try It Yourself</h3>
            <p className="text-muted-foreground mb-8">
              This guide includes interactive examples you can run directly in
              Replit
            </p>
            <Card className="text-left">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-muted-foreground ml-4">
                    main.py
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="code-block">
                  <div className="text-green-400">
                    # Your first Replit program
                  </div>
                  <div className="text-blue-400">print</div>
                  <span className="text-white">(</span>
                  <span className="text-yellow-400">
                    "Hello, Replit World!"
                  </span>
                  <span className="text-white">)</span>
                </div>
                <Button className="mt-4" size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Run Code
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border" role="contentinfo">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 gradient-brand rounded flex items-center justify-center">
                <Code className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">Replit Guide</span>
            </div>
            <p className="text-sm text-muted-foreground">
              An interactive learning experience for mastering Replit
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
