import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigation } from "./navigation-provider";
import { useAuth } from "./auth-provider";
import { AuthTrigger } from "./auth-trigger";
import { ThemeToggle } from "./theme-toggle";
import { AccessibilityPanel } from "./accessibility-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Menu,
  Search,
  X,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Clock,
  Sparkles,
  Home,
  GraduationCap,
  Users,
  User,
  Zap,
  Command as CommandIcon,
  ArrowRight,
  Star,
  TrendingUp,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Header component with search and navigation
export function UnifiedHeader() {
  const {
    toggleSidebar,
    openSearch,
    currentPath,
    bookmarkedPages,
    toggleBookmark,
  } = useNavigation();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if current page is bookmarked
  const currentPageId = React.useMemo(() => {
    return location.pathname.split("/").filter(Boolean)[0] || "home";
  }, [location.pathname]);

  const isCurrentPageBookmarked = bookmarkedPages.includes(currentPageId);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-all duration-200",
        isScrolled ? "shadow-sm" : "",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Left side - Logo and mobile menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu trigger */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="md:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:block">
              Replit Guide
            </span>
          </Link>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4">
          <Button
            variant="outline"
            onClick={openSearch}
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <Search className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Search guide...</span>
            <span className="sm:hidden">Search...</span>
            <div className="ml-auto hidden sm:flex items-center space-x-1">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <CommandIcon className="h-3 w-3" />K
              </kbd>
            </div>
          </Button>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          {/* Bookmark toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleBookmark(currentPageId)}
                className="hidden sm:flex"
              >
                {isCurrentPageBookmarked ? (
                  <BookmarkCheck className="h-4 w-4 text-primary" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isCurrentPageBookmarked
                ? "Remove bookmark"
                : "Bookmark this page"}
            </TooltipContent>
          </Tooltip>

          <AuthTrigger />
          <ThemeToggle />
          <AccessibilityPanel />
        </div>
      </div>
    </header>
  );
}

// Sidebar navigation component
export function NavigationSidebar() {
  const {
    isSidebarOpen,
    closeSidebar,
    getFilteredNavigation,
    navigateToPage,
    currentPath,
    recentPages,
    bookmarkedPages,
  } = useNavigation();
  const { isAuthenticated } = useAuth();

  const categories = [
    {
      id: "learning",
      title: "Learning",
      icon: GraduationCap,
      items: getFilteredNavigation("learning"),
    },
    {
      id: "community",
      title: "Community",
      icon: Users,
      items: getFilteredNavigation("community"),
    },
    {
      id: "advanced",
      title: "Advanced",
      icon: Zap,
      items: getFilteredNavigation("advanced"),
    },
    ...(isAuthenticated
      ? [
          {
            id: "account",
            title: "Account",
            icon: User,
            items: getFilteredNavigation("account"),
          },
        ]
      : []),
  ];

  const bookmarkedItems = bookmarkedPages
    .map((id) => getFilteredNavigation().find((item) => item.id === id))
    .filter(Boolean);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-40 md:w-64 md:flex md:flex-col">
        <div className="flex flex-col flex-1 min-h-0 pt-16 bg-background border-r">
          <ScrollArea className="flex-1 px-4 py-6">
            <nav className="space-y-6">
              {/* Recent Pages */}
              {recentPages.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Recent
                  </h3>
                  <div className="space-y-1">
                    {recentPages.slice(0, 3).map((item) => (
                      <NavigationItem
                        key={item.id}
                        item={item}
                        isActive={currentPath === item.href}
                        onClick={() => navigateToPage(item)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Bookmarked Pages */}
              {bookmarkedItems.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Bookmarked
                  </h3>
                  <div className="space-y-1">
                    {bookmarkedItems.slice(0, 5).map((item) => (
                      <NavigationItem
                        key={item.id}
                        item={item}
                        isActive={currentPath === item.href}
                        onClick={() => navigateToPage(item)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Main Navigation Categories */}
              {categories.map((category) => (
                <div key={category.id}>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center">
                    <category.icon className="h-3 w-3 mr-2" />
                    {category.title}
                  </h3>
                  <div className="space-y-1">
                    {category.items.map((item) => (
                      <NavigationItem
                        key={item.id}
                        item={item}
                        isActive={currentPath === item.href}
                        onClick={() => navigateToPage(item)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={closeSidebar}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="p-6 pb-4">
            <SheetTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span>Navigation</span>
            </SheetTitle>
            <SheetDescription>
              Access all sections and features of the Replit Guide
            </SheetDescription>
          </SheetHeader>

          <ScrollArea
            className="flex-1 px-6"
            style={{ scrollBehavior: "smooth" }}
          >
            <nav
              className="space-y-6 pb-6"
              role="navigation"
              aria-label="Main navigation"
            >
              {/* Recent and bookmarked sections for mobile */}
              {recentPages.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Recent
                  </h3>
                  <div className="space-y-1">
                    {recentPages.slice(0, 3).map((item) => (
                      <NavigationItem
                        key={item.id}
                        item={item}
                        isActive={currentPath === item.href}
                        onClick={() => {
                          navigateToPage(item);
                          closeSidebar();
                        }}
                        showDescription
                      />
                    ))}
                  </div>
                </div>
              )}

              {bookmarkedItems.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Bookmarked
                  </h3>
                  <div className="space-y-1">
                    {bookmarkedItems.slice(0, 5).map((item) => (
                      <NavigationItem
                        key={item.id}
                        item={item}
                        isActive={currentPath === item.href}
                        onClick={() => {
                          navigateToPage(item);
                          closeSidebar();
                        }}
                        showDescription
                      />
                    ))}
                  </div>
                </div>
              )}

              {categories.map((category) => (
                <div key={category.id}>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center">
                    <category.icon className="h-3 w-3 mr-2" />
                    {category.title}
                  </h3>
                  <div className="space-y-1">
                    {category.items.map((item) => (
                      <NavigationItem
                        key={item.id}
                        item={item}
                        isActive={currentPath === item.href}
                        onClick={() => {
                          navigateToPage(item);
                          closeSidebar();
                        }}
                        showDescription
                      />
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}

// Individual navigation item component
function NavigationItem({
  item,
  isActive,
  onClick,
  showDescription = false,
}: {
  item: any;
  isActive: boolean;
  onClick: () => void;
  showDescription?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-3 rounded-lg transition-all duration-200 group",
        isActive
          ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
      )}
    >
      <div className="flex items-center space-x-3">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
            isActive
              ? "bg-primary/20 text-primary"
              : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
          )}
        >
          <item.icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-sm truncate">{item.title}</span>
            {item.level && (
              <Badge
                variant={isActive ? "default" : "secondary"}
                className="text-xs"
              >
                {item.level}
              </Badge>
            )}
          </div>
          {showDescription && item.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </button>
  );
}

// Global search component
export function GlobalSearch() {
  const {
    isSearchOpen,
    closeSearch,
    searchQuery,
    setSearchQuery,
    searchResults,
    navigateToPage,
    recentPages,
  } = useNavigation();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isSearchOpen) {
          closeSearch();
        } else {
          setSearchQuery("");
          // The search will open via the openSearch call
        }
      }

      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  return (
    <CommandDialog open={isSearchOpen} onOpenChange={closeSearch}>
      <DialogHeader className="sr-only">
        <DialogTitle>Search</DialogTitle>
        <DialogDescription>Search through the Replit Guide</DialogDescription>
      </DialogHeader>

      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search pages, features, and topics..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>
            <div className="text-center py-6">
              <Search className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No results found for "{searchQuery}"
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Try searching for topics like "AI tools", "deployment", or
                "community"
              </p>
            </div>
          </CommandEmpty>

          {searchResults.length > 0 && (
            <CommandGroup heading="Search Results">
              {searchResults.map((result) => (
                <CommandItem
                  key={result.id}
                  onSelect={() => {
                    navigateToPage(result);
                    closeSearch();
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <result.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">
                          {result.title}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {result.matchType}
                        </Badge>
                        {result.level && (
                          <Badge variant="secondary" className="text-xs">
                            {result.level}
                          </Badge>
                        )}
                      </div>
                      {result.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {result.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {!searchQuery && recentPages.length > 0 && (
            <>
              <CommandGroup heading="Recent Pages">
                {recentPages.slice(0, 4).map((page) => (
                  <CommandItem
                    key={page.id}
                    onSelect={() => {
                      navigateToPage(page);
                      closeSearch();
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <span className="font-medium text-sm">
                          {page.title}
                        </span>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {!searchQuery && (
            <CommandGroup heading="Quick Actions">
              <CommandItem className="cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">View all bookmarks</span>
                </div>
              </CommandItem>
              <CommandItem className="cursor-pointer">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Check learning progress</span>
                </div>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}

// Breadcrumb navigation component
export function BreadcrumbNavigation() {
  const { breadcrumbs } = useNavigation();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {crumb.href ? (
            <Link
              to={crumb.href}
              className="hover:text-foreground transition-colors"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{crumb.label}</span>
          )}
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="h-4 w-4" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
