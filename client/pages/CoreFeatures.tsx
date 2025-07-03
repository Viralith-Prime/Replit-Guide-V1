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
              <Code className="h-5 w-5 text-primary" />
              <span className="font-semibold">Core Features</span>
            </div>
          </div>
          <Badge variant="secondary">Section 2 of 6</Badge>
        </div>
      </header>

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
