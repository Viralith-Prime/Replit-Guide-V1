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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  CreditCard,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  X,
  Zap,
  Users,
  Crown,
  Rocket,
  Globe,
  Database,
  Clock,
  Shield,
  HeadphonesIcon,
  ExternalLink,
  Calculator,
  TrendingUp,
  Star,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const pageMetadata = {
  title: "Pricing",
  description: "Choose the perfect plan for your development needs",
  category: "account" as const,
  level: "beginner" as const,
  timeToComplete: "5-10 minutes",
  prerequisites: [],
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
];

const pricingSections = [
  {
    id: "plans",
    title: "Plan Comparison",
    icon: CreditCard,
    description: "Compare all available plans",
  },
  {
    id: "features",
    title: "Feature Breakdown",
    icon: Star,
    description: "Detailed feature comparison",
  },
  {
    id: "credits",
    title: "Credits System",
    icon: Zap,
    description: "Understanding Replit Credits",
  },
  {
    id: "calculator",
    title: "Cost Calculator",
    icon: Calculator,
    description: "Estimate your monthly costs",
  },
  {
    id: "faq",
    title: "Pricing FAQ",
    icon: BookOpen,
    description: "Common pricing questions",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for learning and personal projects",
    popular: false,
    features: {
      included: [
        "Basic resources",
        "Public and private Repls",
        "Limited AI assistance",
        "Community access",
        "Limited deployments",
        "Collaborative editing",
      ],
      excluded: [
        "Advanced AI features",
        "Higher resource limits",
        "Priority support",
        "Custom domains",
        "Team management",
        "Advanced analytics",
      ],
    },
    ctaText: "Get Started Free",
    ctaLink: "https://replit.com/signup",
  },
  {
    name: "Core",
    price: "$20",
    period: "per month",
    description: "More resources and advanced AI for serious developers",
    popular: true,
    features: {
      included: [
        "Everything in Free",
        "More resources",
        "Advanced AI (Ghostwriter)",
        "Private deployments",
        "Higher limits",
        "Priority support",
        "Custom domains",
      ],
      excluded: [
        "Multi-user management",
        "Team analytics",
        "Classroom tools",
        "Shared team resources",
        "Organization features",
        "Enterprise support",
      ],
    },
    ctaText: "Upgrade to Core",
    ctaLink: "https://replit.com/pricing",
  },
  {
    name: "Teams",
    price: "$35",
    period: "per month",
    description: "Collaborative workspaces for organizations and classrooms",
    popular: false,
    features: {
      included: [
        "Everything in Core",
        "Multi-user management",
        "Classroom/org tools",
        "Shared resources",
        "Team analytics",
        "Advanced collaboration",
        "Organization features",
      ],
      excluded: [
        "Enterprise SLA",
        "Custom contracts",
        "Dedicated infrastructure",
        "24/7 phone support",
        "Custom integrations",
        "Compliance certifications",
      ],
    },
    ctaText: "Get Teams Plan",
    ctaLink: "https://replit.com/teams",
  },
];

const creditUsage = [
  {
    feature: "AI Code Generation",
    cost: "2-5 credits",
    description: "Per AI request for code generation or explanation",
  },
  {
    feature: "Always-On Deployment",
    cost: "100 credits/hour",
    description: "Keep your app running 24/7",
  },
  {
    feature: "Boosted Performance",
    cost: "50 credits/hour",
    description: "Enhanced CPU and memory for demanding apps",
  },
  {
    feature: "Database Operations",
    cost: "1-10 credits",
    description: "Database queries and storage operations",
  },
  {
    feature: "External API Calls",
    cost: "1-3 credits",
    description: "Outbound HTTP requests and API integrations",
  },
];

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.",
  },
  {
    question: "What happens to my credits when I downgrade?",
    answer:
      "Unused credits remain in your account and can be used according to your new plan's credit allowance.",
  },
  {
    question: "Do you offer student discounts?",
    answer:
      "Yes! Students can get significant discounts on Core and Pro plans with a valid .edu email address.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "All plans include a 7-day free trial. You can test all features before committing to a subscription.",
  },
  {
    question: "How does team billing work?",
    answer:
      "Team plans are billed per active user per month. You can add or remove team members at any time.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for enterprise accounts.",
  },
];

export default function Pricing() {
  const [currentSection, setCurrentSection] = useState("plans");
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Core");
  const [teamSize, setTeamSize] = useState(5);
  const [usageHours, setUsageHours] = useState(100);

  const calculateAnnualPrice = (monthlyPrice: string) => {
    const monthly = parseInt(monthlyPrice.replace("$", ""));
    if (monthly === 0) return "$0";
    return `$${Math.round(monthly * 12 * 0.8)}`;
  };

  const calculateTeamCost = () => {
    const basePrice = 35;
    const monthlyCost = basePrice; // Teams plan is $35/month total, not per user
    return isAnnual ? Math.round(monthlyCost * 12 * 0.8) : monthlyCost;
  };

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
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="font-semibold">Plans & Pricing</span>
            </div>
          </div>
          <Badge variant="secondary">Section 5 of 6</Badge>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-80 border-r border-border p-6 bg-muted/20 min-h-screen sticky top-16">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Pricing Guide</h3>
              <nav className="space-y-2">
                {pricingSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors text-sm flex items-center space-x-3 ${
                      currentSection === section.id
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <section.icon className="h-4 w-4 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium">{section.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {section.description}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            <Separator />

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Quick Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-xs">
                    <strong>Beginners:</strong> Start with Free plan
                  </div>
                  <div className="text-xs">
                    <strong>Students:</strong> Core plan ($20/month) for
                    advanced features
                  </div>
                  <div className="text-xs">
                    <strong>Professionals:</strong> Core plan for full
                    individual features
                  </div>
                  <div className="text-xs">
                    <strong>Organizations:</strong> Teams plan ($35/month) for
                    collaboration
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-6xl">
          {currentSection === "plans" && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">
                  Choose Your Perfect Plan
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Start free and upgrade as you grow. All plans include core
                  Replit features.
                </p>

                <div className="flex items-center justify-center space-x-4 mb-8">
                  <span
                    className={`text-sm ${!isAnnual ? "font-medium" : "text-muted-foreground"}`}
                  >
                    Monthly
                  </span>
                  <Switch
                    checked={isAnnual}
                    onCheckedChange={setIsAnnual}
                    aria-label="Toggle annual billing"
                  />
                  <span
                    className={`text-sm ${isAnnual ? "font-medium" : "text-muted-foreground"}`}
                  >
                    Annual
                  </span>
                  {isAnnual && (
                    <Badge variant="secondary" className="ml-2">
                      Save 20%
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative ${
                      plan.popular
                        ? "border-primary shadow-lg scale-105"
                        : "hover:shadow-md"
                    } transition-all`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold">
                        {isAnnual && plan.price !== "$0"
                          ? calculateAnnualPrice(plan.price)
                          : plan.price}
                      </div>
                      <CardDescription>
                        {plan.name === "Teams"
                          ? isAnnual
                            ? "per user/year"
                            : plan.period
                          : isAnnual
                            ? "per year"
                            : plan.period}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground text-center">
                        {plan.description}
                      </p>

                      <div className="space-y-2">
                        <div className="text-sm font-medium text-green-600">
                          Included:
                        </div>
                        {plan.features.included
                          .slice(0, 4)
                          .map((feature, fIndex) => (
                            <div
                              key={fIndex}
                              className="flex items-center space-x-2 text-sm"
                            >
                              <Check className="h-4 w-4 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        {plan.features.included.length > 4 && (
                          <div className="text-xs text-muted-foreground">
                            +{plan.features.included.length - 4} more features
                          </div>
                        )}
                      </div>

                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                        asChild
                      >
                        <a
                          href={plan.ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {plan.ctaText}
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  All plans include a 7-day free trial • Cancel anytime • No
                  setup fees
                </p>
              </div>
            </div>
          )}

          {currentSection === "features" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Feature Breakdown</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Compare features across all Replit plans to find the perfect
                  fit for your needs.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Interactive Feature Comparison</CardTitle>
                  <CardDescription>
                    Select features to compare across plans
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Feature</th>
                          <th className="text-center p-3 font-medium">Free</th>
                          <th className="text-center p-3 font-medium bg-primary/5">
                            Core
                          </th>
                          <th className="text-center p-3 font-medium">Teams</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Basic Resources</td>
                          <td className="text-center p-3">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center p-3 bg-primary/5">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center p-3">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">
                            AI Assistance (Limited)
                          </td>
                          <td className="text-center p-3">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center p-3 bg-primary/5">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center p-3">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">
                            Advanced AI (Ghostwriter)
                          </td>
                          <td className="text-center p-3">
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          </td>
                          <td className="text-center p-3 bg-primary/5">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center p-3">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">
                            Higher Resource Limits
                          </td>
                          <td className="text-center p-3">
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          </td>
                          <td className="text-center p-3 bg-primary/5">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center p-3">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Priority Support</td>
                          <td className="text-center p-3">
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          </td>
                          <td className="text-center p-3 bg-primary/5">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center p-3">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Custom Domains</td>
                          <td className="text-center p-3">
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          </td>
                          <td className="text-center p-3 bg-primary/5">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center p-3">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Team Management</td>
                          <td className="text-center p-3">
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          </td>
                          <td className="text-center p-3 bg-primary/5">
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          </td>
                          <td className="text-center p-3">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">
                            Organization Features
                          </td>
                          <td className="text-center p-3">
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          </td>
                          <td className="text-center p-3 bg-primary/5">
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          </td>
                          <td className="text-center p-3">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Team Analytics</td>
                          <td className="text-center p-3">
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          </td>
                          <td className="text-center p-3 bg-primary/5">
                            <X className="h-4 w-4 text-red-500 mx-auto" />
                          </td>
                          <td className="text-center p-3">
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Rocket className="h-5 w-5 text-blue-500" />
                      <span>Development Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span>Code Editor</span>
                        <Badge variant="outline">All Plans</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Multiplayer Editing</span>
                        <Badge variant="outline">All Plans</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Git Integration</span>
                        <Badge variant="outline">All Plans</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Package Management</span>
                        <Badge variant="outline">All Plans</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Database (SQLite)</span>
                        <Badge variant="outline">All Plans</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      <span>Premium Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span>Enhanced AI</span>
                        <Badge>Core+</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Always-On Deployments</span>
                        <Badge>Core+</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Private Deployments</span>
                        <Badge>Core+</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Custom Domains</span>
                        <Badge>Core+</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Priority Support</span>
                        <Badge>Core+</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-green-500" />
                      <span>Team Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span>User Management</span>
                        <Badge variant="secondary">Teams Only</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Shared Resources</span>
                        <Badge variant="secondary">Teams Only</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Team Analytics</span>
                        <Badge variant="secondary">Teams Only</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Classroom Tools</span>
                        <Badge variant="secondary">Teams Only</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Organization Management</span>
                        <Badge variant="secondary">Teams Only</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentSection === "calculator" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Cost Calculator</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Estimate your monthly costs based on your usage patterns and
                  team size.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calculator className="h-5 w-5 text-blue-500" />
                      <span>Usage Calculator</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label
                        htmlFor="plan-select"
                        className="text-sm font-medium"
                      >
                        Select Base Plan
                      </Label>
                      <select
                        id="plan-select"
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="w-full mt-2 p-2 border rounded-md"
                      >
                        <option value="Free">Free - $0/month</option>
                        <option value="Core">Core - $20/month</option>
                        <option value="Teams">Teams - $35/month</option>
                      </select>
                    </div>

                    {selectedPlan === "Teams" && (
                      <div>
                        <Label
                          htmlFor="team-size"
                          className="text-sm font-medium"
                        >
                          Team Size: {teamSize} users
                        </Label>
                        <input
                          id="team-size"
                          type="range"
                          min="1"
                          max="50"
                          value={teamSize}
                          onChange={(e) =>
                            setTeamSize(parseInt(e.target.value))
                          }
                          className="w-full mt-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>1</span>
                          <span>50+</span>
                        </div>
                      </div>
                    )}

                    <div>
                      <Label
                        htmlFor="usage-hours"
                        className="text-sm font-medium"
                      >
                        Monthly Usage Hours: {usageHours}
                      </Label>
                      <input
                        id="usage-hours"
                        type="range"
                        min="0"
                        max="500"
                        value={usageHours}
                        onChange={(e) =>
                          setUsageHours(parseInt(e.target.value))
                        }
                        className="w-full mt-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span>500+</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        Billing Frequency
                      </Label>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="monthly"
                            checked={!isAnnual}
                            onChange={() => setIsAnnual(false)}
                            className="rounded"
                          />
                          <Label htmlFor="monthly" className="text-sm">
                            Monthly
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="annual"
                            checked={isAnnual}
                            onChange={() => setIsAnnual(true)}
                            className="rounded"
                          />
                          <Label htmlFor="annual" className="text-sm">
                            Annual (20% off)
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span>Cost Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                        <span className="text-sm font-medium">Base Plan</span>
                        <span className="font-bold">
                          {selectedPlan === "Free"
                            ? "$0"
                            : selectedPlan === "Core"
                              ? isAnnual
                                ? "$192"
                                : "$20"
                              : `$${calculateTeamCost()}`}
                          {isAnnual && selectedPlan !== "Free"
                            ? "/year"
                            : "/month"}
                        </span>
                      </div>

                      {selectedPlan !== "Free" && (
                        <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div>
                            <span className="text-sm font-medium">
                              Estimated Credits
                            </span>
                            <p className="text-xs text-muted-foreground">
                              Based on {usageHours} hours/month
                            </p>
                          </div>
                          <span className="font-bold">
                            {Math.round(usageHours * 2.5)} credits
                          </span>
                        </div>
                      )}

                      {isAnnual && selectedPlan !== "Free" && (
                        <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <span className="text-sm font-medium text-green-600">
                            Annual Savings
                          </span>
                          <span className="font-bold text-green-600">
                            -$
                            {selectedPlan === "Core"
                              ? "48"
                              : Math.round(calculateTeamCost() * 0.2 * 12)}
                          </span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
                      <span className="text-lg font-bold">Total Cost</span>
                      <span className="text-xl font-bold text-primary">
                        {selectedPlan === "Free"
                          ? "$0"
                          : selectedPlan === "Core"
                            ? isAnnual
                              ? "$192/year"
                              : "$20/month"
                            : `$${calculateTeamCost()}${isAnnual ? "/year" : "/month"}`}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">What's Included:</h4>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        {selectedPlan === "Free" && (
                          <>
                            <li>• Basic development environment</li>
                            <li>• Limited AI assistance</li>
                            <li>• Community support</li>
                            <li>• Public projects</li>
                          </>
                        )}
                        {selectedPlan === "Core" && (
                          <>
                            <li>• Everything in Free</li>
                            <li>• Advanced AI (Ghostwriter)</li>
                            <li>• Higher resource limits</li>
                            <li>• Private deployments</li>
                            <li>• Priority support</li>
                            <li>• Custom domains</li>
                          </>
                        )}
                        {selectedPlan === "Teams" && (
                          <>
                            <li>• Everything in Core</li>
                            <li>• Team management for {teamSize} users</li>
                            <li>• Shared resources</li>
                            <li>• Team analytics</li>
                            <li>• Organization features</li>
                          </>
                        )}
                      </ul>
                    </div>

                    <Button className="w-full" asChild>
                      <a
                        href={`https://replit.com/pricing?plan=${selectedPlan.toLowerCase()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Started with {selectedPlan}
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Scenarios</CardTitle>
                  <CardDescription>
                    Common use cases and recommended plans
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Student/Hobbyist</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Learning to code, personal projects, experimenting
                      </p>
                      <div className="space-y-2">
                        <div className="text-xs">
                          <strong>Recommended:</strong> Free Plan
                        </div>
                        <div className="text-xs">
                          <strong>Usage:</strong> 10-20 hours/month
                        </div>
                        <div className="text-xs">
                          <strong>Cost:</strong> $0/month
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-primary/5">
                      <h4 className="font-medium mb-2">
                        Professional Developer
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Serious projects, client work, advanced features needed
                      </p>
                      <div className="space-y-2">
                        <div className="text-xs">
                          <strong>Recommended:</strong> Core Plan
                        </div>
                        <div className="text-xs">
                          <strong>Usage:</strong> 40-100 hours/month
                        </div>
                        <div className="text-xs">
                          <strong>Cost:</strong> $20/month ($192/year)
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Team/Organization</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Multiple developers, collaboration, team management
                      </p>
                      <div className="space-y-2">
                        <div className="text-xs">
                          <strong>Recommended:</strong> Teams Plan
                        </div>
                        <div className="text-xs">
                          <strong>Usage:</strong> 100+ hours/month
                        </div>
                        <div className="text-xs">
                          <strong>Cost:</strong> $35/month per team
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "credits" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Understanding Replit Credits
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Replit Credits power advanced features like AI assistance,
                  always-on deployments, and enhanced performance.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <span>How Credits Work</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                          1
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            Earn Credits
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Get credits with your subscription or purchase
                            additional credits
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                          2
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            Use Features
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Credits are automatically consumed when using
                            premium features
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                          3
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            Monitor Usage
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Track your credit balance and usage in your
                            dashboard
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Credit Allowances by Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Free Plan</span>
                        <Badge variant="outline">Limited AI uses/month</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Core Plan</span>
                        <Badge variant="secondary">More AI uses/month</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Teams Plan</span>
                        <Badge variant="default">Full AI access</Badge>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="text-xs text-muted-foreground">
                      💡 Unused credits don't expire and roll over to the next
                      month
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Credit Usage Guide</CardTitle>
                  <CardDescription>
                    Understand how credits are consumed by different features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {creditUsage.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-sm">
                            {item.feature}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.description}
                          </div>
                        </div>
                        <Badge variant="outline">{item.cost}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "faq" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Frequently Asked Questions
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Common questions about Replit pricing and billing.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HeadphonesIcon className="h-5 w-5 text-blue-500" />
                    <span>Need More Help?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Can't find the answer you're looking for? Our support team
                    is here to help.
                  </p>
                  <div className="flex space-x-3">
                    <Button size="sm" asChild>
                      <a
                        href="https://replit.com/support"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contact Support
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href="https://docs.replit.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Documentation
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-12">
            <Button variant="outline" asChild>
              <Link to="/community">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous: Community
              </Link>
            </Button>
            <Button asChild>
              <Link to="/advanced">
                Next: Advanced Usage
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
