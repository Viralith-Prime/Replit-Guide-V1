import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth-provider";

// Navigation types
export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
  category: "learning" | "community" | "account" | "advanced";
  level?: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  requiresAuth?: boolean;
  keywords: string[];
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface SearchResult extends NavigationItem {
  matchType: "title" | "description" | "keyword";
  relevance: number;
}

interface NavigationState {
  isSidebarOpen: boolean;
  currentPath: string;
  breadcrumbs: Breadcrumb[];
  searchQuery: string;
  searchResults: SearchResult[];
  isSearchOpen: boolean;
  recentPages: NavigationItem[];
  bookmarkedPages: string[];
  scrollPositions: Record<string, number>;
  activeSection: string;
  keyboardFocus: string | null;
  lastNavigationTime: number;
}

interface NavigationContextType extends NavigationState {
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
  setSearchQuery: (query: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
  navigateToPage: (item: NavigationItem) => void;
  toggleBookmark: (pageId: string) => void;
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
  getFilteredNavigation: (category?: string) => NavigationItem[];
  searchPages: (query: string) => SearchResult[];
  saveScrollPosition: (path: string, position: number) => void;
  restoreScrollPosition: (path: string) => number;
  setActiveSection: (section: string) => void;
  setKeyboardFocus: (elementId: string | null) => void;
  handleKeyboardNavigation: (event: KeyboardEvent) => void;
  preloadPage: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

// Navigation data
import {
  BookOpen,
  Code,
  Bot,
  Users,
  CreditCard,
  Settings,
  User,
  Shield,
  BarChart,
  Bell,
  Palette,
  Home,
  Search,
  Bookmark,
  Trophy,
  Zap,
  Globe,
  Terminal,
  Database,
  GitBranch,
  MessageSquare,
  Package,
  Workflow,
  Lock,
  Eye,
  Heart,
  Star,
} from "lucide-react";

export const navigationItems: NavigationItem[] = [
  // Learning Category
  {
    id: "home",
    title: "Home",
    href: "/",
    icon: Home,
    description: "Interactive Replit Learning Guide overview",
    category: "learning",
    level: "All Levels",
    keywords: ["home", "overview", "start", "guide", "introduction"],
  },
  {
    id: "getting-started",
    title: "Getting Started",
    href: "/getting-started",
    icon: BookOpen,
    description:
      "Learn the basics of Replit from account creation to first program",
    category: "learning",
    level: "Beginner",
    keywords: [
      "beginner",
      "basics",
      "start",
      "account",
      "first",
      "setup",
      "tutorial",
    ],
  },
  {
    id: "core-features",
    title: "Core Features",
    href: "/core-features",
    icon: Code,
    description:
      "Explore development environment, collaboration tools, and deployment",
    category: "learning",
    level: "Intermediate",
    keywords: [
      "features",
      "development",
      "environment",
      "ide",
      "editor",
      "collaboration",
      "deployment",
      "tools",
    ],
  },
  {
    id: "ai-tools",
    title: "AI Tools",
    href: "/ai-tools",
    icon: Bot,
    description: "Master Replit's AI Agent for code generation and debugging",
    category: "learning",
    level: "All Levels",
    keywords: [
      "ai",
      "artificial",
      "intelligence",
      "ghostwriter",
      "code",
      "generation",
      "debugging",
      "assistant",
    ],
  },
  {
    id: "advanced",
    title: "Advanced Usage",
    href: "/advanced",
    icon: Settings,
    description:
      "Environment variables, shell commands, and external integrations",
    category: "advanced",
    level: "Advanced",
    keywords: [
      "advanced",
      "environment",
      "variables",
      "shell",
      "terminal",
      "integrations",
      "apis",
      "deployment",
      "database",
      "cicd",
    ],
  },

  // Community Category
  {
    id: "community",
    title: "Community",
    href: "/community",
    icon: Users,
    description: "Connect with developers, join teams, and explore bounties",
    category: "community",
    level: "All Levels",
    keywords: [
      "community",
      "developers",
      "teams",
      "collaboration",
      "bounties",
      "sharing",
      "social",
    ],
  },
  {
    id: "pricing",
    title: "Plans & Pricing",
    href: "/pricing",
    icon: CreditCard,
    description: "Explore Free, Core, and Teams plans to find your perfect fit",
    category: "community",
    level: "All Levels",
    keywords: [
      "pricing",
      "plans",
      "subscription",
      "free",
      "core",
      "teams",
      "cost",
      "billing",
    ],
  },

  // Account Category (requires authentication)
  {
    id: "profile",
    title: "Profile",
    href: "/profile",
    icon: User,
    description: "Manage your profile, settings, and learning progress",
    category: "account",
    level: "All Levels",
    requiresAuth: true,
    keywords: [
      "profile",
      "account",
      "settings",
      "personal",
      "preferences",
      "avatar",
    ],
  },
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/profile?tab=dashboard",
    icon: BarChart,
    description: "View your learning progress and personalized recommendations",
    category: "account",
    level: "All Levels",
    requiresAuth: true,
    keywords: [
      "dashboard",
      "progress",
      "analytics",
      "achievements",
      "recommendations",
      "overview",
    ],
  },
  {
    id: "security",
    title: "Security",
    href: "/profile?tab=security",
    icon: Shield,
    description: "Manage two-factor authentication and account security",
    category: "account",
    level: "All Levels",
    requiresAuth: true,
    keywords: [
      "security",
      "mfa",
      "two-factor",
      "authentication",
      "password",
      "sessions",
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    href: "/profile?tab=notifications",
    icon: Bell,
    description: "Configure notification preferences and alerts",
    category: "account",
    level: "All Levels",
    requiresAuth: true,
    keywords: [
      "notifications",
      "alerts",
      "preferences",
      "email",
      "push",
      "settings",
    ],
  },
  {
    id: "appearance",
    title: "Appearance",
    href: "/profile?tab=appearance",
    icon: Palette,
    description: "Customize theme, language, and accessibility options",
    category: "account",
    level: "All Levels",
    requiresAuth: true,
    keywords: [
      "appearance",
      "theme",
      "dark",
      "light",
      "accessibility",
      "language",
      "customization",
    ],
  },
];

const initialState: NavigationState = {
  isSidebarOpen: false,
  currentPath: "/",
  breadcrumbs: [],
  searchQuery: "",
  searchResults: [],
  isSearchOpen: false,
  recentPages: [],
  bookmarkedPages: [],
  scrollPositions: {},
  activeSection: "",
  keyboardFocus: null,
  lastNavigationTime: Date.now(),
};

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NavigationState>(initialState);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Update current path and breadcrumbs when location changes
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      currentPath: location.pathname,
      breadcrumbs: generateBreadcrumbs(location.pathname),
    }));

    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setState((prev) => ({ ...prev, isSidebarOpen: false }));
    }
  }, [location.pathname]);

  // Load saved state from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("navigation_bookmarks");
    const savedRecent = localStorage.getItem("navigation_recent");

    setState((prev) => ({
      ...prev,
      bookmarkedPages: savedBookmarks ? JSON.parse(savedBookmarks) : [],
      recentPages: savedRecent ? JSON.parse(savedRecent) : [],
    }));
  }, []);

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = (pathname: string): Breadcrumb[] => {
    const breadcrumbs: Breadcrumb[] = [{ label: "Home", href: "/" }];

    if (pathname === "/") return breadcrumbs;

    const pathSegments = pathname.split("/").filter(Boolean);
    let currentPath = "";

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const item = navigationItems.find((item) => item.href === currentPath);

      if (item) {
        breadcrumbs.push({
          label: item.title,
          href: index === pathSegments.length - 1 ? undefined : currentPath,
        });
      } else {
        // Handle dynamic segments or special cases
        const formattedLabel = segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        breadcrumbs.push({
          label: formattedLabel,
          href: index === pathSegments.length - 1 ? undefined : currentPath,
        });
      }
    });

    return breadcrumbs;
  };

  // Search functionality
  const searchPages = (query: string): SearchResult[] => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(" ");
    const results: SearchResult[] = [];

    navigationItems.forEach((item) => {
      // Skip auth-required items for unauthenticated users
      if (item.requiresAuth && !isAuthenticated) return;

      let relevance = 0;
      let matchType: SearchResult["matchType"] = "keyword";

      // Title exact match (highest priority)
      if (item.title.toLowerCase().includes(query.toLowerCase())) {
        relevance += 100;
        matchType = "title";
      }

      // Description match
      if (item.description?.toLowerCase().includes(query.toLowerCase())) {
        relevance += 50;
        if (matchType === "keyword") matchType = "description";
      }

      // Keywords match
      const keywordMatches = item.keywords.filter((keyword) =>
        searchTerms.some((term) => keyword.toLowerCase().includes(term)),
      );
      relevance += keywordMatches.length * 20;

      // Multi-term relevance boost
      const titleWords = item.title.toLowerCase().split(" ");
      const matchingTerms = searchTerms.filter((term) =>
        titleWords.some((word) => word.includes(term)),
      );
      relevance += matchingTerms.length * 30;

      if (relevance > 0) {
        results.push({ ...item, matchType, relevance });
      }
    });

    return results.sort((a, b) => b.relevance - a.relevance).slice(0, 8);
  };

  // Navigation actions
  const toggleSidebar = () => {
    setState((prev) => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }));
  };

  const closeSidebar = () => {
    setState((prev) => ({ ...prev, isSidebarOpen: false }));
  };

  const openSidebar = () => {
    setState((prev) => ({ ...prev, isSidebarOpen: true }));
  };

  const setSearchQuery = (query: string) => {
    setState((prev) => ({
      ...prev,
      searchQuery: query,
      searchResults: searchPages(query),
    }));
  };

  const openSearch = () => {
    setState((prev) => ({ ...prev, isSearchOpen: true }));
  };

  const closeSearch = () => {
    setState((prev) => ({
      ...prev,
      isSearchOpen: false,
      searchQuery: "",
      searchResults: [],
    }));
  };

  const navigateToPage = (item: NavigationItem) => {
    navigate(item.href);

    // Add to recent pages
    setState((prev) => {
      const filteredRecent = prev.recentPages.filter((p) => p.id !== item.id);
      const newRecent = [item, ...filteredRecent].slice(0, 5);

      localStorage.setItem("navigation_recent", JSON.stringify(newRecent));

      return {
        ...prev,
        recentPages: newRecent,
        isSearchOpen: false,
        searchQuery: "",
        searchResults: [],
      };
    });
  };

  const toggleBookmark = (pageId: string) => {
    setState((prev) => {
      const isBookmarked = prev.bookmarkedPages.includes(pageId);
      const newBookmarks = isBookmarked
        ? prev.bookmarkedPages.filter((id) => id !== pageId)
        : [...prev.bookmarkedPages, pageId];

      localStorage.setItem(
        "navigation_bookmarks",
        JSON.stringify(newBookmarks),
      );

      return {
        ...prev,
        bookmarkedPages: newBookmarks,
      };
    });
  };

  const setBreadcrumbs = (breadcrumbs: Breadcrumb[]) => {
    setState((prev) => ({ ...prev, breadcrumbs }));
  };

  const getFilteredNavigation = (category?: string) => {
    return navigationItems.filter((item) => {
      if (category && item.category !== category) return false;
      if (item.requiresAuth && !isAuthenticated) return false;
      return true;
    });
  };

  // Advanced navigation methods
  const saveScrollPosition = (path: string, position: number) => {
    setState((prev) => {
      const newScrollPositions = { ...prev.scrollPositions, [path]: position };
      localStorage.setItem(
        "navigation_scroll_positions",
        JSON.stringify(newScrollPositions),
      );
      return { ...prev, scrollPositions: newScrollPositions };
    });
  };

  const restoreScrollPosition = (path: string): number => {
    return state.scrollPositions[path] || 0;
  };

  const setActiveSection = (section: string) => {
    setState((prev) => ({ ...prev, activeSection: section }));
  };

  const setKeyboardFocus = (elementId: string | null) => {
    setState((prev) => ({ ...prev, keyboardFocus: elementId }));
  };

  const handleKeyboardNavigation = (event: KeyboardEvent) => {
    // Handle arrow keys for navigation
    if (event.altKey && event.key === "ArrowUp") {
      event.preventDefault();
      // Navigate to previous page in recent history
      const currentIndex = state.recentPages.findIndex(
        (page) => page.href === state.currentPath,
      );
      if (currentIndex > 0) {
        navigateToPage(state.recentPages[currentIndex - 1]);
      }
    } else if (event.altKey && event.key === "ArrowDown") {
      event.preventDefault();
      // Navigate to next page in recent history
      const currentIndex = state.recentPages.findIndex(
        (page) => page.href === state.currentPath,
      );
      if (currentIndex < state.recentPages.length - 1) {
        navigateToPage(state.recentPages[currentIndex + 1]);
      }
    }
  };

  const preloadPage = (path: string) => {
    // Preload a page for faster navigation
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = path;
    document.head.appendChild(link);
  };

  const contextValue: NavigationContextType = {
    ...state,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    setSearchQuery,
    openSearch,
    closeSearch,
    navigateToPage,
    toggleBookmark,
    setBreadcrumbs,
    getFilteredNavigation,
    searchPages,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
