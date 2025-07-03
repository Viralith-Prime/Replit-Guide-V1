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
                    <strong>Students:</strong> Core plan with education discount
                  </div>
                  <div className="text-xs">
                    <strong>Professionals:</strong> Pro plan for full features
                  </div>
                  <div className="text-xs">
                    <strong>Companies:</strong> Teams plan for collaboration
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
