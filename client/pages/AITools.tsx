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
  Search as SearchIcon,
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
    title: "Ghostwriter",
    description: "AI code completion, explanations, and refactoring",
    examples: [
      "Smart autocomplete",
      "Code refactoring",
      "Documentation generation",
    ],
  },
  {
    icon: MessageSquare,
    title: "AI Chat",
    description: "Context-aware chat for code help and learning",
    examples: ["Code explanations", "Bug fixing help", "Learning guidance"],
  },
  {
    icon: FileCode,
    title: "Prompt Templates",
    description: "Custom prompt templates for various coding tasks",
    examples: [
      "Code generation prompts",
      "Bug fixing templates",
      "Documentation prompts",
    ],
  },
  {
    icon: Brain,
    title: "Learning Support",
    description: "AI-powered assistance for understanding concepts",
    examples: ["Concept explanations", "Practice exercises", "Code reviews"],
  },
];

const limitations = [
  {
    title: "Free Tier Limits",
    description: "Free users get limited AI uses per month",
    impact: "May run out of AI assistance during heavy usage",
    solution: "Upgrade to Core plan for more AI access",
  },
  {
    title: "AI Accuracy",
    description: "Accuracy varies by prompt and programming language",
    impact: "Generated code may need review and testing",
    solution: "Always review and test AI-generated code",
  },
  {
    title: "Language Support",
    description: "AI features work best with popular languages",
    impact: "Less accurate for niche or newer languages",
    solution:
      "Use AI primarily for Python, JS, Java, and other popular languages",
  },
  {
    title: "Context Awareness",
    description: "AI may not fully understand project context",
    impact: "May generate code that doesn't fit your specific needs",
    solution: "Provide clear context and requirements in prompts",
  },
];

export default function AITools() {
  const [currentSection, setCurrentSection] = useState("introduction");
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedExample, setSelectedExample] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState("");
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(prompt);
    setTimeout(() => setCopiedPrompt(""), 2000);
  };

  const toggleExercise = (exerciseId: string) => {
    setCompletedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId],
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
                  Replit AI Tools Introduction
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Replit offers powerful AI tools including Ghostwriter for code
                  completion and AI Chat for context-aware assistance, providing
                  intelligent coding support directly in your workspace.
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

          {currentSection === "code-generation" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">AI Code Generation</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Master Replit's AI-powered code generation with Ghostwriter.
                  Learn effective prompting techniques and see real examples of
                  AI-generated code.
                </p>
              </div>

              <Tabs defaultValue="demo" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
                  <TabsTrigger value="prompts">Effective Prompts</TabsTrigger>
                  <TabsTrigger value="workflows">Workflows</TabsTrigger>
                  <TabsTrigger value="examples">Real Examples</TabsTrigger>
                </TabsList>

                <TabsContent value="demo" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        <span>AI Code Generation Demo</span>
                      </CardTitle>
                      <CardDescription>
                        Experience how Ghostwriter generates code from natural
                        language prompts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label
                            htmlFor="prompt-input"
                            className="text-sm font-medium"
                          >
                            Enter your prompt:
                          </Label>
                          <Textarea
                            id="prompt-input"
                            placeholder="Example: Create a function that calculates the factorial of a number"
                            className="mt-2"
                            rows={3}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button className="flex-1">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Generate Code
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">
                            Generated Code:
                          </Label>
                          <div className="mt-2 code-block">
                            <pre className="text-sm overflow-x-auto">
                              <code>{`function factorial(n) {
  // Base case: factorial of 0 or 1 is 1
  if (n <= 1) {
    return 1;
  }

  // Recursive case: n * factorial(n-1)
  return n * factorial(n - 1);
}

// Example usage:
console.log(factorial(5)); // Output: 120
console.log(factorial(0)); // Output: 1

// Alternative iterative approach:
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}`}</code>
                            </pre>
                          </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5" />
                            <div className="text-sm">
                              <strong>AI Explanation:</strong> I generated both
                              recursive and iterative versions of the factorial
                              function with clear comments and example usage.
                              The recursive version demonstrates the
                              mathematical definition, while the iterative
                              version is more efficient for large numbers.
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-600">
                          ✅ What AI Does Well
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Generate boilerplate code quickly</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>
                              Create functions with clear documentation
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Implement common algorithms</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Convert between programming languages</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Add error handling and edge cases</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-yellow-600">
                          ⚠️ Always Review & Test
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                            <span>Check logic for correctness</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                            <span>Test with edge cases</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                            <span>Verify security implications</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                            <span>Ensure code fits your architecture</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                            <span>Optimize for performance if needed</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="prompts" className="space-y-6">
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Effective Prompt Patterns</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-medium mb-3">
                              1. Function Creation Pattern
                            </h4>
                            <div className="bg-muted rounded-lg p-4">
                              <div className="font-mono text-sm mb-2">
                                Prompt Template:
                              </div>
                              <div className="text-sm italic mb-3">
                                "Create a [LANGUAGE] function that
                                [SPECIFIC_TASK]. It should [REQUIREMENTS].
                                Include [EXTRAS]."
                              </div>
                              <div className="font-mono text-sm mb-2">
                                Example:
                              </div>
                              <div className="text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                                "Create a Python function that validates email
                                addresses. It should return True for valid
                                emails and False for invalid ones. Include error
                                handling and comprehensive test cases."
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">
                              2. API Integration Pattern
                            </h4>
                            <div className="bg-muted rounded-lg p-4">
                              <div className="text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded">
                                "Write a JavaScript function to fetch data from
                                the [API_NAME] API. Handle authentication with
                                [AUTH_METHOD], parse the response, and include
                                error handling for network failures and invalid
                                responses."
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">
                              3. Algorithm Implementation Pattern
                            </h4>
                            <div className="bg-muted rounded-lg p-4">
                              <div className="text-sm bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
                                "Implement the [ALGORITHM_NAME] algorithm in
                                [LANGUAGE]. Optimize for [CONSTRAINT] and
                                include comments explaining the time and space
                                complexity."
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">
                              4. Refactoring Pattern
                            </h4>
                            <div className="bg-muted rounded-lg p-4">
                              <div className="text-sm bg-orange-50 dark:bg-orange-900/20 p-3 rounded">
                                "Refactor this code to be more [QUALITY:
                                readable/efficient/maintainable].
                                [PASTE_CODE_HERE]. Follow [STYLE_GUIDE]
                                conventions and improve [SPECIFIC_ASPECT]."
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Prompt Enhancement Techniques</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-sm mb-2">
                              Be Specific
                            </h5>
                            <div className="space-y-2 text-xs">
                              <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                                ❌ "Create a sorting function"
                              </div>
                              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                                ✅ "Create a Python function that sorts a list
                                of dictionaries by a specified key using merge
                                sort algorithm"
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm mb-2">
                              Include Context
                            </h5>
                            <div className="space-y-2 text-xs">
                              <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                                ❌ "Fix this bug"
                              </div>
                              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                                ✅ "Fix the memory leak in this Node.js server
                                code that handles file uploads. The server
                                crashes after processing 100+ files."
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm mb-2">
                              Specify Output Format
                            </h5>
                            <div className="space-y-2 text-xs">
                              <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                                ❌ "Explain this algorithm"
                              </div>
                              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                                ✅ "Explain this algorithm with inline comments,
                                time complexity analysis, and a step-by-step
                                example"
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm mb-2">
                              Add Constraints
                            </h5>
                            <div className="space-y-2 text-xs">
                              <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                                ❌ "Create a web scraper"
                              </div>
                              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                                ✅ "Create a Python web scraper using
                                BeautifulSoup that respects robots.txt and
                                includes rate limiting"
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="workflows" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI-Assisted Development Workflows</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-3">
                            1. Iterative Development
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                                1
                              </div>
                              <span className="text-sm">
                                Start with a basic prompt for core functionality
                              </span>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                                2
                              </div>
                              <span className="text-sm">
                                Review and test the generated code
                              </span>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                                3
                              </div>
                              <span className="text-sm">
                                Ask for specific improvements or additions
                              </span>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                                4
                              </div>
                              <span className="text-sm">
                                Repeat until you have the desired functionality
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">
                            2. Code Review & Optimization
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-sm font-medium mb-2">
                                Review Prompts:
                              </h5>
                              <ul className="text-xs space-y-1">
                                <li>
                                  • "Review this code for security
                                  vulnerabilities"
                                </li>
                                <li>
                                  • "Optimize this function for better
                                  performance"
                                </li>
                                <li>
                                  • "Make this code more readable and
                                  maintainable"
                                </li>
                                <li>• "Add comprehensive error handling"</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium mb-2">
                                Testing Prompts:
                              </h5>
                              <ul className="text-xs space-y-1">
                                <li>
                                  • "Generate unit tests for this function"
                                </li>
                                <li>• "Create test cases for edge cases"</li>
                                <li>
                                  • "Write integration tests for this API"
                                </li>
                                <li>• "Add mock data for testing"</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">
                            3. Documentation & Comments
                          </h4>
                          <div className="bg-muted rounded-lg p-4">
                            <div className="space-y-2 text-sm">
                              <div>
                                • "Add comprehensive JSDoc comments to this
                                function"
                              </div>
                              <div>
                                • "Generate README documentation for this
                                project"
                              </div>
                              <div>
                                �� "Create API documentation with examples"
                              </div>
                              <div>
                                • "Explain this complex algorithm with inline
                                comments"
                              </div>
                            </div>
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
                        <CardTitle>Real-World Generation Examples</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-medium mb-2">
                              Example 1: REST API Endpoint
                            </h4>
                            <div className="text-sm text-muted-foreground mb-3">
                              Prompt: "Create a Node.js Express endpoint that
                              handles user registration with email validation,
                              password hashing, and database storage"
                            </div>
                            <div className="code-block">
                              <pre className="text-xs overflow-x-auto">
                                <code>{`const express = require('express');
const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/User');

const router = express.Router();

// User registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Check password strength
    if (password.length < 8) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date()
    });

    await newUser.save();

    // Return success (don't include password)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

module.exports = router;`}</code>
                              </pre>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">
                              Example 2: Data Processing Function
                            </h4>
                            <div className="text-sm text-muted-foreground mb-3">
                              Prompt: "Create a Python function that processes
                              CSV data, handles missing values, and generates
                              summary statistics"
                            </div>
                            <div className="code-block">
                              <pre className="text-xs overflow-x-auto">
                                <code>{`import pandas as pd
import numpy as np
from typing import Dict, Any, Optional

def process_csv_data(
    file_path: str,
    handle_missing: str = 'drop',
    generate_summary: bool = True
) -> Dict[str, Any]:
    """
    Process CSV data with missing value handling and summary statistics.

    Args:
        file_path (str): Path to the CSV file
        handle_missing (str): How to handle missing values ('drop', 'fill_mean', 'fill_median')
        generate_summary (bool): Whether to generate summary statistics

    Returns:
        Dict containing processed data and optional summary statistics
    """
    try:
        # Read CSV file
        df = pd.read_csv(file_path)

        # Store original info
        original_shape = df.shape
        missing_count = df.isnull().sum()

        # Handle missing values
        if handle_missing == 'drop':
            df = df.dropna()
        elif handle_missing == 'fill_mean':
            numeric_columns = df.select_dtypes(include=[np.number]).columns
            df[numeric_columns] = df[numeric_columns].fillna(df[numeric_columns].mean())
        elif handle_missing == 'fill_median':
            numeric_columns = df.select_dtypes(include=[np.number]).columns
            df[numeric_columns] = df[numeric_columns].fillna(df[numeric_columns].median())

        # Prepare result
        result = {
            'data': df,
            'processing_info': {
                'original_shape': original_shape,
                'processed_shape': df.shape,
                'missing_values_found': missing_count.sum(),
                'missing_handling_method': handle_missing
            }
        }

        # Generate summary statistics if requested
        if generate_summary:
            numeric_data = df.select_dtypes(include=[np.number])

            summary_stats = {
                'numeric_columns': len(numeric_data.columns),
                'total_rows': len(df),
                'summary_statistics': numeric_data.describe().to_dict()
            }

            result['summary'] = summary_stats

        return result

    except FileNotFoundError:
        raise Exception(f"File not found: {file_path}")
    except pd.errors.EmptyDataError:
        raise Exception("CSV file is empty")
    except Exception as e:
        raise Exception(f"Error processing CSV: {str(e)}")

# Example usage
if __name__ == "__main__":
    try:
        result = process_csv_data(
            'data.csv',
            handle_missing='fill_mean',
            generate_summary=True
        )

        print(f"Processed {result['processing_info']['processed_shape'][0]} rows")
        print(f"Found {result['processing_info']['missing_values_found']} missing values")

        if 'summary' in result:
            print("\\nSummary Statistics:")
            for col, stats in result['summary']['summary_statistics'].items():
                print(f"{col}: mean={stats['mean']:.2f}, std={stats['std']:.2f}")

    except Exception as e:
        print(f"Error: {e}")`}</code>
                              </pre>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Trophy className="h-5 w-5 text-purple-600" />
                          <span>Code Generation Challenge</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">
                          Practice AI-assisted coding with these challenges:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-medium mb-2">Beginner:</h5>
                            <ul className="space-y-1 text-xs">
                              <li>• Create a calculator with error handling</li>
                              <li>• Build a todo list with persistence</li>
                              <li>• Generate a password validator</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Advanced:</h5>
                            <ul className="space-y-1 text-xs">
                              <li>• Build a web scraper with rate limiting</li>
                              <li>• Create a real-time chat application</li>
                              <li>• Implement a machine learning model</li>
                            </ul>
                          </div>
                        </div>
                        <Button size="sm" className="mt-4" asChild>
                          <a
                            href="https://replit.com/new"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Start Coding with AI
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

          {currentSection === "debugging" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  AI Debugging Assistant
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Learn to leverage Replit's AI tools to find, understand, and
                  fix bugs efficiently with step-by-step examples and real-world
                  scenarios.
                </p>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="examples">Debug Examples</TabsTrigger>
                  <TabsTrigger value="techniques">Techniques</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Bug className="h-5 w-5 text-red-500" />
                          <span>AI Debugging Capabilities</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Analyze error messages and stack traces</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Identify logic errors and edge cases</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Suggest fixes with explanations</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Explain why bugs occurred</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>
                              Recommend best practices to prevent issues
                            </span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Debugging Workflow</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded">
                            <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                              1
                            </div>
                            <span className="text-sm">Reproduce the bug</span>
                          </div>
                          <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded">
                            <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                              2
                            </div>
                            <span className="text-sm">
                              Copy error message or problematic code
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded">
                            <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                              3
                            </div>
                            <span className="text-sm">
                              Ask AI to analyze the issue
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded">
                            <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                              4
                            </div>
                            <span className="text-sm">
                              Apply suggested fixes
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded">
                            <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                              5
                            </div>
                            <span className="text-sm">
                              Test and verify the solution
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Interactive Debugging Demo</CardTitle>
                      <CardDescription>
                        Try debugging with AI assistance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label
                            htmlFor="buggy-code"
                            className="text-sm font-medium"
                          >
                            Paste your buggy code or error message:
                          </Label>
                          <Textarea
                            id="buggy-code"
                            placeholder="Example: TypeError: Cannot read property 'length' of undefined"
                            className="mt-2"
                            rows={4}
                          />
                        </div>

                        <Button className="w-full">
                          <Bug className="h-4 w-4 mr-2" />
                          Analyze Bug with AI
                        </Button>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <Bot className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div className="text-sm">
                              <div className="font-medium mb-2">
                                AI Analysis:
                              </div>
                              <div className="space-y-2 text-muted-foreground">
                                <p>
                                  This error occurs when you're trying to access
                                  the 'length' property on a variable that is
                                  undefined or null.
                                </p>
                                <p>
                                  <strong>Common causes:</strong>
                                </p>
                                <ul className="list-disc list-inside ml-4">
                                  <li>Variable not initialized</li>
                                  <li>Function returning undefined</li>
                                  <li>Array element doesn't exist</li>
                                </ul>
                                <p>
                                  <strong>Solution:</strong> Add null checks
                                  before accessing properties.
                                </p>
                              </div>
                            </div>
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
                        <CardTitle>Example 1: Runtime Error</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2 text-red-600">
                              ❌ Buggy Code:
                            </h4>
                            <div className="code-block">
                              <pre className="text-xs overflow-x-auto">
                                <code>{`function getUserNames(users) {
  return users.map(user => user.name.toUpperCase());
}

const userList = [
  { name: "John" },
  { name: "Jane" },
  { id: 3, email: "bob@example.com" }, // Missing name property
  { name: "Alice" }
];

console.log(getUserNames(userList)); // TypeError: Cannot read property 'toUpperCase' of undefined`}</code>
                              </pre>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              🤖 AI Analysis:
                            </h4>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm">
                              The error occurs because the third user object
                              doesn't have a 'name' property, so user.name is
                              undefined, and calling toUpperCase() on undefined
                              throws an error.
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2 text-green-600">
                              ✅ Fixed Code:
                            </h4>
                            <div className="code-block">
                              <pre className="text-xs overflow-x-auto">
                                <code>{`function getUserNames(users) {
  return users
    .filter(user => user.name) // Filter out users without names
    .map(user => user.name.toUpperCase());
}

// Alternative with error handling:
function getUserNamesWithDefaults(users) {
  return users.map(user => {
    const name = user.name || 'Anonymous';
    return name.toUpperCase();
  });
}`}</code>
                              </pre>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Example 2: Logic Error</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2 text-red-600">
                              ❌ Buggy Code:
                            </h4>
                            <div className="code-block">
                              <pre className="text-xs overflow-x-auto">
                                <code>{`function calculateAverage(numbers) {
  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) { // Off-by-one error
    sum += numbers[i];
  }
  return sum / numbers.length;
}

console.log(calculateAverage([1, 2, 3, 4, 5])); // NaN`}</code>
                              </pre>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              🤖 AI Analysis:
                            </h4>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm">
                              Classic off-by-one error. The loop condition uses
                              i &lt;= numbers.length, which tries to access an
                              index that doesn't exist (numbers[5] for array of
                              length 5), resulting in undefined being added to
                              sum.
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2 text-green-600">
                              ✅ Fixed Code:
                            </h4>
                            <div className="code-block">
                              <pre className="text-xs overflow-x-auto">
                                <code>{`function calculateAverage(numbers) {
  if (numbers.length === 0) return 0; // Handle empty array

  let sum = 0;
  for (let i = 0; i < numbers.length; i++) { // Fixed: use < instead of <=
    sum += numbers[i];
  }
  return sum / numbers.length;
}

// Even better with reduce:
function calculateAverageModern(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}`}</code>
                              </pre>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Example 3: Async/Promise Error</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2 text-red-600">
                              ❌ Buggy Code:
                            </h4>
                            <div className="code-block">
                              <pre className="text-xs overflow-x-auto">
                                <code>{`async function fetchUserData() {
  const response = fetch('/api/users');
  const users = response.json(); // Missing await
  console.log(users); // Logs Promise object, not data
  return users;
}`}</code>
                              </pre>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              🤖 AI Analysis:
                            </h4>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm">
                              Missing await keywords cause the function to work
                              with Promise objects instead of resolved values.
                              This is a common async/await mistake.
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2 text-green-600">
                              ✅ Fixed Code:
                            </h4>
                            <div className="code-block">
                              <pre className="text-xs overflow-x-auto">
                                <code>{`async function fetchUserData() {
  try {
    const response = await fetch('/api/users');

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const users = await response.json();
    console.log(users); // Now logs actual data
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}`}</code>
                              </pre>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="techniques" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Error-First Debugging</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="text-sm">
                            <strong>1. Read the Error Message Carefully</strong>
                            <p className="text-muted-foreground text-xs mt-1">
                              Error messages contain valuable information about
                              what went wrong and where.
                            </p>
                          </div>
                          <div className="text-sm">
                            <strong>2. Check the Stack Trace</strong>
                            <p className="text-muted-foreground text-xs mt-1">
                              Follow the call stack to find the exact line where
                              the error occurred.
                            </p>
                          </div>
                          <div className="text-sm">
                            <strong>3. Understand the Context</strong>
                            <p className="text-muted-foreground text-xs mt-1">
                              Look at what your code was trying to do when the
                              error happened.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Systematic Debugging</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="text-sm">
                            <strong>1. Isolate the Problem</strong>
                            <p className="text-muted-foreground text-xs mt-1">
                              Create a minimal reproduction case to narrow down
                              the issue.
                            </p>
                          </div>
                          <div className="text-sm">
                            <strong>2. Add Logging</strong>
                            <p className="text-muted-foreground text-xs mt-1">
                              Use console.log() strategically to trace execution
                              flow.
                            </p>
                          </div>
                          <div className="text-sm">
                            <strong>3. Test Assumptions</strong>
                            <p className="text-muted-foreground text-xs mt-1">
                              Verify that variables contain the values you
                              expect.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>AI-Powered Debugging Strategies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                            <SearchIcon className="h-6 w-6 text-blue-500" />
                          </div>
                          <h4 className="font-medium mb-2">
                            Error Message Analysis
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Paste error messages for instant analysis and
                            solutions
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                            <Code className="h-6 w-6 text-green-500" />
                          </div>
                          <h4 className="font-medium mb-2">Code Review</h4>
                          <p className="text-xs text-muted-foreground">
                            Ask AI to review problematic code sections for
                            potential issues
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                            <Lightbulb className="h-6 w-6 text-purple-500" />
                          </div>
                          <h4 className="font-medium mb-2">Best Practices</h4>
                          <p className="text-xs text-muted-foreground">
                            Get suggestions for preventing similar bugs in the
                            future
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Debugging Prompts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted/20 rounded-lg">
                          <div className="font-medium text-sm mb-1">
                            For Runtime Errors:
                          </div>
                          <code className="text-xs">
                            "Analyze this error message and explain why it
                            occurred: [paste error]"
                          </code>
                        </div>
                        <div className="p-3 bg-muted/20 rounded-lg">
                          <div className="font-medium text-sm mb-1">
                            For Logic Bugs:
                          </div>
                          <code className="text-xs">
                            "This function should do X but returns Y. Can you
                            identify the logic error?"
                          </code>
                        </div>
                        <div className="p-3 bg-muted/20 rounded-lg">
                          <div className="font-medium text-sm mb-1">
                            For Performance Issues:
                          </div>
                          <code className="text-xs">
                            "This code is slow. What optimizations would you
                            suggest?"
                          </code>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="practice" className="space-y-6">
                  <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-red-500" />
                        <span>Debugging Challenge</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          Try to debug these intentionally buggy code snippets
                          using AI assistance:
                        </p>

                        <div className="space-y-4">
                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium text-sm mb-2">
                              Challenge 1: Array Bug
                            </h4>
                            <div className="code-block text-xs">
                              <code>{`function findMaxValue(arr) {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

console.log(findMaxValue([-5, -2, -10, -1])); // Expected: -1, Got: 0`}</code>
                            </div>
                            <div className="mt-2">
                              <input
                                type="checkbox"
                                id="challenge-1"
                                checked={completedExercises.includes(
                                  "debug-challenge-1",
                                )}
                                onChange={() =>
                                  toggleExercise("debug-challenge-1")
                                }
                                className="rounded mr-2"
                              />
                              <label
                                htmlFor="challenge-1"
                                className="text-xs"
                              >
                                I've identified and fixed the bug
                              </label>
                            </div>
                          </div>

                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium text-sm mb-2">
                              Challenge 2: Async Bug
                            </h4>
                            <div className="code-block text-xs">
                              <code>{`function loadUserProfile(userId) {
  const user = fetch(\`/api/users/\${userId}\`);
  const profile = fetch(\`/api/profiles/\${user.id}\`);
  return profile;
}`}</code>
                            </div>
                            <div className="mt-2">
                              <input
                                type="checkbox"
                                id="challenge-2"
                                checked={completedExercises.includes(
                                  "debug-challenge-2",
                                )}
                                onChange={() =>
                                  toggleExercise("debug-challenge-2")
                                }
                                className="rounded mr-2"
                              />
                              <label
                                htmlFor="challenge-2"
                                className="text-xs"
                              >
                                I've identified and fixed the bug
                              </label>
                            </div>
                          </div>

                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium text-sm mb-2">
                              Challenge 3: Scope Bug
                            </h4>
                            <div className="code-block text-xs">
                              <code>{`function createCounters() {
  const counters = [];
  for (var i = 0; i < 3; i++) {
    counters.push(function() {
      return i;
    });
  }
  return counters;
}

const counters = createCounters();
console.log(counters[0]()); // Expected: 0, Got: 3`}</code>
                            </div>
                            <div className="mt-2">
                              <input
                                type="checkbox"
                                id="challenge-3"
                                checked={completedExercises.includes(
                                  "debug-challenge-3",
                                )}
                                onChange={() =>
                                  toggleExercise("debug-challenge-3")
                                }
                                className="rounded mr-2"
                              />
                              <label
                                htmlFor="challenge-3"
                                className="text-xs"
                              >
                                I've identified and fixed the bug
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5" />
                            <div className="text-xs">
                              <strong>Debugging Tip:</strong> For each challenge,
                              try to identify the bug first, then ask AI to
                              confirm your analysis and suggest improvements.
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Debugging Best Practices Checklist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="practice-1"
                            checked={completedExercises.includes(
                              "debug-practice-1",
                            )}
                            onChange={() => toggleExercise("debug-practice-1")}
                            className="rounded"
                          />
                          <label htmlFor="practice-1" className="text-sm">
                            Always read error messages completely before asking
                            for help
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="practice-2"
                            checked={completedExercises.includes(
                              "debug-practice-2",
                            )}
                            onChange={() => toggleExercise("debug-practice-2")}
                            className="rounded"
                          />
                          <label htmlFor="practice-2" className="text-sm">
                            Create minimal reproducible examples for complex bugs
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="practice-3"
                            checked={completedExercises.includes(
                              "debug-practice-3",
                            )}
                            onChange={() => toggleExercise("debug-practice-3")}
                            className="rounded"
                          />
                          <label htmlFor="practice-3" className="text-sm">
                            Use console.log() strategically to trace execution
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="practice-4"
                            checked={completedExercises.includes(
                              "debug-practice-4",
                            )}
                            onChange={() => toggleExercise("debug-practice-4")}
                            className="rounded"
                          />
                          <label htmlFor="practice-4" className="text-sm">
                            Validate assumptions with actual data checks
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="practice-5"
                            checked={completedExercises.includes(
                              "debug-practice-5",
                            )}
                            onChange={() => toggleExercise("debug-practice-5")}
                            className="rounded"
                          />
                          <label htmlFor="practice-5" className="text-sm">
                            Learn from each bug to prevent similar issues
                          </label>
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
              <Link to="/core-features">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous: Core Features
              </Link>
            </Button>
            <Button asChild>
              <Link to="/community">
                Next: Community Features
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </main>
      </div>
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
                Next: Community Features
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
                              💡 Prevention Tips:
                            </h4>
                            <ul className="text-sm space-y-1">
                              <li>
                                • Always validate data structure before
                                processing
                              </li>
                              <li>
                                • Use optional chaining:
                                user.name?.toUpperCase()
                              </li>
                              <li>
                                • Add TypeScript for compile-time type checking
                              </li>
                              <li>• Include unit tests with edge cases</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Example 2: Logic Error</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2 text-red-600">
                              ❌ Buggy Code:
                            </h4>
                            <div className="code-block">
                              <pre className="text-xs overflow-x-auto">
                                <code>{`function calculateDiscountPrice(price, discountPercent) {
  const discount = price * discountPercent; // Bug: Should divide by 100
  return price - discount;
}

console.log(calculateDiscountPrice(100, 20)); // Expected: 80, Actual: -1900`}</code>
                              </pre>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              🤖 AI Analysis:
                            </h4>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm">
                              The function treats the discount percentage as a
                              decimal multiplier instead of a percentage. When
                              discountPercent is 20 (meaning 20%), it should be
                              converted to 0.20 by dividing by 100.
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2 text-green-600">
                              ✅ Fixed Code:
                            </h4>
                            <div className="code-block">
                              <pre className="text-xs overflow-x-auto">
                                <code>{`function calculateDiscountPrice(price, discountPercent) {
  // Input validation
  if (price < 0 || discountPercent < 0 || discountPercent > 100) {
    throw new Error('Invalid input: price must be non-negative and discount must be 0-100');
  }

  const discount = price * (discountPercent / 100); // Convert percentage to decimal
  return price - discount;
}

// Alternative with more explicit naming:
function calculateDiscountPriceDecimal(price, discountDecimal) {
  if (price < 0 || discountDecimal < 0 || discountDecimal > 1) {
    throw new Error('Invalid input: price must be non-negative and discount must be 0-1');
  }

  const discount = price * discountDecimal;
  return price - discount;
}

console.log(calculateDiscountPrice(100, 20)); // 80
console.log(calculateDiscountPriceDecimal(100, 0.20)); // 80

// Test cases
console.log(calculateDiscountPrice(50, 10));  // 45
console.log(calculateDiscountPrice(200, 25)); // 150`}</code>
                              </pre>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              💡 Prevention Tips:
                            </h4>
                            <ul className="text-sm space-y-1">
                              <li>
                                • Write unit tests with known expected outputs
                              </li>
                              <li>
                                • Use descriptive parameter names
                                (discountPercent vs discountDecimal)
                              </li>
                              <li>
                                • Add input validation to catch invalid data
                                early
                              </li>
                              <li>
                                • Document expected input formats in comments
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Example 3: Async/Promise Error</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2 text-red-600">
                              ❌ Buggy Code:
                            </h4>
                            <div className="code-block">
                              <pre className="text-xs overflow-x-auto">
                                <code>{`async function fetchUserData() {
  const response = fetch('https://api.example.com/users');
  const data = response.json(); // Missing await

  return data.map(user => user.name); // Error: data is a Promise
}

fetchUserData().then(names => console.log(names)); // TypeError: data.map is not a function`}</code>
                              </pre>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              🤖 AI Analysis:
                            </h4>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm">
                              The code is missing 'await' keywords. Both fetch()
                              and response.json() return Promises, so without
                              'await', you're trying to call .map() on a Promise
                              object instead of the actual data array.
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2 text-green-600">
                              ✅ Fixed Code:
                            </h4>
                            <div className="code-block">
                              <pre className="text-xs overflow-x-auto">
                                <code>{`async function fetchUserData() {
  try {
    const response = await fetch('https://api.example.com/users');

    // Check if request was successful
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();

    // Validate data structure
    if (!Array.isArray(data)) {
      throw new Error('Expected an array of users');
    }

    return data
      .filter(user => user && user.name) // Filter out invalid entries
      .map(user => user.name);

  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error; // Re-throw to let caller handle it
  }
}

// Usage with proper error handling
fetchUserData()
  .then(names => {
    console.log('User names:', names);
  })
  .catch(error => {
    console.error('Error getting user names:', error.message);
  });

// Alternative using async/await
async function displayUserNames() {
  try {
    const names = await fetchUserData();
    console.log('User names:', names);
  } catch (error) {
    console.error('Error getting user names:', error.message);
  }
}

displayUserNames();`}</code>
                              </pre>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              💡 Prevention Tips:
                            </h4>
                            <ul className="text-sm space-y-1">
                              <li>
                                • Always await Promise-returning functions
                              </li>
                              <li>
                                • Check HTTP response status before parsing
                              </li>
                              <li>• Validate API response structure</li>
                              <li>• Use try-catch blocks for error handling</li>
                              <li>
                                • Consider using TypeScript for better async
                                typing
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="techniques" className="space-y-6">
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Effective AI Debugging Prompts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              1. Error Analysis Prompt
                            </h4>
                            <div className="bg-muted rounded-lg p-3">
                              <div className="text-sm font-mono mb-2">
                                Template:
                              </div>
                              <div className="text-sm italic">
                                "I'm getting this error: [ERROR_MESSAGE]. Here's
                                my code: [CODE_BLOCK]. Can you explain why this
                                error occurs and how to fix it?"
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              2. Logic Error Prompt
                            </h4>
                            <div className="bg-muted rounded-lg p-3">
                              <div className="text-sm italic">
                                "This function should [EXPECTED_BEHAVIOR] but
                                it's [ACTUAL_BEHAVIOR]. Here's my code:
                                [CODE_BLOCK]. What's wrong with my logic?"
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              3. Performance Issue Prompt
                            </h4>
                            <div className="bg-muted rounded-lg p-3">
                              <div className="text-sm italic">
                                "This code is running slowly with [DATASET_SIZE]
                                items. Can you identify performance bottlenecks
                                and suggest optimizations?"
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              4. Code Review Prompt
                            </h4>
                            <div className="bg-muted rounded-lg p-3">
                              <div className="text-sm italic">
                                "Please review this code for potential bugs,
                                security issues, and improvement opportunities:
                                [CODE_BLOCK]"
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Debugging Strategies</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-sm mb-3">
                              Systematic Approach
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                <span>Reproduce the bug consistently</span>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                <span>
                                  Isolate the problematic code section
                                </span>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                <span>
                                  Check inputs and outputs at each step
                                </span>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                <span>
                                  Use console.log for state inspection
                                </span>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                <span>
                                  Apply AI-suggested fixes incrementally
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-3">
                              Prevention Techniques
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                <span>Write comprehensive unit tests</span>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                <span>Use TypeScript for type safety</span>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                <span>Implement proper error handling</span>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                <span>Validate inputs and assumptions</span>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                <span>
                                  Regular code reviews and AI analysis
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Common Bug Categories</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-sm mb-2">
                              Runtime Errors
                            </h5>
                            <ul className="text-xs space-y-1">
                              <li>• Null/undefined reference errors</li>
                              <li>• Type mismatches</li>
                              <li>• Array index out of bounds</li>
                              <li>• Missing function/method calls</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm mb-2">
                              Logic Errors
                            </h5>
                            <ul className="text-xs space-y-1">
                              <li>• Incorrect conditional logic</li>
                              <li>• Off-by-one errors in loops</li>
                              <li>• Wrong mathematical calculations</li>
                              <li>• Incorrect data transformations</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm mb-2">
                              Async Issues
                            </h5>
                            <ul className="text-xs space-y-1">
                              <li>• Missing await keywords</li>
                              <li>• Unhandled promise rejections</li>
                              <li>• Race conditions</li>
                              <li>• Callback hell</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm mb-2">
                              Performance Issues
                            </h5>
                            <ul className="text-xs space-y-1">
                              <li>• Inefficient algorithms</li>
                              <li>• Memory leaks</li>
                              <li>• Unnecessary re-renders</li>
                              <li>• Blocking operations</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="space-y-6">
                  <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Bug className="h-5 w-5 text-red-600" />
                        <span>Debugging Practice Challenges</span>
                      </CardTitle>
                      <CardDescription>
                        Practice debugging with these intentionally buggy code
                        examples
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-3">
                            Challenge 1: Find the Bug
                          </h4>
                          <div className="code-block mb-3">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`function findLargestNumber(numbers) {
  let largest = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > largest) {
      largest = numbers[i];
    }
  }
  return largest;
}

console.log(findLargestNumber([5, 2, 8, 1, 9])); // Works: 9
console.log(findLargestNumber([-5, -2, -8, -1])); // Bug: returns 0 instead of -1`}</code>
                            </pre>
                          </div>
                          <details className="text-sm">
                            <summary className="font-medium cursor-pointer">
                              Show AI Analysis
                            </summary>
                            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                              <p>
                                <strong>Bug:</strong> The function initializes
                                'largest' to 0, which causes issues when all
                                numbers are negative.
                              </p>
                              <p>
                                <strong>Fix:</strong> Initialize 'largest' to
                                the first element:{" "}
                                <code>let largest = numbers[0];</code>
                              </p>
                            </div>
                          </details>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">
                            Challenge 2: Async Bug
                          </h4>
                          <div className="code-block mb-3">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`async function processFiles(filenames) {
  const results = [];
  for (let filename of filenames) {
    const content = readFile(filename); // Missing await
    results.push(content.toUpperCase());
  }
  return results;
}

async function readFile(filename) {
  return new Promise(resolve => {
    setTimeout(() => resolve(\`content of \${filename}\`), 100);
  });
}`}</code>
                            </pre>
                          </div>
                          <details className="text-sm">
                            <summary className="font-medium cursor-pointer">
                              Show AI Analysis
                            </summary>
                            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                              <p>
                                <strong>Bug:</strong> Missing 'await' before
                                readFile(), so content is a Promise, not a
                                string.
                              </p>
                              <p>
                                <strong>Fix:</strong>{" "}
                                <code>
                                  const content = await readFile(filename);
                                </code>
                              </p>
                            </div>
                          </details>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">
                            Challenge 3: Logic Error
                          </h4>
                          <div className="code-block mb-3">
                            <pre className="text-xs overflow-x-auto">
                              <code>{`function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/\s/g, '');
  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i] !== cleaned[cleaned.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

console.log(isPalindrome("A man a plan a canal Panama")); // Should be true, but...`}</code>
                            </pre>
                          </div>
                          <details className="text-sm">
                            <summary className="font-medium cursor-pointer">
                              Show AI Analysis
                            </summary>
                            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                              <p>
                                <strong>Issue:</strong> The regex only removes
                                spaces but not punctuation.
                              </p>
                              <p>
                                <strong>Fix:</strong>{" "}
                                <code>replace(/[^a-z0-9]/g, '')</code> to remove
                                all non-alphanumeric characters.
                              </p>
                            </div>
                          </details>
                        </div>

                        <Button className="w-full" asChild>
                          <a
                            href="https://replit.com/new/javascript"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Practice Debugging in Replit
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Debugging Exercises</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2">
                            Beginner Exercises:
                          </h5>
                          <ul className="text-xs space-y-1">
                            <li>• Fix null pointer exceptions</li>
                            <li>• Correct simple logic errors</li>
                            <li>• Debug basic loop issues</li>
                            <li>• Handle missing function parameters</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">
                            Advanced Exercises:
                          </h5>
                          <ul className="text-xs space-y-1">
                            <li>• Debug complex async/await chains</li>
                            <li>• Fix memory leaks in event listeners</li>
                            <li>• Resolve race conditions</li>
                            <li>• Optimize performance bottlenecks</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                  Understanding Replit AI's limitations helps you use
                  Ghostwriter and AI Chat more effectively and set appropriate
                  expectations.
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