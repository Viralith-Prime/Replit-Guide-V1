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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bot,
  ArrowRight,
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
  Sparkles,
  RefreshCw,
  Search,
  Edit,
  TestTube,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const pageMetadata = {
  title: "AI Tools",
  description: "Learn to leverage AI tools and features for enhanced coding",
  category: "learning" as const,
  level: "intermediate" as const,
  timeToComplete: "20-30 minutes",
  prerequisites: ["Getting Started", "Core Features"],
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "AI Tools", href: "/ai-tools" },
];

const aiSections = [
  {
    id: "introduction",
    title: "Introduction to AI-Powered Development",
    icon: Bot,
  },
  {
    id: "code-completion",
    title: "AI Code Completion & Suggestions",
    icon: Sparkles,
  },
  {
    id: "debugging",
    title: "AI-Assisted Debugging",
    icon: Bug,
  },
  {
    id: "code-generation",
    title: "AI Code Generation",
    icon: Code,
  },
  {
    id: "best-practices",
    title: "Best Practices & Tips",
    icon: Lightbulb,
  },
];

const promptExamples = [
  {
    category: "Code Generation",
    prompt:
      "Create a Python function that calculates the factorial of a number using recursion",
    description: "Generate complete function with proper documentation",
  },
  {
    category: "Debugging",
    prompt:
      "I'm getting a 'list index out of range' error in my Python code. Can you help me debug this?",
    description: "Get help with specific error messages",
  },
  {
    category: "Code Review",
    prompt:
      "Review this JavaScript function for potential improvements and best practices",
    description: "Get suggestions for code optimization",
  },
  {
    category: "Learning",
    prompt: "Explain how async/await works in JavaScript with a simple example",
    description: "Learn new concepts with examples",
  },
];

const aiFeatures = [
  {
    name: "Intelligent Autocomplete",
    description: "Context-aware code suggestions as you type",
    icon: Edit,
    available: true,
  },
  {
    name: "Code Explanation",
    description: "Get instant explanations for complex code snippets",
    icon: MessageSquare,
    available: true,
  },
  {
    name: "Bug Detection",
    description: "Automatic detection of potential issues and bugs",
    icon: Bug,
    available: true,
  },
  {
    name: "Code Generation",
    description: "Generate code from natural language descriptions",
    icon: Code,
    available: true,
  },
  {
    name: "Test Generation",
    description: "Automatically generate unit tests for your functions",
    icon: TestTube,
    available: false,
  },
  {
    name: "Performance Analysis",
    description: "AI-powered performance optimization suggestions",
    icon: Zap,
    available: false,
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
    <PageLayout
      title="AI Tools"
      description="Learn to leverage AI tools and features for enhanced coding"
      breadcrumbItems={breadcrumbItems}
      metadata={pageMetadata}
    >
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-80 border-r border-border p-6 bg-muted/20 min-h-screen sticky top-16">
          <h3 className="font-semibold mb-4">AI Features</h3>
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
                <span className="leading-tight">{section.title}</span>
              </button>
            ))}
          </nav>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h4 className="font-medium text-sm">Quick Prompt Generator</h4>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Try AI Prompts</CardTitle>
                <CardDescription className="text-xs">
                  Select an example or write your own
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {promptExamples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedExample(index)}
                      className={`w-full text-left p-2 rounded text-xs border transition-colors ${
                        selectedExample === index
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      <div className="font-medium">{example.category}</div>
                      <div className="text-muted-foreground truncate">
                        {example.description}
                      </div>
                    </button>
                  ))}
                </div>
                <Textarea
                  placeholder="Or write your own prompt..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="text-xs"
                  rows={3}
                />
                <Button size="sm" className="w-full">
                  <Copy className="h-3 w-3 mr-2" />
                  Copy to Clipboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-4xl">
          {currentSection === "introduction" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Introduction to AI-Powered Development
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Discover how AI can accelerate your coding workflow and help
                  you write better code faster.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="h-5 w-5" />
                      <span>What AI Can Do</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Generate code from natural language</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Explain complex code snippets</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Debug errors and suggest fixes</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Optimize code performance</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Generate unit tests</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5" />
                      <span>Benefits</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start space-x-2">
                        <Zap className="h-4 w-4 text-blue-500 mt-0.5" />
                        <span>Faster development cycles</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Zap className="h-4 w-4 text-blue-500 mt-0.5" />
                        <span>Reduced debugging time</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Zap className="h-4 w-4 text-blue-500 mt-0.5" />
                        <span>Learn new patterns and techniques</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Zap className="h-4 w-4 text-blue-500 mt-0.5" />
                        <span>Improved code quality</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Zap className="h-4 w-4 text-blue-500 mt-0.5" />
                        <span>Better documentation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Available AI Features in Replit</CardTitle>
                  <CardDescription>
                    Current and upcoming AI-powered tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {aiFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 border rounded-lg"
                      >
                        <feature.icon className="h-5 w-5 text-primary mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-sm">
                              {feature.name}
                            </h4>
                            <Badge
                              variant={
                                feature.available ? "secondary" : "outline"
                              }
                            >
                              {feature.available ? "Available" : "Coming Soon"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "code-completion" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  AI Code Completion & Suggestions
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Learn how to use AI-powered autocomplete to write code faster
                  and more accurately.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Start Typing</h4>
                        <p className="text-sm text-muted-foreground">
                          Begin writing your code as usual. The AI analyzes your
                          context and intent.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Get Suggestions</h4>
                        <p className="text-sm text-muted-foreground">
                          See intelligent suggestions appear as you type, based
                          on your code context and common patterns.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Accept or Refine</h4>
                        <p className="text-sm text-muted-foreground">
                          Press Tab to accept suggestions, or continue typing to
                          refine them.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4">
                      <h4 className="font-medium text-sm mb-1">
                        Write Descriptive Comments
                      </h4>
                      <p className="text-sm">
                        Start with a comment describing what you want to
                        implement. The AI will generate more accurate code based
                        on your description.
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4">
                      <h4 className="font-medium text-sm mb-1">
                        Use Meaningful Variable Names
                      </h4>
                      <p className="text-sm">
                        Clear variable names help the AI understand your intent
                        and provide better suggestions.
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4">
                      <h4 className="font-medium text-sm mb-1">
                        Provide Context
                      </h4>
                      <p className="text-sm">
                        Include relevant imports, type hints, and function
                        signatures to help the AI understand your codebase.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "debugging" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  AI-Assisted Debugging
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Use AI to quickly identify and fix bugs in your code.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Common Debugging Scenarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="syntax" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="syntax">Syntax Errors</TabsTrigger>
                      <TabsTrigger value="logic">Logic Bugs</TabsTrigger>
                      <TabsTrigger value="runtime">Runtime Errors</TabsTrigger>
                      <TabsTrigger value="performance">Performance</TabsTrigger>
                    </TabsList>

                    <TabsContent value="syntax" className="space-y-4">
                      <h3 className="font-medium">Syntax Error Help</h3>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                        <div className="text-red-500"># Example error:</div>
                        <div>SyntaxError: invalid syntax</div>
                        <div className="mt-2 text-green-600">
                          # AI suggestion:
                        </div>
                        <div>
                          "You're missing a closing parenthesis on line 15"
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="logic" className="space-y-4">
                      <h3 className="font-medium">Logic Bug Detection</h3>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                        <div className="text-red-500"># Common issue:</div>
                        <div>Using = instead of == in conditions</div>
                        <div className="mt-2 text-green-600">
                          # AI suggestion:
                        </div>
                        <div>"Replace assignment with comparison operator"</div>
                      </div>
                    </TabsContent>

                    <TabsContent value="runtime" className="space-y-4">
                      <h3 className="font-medium">Runtime Error Analysis</h3>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                        <div className="text-red-500"># Example:</div>
                        <div>IndexError: list index out of range</div>
                        <div className="mt-2 text-green-600">
                          # AI analysis:
                        </div>
                        <div>
                          "Check array bounds before accessing elements"
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="performance" className="space-y-4">
                      <h3 className="font-medium">Performance Optimization</h3>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                        <div className="text-red-500"># Issue:</div>
                        <div>Slow nested loops</div>
                        <div className="mt-2 text-green-600">
                          # AI suggestion:
                        </div>
                        <div>
                          "Consider using a dictionary for O(1) lookups"
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "code-generation" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">AI Code Generation</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Generate complete functions, classes, and modules from natural
                  language descriptions.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Interactive Prompt Builder</CardTitle>
                  <CardDescription>
                    Try generating code with different prompts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt">
                      Describe what you want to build:
                    </Label>
                    <Textarea
                      id="prompt"
                      placeholder="Example: Create a Python function that validates email addresses using regex"
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Generate Code
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Example Prompts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {promptExamples.map((example, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <Badge variant="outline" className="mb-2">
                          {example.category}
                        </Badge>
                        <p className="text-sm mb-2">{example.prompt}</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          {example.description}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyPrompt(example.prompt)}
                          className="w-full"
                        >
                          <Copy className="h-3 w-3 mr-2" />
                          {copiedPrompt === example.prompt
                            ? "Copied!"
                            : "Use This Prompt"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "best-practices" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Best Practices & Tips
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Maximize the effectiveness of AI tools in your development
                  workflow.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Effective Prompting</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li>• Be specific about requirements</li>
                      <li>• Include example inputs/outputs</li>
                      <li>• Mention the programming language</li>
                      <li>• Specify coding style preferences</li>
                      <li>• Ask for explanations when learning</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Code Review</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li>• Always review generated code</li>
                      <li>• Test thoroughly before deployment</li>
                      <li>• Understand what the code does</li>
                      <li>• Check for security vulnerabilities</li>
                      <li>• Ensure it fits your coding standards</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Common Pitfalls to Avoid</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4">
                      <h4 className="font-medium text-sm mb-1">
                        Don't Blindly Trust AI Output
                      </h4>
                      <p className="text-sm">
                        AI can make mistakes. Always review, test, and
                        understand the generated code before using it in
                        production.
                      </p>
                    </div>
                    <div className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4">
                      <h4 className="font-medium text-sm mb-1">
                        Avoid Over-Reliance
                      </h4>
                      <p className="text-sm">
                        Use AI as a tool to enhance your skills, not replace
                        learning fundamental programming concepts.
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4">
                      <h4 className="font-medium text-sm mb-1">
                        Consider Context
                      </h4>
                      <p className="text-sm">
                        AI suggestions are based on patterns, not your specific
                        project requirements. Adapt as needed.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold mb-3">🚀 Ready to Continue?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You've learned how AI can accelerate your development process.
                  Next, explore how to connect with the Replit community!
                </p>
                <div className="flex space-x-3">
                  <Button size="sm" asChild>
                    <Link to="/community">
                      Next: Community Features
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/core-features">Previous: Core Features</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </PageLayout>
  );
}
