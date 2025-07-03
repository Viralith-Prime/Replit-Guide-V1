import { createContext, useContext, useEffect, useState } from "react";

type ProgressData = {
  sectionsVisited: string[];
  exercisesCompleted: string[];
  totalTimeSpent: number;
  lastVisited: string;
  currentStreak: number;
  achievements: string[];
};

type ProgressProviderState = {
  progress: ProgressData;
  markSectionVisited: (section: string) => void;
  markExerciseCompleted: (exerciseId: string) => void;
  updateTimeSpent: (minutes: number) => void;
  addAchievement: (achievement: string) => void;
  getCompletionPercentage: () => number;
};

const initialProgress: ProgressData = {
  sectionsVisited: [],
  exercisesCompleted: [],
  totalTimeSpent: 0,
  lastVisited: "",
  currentStreak: 0,
  achievements: [],
};

const ProgressContext = createContext<ProgressProviderState>({
  progress: initialProgress,
  markSectionVisited: () => null,
  markExerciseCompleted: () => null,
  updateTimeSpent: () => null,
  addAchievement: () => null,
  getCompletionPercentage: () => 0,
});

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressData>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("replit-guide-progress");
        if (saved) {
          const parsed = JSON.parse(saved);
          // Validate the structure to prevent corruption
          if (
            parsed &&
            typeof parsed === "object" &&
            Array.isArray(parsed.sectionsVisited)
          ) {
            return { ...initialProgress, ...parsed };
          }
        }
      } catch (error) {
        console.warn("Failed to parse progress data from localStorage:", error);
      }
    }
    return initialProgress;
  });

  const [sessionStart] = useState(Date.now());

  useEffect(() => {
    try {
      localStorage.setItem("replit-guide-progress", JSON.stringify(progress));
    } catch (error) {
      console.warn("Failed to save progress to localStorage:", error);
    }
  }, [progress]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const sessionTime = Math.floor((Date.now() - sessionStart) / 60000);
      updateTimeSpent(sessionTime);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [sessionStart]);

  const markSectionVisited = (section: string) => {
    setProgress((prev) => {
      if (prev.sectionsVisited.includes(section)) return prev;

      const newProgress = {
        ...prev,
        sectionsVisited: [...prev.sectionsVisited, section],
        lastVisited: section,
      };

      // Check for achievements
      if (newProgress.sectionsVisited.length === 1) {
        newProgress.achievements = [...prev.achievements, "first-section"];
      }
      if (newProgress.sectionsVisited.length === 6) {
        newProgress.achievements = [
          ...newProgress.achievements,
          "completionist",
        ];
      }

      return newProgress;
    });
  };

  const markExerciseCompleted = (exerciseId: string) => {
    setProgress((prev) => {
      if (prev.exercisesCompleted.includes(exerciseId)) return prev;

      const newProgress = {
        ...prev,
        exercisesCompleted: [...prev.exercisesCompleted, exerciseId],
      };

      // Check for achievements
      if (newProgress.exercisesCompleted.length === 1) {
        newProgress.achievements = [...prev.achievements, "first-exercise"];
      }
      if (newProgress.exercisesCompleted.length >= 10) {
        newProgress.achievements = [
          ...newProgress.achievements,
          "hands-on-learner",
        ];
      }

      return newProgress;
    });
  };

  const updateTimeSpent = (minutes: number) => {
    setProgress((prev) => ({
      ...prev,
      totalTimeSpent: prev.totalTimeSpent + minutes,
    }));
  };

  const addAchievement = (achievement: string) => {
    setProgress((prev) => {
      if (prev.achievements.includes(achievement)) return prev;
      return {
        ...prev,
        achievements: [...prev.achievements, achievement],
      };
    });
  };

  const getCompletionPercentage = () => {
    const totalSections = 6;
    const sectionsCompleted = progress.sectionsVisited.length;
    return Math.round((sectionsCompleted / totalSections) * 100);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markSectionVisited,
        markExerciseCompleted,
        updateTimeSpent,
        addAchievement,
        getCompletionPercentage,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};
