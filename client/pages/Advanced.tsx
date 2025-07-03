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
                          <li>• First Input Delay (FID) &lt; 100ms</li>
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
