import { PageLayout } from "@/components/page-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TrendingUp,
  BookOpen,
  Trophy,
  Clock,
  Star,
  ArrowRight,
  BarChart3,
  Calendar,
  Target,
  Zap,
  RefreshCw,
  PlayCircle,
  CheckCircle2,
  Users,
  Code,
  GitBranch,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const pageMetadata = {
  title: "Dashboard",
  description:
    "Your personalized learning dashboard with progress tracking and recommendations",
  category: "account" as const,
  level: "beginner" as const,
  timeToComplete: "2-3 minutes",
  prerequisites: [],
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
];

const recentActivity = [
  {
    id: 1,
    type: "completion",
    title: "Completed Getting Started",
    description: "Finished all sections in the Getting Started guide",
    timestamp: "2 hours ago",
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    id: 2,
    type: "achievement",
    title: "First Steps Badge Earned",
    description: "Completed your first tutorial section",
    timestamp: "3 hours ago",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    id: 3,
    type: "study",
    title: "Started Core Features",
    description: "Began learning about Replit's core features",
    timestamp: "1 day ago",
    icon: BookOpen,
    color: "text-blue-500",
  },
  {
    id: 4,
    type: "project",
    title: "Created Python Calculator",
    description: "Built your first Python project",
    timestamp: "2 days ago",
    icon: Code,
    color: "text-purple-500",
  },
];

const achievements = [
  {
    name: "First Steps",
    description: "Complete your first section",
    earned: true,
    icon: "🎯",
  },
  {
    name: "Code Explorer",
    description: "Try 3 different languages",
    earned: true,
    icon: "🚀",
  },
  {
    name: "Problem Solver",
    description: "Complete 5 exercises",
    earned: false,
    icon: "🧩",
  },
  {
    name: "Team Player",
    description: "Join the community",
    earned: false,
    icon: "👥",
  },
  {
    name: "Streak Master",
    description: "7-day learning streak",
    earned: false,
    icon: "🔥",
  },
];

const recommendations = [
  {
    title: "Core Features Deep Dive",
    description: "Learn about Replit's powerful development features",
    progress: 25,
    timeEstimate: "15 min",
    type: "tutorial",
    href: "/core-features",
  },
  {
    title: "AI Tools Workshop",
    description: "Discover how AI can accelerate your coding",
    progress: 0,
    timeEstimate: "20 min",
    type: "workshop",
    href: "/ai-tools",
  },
  {
    title: "Community Engagement",
    description: "Connect with other developers and share projects",
    progress: 0,
    timeEstimate: "10 min",
    type: "social",
    href: "/community",
  },
];

const stats = [
  {
    label: "Sections Completed",
    value: "3",
    change: "+1 this week",
    icon: BookOpen,
  },
  {
    label: "Total Study Time",
    value: "2.5h",
    change: "+45m today",
    icon: Clock,
  },
  {
    label: "Achievements Earned",
    value: "2",
    change: "+1 this week",
    icon: Trophy,
  },
  {
    label: "Current Streak",
    value: "3 days",
    change: "Keep it up!",
    icon: Zap,
  },
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <PageLayout
      title="Dashboard"
      description="Track your progress and discover new learning opportunities"
      breadcrumbItems={breadcrumbItems}
      metadata={pageMetadata}
      showProgress={false}
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, John! 👋</h1>
            <p className="text-muted-foreground mt-2">
              Ready to continue your Replit journey? Here's what's new for you.
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            variant="outline"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Learning Progress</span>
                </CardTitle>
                <CardDescription>
                  Your journey through the Replit guide
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Getting Started</span>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Core Features</span>
                    <Badge variant="outline">In Progress</Badge>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">AI Tools</span>
                    <Badge variant="outline">Not Started</Badge>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Advanced Topics</span>
                    <Badge variant="outline">Locked</Badge>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Recommended for You</span>
                </CardTitle>
                <CardDescription>
                  Personalized content based on your learning progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={item.progress}
                            className="w-20 h-1"
                          />
                          <span className="text-xs text-muted-foreground">
                            {item.progress}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{item.timeEstimate}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" asChild>
                      <Link to={item.href}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continue
                      </Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <activity.icon
                        className={`h-4 w-4 mt-1 ${activity.color}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className={`text-lg ${achievement.earned ? "" : "grayscale opacity-50"}`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${achievement.earned ? "" : "text-muted-foreground"}`}
                        >
                          {achievement.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link to="/core-features">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link to="/community">
                    <Users className="h-4 w-4 mr-2" />
                    Join Community
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <a
                    href="https://replit.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Start Coding
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Weekly Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>This Week's Goal</span>
            </CardTitle>
            <CardDescription>
              Complete 2 more sections to maintain your learning streak
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Progress value={60} className="w-32" />
                <span className="text-sm text-muted-foreground">
                  3 of 5 sections
                </span>
              </div>
              <Button size="sm" asChild>
                <Link to="/core-features">
                  Continue Learning
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
