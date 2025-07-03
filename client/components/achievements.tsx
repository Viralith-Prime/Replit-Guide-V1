import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Star,
  Target,
  Zap,
  BookOpen,
  Code,
  Users,
  Crown,
  Award,
  Clock,
} from "lucide-react";
import { useProgress } from "./progress-provider";

const achievementDefinitions = {
  "first-section": {
    title: "Getting Started",
    description: "Visited your first section",
    icon: BookOpen,
    color: "text-blue-500",
  },
  "first-exercise": {
    title: "Hands-On Learner",
    description: "Completed your first exercise",
    icon: Target,
    color: "text-green-500",
  },
  completionist: {
    title: "Guide Master",
    description: "Visited all guide sections",
    icon: Crown,
    color: "text-yellow-500",
  },
  "hands-on-learner": {
    title: "Practice Makes Perfect",
    description: "Completed 10+ exercises",
    icon: Zap,
    color: "text-purple-500",
  },
  "time-invested": {
    title: "Dedicated Student",
    description: "Spent 2+ hours learning",
    icon: Clock,
    color: "text-orange-500",
  },
};

export function AchievementBadges() {
  const { progress, getCompletionPercentage } = useProgress();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span>Your Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Overall Completion</span>
            <span>{getCompletionPercentage()}%</span>
          </div>
          <Progress value={getCompletionPercentage()} />
        </div>

        <div>
          <h4 className="font-medium text-sm mb-3">Achievements Unlocked</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(achievementDefinitions).map(
              ([key, achievement]) => {
                const isUnlocked = progress.achievements.includes(key);
                const IconComponent = achievement.icon;

                return (
                  <div
                    key={key}
                    className={`flex items-center space-x-2 p-2 rounded-lg transition-all ${
                      isUnlocked
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-muted/20 opacity-50"
                    }`}
                  >
                    <IconComponent
                      className={`h-4 w-4 ${
                        isUnlocked ? achievement.color : "text-muted-foreground"
                      }`}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-medium truncate">
                        {achievement.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold">
              {progress.sectionsVisited.length}
            </div>
            <div className="text-xs text-muted-foreground">
              Sections Visited
            </div>
          </div>
          <div>
            <div className="text-lg font-bold">
              {progress.exercisesCompleted.length}
            </div>
            <div className="text-xs text-muted-foreground">Exercises Done</div>
          </div>
        </div>

        {progress.totalTimeSpent > 0 && (
          <div className="text-center">
            <div className="text-sm font-medium">Time Invested</div>
            <div className="text-xs text-muted-foreground">
              {Math.floor(progress.totalTimeSpent / 60)}h{" "}
              {progress.totalTimeSpent % 60}m
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
