import { PageLayout } from "@/components/page-layout";
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
  Trophy,
  CheckCircle,
  Star,
  TrendingUp,
  Sparkles,
  Clock,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/seo";
import { SkipLinks } from "@/components/skip-links";
import { DashboardWidget } from "@/components/user-dashboard";
import { useAuth } from "@/components/auth-provider";

const features = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description:
      "Learn the basics of Replit, from creating your first account to running your first program.",
    href: "/getting-started",
    level: "Beginner",
    time: "30-45 min",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Code,
    title: "Core Features",
    description:
      "Explore Replit's powerful development environment, collaboration tools, and deployment options.",
    href: "/core-features",
    level: "Intermediate",
    time: "25-35 min",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Bot,
    title: "AI Tools",
    description:
      "Master Replit's AI Agent for code generation, debugging, and learning assistance.",
    href: "/ai-tools",
    level: "All Levels",
    time: "20-30 min",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Connect with other developers through teams, bounties, and the Replit community.",
    href: "/community",
    level: "All Levels",
    time: "15-20 min",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: CreditCard,
    title: "Plans & Pricing",
    description:
      "Explore Free, Core ($20/month), and Teams ($35/month) plans to find your perfect fit.",
    href: "/pricing",
    level: "All Levels",
    time: "5-10 min",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: Settings,
    title: "Advanced Usage",
    description:
      "Dive deep into environment variables, shell commands, and external integrations.",
    href: "/advanced",
    level: "Advanced",
    time: "45-60 min",
    color: "from-red-500 to-red-600",
  },
];

const quickStats = [
  { icon: Code, label: "Languages Supported", value: "50+" },
  { icon: Users, label: "Active Users", value: "20M+" },
  { icon: Globe, label: "Projects Created", value: "100M+" },
  { icon: Terminal, label: "Lines of Code", value: "1B+" },
];

const learningPath = [
  {
    step: 1,
    title: "Start with Basics",
    description: "Account setup and first program",
    href: "/getting-started",
    completed: false,
  },
  {
    step: 2,
    title: "Explore Core Features",
    description: "Development environment mastery",
    href: "/core-features",
    completed: false,
  },
  {
    step: 3,
    title: "Leverage AI Tools",
    description: "AI-powered coding assistance",
    href: "/ai-tools",
    completed: false,
  },
  {
    step: 4,
    title: "Join the Community",
    description: "Connect and collaborate",
    href: "/community",
    completed: false,
  },
];

const pageMetadata = {
  title: "Interactive Replit Learning Guide",
  description:
    "Master Replit with our comprehensive, interactive guide. Learn cloud development, AI tools, collaboration, and deployment with hands-on exercises.",
  category: "learning" as const,
  level: "beginner" as const,
  timeToComplete: "Get started now",
  prerequisites: [],
};

export default function Index() {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <SEO
        title="Interactive Replit Learning Guide"
        description="Master Replit with our comprehensive, interactive guide. Learn cloud development, AI tools, collaboration, and deployment with hands-on exercises."
        keywords="Replit guide, cloud development, online IDE, coding tutorial, programming guide, collaborative coding, AI programming"
      />
      <SkipLinks />

      <PageLayout
        title="Home"
        description="Master Replit with Confidence"
        showBreadcrumbs={false}
        showProgress={false}
        metadata={pageMetadata}
      >
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
          <div className="relative container mx-auto px-4 py-20 sm:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">
                  <Sparkles className="h-4 w-4 mr-1" />
                  Interactive Learning Experience
                </Badge>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                Master Replit with{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Confidence
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Your comprehensive guide to cloud development, AI-powered
                coding, and collaborative programming. From beginner to expert,
                unlock the full potential of Replit.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                {!isAuthenticated ? (
                  <>
                    <Button size="lg" asChild className="text-base shadow-lg">
                      <Link to="/getting-started">
                        <Play className="h-5 w-5 mr-2" />
                        Get Started
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="text-base"
                    >
                      <Link to="/core-features">
                        Explore Features
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="lg" asChild className="text-base shadow-lg">
                      <Link to="/dashboard">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Continue Learning
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="text-base"
                    >
                      <Link to="/profile">
                        <Trophy className="h-5 w-5 mr-2" />
                        View Progress
                      </Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {quickStats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Dashboard Widget for Authenticated Users */}
        {isAuthenticated && user && (
          <div className="border-t bg-muted/20">
            <div className="container mx-auto px-4 py-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  Welcome back, {user.name}! 👋
                </h2>
                <p className="text-muted-foreground">
                  Ready to continue your learning journey?
                </p>
              </div>
              <DashboardWidget />
            </div>
          </div>
        )}

        {/* Learning Path for New Users */}
        {!isAuthenticated && (
          <div className="border-t bg-muted/10">
            <div className="container mx-auto px-4 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Your Learning Path</h2>
                <p className="text-lg text-muted-foreground">
                  Follow our step-by-step guide designed for developers of all
                  levels
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {learningPath.map((step, index) => (
                    <Card
                      key={index}
                      className="relative hover:shadow-lg transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">Step {step.step}</Badge>
                          {step.completed && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full"
                        >
                          <Link to={step.href}>
                            Start Step {step.step}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                      {index < learningPath.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 bg-background border rounded-full flex items-center justify-center">
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Master Replit
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow our structured learning modules designed by experts, with
              hands-on exercises and real-world projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white`}
                    >
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline">{feature.level}</Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {feature.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Target className="h-4 w-4 mr-1" />
                      {feature.level}
                    </div>
                  </div>
                  <Button
                    asChild
                    className="w-full group-hover:bg-primary/90 transition-colors"
                  >
                    <Link to={feature.href}>
                      Start Learning
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="border-t bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of developers who have mastered Replit with our
                comprehensive guide. Start building amazing projects today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="text-base">
                  <Link to="/getting-started">
                    <Play className="h-5 w-5 mr-2" />
                    Begin Your Journey
                  </Link>
                </Button>
                {!isAuthenticated && (
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="text-base"
                  >
                    <Link to="/pricing">
                      View Plans
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
