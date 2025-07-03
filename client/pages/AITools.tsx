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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Bot,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Zap,
  MessageSquare,
  Code,
  FileCode,
  Bug,
  Lightbulb,
  Copy,
  ExternalLink,
  Play,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Brain,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const aiSections = [
  {
    id: "introduction",
    title: "AI Agent Introduction",
    icon: Bot,
    description: "Understanding Replit's AI capabilities",
  },
  {
    id: "prompting",
    title: "Effective Prompting",
    icon: MessageSquare,
    description: "Writing better prompts for AI",
  },
  {
    id: "code-generation",
    title: "Code Generation",
    icon: Code,
    description: "AI-powered code creation",
  },
  {
    id: "debugging",
    title: "Debugging Assistant",
    icon: Bug,
    description: "AI help with error resolution",
  },
  {
    id: "limitations",
    title: "Understanding Limitations",
    icon: AlertTriangle,
    description: "Claude Sonnet limits and best practices",
  },
];

const promptExamples = [
  {
    category: "Code Generation",
    title: "Creating a Function",
    prompt:
      "Create a Python function that calculates the fibonacci sequence up to n terms. Include error handling for negative inputs and add docstring documentation.",
    use_case: "When you need well-documented, robust functions",
    complexity: "Beginner",
  },
  {
    category: "Debugging",
    title: "Error Analysis",
    prompt:
      "I'm getting a 'TypeError: list indices must be integers' error in my Python code. Here's the code: [paste your code]. Can you explain what's wrong and how to fix it?",
    use_case: "When you encounter runtime errors",
    complexity: "Intermediate",
  },
  {
    category: "Code Review",
    title: "Optimization",
    prompt:
      "Review this JavaScript code for performance improvements and best practices. Suggest optimizations and explain why they would help: [paste your code]",
    use_case: "When optimizing existing code",
    complexity: "Advanced",
  },
  {
    category: "Learning",
    title: "Concept Explanation",
    prompt:
      "Explain the concept of recursion in programming with a simple example. Include when to use it and when to avoid it.",
    use_case: "When learning new programming concepts",
    complexity: "Beginner",
  },
  {
    category: "Architecture",
    title: "System Design",
    prompt:
      "Help me design the architecture for a todo app with user authentication. What components do I need and how should they interact?",
    use_case: "When planning larger projects",
    complexity: "Advanced",
  },
];

const aiCapabilities = [
  {
    icon: Code,
    title: "Code Generation",
    description: "Generate functions, classes, and complete programs",
    examples: [
      "Functions with docstrings",
      "API endpoints",
      "Database schemas",
    ],
  },
  {
    icon: Bug,
    title: "Error Debugging",
    description: "Analyze and fix bugs in your code",
    examples: ["Syntax errors", "Logic bugs", "Performance issues"],
  },
  {
    icon: FileCode,
    title: "Code Explanation",
    description: "Understand complex code and algorithms",
    examples: [
      "Line-by-line breakdown",
      "Algorithm explanation",
      "Best practices",
    ],
  },
  {
    icon: Brain,
    title: "Learning Support",
    description: "Get help understanding programming concepts",
    examples: ["Concept explanations", "Practice exercises", "Code examples"],
  },
];

const limitations = [
  {
    title: "Token Limits",
    description: "Claude Sonnet has token limits per conversation",
    impact: "Long conversations may require reset",
    solution: "Break complex tasks into smaller chunks",
  },
  {
    title: "Context Window",
    description: "Limited memory of previous conversation",
    impact: "May lose context in long sessions",
    solution: "Provide relevant context in each prompt",
  },
  {
    title: "Real-time Information",
    description: "No access to current web data or APIs",
    impact: "Cannot fetch live information",
    solution: "Provide necessary data in your prompts",
  },
  {
    title: "Code Execution",
    description: "Cannot run or test code directly",
    impact: "Cannot verify code functionality",
    solution: "Test generated code in your repl",
  },
];

export default function AITools() {
  const [currentSection, setCurrentSection] = useState("introduction");
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedExample, setSelectedExample] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState("");

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(prompt);
    setTimeout(() => setCopiedPrompt(""), 2000);
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
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-semibold">AI Tools</span>
            </div>
          </div>
          <Badge variant="secondary">Section 3 of 6</Badge>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-80 border-r border-border p-6 bg-muted/20 min-h-screen sticky top-16">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">AI Tools & Features</h3>
              <nav className="space-y-2">
                {aiSections.map((section) => (
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
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Quick Prompt Tester</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  placeholder="Try your own prompt here..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="min-h-[100px] text-xs"
                />
                <Button size="sm" className="w-full" asChild>
                  <a
                    href={`https://replit.com/new/python?ai-prompt=${encodeURIComponent(customPrompt)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Test in Replit AI
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-5xl">
          {currentSection === "introduction" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Replit AI Agent Introduction
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Replit's AI Agent is powered by Claude Sonnet, providing
                  intelligent coding assistance, debugging help, and learning
                  support directly in your workspace.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {aiCapabilities.map((capability, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <capability.icon className="h-5 w-5" />
                        <span>{capability.title}</span>
                      </CardTitle>
                      <CardDescription>
                        {capability.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Examples:</h4>
                        <ul className="space-y-1">
                          {capability.examples.map((example, exIndex) => (
                            <li
                              key={exIndex}
                              className="text-sm flex items-center space-x-2"
                            >
                              <CheckCircle className="h-3 w-3 text-primary" />
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Getting Started with AI</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>Open any repl or create a new one</li>
                    <li>Look for the AI chat icon in the sidebar</li>
                    <li>Start with a clear, specific prompt</li>
                    <li>Review and test the AI-generated code</li>
                    <li>Iterate and refine based on results</li>
                  </ol>

                  <div className="mt-4">
                    <Button size="sm" asChild>
                      <a
                        href="https://replit.com/new/python"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Try AI in New Repl
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "prompting" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Effective Prompting</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Learn how to write clear, specific prompts that get better
                  results from Replit's AI Agent.
                </p>
              </div>

              <Tabs defaultValue="examples" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="examples">Prompt Examples</TabsTrigger>
                  <TabsTrigger value="best-practices">
                    Best Practices
                  </TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>

                <TabsContent value="examples" className="space-y-6">
                  <div className="grid gap-4">
                    {promptExamples.map((example, index) => (
                      <Card
                        key={index}
                        className={
                          selectedExample === index ? "border-primary" : ""
                        }
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              {example.title}
                            </CardTitle>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">
                                {example.category}
                              </Badge>
                              <Badge
                                variant={
                                  example.complexity === "Beginner"
                                    ? "default"
                                    : example.complexity === "Intermediate"
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {example.complexity}
                              </Badge>
                            </div>
                          </div>
                          <CardDescription>{example.use_case}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-muted rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">
                                Prompt:
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyPrompt(example.prompt)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-sm">{example.prompt}</p>
                          </div>

                          {copiedPrompt === example.prompt && (
                            <div className="text-xs text-green-500 mb-2">
                              ✓ Copied to clipboard!
                            </div>
                          )}

                          <Button
                            size="sm"
                            onClick={() => setSelectedExample(index)}
                            variant={
                              selectedExample === index ? "default" : "outline"
                            }
                          >
                            {selectedExample === index
                              ? "Selected"
                              : "Select Example"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="best-practices" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-green-600">
                          ✅ Do This
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Be specific about what you want</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Include context and requirements</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Mention the programming language</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Ask for explanations when learning</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Request error handling and edge cases</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-red-600">
                          ❌ Avoid This
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            <span>Vague or unclear requests</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            <span>Asking for entire applications at once</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            <span>Not providing necessary context</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            <span>Expecting perfect code without testing</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            <span>Ignoring AI limitations</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="templates" className="space-y-6">
                  <div className="grid gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Code Generation Template
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="code-block">
                          <p className="text-sm">
                            Create a [LANGUAGE] [FUNCTION/CLASS/MODULE] that
                            [SPECIFIC_TASK].
                            <br />
                            Requirements:
                            <br />
                            - [REQUIREMENT_1]
                            <br />
                            - [REQUIREMENT_2]
                            <br />
                            - Include error handling for [ERROR_CASES]
                            <br />
                            - Add documentation/comments
                            <br />- Follow [STYLE_GUIDE] conventions
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Debugging Template
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="code-block">
                          <p className="text-sm">
                            I'm getting [ERROR_TYPE]: "[ERROR_MESSAGE]" in my
                            [LANGUAGE] code.
                            <br />
                            <br />
                            Here's the problematic code:
                            <br />
                            [PASTE_CODE_HERE]
                            <br />
                            <br />
                            Expected behavior: [WHAT_SHOULD_HAPPEN]
                            <br />
                            Actual behavior: [WHAT_IS_HAPPENING]
                            <br />
                            <br />
                            Please explain the issue and provide a fix.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentSection === "limitations" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Understanding AI Limitations
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Understanding Claude Sonnet's limitations helps you use Replit
                  AI more effectively and set appropriate expectations.
                </p>
              </div>

              <div className="grid gap-6">
                {limitations.map((limitation, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <span>{limitation.title}</span>
                      </CardTitle>
                      <CardDescription>
                        {limitation.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-red-600">
                            Impact:
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {limitation.impact}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-green-600">
                            Solution:
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {limitation.solution}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    <span>Working Within Limitations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">
                        Token Management Tips:
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Start new conversations for different topics</li>
                        <li>
                          • Break large projects into smaller, focused tasks
                        </li>
                        <li>
                          • Summarize context when continuing long sessions
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">
                        Best Practices:
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Always test AI-generated code before using</li>
                        <li>
                          • Provide relevant context in each new conversation
                        </li>
                        <li>
                          • Use AI as a starting point, not the final solution
                        </li>
                        <li>
                          • Combine AI assistance with your own knowledge and
                          testing
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-12">
            <Button variant="outline" asChild>
              <Link to="/core-features">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous: Core Features
              </Link>
            </Button>
            <Button asChild>
              <Link to="/community">
                Next: Community
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
