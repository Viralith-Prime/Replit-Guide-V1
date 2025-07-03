import React, { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { UserDashboard } from "@/components/user-dashboard";
import { SecuritySettings } from "@/components/security-settings";
import { AccountBenefits } from "@/components/auth-trigger";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { SEO } from "@/components/seo";
import { SkipLinks } from "@/components/skip-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { AccessibilityPanel } from "@/components/accessibility-panel";
import { AuthTrigger } from "@/components/auth-trigger";
import {
  ArrowLeft,
  User,
  Settings,
  Shield,
  Bell,
  Palette,
  Save,
  Edit,
  Upload,
  BookOpen,
  BarChart,
  Trophy,
  Heart,
  Code,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function ProfileSettings() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    location: "",
    website: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your account details and public profile
              </CardDescription>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() =>
                isEditing ? handleSave() : setIsEditing(!isEditing)
              }
              disabled={isLoading}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar section */}
          <div className="flex items-center space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Avatar
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                disabled={!isEditing}
                placeholder="City, Country"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                disabled={!isEditing}
                placeholder="https://your-website.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              disabled={!isEditing}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>

          {/* Account stats */}
          <Separator />
          <div>
            <h4 className="font-medium mb-4">Account Information</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {user.progress.completedSections.length}
                </div>
                <div className="text-xs text-muted-foreground">
                  Sections Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {user.progress.achievements.length}
                </div>
                <div className="text-xs text-muted-foreground">
                  Achievements
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">
                  {user.progress.bookmarks.length}
                </div>
                <div className="text-xs text-muted-foreground">Bookmarks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(
                    new Date().getTime() - new Date(user.createdAt).getTime(),
                  ) /
                    (1000 * 60 * 60 * 24)}
                </div>
                <div className="text-xs text-muted-foreground">Days Active</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationSettings() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    email: user?.preferences.notifications ?? true,
    achievements: true,
    updates: true,
    marketing: false,
  });

  const handleToggle = async (key: keyof typeof notifications) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);

    try {
      await updateProfile({
        preferences: { ...user?.preferences, notifications: updated.email },
      });
      toast({
        title: "Settings updated",
        description: "Your notification preferences have been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5" />
          <span>Notification Preferences</span>
        </CardTitle>
        <CardDescription>
          Choose what notifications you'd like to receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Email Notifications</div>
              <div className="text-sm text-muted-foreground">
                Receive progress updates and important announcements
              </div>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={() => handleToggle("email")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Achievement Notifications</div>
              <div className="text-sm text-muted-foreground">
                Get notified when you unlock new achievements
              </div>
            </div>
            <Switch
              checked={notifications.achievements}
              onCheckedChange={() => handleToggle("achievements")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Content Updates</div>
              <div className="text-sm text-muted-foreground">
                New sections, features, and improvements
              </div>
            </div>
            <Switch
              checked={notifications.updates}
              onCheckedChange={() => handleToggle("updates")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Marketing Communications</div>
              <div className="text-sm text-muted-foreground">
                Tips, best practices, and promotional content
              </div>
            </div>
            <Switch
              checked={notifications.marketing}
              onCheckedChange={() => handleToggle("marketing")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AppearanceSettings() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    theme: user?.preferences.theme || "dark",
    language: user?.preferences.language || "en",
    animations: true,
  });

  const handleUpdate = async (updates: Partial<typeof preferences>) => {
    const updated = { ...preferences, ...updates };
    setPreferences(updated);

    try {
      await updateProfile({
        preferences: { ...user?.preferences, ...updates },
      });
      toast({
        title: "Preferences updated",
        description: "Your appearance settings have been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="w-5 h-5" />
          <span>Appearance</span>
        </CardTitle>
        <CardDescription>
          Customize how the application looks and feels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Theme</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {["light", "dark", "system"].map((theme) => (
                <Button
                  key={theme}
                  variant={preferences.theme === theme ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleUpdate({ theme })}
                  className="capitalize"
                >
                  {theme}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Language</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { code: "en", name: "English" },
                { code: "es", name: "Español" },
              ].map((lang) => (
                <Button
                  key={lang.code}
                  variant={
                    preferences.language === lang.code ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleUpdate({ language: lang.code })}
                >
                  {lang.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Animations</div>
              <div className="text-sm text-muted-foreground">
                Enable smooth transitions and animations
              </div>
            </div>
            <Switch
              checked={preferences.animations}
              onCheckedChange={(animations) => handleUpdate({ animations })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Profile page for unauthenticated users
function UnauthenticatedProfile() {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
          <User className="w-12 h-12 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Create Your Profile</h1>
          <p className="text-muted-foreground mt-2">
            Sign in or create an account to unlock personalized features
          </p>
        </div>
      </div>

      <AccountBenefits trigger="prominent" context="general" />

      <div className="grid md:grid-cols-3 gap-6 text-left">
        <Card>
          <CardHeader>
            <BarChart className="w-8 h-8 text-blue-500 mb-2" />
            <CardTitle className="text-lg">Track Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Monitor your learning journey with detailed progress tracking and
              completion statistics across all sections.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
            <CardTitle className="text-lg">Earn Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Unlock badges and achievements as you complete sections and reach
              learning milestones.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Heart className="w-8 h-8 text-red-500 mb-2" />
            <CardTitle className="text-lg">Save Bookmarks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Bookmark important sections and access them quickly from any
              device.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Profile() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={
          isAuthenticated
            ? `${user?.name} - Profile | Replit Guide`
            : "Create Profile | Replit Guide"
        }
        description="Manage your learning profile, track progress, and customize your experience"
      />
      <SkipLinks />

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
              <User className="h-5 w-5 text-primary" />
              <span className="font-semibold">
                {isAuthenticated ? "Profile" : "Create Profile"}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <AuthTrigger />
            <ThemeToggle />
            <AccessibilityPanel />
          </div>
        </div>
      </header>

      <main className="container py-8 max-w-6xl">
        {isAuthenticated ? (
          <Tabs defaultValue="dashboard" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard" className="flex items-center">
                <BarChart className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <UserDashboard />
            </TabsContent>

            <TabsContent value="profile">
              <ProfileSettings />
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>

            <TabsContent value="appearance">
              <AppearanceSettings />
            </TabsContent>

            <TabsContent value="security">
              <SecuritySettings />
            </TabsContent>
          </Tabs>
        ) : (
          <UnauthenticatedProfile />
        )}
      </main>
    </div>
  );
}
