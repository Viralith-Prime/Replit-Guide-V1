import React, { useState, useEffect } from "react";
import { useAuth } from "./auth-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Settings,
  BookMarked,
  Trophy,
  BarChart,
  Shield,
  LogOut,
  Plus,
  Sparkles,
  Heart,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Subtle enhancement notice for non-authenticated users
function EnhancementNotice() {
  const { openAuthModal } = useAuth();
  const [showNotice, setShowNotice] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show notice after user has been active for a bit
    const timer = setTimeout(() => {
      const hasSeenNotice = localStorage.getItem("auth_notice_dismissed");
      if (!hasSeenNotice && !dismissed) {
        setShowNotice(true);
      }
    }, 30000); // Show after 30 seconds

    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = () => {
    setShowNotice(false);
    setDismissed(true);
    localStorage.setItem("auth_notice_dismissed", "true");
  };

  const handleCreateAccount = () => {
    setShowNotice(false);
    openAuthModal("signup");
  };

  if (!showNotice) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-4 shadow-lg z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="text-sm font-medium">Enhance your learning</div>
          <div className="text-xs text-muted-foreground">
            Create an account to save progress, sync across devices, and unlock
            personalized features
          </div>
          <div className="flex space-x-2">
            <Button size="sm" onClick={handleCreateAccount} className="text-xs">
              Create Account
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="text-xs"
            >
              Maybe later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// User menu for authenticated users
function UserMenu() {
  const { user, logout, openAuthModal } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  const userInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
          </Avatar>
          {user.progress.achievements.length > 0 && (
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <div className="flex items-center space-x-1 mt-1">
              {user.verified && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
              {user.mfaEnabled && (
                <Badge variant="outline" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  MFA
                </Badge>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <BookMarked className="mr-2 h-4 w-4" />
            <span>Bookmarks</span>
            <Badge variant="secondary" className="ml-auto text-xs">
              {user.progress.bookmarks.length}
            </Badge>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Trophy className="mr-2 h-4 w-4" />
            <span>Achievements</span>
            <Badge variant="secondary" className="ml-auto text-xs">
              {user.progress.achievements.length}
            </Badge>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <BarChart className="mr-2 h-4 w-4" />
            <span>Progress</span>
            <Badge variant="outline" className="ml-auto text-xs">
              {Math.round((user.progress.completedSections.length / 6) * 100)}%
            </Badge>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <RefreshCw className="mr-2 h-4 w-4" />
            <span>Sync Data</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Main auth trigger component
export function AuthTrigger() {
  const { isAuthenticated, user, openAuthModal, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-9 w-9 rounded-full bg-muted animate-pulse flex-shrink-0" />
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-3">
        {/* Quick progress indicator */}
        <div className="hidden sm:flex items-center space-x-2 text-sm">
          <div className="flex items-center space-x-1">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-muted-foreground">
              {user.progress.achievements.length}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-muted-foreground">
              {user.progress.bookmarks.length}
            </span>
          </div>
        </div>
        <UserMenu />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Subtle sign in button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => openAuthModal("signin")}
        className="text-muted-foreground hover:text-foreground"
      >
        Sign in
      </Button>

      {/* Enhancement notice for logged out users */}
      <EnhancementNotice />
    </div>
  );
}

// Optional value proposition component for strategic placement
export function AccountBenefits({
  trigger = "subtle",
  context = "general",
}: {
  trigger?: "subtle" | "prominent";
  context?: "general" | "bookmark" | "progress" | "sync";
}) {
  const { isAuthenticated, openAuthModal } = useAuth();

  if (isAuthenticated) return null;

  const getBenefitText = () => {
    switch (context) {
      case "bookmark":
        return "Create an account to save bookmarks across all your devices";
      case "progress":
        return "Sign up to track your learning progress and earn achievements";
      case "sync":
        return "Account required to sync your preferences and settings";
      default:
        return "Unlock enhanced features with a free account";
    }
  };

  const getIcon = () => {
    switch (context) {
      case "bookmark":
        return <BookMarked className="w-4 h-4" />;
      case "progress":
        return <Trophy className="w-4 h-4" />;
      case "sync":
        return <RefreshCw className="w-4 h-4" />;
      default:
        return <Plus className="w-4 h-4" />;
    }
  };

  if (trigger === "subtle") {
    return (
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        {getIcon()}
        <span className="text-xs">{getBenefitText()}</span>
        <Button
          variant="link"
          size="sm"
          className="p-0 h-auto text-xs text-primary"
          onClick={() => openAuthModal("signup")}
        >
          Get started
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          {getIcon()}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">{getBenefitText()}</div>
          <div className="text-xs text-muted-foreground mt-1">
            Free to create • Takes less than a minute
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => openAuthModal("signup")}
          className="flex-shrink-0"
        >
          Create Account
        </Button>
      </div>
    </div>
  );
}
