import React, { useState, useEffect, ReactNode } from "react";
import { useNavigation } from "./navigation-provider";
import { useAuth } from "./auth-provider";
import { BreadcrumbNavigation } from "./unified-navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle,
  Target,
  Lightbulb,
  MessageCircle,
  ExternalLink,
  ChevronUp,
  Share2,
  Eye,
  AlertCircle,
  Info,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  category?: "learning" | "community" | "account" | "advanced";
  level?: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  estimatedTime?: string;
  prerequisites?: string[];
  objectives?: string[];
  helpContent?: ReactNode;
  showProgress?: boolean;
  nextPage?: { title: string; href: string };
  previousPage?: { title: string; href: string };
  className?: string;
}

// Contextual help system
export function ContextualHelp({
  title,
  content,
  position = "bottom",
}: {
  title: string;
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side={position} className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">{title}</h4>
          <div className="text-sm text-muted-foreground">{content}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Quick tip component with animations
export function QuickTip({
  children,
  tip,
  delay = 0,
}: {
  children: ReactNode;
  tip: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Tooltip open={isVisible} onOpenChange={setIsVisible}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-3 w-3" />
          <span>{tip}</span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

// Page progress indicator
export function PageProgress({
  sections,
  currentSection,
}: {
  sections: string[];
  currentSection: number;
}) {
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>Progress</span>
        <span>
          {currentSection + 1} of {sections.length}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {sections.map((section, index) => (
          <div
            key={section}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index <= currentSection ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}

// Interactive feedback component
export function InteractiveFeedback({
  onFeedback,
}: {
  onFeedback: (type: "helpful" | "not-helpful", comment?: string) => void;
}) {
  const [feedback, setFeedback] = useState<"helpful" | "not-helpful" | null>(
    null,
  );
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");

  const handleFeedback = (type: "helpful" | "not-helpful") => {
    setFeedback(type);
    if (type === "not-helpful") {
      setShowComment(true);
    } else {
      onFeedback(type);
    }
  };

  const submitFeedback = () => {
    onFeedback(feedback!, comment);
    setShowComment(false);
  };

  if (feedback && feedback === "helpful") {
    return (
      <div className="flex items-center space-x-2 text-green-600">
        <CheckCircle className="h-4 w-4" />
        <span className="text-sm">Thanks for your feedback!</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Was this helpful?</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFeedback("helpful")}
          className="h-7 px-2"
        >
          👍
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFeedback("not-helpful")}
          className="h-7 px-2"
        >
          👎
        </Button>
      </div>

      {showComment && (
        <div className="space-y-2">
          <textarea
            className="w-full p-2 text-sm border rounded-md resize-none"
            placeholder="How can we improve this section?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
          />
          <div className="flex space-x-2">
            <Button size="sm" onClick={submitFeedback}>
              Submit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowComment(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Page metadata component
export function PageMetadata({
  category,
  level,
  estimatedTime,
  prerequisites,
  objectives,
}: {
  category?: string;
  level?: string;
  estimatedTime?: string;
  prerequisites?: string[];
  objectives?: string[];
}) {
  const categoryIcons = {
    learning: BookOpen,
    community: Users,
    account: Target,
    advanced: Zap,
  };

  const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Category and Level */}
      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          {CategoryIcon && <CategoryIcon className="h-4 w-4 text-primary" />}
          <span className="text-sm font-medium capitalize">{category}</span>
        </div>
        {level && (
          <Badge variant="secondary" className="text-xs">
            {level}
          </Badge>
        )}
      </Card>

      {/* Estimated Time */}
      {estimatedTime && (
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Estimated Time</span>
          </div>
          <span className="text-sm text-muted-foreground">{estimatedTime}</span>
        </Card>
      )}

      {/* Prerequisites */}
      {prerequisites && prerequisites.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Prerequisites</span>
          </div>
          <div className="space-y-1">
            {prerequisites.map((prereq, index) => (
              <div key={index} className="text-xs text-muted-foreground">
                • {prereq}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// Main page layout component
export function PageLayout({
  children,
  title,
  description,
  category,
  level,
  estimatedTime,
  prerequisites,
  objectives,
  helpContent,
  showProgress = false,
  nextPage,
  previousPage,
  className,
}: PageLayoutProps) {
  const { isAuthenticated } = useAuth();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setReadingProgress(Math.min(100, Math.max(0, progress)));
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-100"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="flex">
        {/* Main content area with proper spacing for sidebar */}
        <main className={cn("flex-1 md:ml-64", className)}>
          <div className="container max-w-4xl py-8 px-6">
            {/* Breadcrumbs */}
            <BreadcrumbNavigation />

            {/* Page header */}
            {title && (
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                      {title}
                      {helpContent && (
                        <ContextualHelp
                          title={`About ${title}`}
                          content={helpContent}
                        />
                      )}
                    </h1>
                    {description && (
                      <p className="text-lg text-muted-foreground max-w-3xl">
                        {description}
                      </p>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center space-x-2 ml-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Share this page</TooltipContent>
                    </Tooltip>

                    {isAuthenticated && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Mark as viewed</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </div>

                {/* Page metadata */}
                <PageMetadata
                  category={category}
                  level={level}
                  estimatedTime={estimatedTime}
                  prerequisites={prerequisites}
                  objectives={objectives}
                />

                {/* Learning objectives */}
                {objectives && objectives.length > 0 && (
                  <Card className="mb-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <Target className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Learning Objectives</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {objectives.map((objective, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{objective}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Main content */}
            <div className="prose prose-slate max-w-none dark:prose-invert">
              {children}
            </div>

            {/* Feedback section */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center justify-between">
                <InteractiveFeedback
                  onFeedback={(type, comment) => {
                    console.log("Feedback:", type, comment);
                    // In a real app, this would send to analytics
                  }}
                />

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>Updated recently</span>
                </div>
              </div>
            </div>

            {/* Navigation footer */}
            {(previousPage || nextPage) && (
              <div className="flex items-center justify-between mt-12 pt-8 border-t">
                <div className="flex-1">
                  {previousPage && (
                    <Link
                      to={previousPage.href}
                      className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                      <div>
                        <div className="text-xs">Previous</div>
                        <div className="font-medium">{previousPage.title}</div>
                      </div>
                    </Link>
                  )}
                </div>

                <div className="flex-1 text-right">
                  {nextPage && (
                    <Link
                      to={nextPage.href}
                      className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <div>
                        <div className="text-xs">Next</div>
                        <div className="font-medium">{nextPage.title}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Scroll to top button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 shadow-lg"
            size="sm"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

// Enhanced card component with microinteractions
export function InteractiveCard({
  children,
  className,
  hover = true,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}) {
  return (
    <Card
      className={cn(
        "transition-all duration-200",
        hover &&
          "hover:shadow-lg hover:scale-[1.02] hover:border-primary/20 cursor-pointer",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Card>
  );
}

// Animated progress indicator
export function AnimatedProgress({
  value,
  max = 100,
  label,
  showValue = true,
}: {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}) {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-2">
      {(label || showValue) && (
        <div className="flex justify-between text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showValue && (
            <span className="font-medium">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
