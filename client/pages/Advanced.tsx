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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Settings,
  BookOpen,
  Terminal,
  Database,
  Globe,
  Code,
  GitBranch,
  Zap,
  Lock,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Trophy,
  Package,
  Server,
  Workflow,
  Shield,
  Monitor,
  FileCode,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProgress } from "@/components/progress-provider";
import { useAdaptiveLayout } from "@/components/adaptive-layout-provider";

const advancedSections = [
  {
    id: "environment",
    title: "Environment Variables",
    icon: Lock,
    description: "Secure configuration management",
  },
  {
    id: "shell",
    title: "Shell Mastery",
    icon: Terminal,
    description: "Command line proficiency",
  },
  {
    id: "apis",
    title: "External APIs",
    icon: Globe,
    description: "Third-party integrations",
  },
  {
    id: "nix",
    title: "Nix Packages",
    icon: Package,
    description: "System dependencies",
  },
  {
    id: "deployment",
    title: "Custom Deployments",
    icon: Server,
    description: "Advanced hosting configurations",
  },
  {
    id: "performance",
    title: "Performance Optimization",
    icon: Zap,
    description: "Speed and efficiency",
  },
  {
    id: "databases",
    title: "Database Integration",
    icon: Database,
    description: "Data persistence strategies",
  },
  {
    id: "cicd",
    title: "CI/CD Workflows",
    icon: Workflow,
    description: "Automated deployment pipelines",
  },
];

const environmentExamples = [
  {
    name: "DATABASE_URL",
    value: "postgresql://user:pass@host:5432/db",
    description: "Database connection string",
    sensitive: true,
  },
  {
    name: "API_KEY",
    value: "sk-1234567890abcdef",
    description: "Third-party service API key",
    sensitive: true,
  },
  {
    name: "NODE_ENV",
    value: "production",
    description: "Application environment",
    sensitive: false,
  },
  {
    name: "PORT",
    value: "3000",
    description: "Server port number",
    sensitive: false,
  },
];

const shellCommands = [
  {
    category: "File Operations",
    commands: [
      { cmd: "ls -la", desc: "List all files with details" },
      { cmd: "find . -name '*.js'", desc: "Find all JavaScript files" },
      { cmd: "grep -r 'TODO' .", desc: "Search for TODO comments" },
      { cmd: "du -sh *", desc: "Check directory sizes" },
    ],
  },
  {
    category: "Process Management",
    commands: [
      { cmd: "ps aux", desc: "List running processes" },
      { cmd: "kill -9 <pid>", desc: "Force kill a process" },
      { cmd: "nohup node app.js &", desc: "Run process in background" },
      { cmd: "jobs", desc: "List active background jobs" },
    ],
  },
  {
    category: "Git Operations",
    commands: [
      { cmd: "git log --oneline", desc: "View commit history" },
      { cmd: "git reset --hard HEAD~1", desc: "Reset to previous commit" },
      { cmd: "git stash pop", desc: "Apply and remove stashed changes" },
      { cmd: "git branch -d feature-branch", desc: "Delete local branch" },
    ],
  },
];

const nixPackages = [
  {
    name: "postgresql",
    description: "PostgreSQL database server",
    usage: "nix-env -iA nixpkgs.postgresql",
    category: "Database",
  },
  {
    name: "redis",
    description: "In-memory data structure store",
    usage: "nix-env -iA nixpkgs.redis",
    category: "Cache",
  },
  {
    name: "imagemagick",
    description: "Image manipulation toolkit",
    usage: "nix-env -iA nixpkgs.imagemagick",
    category: "Media",
  },
  {
    name: "ffmpeg",
    description: "Video processing library",
    usage: "nix-env -iA nixpkgs.ffmpeg",
    category: "Media",
  },
];

const performanceOptimizations = [
  {
    title: "Code Splitting",
    description: "Break large bundles into smaller chunks",
    implementation: "Use dynamic imports: import('./component')",
    impact: "30-50% faster initial load",
  },
  {
    title: "Caching Strategies",
    description: "Implement smart caching for API calls",
    implementation: "Use Cache-Control headers and service workers",
    impact: "60-80% faster subsequent loads",
  },
  {
    title: "Database Indexing",
    description: "Optimize database queries with proper indexes",
    implementation: "CREATE INDEX idx_user_email ON users(email)",
    impact: "10-100x faster queries",
  },
  {
    title: "Image Optimization",
    description: "Compress and serve images efficiently",
    implementation: "Use WebP format and responsive images",
    impact: "40-70% smaller image sizes",
  },
];

export default function Advanced() {
  const [currentSection, setCurrentSection] = useState("environment");
  const [envVariables, setEnvVariables] = useState(environmentExamples);
  const [copiedCode, setCopiedCode] = useState("");
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const { markSectionVisited, markExerciseCompleted } = useProgress();
  const { deviceInfo, getAdaptiveStyles } = useAdaptiveLayout();

  useEffect(() => {
    markSectionVisited("advanced");
  }, [markSectionVisited]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const newTasks = prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId];

      if (!prev.includes(taskId)) {
        markExerciseCompleted(`advanced-${taskId}`);
      }

      return newTasks;
    });
  };

  return (
    <div className={getAdaptiveStyles("min-h-screen bg-background")}>
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
              <Settings className="h-5 w-5 text-primary" />
              <span className="font-semibold">Advanced Usage</span>
            </div>
          </div>
          <Badge variant="secondary">Section 6 of 6</Badge>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-80 border-r border-border p-6 bg-muted/20 min-h-screen sticky top-16">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Advanced Topics</h3>
              <nav className="space-y-2">
                {advancedSections.map((section) => (
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
                  <span>Tasks Completed</span>
                  <span>
                    {completedTasks.length}/{advancedSections.length}
                  </span>
                </div>
                <Progress
                  value={
                    (completedTasks.length / advancedSections.length) * 100
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Complete exercises to master advanced concepts
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-5xl">
          {currentSection === "environment" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Environment Variables & Configuration
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Learn to securely manage sensitive data and configuration
                  using Replit's secrets management system.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lock className="h-5 w-5" />
                      <span>Secrets Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-3 text-sm">
                      <li>Click the lock icon in your Repl's sidebar</li>
                      <li>Add a new secret with key and value</li>
                      <li>Access in code using process.env.SECRET_NAME</li>
                      <li>Never commit secrets to version control</li>
                    </ol>

                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <div className="text-xs">
                          <strong>Security Tip:</strong> Always use secrets for
                          API keys, passwords, and tokens.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Common Environment Variables</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {envVariables.map((env, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg bg-muted/20 border"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <code className="font-mono text-sm font-medium">
                              {env.name}
                            </code>
                            {env.sensitive && (
                              <Badge variant="destructive" className="text-xs">
                                Sensitive
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {env.description}
                          </p>
                          <code className="text-xs bg-muted rounded px-2 py-1">
                            {env.sensitive ? "••••••••••••" : env.value}
                          </code>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Code Example: Using Environment Variables
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="code-block relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">
                          Node.js Example
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            copyCode(`// Load environment variables
const API_KEY = process.env.API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

// Validate required variables
if (!API_KEY) {
  throw new Error('API_KEY environment variable is required');
}

// Use in your application
const response = await fetch('https://api.example.com/data', {
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`
  }
});`)
                          }
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <pre className="text-sm overflow-x-auto">
                        <code>{`// Load environment variables
const API_KEY = process.env.API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

// Validate required variables
if (!API_KEY) {
  throw new Error('API_KEY environment variable is required');
}

// Use in your application
const response = await fetch('https://api.example.com/data', {
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`
  }
});`}</code>
                      </pre>
                    </div>

                    {copiedCode && (
                      <div className="text-xs text-green-500">
                        ✓ Code copied to clipboard!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-green-600" />
                    <span>Hands-On Exercise</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      Create a secure configuration system for a web
                      application:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="env-task-1"
                          checked={completedTasks.includes("env-secrets")}
                          onChange={() => toggleTask("env-secrets")}
                          className="rounded"
                        />
                        <label htmlFor="env-task-1" className="text-sm">
                          Set up three secrets: API_KEY, DATABASE_URL, and
                          JWT_SECRET
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="env-task-2"
                          checked={completedTasks.includes("env-validation")}
                          onChange={() => toggleTask("env-validation")}
                          className="rounded"
                        />
                        <label htmlFor="env-task-2" className="text-sm">
                          Write validation code to check required environment
                          variables
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="env-task-3"
                          checked={completedTasks.includes("env-usage")}
                          onChange={() => toggleTask("env-usage")}
                          className="rounded"
                        />
                        <label htmlFor="env-task-3" className="text-sm">
                          Implement a secure API client using the stored secrets
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "shell" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Shell Mastery</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Master the command line interface in Replit for efficient
                  development workflows and system administration.
                </p>
              </div>

              <Tabs defaultValue="basics" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basics">Basic Commands</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced Usage</TabsTrigger>
                  <TabsTrigger value="automation">Automation</TabsTrigger>
                  <TabsTrigger value="troubleshooting">
                    Troubleshooting
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basics" className="space-y-6">
                  <div className="grid gap-6">
                    {shellCommands.map((category, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {category.category}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {category.commands.map((command, cmdIndex) => (
                              <div
                                key={cmdIndex}
                                className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                              >
                                <div>
                                  <code className="font-mono text-sm font-medium">
                                    {command.cmd}
                                  </code>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {command.desc}
                                  </p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyCode(command.cmd)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Shell Techniques</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">
                            Pipes and Redirection
                          </h4>
                          <div className="code-block">
                            <code>{`# Chain commands with pipes
ps aux | grep node | awk '{print $2}' | xargs kill

# Redirect output to file
npm install > install.log 2>&1

# Append to file
echo "Build completed" >> build.log`}</code>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">
                            Process Management
                          </h4>
                          <div className="code-block">
                            <code>{`# Run in background
node server.js &

# Monitor process
watch -n 1 'ps aux | grep node'

# Kill all node processes
pkill -f node`}</code>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="automation" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Shell Scripting for Automation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="code-block">
                        <pre className="text-sm overflow-x-auto">
                          <code>{`#!/bin/bash
# Deployment script example

set -e  # Exit on any error

echo "Starting deployment..."

# Install dependencies
npm ci

# Run tests
npm test

# Build application
npm run build

# Deploy to production
if [ "$1" = "production" ]; then
  echo "Deploying to production..."
  # Production deployment commands
else
  echo "Deploying to staging..."
  # Staging deployment commands
fi

echo "Deployment completed successfully!"`}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="troubleshooting" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Common Issues & Solutions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4">
                          <h4 className="font-medium text-sm mb-1">
                            Permission Denied
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Solution: Check file permissions and use chmod if
                            needed
                          </p>
                          <code className="text-xs bg-muted rounded px-2 py-1">
                            chmod +x script.sh
                          </code>
                        </div>

                        <div className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4">
                          <h4 className="font-medium text-sm mb-1">
                            Command Not Found
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Solution: Install the package or check PATH
                          </p>
                          <code className="text-xs bg-muted rounded px-2 py-1">
                            which command_name || npm install -g package
                          </code>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentSection === "nix" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Nix Packages</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Install and manage system dependencies using Nix package
                  manager for reproducible development environments.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Getting Started with Nix</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">What is Nix?</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Reproducible package management</li>
                          <li>• Isolated environments</li>
                          <li>• Declarative configuration</li>
                          <li>• Rollback capabilities</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Why Use Nix?</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Consistent across environments</li>
                          <li>• No dependency conflicts</li>
                          <li>• Easy to share configurations</li>
                          <li>• Atomic upgrades and rollbacks</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {nixPackages.map((pkg, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{pkg.name}</CardTitle>
                        <Badge variant="outline">{pkg.category}</Badge>
                      </div>
                      <CardDescription>{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="code-block text-xs">
                        <div className="flex items-center justify-between mb-2">
                          <span>Installation Command:</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyCode(pkg.usage)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <code>{pkg.usage}</code>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Creating a Nix Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Create a <code>replit.nix</code> file to define your
                      project's dependencies:
                    </p>
                    <div className="code-block">
                      <pre className="text-sm overflow-x-auto">
                        <code>{`{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.postgresql
    pkgs.redis
    pkgs.imagemagick
    pkgs.ffmpeg
  ];

  env = {
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.postgresql
    ];
  };
}`}</code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "performance" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Performance Optimization
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Learn advanced techniques to optimize your applications for
                  speed, efficiency, and scalability.
                </p>
              </div>

              <div className="grid gap-6">
                {performanceOptimizations.map((optimization, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        <span>{optimization.title}</span>
                      </CardTitle>
                      <CardDescription>
                        {optimization.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            Implementation:
                          </h4>
                          <code className="text-xs bg-muted rounded p-2 block">
                            {optimization.implementation}
                          </code>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            Performance Impact:
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-600">
                              {optimization.impact}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Monitor className="h-5 w-5 text-blue-500" />
                    <span>Performance Monitoring</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      Essential metrics to track for optimal performance:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          Core Web Vitals:
                        </h4>
                        <ul className="text-xs space-y-1">
                          <li>• Largest Contentful Paint (LCP) &lt; 2.5s</li>
                          <li>��� First Input Delay (FID) &lt; 100ms</li>
                          <li>• Cumulative Layout Shift (CLS) &lt; 0.1</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          Server Metrics:
                        </h4>
                        <ul className="text-xs space-y-1">
                          <li>• Response time &lt; 200ms</li>
                          <li>• CPU usage &lt; 70%</li>
                          <li>• Memory usage &lt; 80%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "apis" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">External APIs</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Learn to integrate third-party APIs and services into your
                  Replit projects with proper authentication and error handling.
                </p>
              </div>

              <Tabs defaultValue="basics" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basics">API Basics</TabsTrigger>
                  <TabsTrigger value="auth">Authentication</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
                </TabsList>

                <TabsContent value="basics" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Globe className="h-5 w-5 text-blue-500" />
                          <span>Making API Requests</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="code-block">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium">Fetch API</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  copyCode(`// Basic GET request
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}`)
                                }
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <pre className="text-xs overflow-x-auto">
                              <code>{`// Basic GET request
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}`}</code>
                            </pre>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>POST Requests with Data</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="code-block">
                          <pre className="text-xs overflow-x-auto">
                            <code>{`// POST request with JSON data
async function postData(userData) {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${process.env.API_KEY}\`
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('POST error:', error);
    throw error;
  }
}`}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Common HTTP Methods</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <h4 className="font-medium text-green-600 mb-1">GET</h4>
                          <p className="text-xs text-muted-foreground">
                            Retrieve data from server
                          </p>
                        </div>
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <h4 className="font-medium text-blue-600 mb-1">POST</h4>
                          <p className="text-xs text-muted-foreground">
                            Create new resources
                          </p>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <h4 className="font-medium text-yellow-600 mb-1">PUT</h4>
                          <p className="text-xs text-muted-foreground">
                            Update existing resources
                          </p>
                        </div>
                        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <h4 className="font-medium text-red-600 mb-1">DELETE</h4>
                          <p className="text-xs text-muted-foreground">
                            Remove resources
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="auth" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>API Authentication Methods</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-3">1. API Keys</h4>
                          <div className="code-block text-xs">
                            <code>{`// Header-based API key
const headers = {
  'X-API-Key': process.env.API_KEY,
  'Content-Type': 'application/json'
};

// Query parameter API key
const url = \`https://api.example.com/data?api_key=\${process.env.API_KEY}\`;`}</code>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">2. Bearer Tokens</h4>
                          <div className="code-block text-xs">
                            <code>{`// JWT or OAuth token
const headers = {
  'Authorization': \`Bearer \${process.env.ACCESS_TOKEN}\`,
  'Content-Type': 'application/json'
};`}</code>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">3. Basic Authentication</h4>
                          <div className="code-block text-xs">
                            <code>{`// Username and password
const credentials = btoa(\`\${username}:\${password}\`);
const headers = {
  'Authorization': \`Basic \${credentials}\`,
  'Content-Type': 'application/json'
};`}</code>
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
                        <CardTitle>Example: Weather API Integration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="code-block">
                          <pre className="text-xs overflow-x-auto">
                            <code>{`class WeatherService {
  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY;
    this.baseURL = 'https://api.openweathermap.org/data/2.5';
  }

  async getCurrentWeather(city) {
    try {
      const url = \`\${this.baseURL}/weather?q=\${city}&appid=\${this.apiKey}&units=metric\`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(\`Weather API error: \${response.status}\`);
      }

      const data = await response.json();
      return {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity
      };
    } catch (error) {
      console.error('Weather fetch error:', error);
      throw error;
    }
  }
}

// Usage
const weather = new WeatherService();
const londonWeather = await weather.getCurrentWeather('London');`}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Example: GitHub API Integration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="code-block">
                          <pre className="text-xs overflow-x-auto">
                            <code>{`class GitHubService {
  constructor() {
    this.token = process.env.GITHUB_TOKEN;
    this.baseURL = 'https://api.github.com';
  }

  async getUserRepos(username) {
    try {
      const response = await fetch(\`\${this.baseURL}/users/\${username}/repos\`, {
        headers: {
          'Authorization': \`token \${this.token}\`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      const repos = await response.json();
      return repos.map(repo => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        language: repo.language,
        url: repo.html_url
      }));
    } catch (error) {
      console.error('GitHub API error:', error);
      throw error;
    }
  }
}`}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="best-practices" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Error Handling</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>�� Always check response status codes</li>
                          <li>• Implement proper try-catch blocks</li>
                          <li>• Handle network timeouts gracefully</li>
                          <li>• Provide meaningful error messages</li>
                          <li>• Log errors for debugging</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Rate Limiting</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>• Respect API rate limits</li>
                          <li>• Implement exponential backoff</li>
                          <li>• Cache responses when possible</li>
                          <li>• Use batch requests for bulk operations</li>
                          <li>• Monitor usage quotas</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Security Best Practices</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3 text-green-600">✅ Do:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Store API keys in environment variables</li>
                            <li>• Use HTTPS for all API calls</li>
                            <li>• Validate and sanitize input data</li>
                            <li>• Implement proper CORS policies</li>
                            <li>• Use short-lived tokens when possible</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3 text-red-600">❌ Don't:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Hardcode API keys in source code</li>
                            <li>• Expose sensitive data in URLs</li>
                            <li>• Skip input validation</li>
                            <li>• Use HTTP for sensitive operations</li>
                            <li>• Store tokens in localStorage</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentSection === "deployment" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Custom Deployments</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Advanced deployment strategies, custom domains, environment
                  configuration, and production optimization techniques.
                </p>
              </div>

              <Tabs defaultValue="deployment-types" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="deployment-types">Deployment Types</TabsTrigger>
                  <TabsTrigger value="custom-domains">Custom Domains</TabsTrigger>
                  <TabsTrigger value="optimization">Optimization</TabsTrigger>
                  <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                </TabsList>

                <TabsContent value="deployment-types" className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Server className="h-5 w-5 text-blue-500" />
                          <span>Static Deployment</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Perfect for React, Vue, Angular, and static sites
                          </p>
                          <div className="code-block text-xs">
                            <code>{`# Build command
npm run build

# Output directory
dist/ or build/

# Deploy
replit deploy`}</code>
                          </div>
                          <div className="text-xs">
                            <strong>Best for:</strong> SPAs, documentation sites, portfolios
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Zap className="h-5 w-5 text-green-500" />
                          <span>Server Deployment</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Node.js, Python, Go servers with dynamic content
                          </p>
                          <div className="code-block text-xs">
                            <code>{`# Start command
npm start

# Port configuration
PORT=3000

# Always-on option
replit deploy --always-on`}</code>
                          </div>
                          <div className="text-xs">
                            <strong>Best for:</strong> APIs, web apps, real-time applications
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Database className="h-5 w-5 text-purple-500" />
                          <span>Full-Stack Deployment</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Complete applications with frontend, backend, and database
                          </p>
                          <div className="code-block text-xs">
                            <code>{`# Multi-service setup
frontend: React app
backend: Express server
database: PostgreSQL

# Docker compose
docker-compose up`}</code>
                          </div>
                          <div className="text-xs">
                            <strong>Best for:</strong> Complete web applications, SaaS products
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Deployment Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">replit.toml Configuration</h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`[deployment]
run = "npm start"
deploymentTarget = "cloudrun"
ignoredPaths = ["node_modules", ".git", "*.md"]

[env]
NODE_ENV = "production"
PORT = "3000"

[packager]
language = "nodejs"

[nix]
channel = "stable-22_11"

[languages.javascript]
pattern = "**/{*.js,*.jsx,*.ts,*.tsx,*.json}"
syntax = "javascript"

[languages.javascript.languageServer]
start = "typescript-language-server --stdio"`}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="custom-domains" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Setting Up Custom Domains</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-3">Step 1: Domain Setup</h4>
                            <ol className="list-decimal list-inside space-y-2 text-sm">
                              <li>Purchase domain from registrar</li>
                              <li>Go to Replit deployment settings</li>
                              <li>Add custom domain</li>
                              <li>Copy provided DNS records</li>
                            </ol>
                          </div>
                          <div>
                            <h4 className="font-medium mb-3">Step 2: DNS Configuration</h4>
                            <div className="code-block text-xs">
                              <code>{`# DNS Records to add:
Type: CNAME
Name: www
Value: your-repl.replit.app

Type: A
Name: @
Value: [Replit IP address]`}</code>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <h4 className="font-medium text-sm mb-2">SSL Certificate</h4>
                          <p className="text-xs text-muted-foreground">
                            Replit automatically provides SSL certificates for custom domains.
                            It may take 24-48 hours for DNS propagation and certificate
                            issuance to complete.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Domain Management Best Practices</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Domain Security:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Enable domain lock/protection</li>
                            <li>• Use strong registrar passwords</li>
                            <li>• Enable two-factor authentication</li>
                            <li>• Monitor domain expiration dates</li>
                            <li>• Set up auto-renewal</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Performance:</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Use CDN for static assets</li>
                            <li>• Enable compression</li>
                            <li>• Configure caching headers</li>
                            <li>• Optimize DNS TTL values</li>
                            <li>• Monitor page load times</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="optimization" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Production Optimization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-3">Environment Variables</h4>
                          <div className="code-block text-xs">
                            <code>{`# Production environment setup
NODE_ENV=production
REPLIT_DB_URL=your_database_url
API_BASE_URL=https://api.yourapp.com
LOG_LEVEL=warn
CACHE_TTL=3600`}</code>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Build Optimization</h4>
                          <div className="code-block text-xs">
                            <code>{`// webpack.config.js optimizations
module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    filename: '[name].[contenthash].js',
  },
};`}</code>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Caching Strategy</h4>
                          <div className="code-block text-xs">
                            <code>{`// Express.js caching middleware
app.use('/static', express.static('public', {
  maxAge: '1y',
  etag: false
}));

// API response caching
app.get('/api/data', cache('5 minutes'), (req, res) => {
  // Expensive operation
  res.json(data);
});`}</code>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="monitoring" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Monitoring</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Health Checks</h4>
                          <div className="code-block text-xs">
                            <code>{`// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});`}</code>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Error Logging</h4>
                          <div className="code-block text-xs">
                            <code>{`// Winston logger setup
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error'
    })
  ]
});`}</code>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-4 gap-3">
                          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <h4 className="font-medium text-sm mb-1">Response Time</h4>
                            <p className="text-xs text-muted-foreground">
                              Target: &lt; 200ms
                            </p>
                          </div>
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h4 className="font-medium text-sm mb-1">Uptime</h4>
                            <p className="text-xs text-muted-foreground">
                              Target: 99.9%
                            </p>
                          </div>
                          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <h4 className="font-medium text-sm mb-1">Memory Usage</h4>
                            <p className="text-xs text-muted-foreground">
                              Monitor: &lt; 80%
                            </p>
                          </div>
                          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <h4 className="font-medium text-sm mb-1">Error Rate</h4>
                            <p className="text-xs text-muted-foreground">
                              Target: &lt; 1%
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentSection === "databases" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Database Integration</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Comprehensive guide to integrating databases in Replit, from
                  simple SQLite to advanced PostgreSQL and MongoDB setups.
                </p>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Database Options</TabsTrigger>
                  <TabsTrigger value="setup">Setup & Configuration</TabsTrigger>
                  <TabsTrigger value="operations">CRUD Operations</TabsTrigger>
                  <TabsTrigger value="optimization">Optimization</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Database className="h-5 w-5 text-blue-500" />
                          <span>Replit Database</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Built-in key-value store, perfect for simple data storage
                          </p>
                          <div className="space-y-2">
                            <div className="text-xs">
                              <strong>Pros:</strong> Zero setup, automatic scaling, simple API
                            </div>
                            <div className="text-xs">
                              <strong>Cons:</strong> Key-value only, limited querying
                            </div>
                            <div className="text-xs">
                              <strong>Best for:</strong> User preferences, cache, simple data
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <FileCode className="h-5 w-5 text-green-500" />
                          <span>SQLite</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Lightweight SQL database stored as a file
                          </p>
                          <div className="space-y-2">
                            <div className="text-xs">
                              <strong>Pros:</strong> Full SQL, ACID compliance, no server needed
                            </div>
                            <div className="text-xs">
                              <strong>Cons:</strong> Single-writer, size limitations
                            </div>
                            <div className="text-xs">
                              <strong>Best for:</strong> Development, prototypes, small apps
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Server className="h-5 w-5 text-purple-500" />
                          <span>External Databases</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            PostgreSQL, MongoDB, MySQL hosted externally
                          </p>
                          <div className="space-y-2">
                            <div className="text-xs">
                              <strong>Pros:</strong> Full features, scalability, concurrent access
                            </div>
                            <div className="text-xs">
                              <strong>Cons:</strong> Additional cost, network latency
                            </div>
                            <div className="text-xs">
                              <strong>Best for:</strong> Production apps, complex queries
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Choosing the Right Database</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-3">Decision Matrix:</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Simple key-value storage:</span>
                                <Badge variant="outline">Replit DB</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>Prototyping with SQL:</span>
                                <Badge variant="outline">SQLite</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>Production web app:</span>
                                <Badge variant="outline">PostgreSQL</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>Document storage:</span>
                                <Badge variant="outline">MongoDB</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>Real-time applications:</span>
                                <Badge variant="outline">Redis + Primary DB</Badge>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-3">Scalability Considerations:</h4>
                            <ul className="space-y-1 text-sm">
                              <li>• Read/write patterns</li>
                              <li>• Concurrent user count</li>
                              <li>• Data size and growth</li>
                              <li>• Query complexity</li>
                              <li>• Backup and recovery needs</li>
                              <li>• Geographic distribution</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="setup" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Database Setup Examples</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-3">1. Replit Database Setup</h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`// Install client
npm install @replit/database

// Initialize
const Database = require('@replit/database');
const db = new Database();

// Basic usage
await db.set('user:123', { name: 'John', email: 'john@example.com' });
const user = await db.get('user:123');

// List keys
const userKeys = await db.list('user:');`}</code>
                            </pre>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">2. SQLite Setup</h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`// Install SQLite
npm install sqlite3

// Initialize database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Create table
db.serialize(() => {
  db.run(\`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )\`);
});`}</code>
                            </pre>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">3. PostgreSQL Setup</h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`// Install PostgreSQL client
npm install pg

// Environment variables
DATABASE_URL=postgresql://username:password@host:5432/database

// Initialize connection
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});`}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="operations" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>CRUD Operations Examples</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-3">User Management Service</h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`class UserService {
  constructor(db) {
    this.db = db;
  }

  // Create user
  async createUser(userData) {
    const query = \`
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    \`;

    const result = await this.db.query(query, [
      userData.name,
      userData.email,
      userData.passwordHash
    ]);

    return result.rows[0];
  }

  // Read user
  async getUserById(id) {
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1';
    const result = await this.db.query(query, [id]);
    return result.rows[0];
  }

  // Update user
  async updateUser(id, updates) {
    const setClause = Object.keys(updates)
      .map((key, index) => \`\${key} = $\${index + 2}\`)
      .join(', ');

    const query = \`
      UPDATE users
      SET \${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id, name, email, updated_at
    \`;

    const values = [id, ...Object.values(updates)];
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  // Delete user
  async deleteUser(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
    const result = await this.db.query(query, [id]);
    return result.rows[0];
  }

  // List users with pagination
  async listUsers(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = \`
      SELECT id, name, email, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    \`;

    const result = await this.db.query(query, [limit, offset]);
    return result.rows;
  }
}`}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Query Patterns</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Transactions</h4>
                          <div className="code-block text-xs">
                            <code>{`// Safe money transfer
async function transferMoney(fromId, toId, amount) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Debit from account
    await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
      [amount, fromId]
    );

    // Credit to account
    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, toId]
    );

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}`}</code>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Joins & Aggregation</h4>
                          <div className="code-block text-xs">
                            <code>{`// User posts with comment count
async function getUserPostsWithComments(userId) {
  const query = \`
    SELECT
      p.id,
      p.title,
      p.content,
      p.created_at,
      COUNT(c.id) as comment_count
    FROM posts p
    LEFT JOIN comments c ON p.id = c.post_id
    WHERE p.user_id = $1
    GROUP BY p.id, p.title, p.content, p.created_at
    ORDER BY p.created_at DESC
  \`;

  const result = await db.query(query, [userId]);
  return result.rows;
}`}</code>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="optimization" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Optimization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-3">Indexing Strategy</h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`-- Create indexes for common queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- Composite index for complex queries
CREATE INDEX idx_posts_user_status ON posts(user_id, status, created_at);

-- Partial index for specific conditions
CREATE INDEX idx_active_users ON users(created_at) WHERE status = 'active';`}</code>
                            </pre>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Connection Pooling</h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`// PostgreSQL connection pool configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                    // Maximum number of connections
  idleTimeoutMillis: 30000,   // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Timeout after 2s
  maxUses: 7500,              // Close connection after 7500 uses
});

// Proper connection handling
async function queryDatabase(query, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } finally {
    client.release(); // Always release the connection
  }
}`}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Caching Strategies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">In-Memory Caching</h4>
                          <div className="code-block text-xs">
                            <code>{`// Simple LRU cache
const NodeCache = require('node-cache');
const cache = new NodeCache({
  stdTTL: 600,  // 10 minutes
  maxKeys: 1000
});

async function getCachedUser(id) {
  const cacheKey = \`user:\${id}\`;
  let user = cache.get(cacheKey);

  if (!user) {
    user = await getUserFromDB(id);
    cache.set(cacheKey, user);
  }

  return user;
}`}</code>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Query Result Caching</h4>
                          <div className="code-block text-xs">
                            <code>{`// Cache expensive aggregations
async function getPopularPosts() {
  const cacheKey = 'popular_posts';
  let posts = cache.get(cacheKey);

  if (!posts) {
    posts = await db.query(\`
      SELECT * FROM posts
      WHERE created_at > NOW() - INTERVAL '7 days'
      ORDER BY view_count DESC
      LIMIT 10
    \`);

    // Cache for 1 hour
    cache.set(cacheKey, posts.rows, 3600);
  }

  return posts;
}`}</code>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentSection === "cicd" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">CI/CD Workflows</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Implement continuous integration and deployment pipelines to
                  automate testing, building, and deploying your Replit projects.
                </p>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">CI/CD Overview</TabsTrigger>
                  <TabsTrigger value="github-actions">GitHub Actions</TabsTrigger>
                  <TabsTrigger value="testing">Testing Pipeline</TabsTrigger>
                  <TabsTrigger value="deployment">Deployment Pipeline</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Workflow className="h-5 w-5 text-blue-500" />
                          <span>Continuous Integration</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Automatically build and test code changes
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Run tests on every commit</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Code quality checks</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Security vulnerability scanning</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Build artifact generation</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Rocket className="h-5 w-5 text-green-500" />
                          <span>Continuous Deployment</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Automatically deploy successful builds
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Automatic deployment to staging</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Production deployment approval</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Rollback capabilities</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Environment-specific configs</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>CI/CD Pipeline Flow</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between bg-muted/20 p-4 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                              1
                            </div>
                            <div>
                              <h4 className="font-medium">Code Commit</h4>
                              <p className="text-xs text-muted-foreground">
                                Developer pushes code to repository
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>

                        <div className="flex items-center justify-between bg-muted/20 p-4 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                              2
                            </div>
                            <div>
                              <h4 className="font-medium">Automated Testing</h4>
                              <p className="text-xs text-muted-foreground">
                                Run unit tests, integration tests, linting
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>

                        <div className="flex items-center justify-between bg-muted/20 p-4 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                              3
                            </div>
                            <div>
                              <h4 className="font-medium">Build & Package</h4>
                              <p className="text-xs text-muted-foreground">
                                Create deployment artifacts
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>

                        <div className="flex items-center justify-between bg-muted/20 p-4 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                              4
                            </div>
                            <div>
                              <h4 className="font-medium">Deploy to Staging</h4>
                              <p className="text-xs text-muted-foreground">
                                Automatic deployment for testing
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>

                        <div className="flex items-center bg-muted/20 p-4 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                              5
                            </div>
                            <div>
                              <h4 className="font-medium">Production Deployment</h4>
                              <p className="text-xs text-muted-foreground">
                                Manual approval or automatic deployment
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="github-actions" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>GitHub Actions Workflow</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Create a <code>.github/workflows/ci-cd.yml</code> file in your repository:
                        </p>
                        <div className="code-block">
                          <pre className="text-xs overflow-x-auto">
                            <code>{`name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x]

    steps:
    - uses: actions/checkout@v3

    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run linting
      run: npm run lint

    - name: Run tests
      run: npm test

    - name: Run security audit
      run: npm audit --audit-level high

    - name: Upload coverage reports
    uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info

  build:
    needs: test
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build project
      run: npm run build

    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: dist/

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'

    steps:
    - name: Deploy to Staging
      run: |
        echo "Deploying to staging environment..."
        # Add your staging deployment commands here

  deploy-production:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production

    steps:
    - name: Deploy to Production
      run: |
        echo "Deploying to production environment..."
        # Add your production deployment commands here`}</code>
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Replit Integration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="code-block">
                        <pre className="text-xs overflow-x-auto">
                          <code>{`# Deploy to Replit workflow
deploy-to-replit:
  needs: build
  runs-on: ubuntu-latest

  steps:
  - uses: actions/checkout@v3

  - name: Download build artifacts
    uses: actions/download-artifact@v3
    with:
      name: build-files
      path: dist/

  - name: Deploy to Replit
    env:
      REPLIT_TOKEN: \${{ secrets.REPLIT_TOKEN }}
    run: |
      # Install Replit CLI
      npm install -g @replit/cli

      # Authenticate with Replit
      replit auth $REPLIT_TOKEN

      # Deploy the application
      replit deploy --confirm`}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="testing" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Comprehensive Testing Pipeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-3">Package.json Scripts</h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress run",
    "lint": "eslint src/**/*.{js,jsx,ts,tsx}",
    "lint:fix": "eslint src/**/*.{js,jsx,ts,tsx} --fix",
    "type-check": "tsc --noEmit",
    "security-audit": "npm audit --audit-level high"
  }
}`}</code>
                            </pre>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Jest Configuration</h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`// jest.config.js
module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.js',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
};`}</code>
                            </pre>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">ESLint Configuration</h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  env: {
    node: true,
    jest: true,
  },
};`}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="deployment" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Deployment Strategies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-3">Blue-Green Deployment</h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`# Blue-Green deployment script
#!/bin/bash

# Deploy to inactive environment
CURRENT_ENV=$(replit env get ACTIVE_ENV)
if [ "$CURRENT_ENV" = "blue" ]; then
  TARGET_ENV="green"
else
  TARGET_ENV="blue"
fi

echo "Deploying to $TARGET_ENV environment..."

# Deploy new version
replit deploy --env $TARGET_ENV

# Run health checks
echo "Running health checks..."
health_check_url="https://$TARGET_ENV.yourapp.replit.app/health"
curl -f $health_check_url || exit 1

# Switch traffic
echo "Switching traffic to $TARGET_ENV..."
replit env set ACTIVE_ENV $TARGET_ENV

echo "Deployment completed successfully!"`}</code>
                            </pre>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Database Migration Pipeline</h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`// Migration workflow
deploy-with-migrations:
  steps:
  - name: Backup Database
    run: |
      pg_dump $DATABASE_URL > backup-$(date +%Y%m%d-%H%M%S).sql

  - name: Run Database Migrations
    run: |
      npm run migrate:up

  - name: Deploy Application
    run: |
      replit deploy

  - name: Verify Deployment
    run: |
      # Run smoke tests
      npm run test:smoke

  - name: Rollback if Failed
    if: failure()
    run: |
      echo "Deployment failed, rolling back..."
      npm run migrate:down
      # Restore from backup if needed`}</code>
                            </pre>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Environment-Specific Configuration</h4>
                          <div className="code-block">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`# deployment.yml
environments:
  staging:
    replitUrl: "https://staging.yourapp.replit.app"
    databaseUrl: \${{ secrets.STAGING_DB_URL }}
    apiKey: \${{ secrets.STAGING_API_KEY }}
    logLevel: "debug"

  production:
    replitUrl: "https://yourapp.replit.app"
    databaseUrl: \${{ secrets.PROD_DB_URL }}
    apiKey: \${{ secrets.PROD_API_KEY }}
    logLevel: "warn"

# Deploy script
deploy_to_environment() {
  ENV=$1
  echo "Deploying to $ENV environment..."

  # Set environment variables
  replit env set NODE_ENV $ENV
  replit env set DATABASE_URL $(get_env_var "${ENV}_DB_URL")
  replit env set API_KEY $(get_env_var "${ENV}_API_KEY")

  # Deploy
  replit deploy --confirm
}`}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Monitoring & Alerting</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Health Check Setup</h4>
                          <div className="code-block text-xs">
                            <code>{`// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connectivity
    await db.query('SELECT 1');

    // Check external services
    await fetch('https://api.external-service.com/ping');

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.APP_VERSION
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});`}</code>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Deployment Notifications</h4>
                          <div className="code-block text-xs">
                            <code>{`# Slack notification workflow
- name: Notify Deployment Success
  if: success()
  run: |
    curl -X POST -H 'Content-type: application/json' \
    --data '{"text":"✅ Deployment to production successful!"}' \
    ${{ secrets.SLACK_WEBHOOK_URL }}

- name: Notify Deployment Failure
  if: failure()
  run: |
    curl -X POST -H 'Content-type: application/json' \
    --data '{"text":"❌ Deployment to production failed!"}' \
    ${{ secrets.SLACK_WEBHOOK_URL }}`}</code>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-12">
            <Button variant="outline" asChild>
              <Link to="/pricing">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous: Plans & Pricing
              </Link>
            </Button>
            <Button asChild>
              <Link to="/">
                <Trophy className="h-4 w-4 mr-2" />
                Complete Guide!
              </Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}