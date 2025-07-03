import React, { useState, useEffect } from "react";
import { useAuth } from "./auth-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookMarked,
  Trophy,
  Calendar,
  TrendingUp,
  Target,
  Zap,
  Clock,
  CheckCircle,
  Star,
  Flame,
  Award,
  BarChart,
  BookOpen,
  Users,
  Settings,
  Sync,
  Bell,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardStats {
  totalTime: number;
  completionRate: number;
  currentStreak: number;
  totalAchievements: number;
  bookmarksCount: number;
  lastVisited: string;
}

const sectionTitles = {
  "/": "Home",
  "/getting-started": "Getting Started",
  "/core-features": "Core Features",
  "/ai-tools": "AI Tools",
  "/community": "Community",
  "/pricing": "Pricing",
  "/advanced": "Advanced Usage",
};

const achievementDefinitions = [
  {
    id: "account_created",
    title: "Welcome Aboard!",
    description: "Created your first account",
    icon: "🎉",
    points: 10,
  },
  {
    id: "first_bookmark",
    title: "Bookmark Collector",
    description: "Saved your first bookmark",
    icon: "📖",
    points: 5,
  },
  {
    id: "section_completed",
    title: "Section Master",
    description: "Completed your first section",
    icon: "✅",
    points: 20,
  },
  {
    id: "streak_3",
    title: "Getting Started",
    description: "3 day learning streak",
    icon: "🔥",
    points: 15,
  },
  {
    id: "streak_7",
    title: "Week Warrior",
    description: "7 day learning streak",
    icon: "⚡",
    points: 30,
  },
  {
    id: "all_sections",
    title: "Guide Master",
    description: "Completed all sections",
    icon: "🏆",
    points: 100,
  },
  {
    id: "social_sharing",
    title: "Knowledge Sharer",
    description: "Shared content with others",
    icon: "🤝",
    points: 15,
  },
  {
    id: "settings_customized",
    title: "Personal Touch",
    description: "Customized your preferences",
    icon: "⚙️",
    points: 10,
  },
];

function LearningProgress() {
  const { user } = useAuth();

  if (!user) return null;

  const totalSections = 6;
  const completedSections = user.progress.completedSections.length;
  const progressPercentage = (completedSections / totalSections) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Learning Progress</span>
        </CardTitle>
        <CardDescription>Your journey through the Replit guide</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm text-muted-foreground">
            {completedSections}/{totalSections} sections
          </span>
        </div>
        <Progress value={progressPercentage} className="h-3" />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {user.progress.achievements.length}
            </div>
            <div className="text-xs text-muted-foreground">Achievements</div>
          </div>
        </div>

        {/* Quick section links */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Continue Learning</div>
          <div className="space-y-1">
            {Object.entries(sectionTitles)
              .slice(1) // Skip home
              .map(([path, title]) => {
                const isCompleted =
                  user.progress.completedSections.includes(path);
                const isCurrent = user.progress.lastVisited === path;

                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                      isCurrent
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                      )}
                      <span>{title}</span>
                    </div>
                    {isCurrent && (
                      <Badge variant="secondary" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </Link>
                );
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AchievementsPanel() {
  const { user } = useAuth();

  if (!user) return null;

  const userAchievements = user.progress.achievements;
  const unlockedAchievements = achievementDefinitions.filter((achievement) =>
    userAchievements.includes(achievement.id),
  );
  const lockedAchievements = achievementDefinitions.filter(
    (achievement) => !userAchievements.includes(achievement.id),
  );

  const totalPoints = unlockedAchievements.reduce(
    (sum, achievement) => sum + achievement.points,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span>Achievements</span>
        </CardTitle>
        <CardDescription>
          {unlockedAchievements.length} unlocked • {totalPoints} points earned
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recent achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm font-medium">Recently Unlocked</div>
            {unlockedAchievements.slice(-3).map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
              >
                <div className="text-lg">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{achievement.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {achievement.description}
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  +{achievement.points}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Next achievements to unlock */}
        {lockedAchievements.length > 0 && (
          <div className="space-y-3">
            <Separator />
            <div className="text-sm font-medium">Up Next</div>
            {lockedAchievements.slice(0, 2).map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg opacity-60"
              >
                <div className="text-lg grayscale">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{achievement.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {achievement.description}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {achievement.points}
                </Badge>
              </div>
            ))}
          </div>
        )}

        <Button variant="outline" size="sm" className="w-full">
          View All Achievements
        </Button>
      </CardContent>
    </Card>
  );
}

function BookmarksPanel() {
  const { user } = useAuth();

  if (!user || user.progress.bookmarks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookMarked className="w-5 h-5" />
            <span>Bookmarks</span>
          </CardTitle>
          <CardDescription>Save important sections for later</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground text-sm">
            No bookmarks yet. Click the bookmark icon on any section to save it
            here.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookMarked className="w-5 h-5" />
          <span>Bookmarks</span>
        </CardTitle>
        <CardDescription>
          {user.progress.bookmarks.length} saved sections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {user.progress.bookmarks.slice(0, 5).map((bookmark, index) => (
            <Link
              key={index}
              to={bookmark}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-colors"
            >
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm">
                {sectionTitles[bookmark as keyof typeof sectionTitles] ||
                  bookmark}
              </span>
            </Link>
          ))}
          {user.progress.bookmarks.length > 5 && (
            <Button variant="link" size="sm" className="p-0 text-xs">
              View all {user.progress.bookmarks.length} bookmarks
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickStats() {
  const { user } = useAuth();

  if (!user) return null;

  // Calculate mock stats (in real app, these would come from usage tracking)
  const mockStats: DashboardStats = {
    totalTime: 42, // minutes
    completionRate: (user.progress.completedSections.length / 6) * 100,
    currentStreak: user.progress.achievements.includes("streak_7")
      ? 7
      : user.progress.achievements.includes("streak_3")
        ? 3
        : 1,
    totalAchievements: user.progress.achievements.length,
    bookmarksCount: user.progress.bookmarks.length,
    lastVisited: user.progress.lastVisited,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="text-center">
        <CardContent className="pt-6">
          <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
          <div className="text-2xl font-bold">{mockStats.totalTime}m</div>
          <div className="text-xs text-muted-foreground">Time spent</div>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="pt-6">
          <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <div className="text-2xl font-bold">
            {Math.round(mockStats.completionRate)}%
          </div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="pt-6">
          <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500" />
          <div className="text-2xl font-bold">{mockStats.currentStreak}</div>
          <div className="text-xs text-muted-foreground">Day streak</div>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="pt-6">
          <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
          <div className="text-2xl font-bold">
            {mockStats.totalAchievements}
          </div>
          <div className="text-xs text-muted-foreground">Achievements</div>
        </CardContent>
      </Card>
    </div>
  );
}

function PersonalizedRecommendations() {
  const { user } = useAuth();

  if (!user) return null;

  // Generate recommendations based on user progress
  const getRecommendations = () => {
    const completed = user.progress.completedSections;
    const recommendations = [];

    if (!completed.includes("/getting-started")) {
      recommendations.push({
        title: "Start Your Journey",
        description: "Begin with the basics of Replit",
        link: "/getting-started",
        icon: BookOpen,
        priority: "high",
      });
    } else if (!completed.includes("/core-features")) {
      recommendations.push({
        title: "Explore Core Features",
        description: "Dive into Replit's development environment",
        link: "/core-features",
        icon: Settings,
        priority: "high",
      });
    } else if (!completed.includes("/ai-tools")) {
      recommendations.push({
        title: "Try AI Tools",
        description: "Learn about Replit's AI assistance",
        link: "/ai-tools",
        icon: Zap,
        priority: "medium",
      });
    }

    if (!user.progress.achievements.includes("first_bookmark")) {
      recommendations.push({
        title: "Save Your First Bookmark",
        description: "Bookmark sections you want to revisit",
        link: user.progress.lastVisited || "/",
        icon: BookMarked,
        priority: "low",
      });
    }

    return recommendations.slice(0, 3);
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5" />
            <span>You're all caught up!</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            Great job! You've explored all the main sections. Consider sharing
            your knowledge with others in the community.
          </div>
          <Button asChild className="w-full mt-4">
            <Link to="/community">Join Community</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5" />
          <span>Recommended for You</span>
        </CardTitle>
        <CardDescription>Based on your learning progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <Link
              key={index}
              to={rec.link}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors hover:bg-muted ${
                rec.priority === "high"
                  ? "border-primary/50 bg-primary/5"
                  : "border-border"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  rec.priority === "high" ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{rec.title}</div>
                <div className="text-xs text-muted-foreground">
                  {rec.description}
                </div>
              </div>
              {rec.priority === "high" && (
                <Badge variant="default" className="text-xs">
                  Priority
                </Badge>
              )}
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}

// Main dashboard component
export function UserDashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null; // Don't render anything if not authenticated
  }

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-lg">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">
            Continue your learning journey with personalized recommendations
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <QuickStats />

      {/* Main dashboard grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <LearningProgress />
          <PersonalizedRecommendations />
        </div>
        <div className="space-y-6">
          <AchievementsPanel />
          <BookmarksPanel />
        </div>
      </div>
    </div>
  );
}

// Compact dashboard widget for the main page
export function DashboardWidget() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) return null;

  const completedSections = user.progress.completedSections.length;
  const progressPercentage = (completedSections / 6) * 100;

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">Welcome back, {user.name}</div>
            <div className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}% complete •{" "}
              {user.progress.achievements.length} achievements
            </div>
            <Progress value={progressPercentage} className="h-2 mt-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
