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
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Code,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Languages,
  Users,
  GitBranch,
  Lock,
  Globe,
  Package,
  Database,
  Zap,
  Play,
  CheckCircle,
  ExternalLink,
  Copy,
  Terminal,
  FileCode,
  Share2,
  Cloud,
  Lightbulb,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const pageMetadata = {
  title: "Core Features",
  description: "Explore Replit's powerful development features and tools",
  category: "learning" as const,
  level: "intermediate" as const,
  timeToComplete: "25-35 minutes",
  prerequisites: ["Getting Started"],
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Core Features", href: "/core-features" },
];

const coreSections = [
  {
    id: "languages",
    title: "Language Support",
    icon: Languages,
    description: "50+ programming languages supported",
  },
  {
    id: "intelligence",
    title: "Code Intelligence",
    icon: Code,
    description: "Autocomplete and smart features",
  },
  {
    id: "collaboration",
    title: "Real-time Collaboration",
    icon: Users,
    description: "Multi-user editing and sharing",
  },
  {
    id: "version-control",
    title: "Version Control",
    icon: GitBranch,
    description: "Git integration and history",
  },
  {
    id: "secrets",
    title: "Secrets Management",
    icon: Lock,
    description: "Secure API key storage",
  },
  {
    id: "deployments",
    title: "Deployments",
    icon: Globe,
    description: "Static, web apps, and always-on hosting",
  },
  {
    id: "packages",
    title: "Package Management",
    icon: Package,
    description: "Dependencies and libraries",
  },
  {
    id: "database",
    title: "Replit Database",
    icon: Database,
    description: "Built-in key-value storage",
  },
];

const popularLanguages = [
  { name: "Python", usage: 85, description: "Data science, AI, web backends" },
  { name: "JavaScript", usage: 92, description: "Web development, Node.js" },
  { name: "HTML/CSS", usage: 78, description: "Web pages and styling" },
  { name: "Java", usage: 65, description: "Enterprise applications" },
  { name: "C++", usage: 45, description: "System programming, games" },
  { name: "Go", usage: 38, description: "Cloud services, APIs" },
  { name: "Rust", usage: 28, description: "System programming, WebAssembly" },
  { name: "TypeScript", usage: 55, description: "Type-safe JavaScript" },
];

const deploymentTypes = [
  {
    type: "Static Sites",
    description: "HTML, CSS, JS websites",
    features: ["Custom domains", "HTTPS", "Global CDN", "Instant deploys"],
    useCase: "Portfolio sites, documentation",
  },
  {
    type: "Web Applications",
    description: "Dynamic web apps",
    features: [
      "Server-side rendering",
      "Database connections",
      "API routes",
      "Environment variables",
    ],
    useCase: "Full-stack applications",
  },
  {
    type: "Always-On",
    description: "24/7 running services",
    features: [
      "Background processes",
      "Scheduled tasks",
      "Persistent storage",
      "High availability",
    ],
    useCase: "Bots, APIs, microservices",
  },
];

const collaborationFeatures = [
  { name: "Real-time editing", completed: false },
  { name: "Live cursor tracking", completed: false },
  { name: "Voice and video chat", completed: false },
  { name: "Comment and review", completed: false },
  { name: "Share via link", completed: false },
  { name: "Permission management", completed: false },
];

export default function CoreFeatures() {
  const [currentSection, setCurrentSection] = useState("languages");
  const [checkedFeatures, setCheckedFeatures] = useState<number[]>([]);
  const [copiedCode, setCopiedCode] = useState("");

  const toggleFeature = (index: number) => {
    setCheckedFeatures((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <PageLayout
      title="Core Features"
      description="Explore Replit's powerful development features and tools"
      breadcrumbItems={breadcrumbItems}
      metadata={pageMetadata}
    >
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-80 border-r border-border p-6 bg-muted/20 min-h-screen sticky top-16">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Core Features</h3>
              <nav className="space-y-2">
                {coreSections.map((section) => (
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

            <div>
              <h4 className="font-medium text-sm mb-3">Progress Tracker</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span>Completion</span>
                  <span>
                    {Math.round(
                      (checkedFeatures.length / collaborationFeatures.length) *
                        100,
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    (checkedFeatures.length / collaborationFeatures.length) *
                    100
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Complete the collaboration exercises to track your progress
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-5xl">
          {currentSection === "languages" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Language Support</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Replit supports over 50 programming languages with full IDE
                  features, syntax highlighting, and intelligent code
                  completion.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Languages className="h-5 w-5" />
                    <span>Popular Languages on Replit</span>
                  </CardTitle>
                  <CardDescription>
                    Based on community usage and project creation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {popularLanguages.map((lang, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">
                            {lang.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {lang.usage}%
                          </span>
                        </div>
                        <Progress value={lang.usage} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {lang.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="quick-start" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="quick-start" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Getting Started with Any Language
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Click "Create Repl" from your dashboard</li>
                        <li>
                          Search for your desired language in the template
                          gallery
                        </li>
                        <li>Select the language or framework template</li>
                        <li>Start coding immediately with full IDE support</li>
                      </ol>

                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium mb-2 text-sm">Pro Tip</h4>
                        <p className="text-sm text-muted-foreground">
                          Use the search feature in the template gallery to find
                          specific frameworks like "React", "Django", or
                          "Express" for pre-configured environments.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="templates" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Web Development
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>• React - Modern frontend framework</li>
                          <li>• Next.js - Full-stack React framework</li>
                          <li>• Vue.js - Progressive framework</li>
                          <li>• Express.js - Node.js web framework</li>
                          <li>• Django - Python web framework</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Data Science & AI
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>• Python with NumPy/Pandas</li>
                          <li>• Jupyter Notebooks</li>
                          <li>• TensorFlow/PyTorch</li>
                          <li>• R with statistical packages</li>
                          <li>• Julia for scientific computing</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Advanced Language Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Custom Runtimes</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Nix package manager</li>
                            <li>• Custom Docker containers</li>
                            <li>• Environment configuration</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Language Servers</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• IntelliSense support</li>
                            <li>• Real-time error checking</li>
                            <li>• Code formatting</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Trophy className="h-5 w-5" />
                    <span>Challenge: Multi-Language Project</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Create a project that uses multiple languages working
                    together.
                  </p>
                  <Button size="sm" asChild>
                    <a
                      href="https://replit.com/new"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start Challenge
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "collaboration" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Real-time Collaboration
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Code together with your team in real-time, share projects
                  instantly, and collaborate like never before.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Collaboration Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {collaborationFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Checkbox
                          id={`feature-${index}`}
                          checked={checkedFeatures.includes(index)}
                          onCheckedChange={() => toggleFeature(index)}
                        />
                        <label
                          htmlFor={`feature-${index}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {feature.name}
                        </label>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Share2 className="h-5 w-5" />
                      <span>Sharing Options</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          Public Sharing
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          Anyone with the link can view and fork your repl
                        </p>
                        <div className="code-block">
                          https://replit.com/@username/project-name
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          Private Collaboration
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Invite specific users to edit your private repl
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          Embed Options
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Embed your repl in websites, blogs, or documentation
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Interactive Demo: Live Collaboration</CardTitle>
                  <CardDescription>
                    Experience real-time collaboration features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Alice is editing line 15</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Bob added a comment on line 8</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Charlie is in voice chat</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button size="sm" asChild>
                      <a
                        href="https://replit.com/new/python"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Try Collaborative Editing
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm mb-2">
                      Best Practices for Team Collaboration
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>
                        • Use clear commit messages when working with version
                        control
                      </li>
                      <li>• Establish coding standards and formatting rules</li>
                      <li>
                        • Use comments to communicate context and decisions
                      </li>
                      <li>
                        • Take advantage of voice chat for complex discussions
                      </li>
                      <li>• Set up proper permissions for team members</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSection === "deployments" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Deployments</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Deploy your applications instantly with Replit's hosting
                  platform. From static sites to full-stack apps and always-on
                  services.
                </p>
              </div>

              <div className="grid gap-6">
                {deploymentTypes.map((deployment, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <Cloud className="h-5 w-5" />
                          <span>{deployment.type}</span>
                        </CardTitle>
                        <Badge variant="outline">{deployment.useCase}</Badge>
                      </div>
                      <CardDescription>
                        {deployment.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            Key Features
                          </h4>
                          <ul className="space-y-1">
                            {deployment.features.map((feature, fIndex) => (
                              <li
                                key={fIndex}
                                className="text-sm flex items-center space-x-2"
                              >
                                <CheckCircle className="h-3 w-3 text-primary" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">Best For</h4>
                          <p className="text-sm text-muted-foreground">
                            {deployment.useCase}
                          </p>
                          <Button size="sm" className="mt-3" asChild>
                            <a
                              href="https://replit.com/new"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Deploy Now
                              <ExternalLink className="h-3 w-3 ml-2" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Deployment Quick Start
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="code-block">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Deploy a React App
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            copyCode("npm run build && replit deploy")
                          }
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-sm">
                        <span className="text-blue-400">npm run</span> build
                        <br />
                        <span className="text-blue-400">replit</span> deploy
                      </div>
                    </div>

                    {copiedCode && (
                      <div className="text-xs text-green-500">
                        ✓ Copied to clipboard!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "version-control" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Version Control</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Master Git version control in Replit with built-in Git
                  integration, branching, commits, and seamless GitHub/GitLab
                  connectivity.
                </p>
              </div>

              <Tabs defaultValue="basics" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basics">Git Basics</TabsTrigger>
                  <TabsTrigger value="branching">Branching</TabsTrigger>
                  <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
                  <TabsTrigger value="integration">Integration</TabsTrigger>
                </TabsList>

                <TabsContent value="basics" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <GitBranch className="h-5 w-5" />
                          <span>Git Fundamentals</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Initialize Repository
                            </h4>
                            <div className="code-block text-xs">
                              <code>git init</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Stage Changes
                            </h4>
                            <div className="code-block text-xs">
                              <code>git add .</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Commit Changes
                            </h4>
                            <div className="code-block text-xs">
                              <code>git commit -m "Your message"</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Check Status
                            </h4>
                            <div className="code-block text-xs">
                              <code>git status</code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Interactive Git History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div>
                              <div className="text-sm font-medium">
                                feat: Add user authentication
                              </div>
                              <div className="text-xs text-muted-foreground">
                                main • 2 hours ago
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <div>
                              <div className="text-sm font-medium">
                                fix: Resolve login bug
                              </div>
                              <div className="text-xs text-muted-foreground">
                                main • 4 hours ago
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <div>
                              <div className="text-sm font-medium">
                                docs: Update README
                              </div>
                              <div className="text-xs text-muted-foreground">
                                main • 1 day ago
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Commit Best Practices</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-green-600">
                            ✅ Good Commit Messages
                          </h4>
                          <div className="space-y-2 text-xs">
                            <div className="code-block">
                              feat: Add search functionality
                            </div>
                            <div className="code-block">
                              fix: Resolve memory leak in parser
                            </div>
                            <div className="code-block">
                              docs: Update API documentation
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-red-600">
                            ❌ Poor Commit Messages
                          </h4>
                          <div className="space-y-2 text-xs">
                            <div className="code-block opacity-60">
                              Fixed stuff
                            </div>
                            <div className="code-block opacity-60">WIP</div>
                            <div className="code-block opacity-60">
                              Update file.js
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="branching" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Branching Strategies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-3">
                            Interactive Branch Visualization
                          </h4>
                          <div className="bg-muted rounded-lg p-4">
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                <span className="text-sm font-mono">main</span>
                                <div className="flex-1 h-px bg-blue-500"></div>
                                <span className="text-xs">
                                  Production ready
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 ml-8">
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-mono">
                                  feature/auth
                                </span>
                                <div className="flex-1 h-px bg-green-500"></div>
                                <span className="text-xs">In development</span>
                              </div>
                              <div className="flex items-center space-x-2 ml-8">
                                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm font-mono">
                                  hotfix/login
                                </span>
                                <div className="flex-1 h-px bg-yellow-500"></div>
                                <span className="text-xs">Bug fix</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Create Branch
                            </h4>
                            <div className="code-block text-xs">
                              <code>git checkout -b feature/new-feature</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Switch Branch
                            </h4>
                            <div className="code-block text-xs">
                              <code>git checkout main</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Merge Branch
                            </h4>
                            <div className="code-block text-xs">
                              <code>git merge feature/new-feature</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Delete Branch
                            </h4>
                            <div className="code-block text-xs">
                              <code>git branch -d feature/new-feature</code>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="collaboration" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Team Collaboration Workflow</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Push Changes
                            </h4>
                            <div className="code-block text-xs">
                              <code>git push origin feature/auth</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Pull Changes
                            </h4>
                            <div className="code-block text-xs">
                              <code>git pull origin main</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Fetch Updates
                            </h4>
                            <div className="code-block text-xs">
                              <code>git fetch --all</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Resolve Conflicts
                            </h4>
                            <div className="code-block text-xs">
                              <code>git mergetool</code>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <h4 className="font-medium text-sm mb-2">
                            Collaboration Tips:
                          </h4>
                          <ul className="text-xs space-y-1">
                            <li>• Pull before starting new work</li>
                            <li>��� Use descriptive branch names</li>
                            <li>• Keep commits small and focused</li>
                            <li>• Test before pushing</li>
                            <li>• Review code before merging</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="integration" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>GitHub Integration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Connect Repository
                            </h4>
                            <ol className="text-xs space-y-1">
                              <li>1. Click "Version Control" in sidebar</li>
                              <li>2. Select "Connect to GitHub"</li>
                              <li>3. Authorize Replit access</li>
                              <li>4. Choose repository to import</li>
                            </ol>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Push to GitHub
                            </h4>
                            <div className="code-block text-xs">
                              <code>git push origin main</code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>GitLab Integration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Setup Remote
                            </h4>
                            <div className="code-block text-xs">
                              <code>
                                git remote add origin &lt;gitlab-url&gt;
                              </code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Clone Repository
                            </h4>
                            <div className="code-block text-xs">
                              <code>git clone &lt;gitlab-repo-url&gt;</code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Trophy className="h-5 w-5 text-green-600" />
                        <span>Hands-On Exercise</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        Practice version control with this exercise:
                      </p>
                      <ol className="text-sm space-y-2">
                        <li>1. Create a new Python repl</li>
                        <li>2. Initialize Git and make your first commit</li>
                        <li>3. Create a feature branch</li>
                        <li>4. Add some code and commit changes</li>
                        <li>5. Merge back to main branch</li>
                        <li>6. Connect to GitHub and push</li>
                      </ol>
                      <Button size="sm" className="mt-4" asChild>
                        <a
                          href="https://replit.com/new/python"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Start Exercise
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentSection === "secrets" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Secrets Management</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Learn to securely manage API keys, environment variables, and
                  sensitive data in Replit with best practices and real-world
                  examples.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lock className="h-5 w-5" />
                      <span>Security Fundamentals</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          What are Secrets?
                        </h4>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• API keys and tokens</li>
                          <li>• Database connection strings</li>
                          <li>• Third-party service credentials</li>
                          <li>• Encryption keys</li>
                          <li>• OAuth client secrets</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          Why Use Secrets?
                        </h4>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Prevent credential exposure</li>
                          <li>• Enable secure collaboration</li>
                          <li>• Separate config from code</li>
                          <li>• Meet security compliance</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Demo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            Environment Variables
                          </span>
                          <Lock className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="font-mono">API_KEY</span>
                            <span className="text-muted-foreground">
                              ••••••••••••
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-mono">DATABASE_URL</span>
                            <span className="text-muted-foreground">
                              ••••••••••••
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-mono">JWT_SECRET</span>
                            <span className="text-muted-foreground">
                              ••••••••••••
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Secrets are encrypted and never visible in your code or
                        logs.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="setup" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="setup">Setup & Usage</TabsTrigger>
                  <TabsTrigger value="examples">Code Examples</TabsTrigger>
                  <TabsTrigger value="security">
                    Security Best Practices
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="setup" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Adding Secrets in Replit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Step 1: Access Secrets
                            </h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              Click the lock icon in your repl's sidebar
                            </p>
                            <div className="bg-muted rounded p-2 text-center">
                              <Lock className="h-8 w-8 mx-auto text-muted-foreground" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Step 2: Add Secret
                            </h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              Click "Add Secret" and provide key-value pair
                            </p>
                            <div className="space-y-2">
                              <Input placeholder="Secret key" size="sm" />
                              <Input
                                placeholder="Secret value"
                                type="password"
                                size="sm"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            Step 3: Access in Code
                          </h4>
                          <div className="code-block">
                            <code className="text-xs">
                              const apiKey = process.env.API_KEY;
                            </code>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="examples" className="space-y-6">
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>API Integration Example</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="code-block">
                          <pre className="text-xs overflow-x-auto">
                            <code>{`// Environment variables stored securely in Replit
const API_KEY = process.env.OPENAI_API_KEY;
const API_URL = process.env.API_BASE_URL || 'https://api.openai.com/v1';

// Validate required secrets
if (!API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is required');
}

// Use in API calls
async function generateText(prompt) {
  const response = await fetch(\`\${API_URL}/completions\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      prompt: prompt,
      max_tokens: 100
    })
  });

  return response.json();
}`}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Database Connection Example</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="code-block">
                          <pre className="text-xs overflow-x-auto">
                            <code>{`// Database credentials from environment
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Connection string
const connectionString = \`postgresql://\${DB_USER}:\${DB_PASSWORD}@\${DB_HOST}:5432/\${DB_NAME}\`;

// Initialize database connection
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test connection
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    client.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
}`}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-600">
                          ✅ Security Best Practices
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>
                              Use environment variables for all sensitive data
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Rotate secrets regularly</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>
                              Use different secrets for each environment
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Validate secrets before using them</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Use principle of least privilege</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-red-600">
                          ❌ Common Security Mistakes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            <span>Hardcoding secrets in source code</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            <span>
                              Committing .env files to version control
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            <span>Logging sensitive information</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            <span>Using weak or default passwords</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            <span>Sharing secrets via insecure channels</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-yellow-600" />
                        <span>Security Checklist</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            Before Deployment:
                          </h4>
                          <div className="space-y-1 text-xs">
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <span>
                                All secrets moved to environment variables
                              </span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <span>No hardcoded credentials in code</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <span>Secrets validation implemented</span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            Ongoing Maintenance:
                          </h4>
                          <div className="space-y-1 text-xs">
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <span>Regular secret rotation schedule</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <span>Access audit and monitoring</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded" />
                              <span>Team access review</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentSection === "packages" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Package Management</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Master package installation and management in Replit across
                  different languages with npm, pip, and other package managers.
                </p>
              </div>

              <Tabs defaultValue="npm" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="npm">NPM (Node.js)</TabsTrigger>
                  <TabsTrigger value="pip">PIP (Python)</TabsTrigger>
                  <TabsTrigger value="other">Other Languages</TabsTrigger>
                  <TabsTrigger value="troubleshooting">
                    Troubleshooting
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="npm" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Package className="h-5 w-5" />
                          <span>NPM Basics</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Install Package
                            </h4>
                            <div className="code-block text-xs">
                              <code>npm install express</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Install Dev Dependency
                            </h4>
                            <div className="code-block text-xs">
                              <code>npm install --save-dev nodemon</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Install Globally
                            </h4>
                            <div className="code-block text-xs">
                              <code>npm install -g typescript</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Uninstall Package
                            </h4>
                            <div className="code-block text-xs">
                              <code>npm uninstall express</code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Package.json Management</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Initialize Project
                            </h4>
                            <div className="code-block text-xs">
                              <code>npm init -y</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Install from package.json
                            </h4>
                            <div className="code-block text-xs">
                              <code>npm install</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Update Dependencies
                            </h4>
                            <div className="code-block text-xs">
                              <code>npm update</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Audit Security
                            </h4>
                            <div className="code-block text-xs">
                              <code>npm audit</code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Interactive Package Explorer</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="border rounded-lg p-3">
                            <h5 className="font-medium text-sm mb-2">
                              Web Framework
                            </h5>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>express</span>
                                <span className="text-muted-foreground">
                                  4.18.2
                                </span>
                              </div>
                              <p className="text-muted-foreground">
                                Fast, unopinionated web framework
                              </p>
                            </div>
                          </div>
                          <div className="border rounded-lg p-3">
                            <h5 className="font-medium text-sm mb-2">
                              Database
                            </h5>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>mongoose</span>
                                <span className="text-muted-foreground">
                                  7.4.3
                                </span>
                              </div>
                              <p className="text-muted-foreground">
                                MongoDB object modeling
                              </p>
                            </div>
                          </div>
                          <div className="border rounded-lg p-3">
                            <h5 className="font-medium text-sm mb-2">
                              Utilities
                            </h5>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span>lodash</span>
                                <span className="text-muted-foreground">
                                  4.17.21
                                </span>
                              </div>
                              <p className="text-muted-foreground">
                                JavaScript utility library
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          <Package className="h-4 w-4 mr-2" />
                          Search NPM Packages
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pip" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Package className="h-5 w-5" />
                          <span>PIP Basics</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Install Package
                            </h4>
                            <div className="code-block text-xs">
                              <code>pip install requests</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Install Specific Version
                            </h4>
                            <div className="code-block text-xs">
                              <code>pip install django==4.2.0</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Upgrade Package
                            </h4>
                            <div className="code-block text-xs">
                              <code>pip install --upgrade requests</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Uninstall Package
                            </h4>
                            <div className="code-block text-xs">
                              <code>pip uninstall requests</code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Requirements Management</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Generate requirements.txt
                            </h4>
                            <div className="code-block text-xs">
                              <code>pip freeze &gt; requirements.txt</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Install from requirements
                            </h4>
                            <div className="code-block text-xs">
                              <code>pip install -r requirements.txt</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              List Installed
                            </h4>
                            <div className="code-block text-xs">
                              <code>pip list</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Show Package Info
                            </h4>
                            <div className="code-block text-xs">
                              <code>pip show requests</code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Popular Python Packages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2">
                            Web Development
                          </h5>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span>flask</span>
                              <span className="text-muted-foreground">
                                Micro web framework
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>django</span>
                              <span className="text-muted-foreground">
                                Full-stack framework
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>fastapi</span>
                              <span className="text-muted-foreground">
                                Modern API framework
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">
                            Data Science
                          </h5>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span>pandas</span>
                              <span className="text-muted-foreground">
                                Data manipulation
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>numpy</span>
                              <span className="text-muted-foreground">
                                Numerical computing
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>matplotlib</span>
                              <span className="text-muted-foreground">
                                Data visualization
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="other" className="space-y-6">
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Other Language Package Managers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-sm mb-3">
                              Ruby (Gem)
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div className="code-block">
                                <code>gem install rails</code>
                              </div>
                              <div className="code-block">
                                <code>bundle install</code>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-3">
                              Java (Maven)
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div className="code-block">
                                <code>mvn install</code>
                              </div>
                              <div className="code-block">
                                <code>mvn dependency:resolve</code>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-3">
                              Rust (Cargo)
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div className="code-block">
                                <code>cargo add serde</code>
                              </div>
                              <div className="code-block">
                                <code>cargo build</code>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-3">
                              Go (Modules)
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div className="code-block">
                                <code>go get github.com/gin-gonic/gin</code>
                              </div>
                              <div className="code-block">
                                <code>go mod tidy</code>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="troubleshooting" className="space-y-6">
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Common Package Issues</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4">
                            <h4 className="font-medium text-sm mb-1">
                              "Package not found" Error
                            </h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              Check spelling and package name accuracy
                            </p>
                            <div className="code-block text-xs">
                              <code>npm search package-name</code>
                            </div>
                          </div>

                          <div className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4">
                            <h4 className="font-medium text-sm mb-1">
                              Version Conflicts
                            </h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              Clear cache and reinstall dependencies
                            </p>
                            <div className="code-block text-xs">
                              <code>
                                npm cache clean --force && npm install
                              </code>
                            </div>
                          </div>

                          <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4">
                            <h4 className="font-medium text-sm mb-1">
                              Permission Errors
                            </h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              Use local installation instead of global
                            </p>
                            <div className="code-block text-xs">
                              <code>npx package-name</code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Trophy className="h-5 w-5 text-green-600" />
                          <span>Package Management Exercise</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">
                          Practice package management:
                        </p>
                        <ol className="text-sm space-y-1">
                          <li>1. Create a new Node.js project</li>
                          <li>2. Install express and nodemon</li>
                          <li>3. Create a simple server</li>
                          <li>4. Add a package.json script</li>
                          <li>5. Test hot reloading with nodemon</li>
                        </ol>
                        <Button size="sm" className="mt-4" asChild>
                          <a
                            href="https://replit.com/new/nodejs"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Start Exercise
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentSection === "database" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Replit Database</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Master Replit's built-in key-value database with comprehensive
                  CRUD operations, code examples, and interactive playground.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Database className="h-5 w-5" />
                      <span>Database Overview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          What is it?
                        </h4>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Built-in key-value store</li>
                          <li>• No setup required</li>
                          <li>• Persistent data storage</li>
                          <li>• Simple JSON-based API</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          Perfect For:
                        </h4>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• User preferences</li>
                          <li>• Game scores</li>
                          <li>• Simple app data</li>
                          <li>• Prototyping</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Data Viewer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="text-sm font-medium mb-2">
                          Current Database Contents:
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="font-mono">user:123</span>
                            <span className="text-muted-foreground">
                              {"{"} name: "John" {"}"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-mono">score:456</span>
                            <span className="text-muted-foreground">1250</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-mono">settings</span>
                            <span className="text-muted-foreground">
                              {"{"} theme: "dark" {"}"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="w-full">
                        <Database className="h-4 w-4 mr-2" />
                        View Live Database
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="setup" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="setup">Setup</TabsTrigger>
                  <TabsTrigger value="crud">CRUD Operations</TabsTrigger>
                  <TabsTrigger value="examples">Code Examples</TabsTrigger>
                  <TabsTrigger value="playground">Live Playground</TabsTrigger>
                </TabsList>

                <TabsContent value="setup" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Getting Started</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            1. Install the Database Client
                          </h4>
                          <div className="code-block">
                            <code className="text-xs">
                              npm install @replit/database
                            </code>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            2. Import and Initialize
                          </h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`const Database = require('@replit/database');
const db = new Database();

// Alternative: Use environment variable
const db = new Database(process.env.REPLIT_DB_URL);`}</code>
                            </pre>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            3. Test Connection
                          </h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`async function testDB() {
  try {
    await db.set('test', 'Hello Database!');
    const value = await db.get('test');
    console.log('✅ Database connected:', value);
  } catch (error) {
    console.error('❌ Database error:', error);
  }
}`}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="crud" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Create & Update</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Set Value
                            </h4>
                            <div className="code-block text-xs">
                              <code>await db.set('key', 'value');</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Set Object
                            </h4>
                            <div className="code-block text-xs">
                              <code>
                                await db.set('user', {`{name: 'John', age: 25}`}
                                );
                              </code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Set Array
                            </h4>
                            <div className="code-block text-xs">
                              <code>
                                await db.set('scores', [100, 250, 180]);
                              </code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Read & Query</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Get Value
                            </h4>
                            <div className="code-block text-xs">
                              <code>const value = await db.get('key');</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              List Keys
                            </h4>
                            <div className="code-block text-xs">
                              <code>const keys = await db.list();</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              List with Prefix
                            </h4>
                            <div className="code-block text-xs">
                              <code>
                                const userKeys = await db.list('user:');
                              </code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Delete Operations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Delete Key
                            </h4>
                            <div className="code-block text-xs">
                              <code>await db.delete('key');</code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Delete Multiple
                            </h4>
                            <div className="code-block text-xs">
                              <code>await db.delete(['key1', 'key2']);</code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Advanced Operations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Check Exists
                            </h4>
                            <div className="code-block text-xs">
                              <code>
                                const exists = await db.get('key') !== null;
                              </code>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              Clear All
                            </h4>
                            <div className="code-block text-xs">
                              <code>await db.empty();</code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="examples" className="space-y-6">
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>User Management System</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="code-block">
                          <pre className="text-xs overflow-x-auto">
                            <code>{`const Database = require('@replit/database');
const db = new Database();

class UserManager {
  // Create new user
  async createUser(userId, userData) {
    const key = \`user:\${userId}\`;
    await db.set(key, {
      ...userData,
      createdAt: new Date().toISOString(),
      lastLogin: null
    });
    return userData;
  }

  // Get user by ID
  async getUser(userId) {
    const key = \`user:\${userId}\`;
    return await db.get(key);
  }

  // Update user data
  async updateUser(userId, updates) {
    const key = \`user:\${userId}\`;
    const currentUser = await db.get(key);
    if (!currentUser) throw new Error('User not found');

    const updatedUser = { ...currentUser, ...updates };
    await db.set(key, updatedUser);
    return updatedUser;
  }

  // Get all users
  async getAllUsers() {
    const userKeys = await db.list('user:');
    const users = {};

    for (const key of userKeys) {
      const userId = key.replace('user:', '');
      users[userId] = await db.get(key);
    }

    return users;
  }

  // Delete user
  async deleteUser(userId) {
    const key = \`user:\${userId}\`;
    await db.delete(key);
  }
}

// Usage example
const userManager = new UserManager();

// Create a user
await userManager.createUser('123', {
  name: 'John Doe',
  email: 'john@example.com',
  preferences: { theme: 'dark' }
});

// Get user
const user = await userManager.getUser('123');
console.log(user);`}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>High Score System</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="code-block">
                          <pre className="text-xs overflow-x-auto">
                            <code>{`class ScoreManager {
  // Add new score
  async addScore(playerId, score) {
    const key = \`score:\${playerId}:\${Date.now()}\`;
    const scoreData = {
      playerId,
      score,
      timestamp: new Date().toISOString()
    };

    await db.set(key, scoreData);

    // Update personal best
    const bestKey = \`best:\${playerId}\`;
    const currentBest = await db.get(bestKey) || 0;

    if (score > currentBest) {
      await db.set(bestKey, score);
    }

    return scoreData;
  }

  // Get top scores
  async getTopScores(limit = 10) {
    const scoreKeys = await db.list('score:');
    const scores = [];

    for (const key of scoreKeys) {
      const score = await db.get(key);
      scores.push(score);
    }

    // Sort by score descending
    scores.sort((a, b) => b.score - a.score);

    return scores.slice(0, limit);
  }

  // Get player's best score
  async getPersonalBest(playerId) {
    const bestKey = \`best:\${playerId}\`;
    return await db.get(bestKey) || 0;
  }

  // Get player's score history
  async getPlayerHistory(playerId) {
    const scoreKeys = await db.list(\`score:\${playerId}:\`);
    const scores = [];

    for (const key of scoreKeys) {
      const score = await db.get(key);
      scores.push(score);
    }

    // Sort by timestamp
    scores.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return scores;
  }
}

// Usage
const scoreManager = new ScoreManager();

// Add a score
await scoreManager.addScore('player123', 1500);

// Get leaderboard
const topScores = await scoreManager.getTopScores(5);
console.log('Top 5 Scores:', topScores);`}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="playground" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Code className="h-5 w-5" />
                        <span>Interactive Database Playground</span>
                      </CardTitle>
                      <CardDescription>
                        Try database operations in real-time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="db-key" className="text-sm">
                              Key
                            </Label>
                            <Input
                              id="db-key"
                              placeholder="Enter key name"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="db-value" className="text-sm">
                              Value
                            </Label>
                            <Input
                              id="db-value"
                              placeholder="Enter value (JSON supported)"
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline">
                            Set Value
                          </Button>
                          <Button size="sm" variant="outline">
                            Get Value
                          </Button>
                          <Button size="sm" variant="outline">
                            Delete Key
                          </Button>
                          <Button size="sm" variant="outline">
                            List All Keys
                          </Button>
                        </div>

                        <div>
                          <Label className="text-sm">Output:</Label>
                          <div className="mt-1 bg-muted rounded-lg p-3 min-h-[100px] text-xs font-mono">
                            <div className="text-muted-foreground">
                              Results will appear here...
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <h4 className="font-medium text-sm mb-2">
                            Try These Examples:
                          </h4>
                          <div className="grid md:grid-cols-2 gap-2 text-xs">
                            <div>
                              <strong>Simple Value:</strong>
                              <br />
                              Key: "name", Value: "John"
                            </div>
                            <div>
                              <strong>JSON Object:</strong>
                              <br />
                              Key: "user", Value: {`{"age": 25}`}
                            </div>
                            <div>
                              <strong>Array:</strong>
                              <br />
                              Key: "scores", Value: [100, 200, 300]
                            </div>
                            <div>
                              <strong>Nested Data:</strong>
                              <br />
                              Key: "settings", Value:{" "}
                              {`{"ui": {"theme": "dark"}}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Trophy className="h-5 w-5 text-green-600" />
                        <span>Database Challenge</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        Build a complete todo application using Replit Database:
                      </p>
                      <ol className="text-sm space-y-1 mb-4">
                        <li>1. Create, read, update, and delete todos</li>
                        <li>2. Mark todos as complete/incomplete</li>
                        <li>3. Add due dates and priorities</li>
                        <li>4. Implement search and filtering</li>
                        <li>5. Add user authentication</li>
                      </ol>
                      <Button size="sm" asChild>
                        <a
                          href="https://replit.com/new/nodejs"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Start Challenge
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Add similar comprehensive content for other sections */}
          {currentSection === "intelligence" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Code Intelligence</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Experience powerful autocomplete, error detection, and smart
                  code suggestions powered by language servers and AI.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>Smart Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">
                            Intelligent Autocomplete
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Context-aware suggestions
                          </div>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">
                            Real-time Error Detection
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Catch bugs as you type
                          </div>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">
                            Code Formatting
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Automatic style consistency
                          </div>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">
                            Refactoring Tools
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Safe code transformation
                          </div>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Try It Live</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="code-block">
                      <div className="text-sm">
                        <span className="text-blue-400">function</span>{" "}
                        <span className="text-yellow-400">calculateTotal</span>
                        <span className="text-white">(</span>
                        <span className="text-orange-400">items</span>
                        <span className="text-white">
                          ) {"{"}
                          {"{"}
                        </span>
                        <br />
                        {"  "}
                        <span className="text-blue-400">return</span>{" "}
                        <span className="text-orange-400">items</span>
                        <span className="text-white">.</span>
                        <span className="text-yellow-400">reduce</span>
                        <span className="text-white">((</span>
                        <span className="text-orange-400">sum, item</span>
                        <span className="text-white">) =&gt; </span>
                        <br />
                        {"    "}
                        <span className="text-orange-400">sum</span>
                        <span className="text-white"> + </span>
                        <span className="text-orange-400">item</span>
                        <span className="text-white">.</span>
                        <span className="bg-primary/20 text-primary px-1 rounded">
                          price
                        </span>
                        <span className="text-white">, </span>
                        <span className="text-green-400">0</span>
                        <span className="text-white">);</span>
                        <br />
                        <span className="text-white">{"}"}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      ✨ Autocomplete suggested "price" property
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-12">
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
        </main>
      </div>
    </div>
  );
}