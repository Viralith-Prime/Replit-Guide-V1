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
import {
  Code,
  ArrowRight,
  ArrowLeft,
  Play,
  Save,
  FolderPlus,
  Settings,
  Terminal,
  FileText,
  Monitor,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const sections = [
  {
    id: "account",
    title: "Creating an Account and Navigating the Dashboard",
    icon: Users,
  },
  {
    id: "workspace",
    title: "Understanding the Replit Workspace",
    icon: Monitor,
  },
  {
    id: "first-repl",
    title: "Creating Your First Repl",
    icon: FolderPlus,
  },
  {
    id: "running-code",
    title: "Running Your Code",
    icon: Play,
  },
  {
    id: "organizing",
    title: "Saving and Organizing Your Repls",
    icon: Save,
  },
];

const exerciseSteps = [
  {
    title: "Create a Python Repl",
    description: "Click 'Create Repl' and select Python",
    completed: false,
  },
  {
    title: "Write Hello World",
    description: 'Type: print("Hello, World!")',
    completed: false,
  },
  {
    title: "Run the Code",
    description: "Click the Run button or press Ctrl+Enter",
    completed: false,
  },
  {
    title: "Save Your Repl",
    description: "Give your Repl a name and save it",
    completed: false,
  },
];

export default function GettingStarted() {
  const [currentSection, setCurrentSection] = useState("account");
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  const toggleStep = (stepIndex: number) => {
    setCheckedSteps((prev) =>
      prev.includes(stepIndex)
        ? prev.filter((i) => i !== stepIndex)
        : [...prev, stepIndex],
    );
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
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold">Getting Started</span>
            </div>
          </div>
          <Badge variant="secondary">Section 1 of 6</Badge>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-80 border-r border-border p-6 bg-muted/20 min-h-screen sticky top-16">
          <h3 className="font-semibold mb-4">In This Section</h3>
          <nav className="space-y-2">
            {sections.map((section) => (
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
                <span className="leading-tight">{section.title}</span>
              </button>
            ))}
          </nav>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h4 className="font-medium text-sm">Quick Exercise</h4>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">
                  Create Your First Repl
                </CardTitle>
                <CardDescription className="text-xs">
                  Follow these steps to get hands-on experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {exerciseSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleStep(index)}
                      className={`mt-0.5 ${
                        checkedSteps.includes(index)
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <CheckCircle
                        className={`h-4 w-4 ${
                          checkedSteps.includes(index)
                            ? "fill-current"
                            : "fill-none"
                        }`}
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium">{step.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
                <Button size="sm" className="w-full mt-4" asChild>
                  <a
                    href="https://replit.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Replit
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-4xl">
          {currentSection === "account" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Creating an Account and Navigating the Dashboard
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Let's start your Replit journey by setting up your account and
                  getting familiar with the dashboard.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Creating Your Account</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>
                      Go to{" "}
                      <a
                        href="https://replit.com"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        replit.com
                      </a>
                    </li>
                    <li>Click "Sign up" in the top-right corner</li>
                    <li>
                      Choose your preferred method:
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Email and password</li>
                        <li>Google account</li>
                        <li>GitHub account</li>
                      </ul>
                    </li>
                    <li>Complete the verification process</li>
                    <li>Choose your username (this will be your Replit URL)</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Overview</CardTitle>
                  <CardDescription>
                    Once logged in, you'll see your personal dashboard with
                    these key areas:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="font-medium text-sm">My Repls</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-4">
                        All your created projects and repls
                      </p>

                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="font-medium text-sm">
                          Recent Activity
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-4">
                        Your latest coding activity and updates
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="font-medium text-sm">Explore</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-4">
                        Discover public repls and templates
                      </p>

                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="font-medium text-sm">Teams</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-4">
                        Collaborative workspaces and projects
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Pro Tip</h4>
                    <p className="text-sm text-muted-foreground">
                      Bookmark your Replit dashboard for quick access. You can
                      also pin frequently used repls to the top of your list.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSection === "workspace" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Understanding the Replit Workspace
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  The Replit workspace is your coding environment. Let's explore
                  each component and how they work together.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Code Editor</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Syntax highlighting for 50+ languages</li>
                      <li>• Auto-completion and IntelliSense</li>
                      <li>• Multi-tab editing</li>
                      <li>• Vim/Emacs keybindings support</li>
                      <li>• Real-time collaboration</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Terminal className="h-5 w-5" />
                      <span>Console & Shell</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Output from your running programs</li>
                      <li>• Interactive Python/Node.js shells</li>
                      <li>• Full Linux shell access</li>
                      <li>• Package management (pip, npm, etc.)</li>
                      <li>• Git commands and version control</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FolderPlus className="h-5 w-5" />
                      <span>Files Pane</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Browse your project structure</li>
                      <li>• Create, rename, and delete files</li>
                      <li>• Upload files from your computer</li>
                      <li>• Search across all files</li>
                      <li>• Git status indicators</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Monitor className="h-5 w-5" />
                      <span>Preview/Output</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Live web app preview</li>
                      <li>• Interactive GUI applications</li>
                      <li>• Game development canvas</li>
                      <li>• Database viewers</li>
                      <li>• Plot and chart displays</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Workspace Layout</CardTitle>
                  <CardDescription>
                    You can customize your workspace layout by:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <span className="font-medium">Resizing panes:</span>{" "}
                        Drag the borders between sections
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <span className="font-medium">Collapsing panels:</span>{" "}
                        Click the collapse icons to hide sections
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <span className="font-medium">Tab management:</span> Use
                        Ctrl+Tab to switch between open files
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "first-repl" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Creating Your First Repl
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Learn how to choose the right language and template for your
                  project, and create your first repl.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Step-by-Step Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">
                          Click "Create Repl"
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          From your dashboard, click the prominent "Create Repl"
                          button or the "+" icon.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Choose a Language</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Popular options for beginners:
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-muted rounded p-2">
                            <strong>Python</strong> - Great for beginners, data
                            science
                          </div>
                          <div className="bg-muted rounded p-2">
                            <strong>JavaScript</strong> - Web development,
                            Node.js
                          </div>
                          <div className="bg-muted rounded p-2">
                            <strong>HTML/CSS</strong> - Web pages and styling
                          </div>
                          <div className="bg-muted rounded p-2">
                            <strong>Java</strong> - Enterprise applications
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">
                          Select a Template (Optional)
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Templates provide pre-configured environments for
                          specific frameworks like React, Django, or Express.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Name Your Repl</h4>
                        <p className="text-sm text-muted-foreground">
                          Choose a descriptive name. This will be part of your
                          repl's URL when published.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        5
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">
                          Set Privacy (Optional)
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Choose between Public (visible to everyone) or Private
                          (only visible to you and collaborators).
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-sm">Try It Now</CardTitle>
                  <CardDescription>
                    Practice creating your first Python repl with this example:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="code-block mb-4">
                    <div className="text-green-400">
                      # My first Python program
                    </div>
                    <div className="text-blue-400">name</div>
                    <span className="text-white"> = </span>
                    <span className="text-blue-400">input</span>
                    <span className="text-white">(</span>
                    <span className="text-yellow-400">
                      "What's your name? "
                    </span>
                    <span className="text-white">)</span>
                    <br />
                    <div className="text-blue-400">print</div>
                    <span className="text-white">(</span>
                    <span className="text-yellow-400">f"Hello, </span>
                    <span className="text-white">{name}</span>
                    <span className="text-yellow-400">!"</span>
                    <span className="text-white">)</span>
                  </div>
                  <Button size="sm" asChild>
                    <a
                      href="https://replit.com/new/python"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Create Python Repl
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "running-code" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Running Your Code</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Learn the different ways to execute your programs and
                  understand the output.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Play className="h-5 w-5" />
                      <span>Running Methods</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Run Button</h4>
                      <p className="text-sm text-muted-foreground">
                        Click the green "Run" button at the top of your repl
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">
                        Keyboard Shortcut
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Press{" "}
                        <code className="bg-muted px-1 rounded">
                          Ctrl+Enter
                        </code>{" "}
                        (or{" "}
                        <code className="bg-muted px-1 rounded">Cmd+Enter</code>{" "}
                        on Mac)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">
                        Shell Commands
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Use the shell to run specific commands like{" "}
                        <code className="bg-muted px-1 rounded">
                          python main.py
                        </code>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Terminal className="h-5 w-5" />
                      <span>Understanding Output</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Console Tab</h4>
                      <p className="text-sm text-muted-foreground">
                        Shows program output, error messages, and print
                        statements
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Shell Tab</h4>
                      <p className="text-sm text-muted-foreground">
                        Interactive command line for running terminal commands
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Preview Tab</h4>
                      <p className="text-sm text-muted-foreground">
                        Live preview for web applications and interactive
                        programs
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Common Issues and Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4">
                      <h4 className="font-medium text-sm mb-1">
                        Program Not Running?
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Check for syntax errors in the console</li>
                        <li>• Ensure your main file is correctly named</li>
                        <li>• Verify all required packages are installed</li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4">
                      <h4 className="font-medium text-sm mb-1">
                        Program Runs Too Slowly?
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>
                          • Consider upgrading to a paid plan for more resources
                        </li>
                        <li>• Optimize your code for better performance</li>
                        <li>• Check if you're in an infinite loop</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "organizing" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Saving and Organizing Your Repls
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Keep your projects organized and easily accessible with these
                  tips and best practices.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Save className="h-5 w-5" />
                    <span>Auto-Save and Manual Saving</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Automatic Saving</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Replit automatically saves your work as you type. Look
                        for the save indicator in the file tab.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Manual Save</h4>
                      <p className="text-sm text-muted-foreground">
                        Use{" "}
                        <code className="bg-muted px-1 rounded">Ctrl+S</code>{" "}
                        (or <code className="bg-muted px-1 rounded">Cmd+S</code>{" "}
                        on Mac) to force save
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Organization Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          Naming Conventions
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Use descriptive, clear names</li>
                          <li>• Include project type or language</li>
                          <li>• Avoid spaces (use hyphens or underscores)</li>
                          <li>
                            • Example: "python-calculator" or "react_todo_app"
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          Using Folders
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Group related files in folders</li>
                          <li>• Separate source code from assets</li>
                          <li>
                            • Use standard conventions (src/, assets/, etc.)
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          Adding Descriptions
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Write clear README files</li>
                          <li>• Add comments to explain complex code</li>
                          <li>• Include setup instructions</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          Tags and Stars
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Star important repls for quick access</li>
                          <li>• Use consistent tagging for easy searching</li>
                          <li>
                            • Consider tags like "tutorial", "project",
                            "practice"
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold mb-3">🎉 Congratulations!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You've completed the Getting Started section! You now know how
                  to create accounts, navigate the workspace, create repls, run
                  code, and organize your projects.
                </p>
                <div className="flex space-x-3">
                  <Button size="sm" asChild>
                    <Link to="/core-features">
                      Next: Core Features
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/">Back to Guide Home</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
