import { PageLayout } from "@/components/page-layout";
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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Star,
  Heart,
  MessageSquare,
  Share2,
  Trophy,
  DollarSign,
  Eye,
  GitFork,
  Calendar,
  ExternalLink,
  Crown,
  Zap,
  Target,
  Globe,
  Code,
  Lightbulb,
  TrendingUp,
  UserPlus,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const pageMetadata = {
  title: "Community",
  description: "Connect with other developers and share your projects",
  category: "community" as const,
  level: "beginner" as const,
  timeToComplete: "15-20 minutes",
  prerequisites: ["Getting Started"],
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Community", href: "/community" },
];

const communitySections = [
  {
    id: "teams",
    title: "Teams & Collaboration",
    icon: Users,
    description: "Work together on projects",
  },
  {
    id: "spotlight",
    title: "Spotlight & Sharing",
    icon: Star,
    description: "Share your creations",
  },
  {
    id: "profiles",
    title: "Profiles & Following",
    icon: UserPlus,
    description: "Connect with developers",
  },
  {
    id: "bounties",
    title: "Bounties & Rewards",
    icon: DollarSign,
    description: "Earn money coding",
  },
  {
    id: "guidelines",
    title: "Community Guidelines",
    icon: BookOpen,
    description: "Best practices and rules",
  },
];

const featuredProjects = [
  {
    title: "3D Solar System",
    author: "AlexCoder",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=AlexCoder`,
    language: "JavaScript",
    views: 12500,
    likes: 234,
    forks: 89,
    description:
      "Interactive 3D model of our solar system with realistic physics",
    tags: ["3D", "Three.js", "Physics", "Educational"],
  },
  {
    title: "AI Chatbot Assistant",
    author: "DevMaster",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=DevMaster`,
    language: "Python",
    views: 8940,
    likes: 167,
    forks: 45,
    description: "Smart chatbot using natural language processing",
    tags: ["AI", "NLP", "Chatbot", "Machine Learning"],
  },
  {
    title: "Expense Tracker App",
    author: "ReactNinja",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=ReactNinja`,
    language: "React",
    views: 6750,
    likes: 128,
    forks: 32,
    description: "Beautiful expense tracking app with charts and analytics",
    tags: ["React", "Finance", "Charts", "Mobile-First"],
  },
];

const topCommunityMembers = [
  {
    name: "CodeWizard",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=CodeWizard`,
    reputation: 15420,
    specialties: ["Python", "AI", "Data Science"],
    contributions: 234,
    badge: "Expert",
  },
  {
    name: "WebDev_Pro",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=WebDevPro`,
    reputation: 12100,
    specialties: ["React", "Node.js", "TypeScript"],
    contributions: 189,
    badge: "Mentor",
  },
  {
    name: "GameBuilder",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=GameBuilder`,
    reputation: 9850,
    specialties: ["C++", "Unity", "Game Design"],
    contributions: 156,
    badge: "Creator",
  },
];

const communityStats = [
  { label: "Active Users", value: "2.5M+", icon: Users },
  { label: "Projects Shared", value: "500K+", icon: Star },
  { label: "Bounties Completed", value: "15K+", icon: Trophy },
  { label: "Lines of Code", value: "1B+", icon: Code },
];

const activeBounties = [
  {
    title: "Build a Weather Dashboard",
    reward: "$150",
    difficulty: "Intermediate",
    timeLeft: "5 days",
    applicants: 23,
    requirements: ["React", "API Integration", "Responsive Design"],
    description: "Create a responsive weather dashboard with 5-day forecast",
  },
  {
    title: "Python Data Analysis Script",
    reward: "$75",
    difficulty: "Beginner",
    timeLeft: "3 days",
    applicants: 12,
    requirements: ["Python", "Pandas", "Data Visualization"],
    description: "Analyze sales data and create visualizations",
  },
  {
    title: "Mobile Game in JavaScript",
    reward: "$300",
    difficulty: "Advanced",
    timeLeft: "10 days",
    applicants: 8,
    requirements: ["JavaScript", "Game Development", "Mobile"],
    description: "Create an addictive mobile game with leaderboards",
  },
];

export default function Community() {
  const [currentSection, setCurrentSection] = useState("teams");
  const [likedProjects, setLikedProjects] = useState<number[]>([]);
  const [followedUsers, setFollowedUsers] = useState<number[]>([]);

  const toggleLike = (index: number) => {
    setLikedProjects((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const toggleFollow = (index: number) => {
    setFollowedUsers((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <PageLayout
      title="Community"
      description="Connect with other developers and share your projects"
      breadcrumbItems={breadcrumbItems}
      metadata={pageMetadata}
    >
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-80 border-r border-border p-6 bg-muted/20 min-h-screen sticky top-16">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Community Features</h3>
              <nav className="space-y-2">
                {communitySections.map((section) => (
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

            <div>
              <h4 className="font-medium text-sm mb-3">Community Stats</h4>
              <div className="grid grid-cols-2 gap-3">
                {communityStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-sm font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Join the Community</CardTitle>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full" asChild>
                  <a
                    href="https://replit.com/community"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore Community
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-5xl">
          {currentSection === "teams" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Teams & Collaboration
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Create and join teams to collaborate on projects, share
                  resources, and build amazing things together.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Creating a Team</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-3 text-sm">
                      <li>Go to the Teams section in your dashboard</li>
                      <li>Click "Create Team" and choose a name</li>
                      <li>Set team visibility (Public or Private)</li>
                      <li>Invite members via email or username</li>
                      <li>Configure team permissions and roles</li>
                    </ol>

                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        💡 Tip: Start with a clear team purpose and project
                        goals to attract the right collaborators.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Crown className="h-5 w-5" />
                      <span>Team Roles & Permissions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">Owner</div>
                          <div className="text-xs text-muted-foreground">
                            Full access, can delete team
                          </div>
                        </div>
                        <Badge variant="destructive">Admin</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">Admin</div>
                          <div className="text-xs text-muted-foreground">
                            Manage members and settings
                          </div>
                        </div>
                        <Badge variant="secondary">High</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">Member</div>
                          <div className="text-xs text-muted-foreground">
                            Access team repls and collaborate
                          </div>
                        </div>
                        <Badge variant="outline">Standard</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Team Collaboration Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Share2 className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-medium mb-2">Shared Workspaces</h4>
                      <p className="text-sm text-muted-foreground">
                        All team members can access and edit shared repls
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-medium mb-2">Team Chat</h4>
                      <p className="text-sm text-muted-foreground">
                        Built-in messaging for project coordination
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-medium mb-2">Project Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Organize tasks and track project progress
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "spotlight" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Spotlight & Sharing</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Share your projects with the Replit community and discover
                  amazing creations from developers around the world.
                </p>
              </div>

              <Tabs defaultValue="featured" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="featured">Featured Projects</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="sharing">How to Share</TabsTrigger>
                </TabsList>

                <TabsContent value="featured" className="space-y-6">
                  <div className="grid gap-6">
                    {featuredProjects.map((project, index) => (
                      <Card
                        key={index}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={project.avatar} />
                                <AvatarFallback>
                                  {project.author.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg">
                                  {project.title}
                                </CardTitle>
                                <CardDescription>
                                  by {project.author}
                                </CardDescription>
                              </div>
                            </div>
                            <Badge variant="outline">{project.language}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-4 w-4" />
                                <span>{project.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <GitFork className="h-4 w-4" />
                                <span>{project.forks}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => toggleLike(index)}
                                className={
                                  likedProjects.includes(index)
                                    ? "text-red-500"
                                    : ""
                                }
                              >
                                <Heart
                                  className={`h-4 w-4 mr-1 ${
                                    likedProjects.includes(index)
                                      ? "fill-current"
                                      : ""
                                  }`}
                                />
                                {project.likes +
                                  (likedProjects.includes(index) ? 1 : 0)}
                              </Button>
                              <Button size="sm" asChild>
                                <a
                                  href="https://replit.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Project
                                  <ExternalLink className="h-3 w-3 ml-2" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="trending" className="space-y-6">
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">
                      Trending Projects
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Discover what's popular in the community right now
                    </p>
                    <Button asChild>
                      <a
                        href="https://replit.com/trending"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Trending Projects
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="sharing" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>How to Share Your Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                            1
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">
                              Prepare Your Project
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Add a clear README, clean up your code, and test
                              everything works
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                            2
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Make It Public</h4>
                            <p className="text-sm text-muted-foreground">
                              Change your repl privacy settings to "Public" in
                              the settings menu
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                            3
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">
                              Submit to Spotlight
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Use the "Submit to Spotlight" option in your repl
                              menu
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                            4
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">
                              Engage with Community
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Respond to comments, help others, and participate
                              in discussions
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentSection === "profiles" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Profiles & Following
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Build your developer profile, follow other creators, and stay
                  connected with the community.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Community Members</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topCommunityMembers.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/20"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm">
                                {member.name}
                              </span>
                              <Badge variant="outline">{member.badge}</Badge>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <Trophy className="h-3 w-3" />
                              <span>
                                {member.reputation.toLocaleString()} rep
                              </span>
                              <span>•</span>
                              <span>{member.contributions} contributions</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {member.specialties
                                .slice(0, 2)
                                .map((specialty, sIndex) => (
                                  <Badge
                                    key={sIndex}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {specialty}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={
                            followedUsers.includes(index)
                              ? "secondary"
                              : "outline"
                          }
                          onClick={() => toggleFollow(index)}
                        >
                          {followedUsers.includes(index)
                            ? "Following"
                            : "Follow"}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Building Your Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">
                          Add a profile picture
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">
                          Write a compelling bio
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">
                          Showcase your best projects
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">
                          Link your social accounts
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">
                          Add your skills and interests
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium text-sm mb-2">
                        Profile Tips:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>
                          • Keep your bio concise and highlight your expertise
                        </li>
                        <li>
                          • Pin your best projects to the top of your profile
                        </li>
                        <li>• Stay active by contributing to discussions</li>
                        <li>• Help others and build your reputation</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentSection === "bounties" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Bounties & Rewards</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Earn money by completing coding challenges and helping other
                  developers with their projects.
                </p>
              </div>

              <div className="grid gap-6">
                {activeBounties.map((bounty, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {bounty.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {bounty.description}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {bounty.reward}
                          </div>
                          <Badge
                            variant={
                              bounty.difficulty === "Beginner"
                                ? "default"
                                : bounty.difficulty === "Intermediate"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {bounty.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">
                            Requirements:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {bounty.requirements.map((req, reqIndex) => (
                              <Badge key={reqIndex} variant="outline">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{bounty.timeLeft} left</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{bounty.applicants} applicants</span>
                            </div>
                          </div>

                          <Button size="sm" asChild>
                            <a
                              href="https://replit.com/bounties"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Apply Now
                              <ExternalLink className="h-3 w-3 ml-2" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span>How Bounties Work</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">For Hunters:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Browse available bounties</li>
                        <li>Apply with your proposal</li>
                        <li>Get selected by the bounty creator</li>
                        <li>Complete the project requirements</li>
                        <li>Submit your solution for review</li>
                        <li>Receive payment upon approval</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Payment & Tips:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Payments processed through Replit Credits</li>
                        <li>• Build a strong profile to win more bounties</li>
                        <li>• Communicate clearly with bounty creators</li>
                        <li>• Deliver high-quality, tested solutions</li>
                        <li>• Ask questions if requirements are unclear</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentSection === "guidelines" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Community Guidelines
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Learn the essential rules and best practices for being a
                  positive member of the Replit community.
                </p>
              </div>

              <Tabs defaultValue="conduct" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="conduct">Code of Conduct</TabsTrigger>
                  <TabsTrigger value="sharing">Sharing Guidelines</TabsTrigger>
                  <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
                  <TabsTrigger value="moderation">Moderation</TabsTrigger>
                </TabsList>

                <TabsContent value="conduct" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-green-500" />
                        <span>Core Principles</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-green-600 mb-3">
                            ✅ Do's
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start space-x-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>
                                Be respectful and inclusive to everyone
                              </span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Help newcomers learn and grow</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Share knowledge and resources freely</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Give constructive feedback</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Credit others for their work</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Report inappropriate behavior</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-red-600 mb-3">
                            ❌ Don'ts
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start space-x-2">
                              <X className="h-4 w-4 text-red-500 mt-0.5" />
                              <span>Harass, bully, or discriminate</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <X className="h-4 w-4 text-red-500 mt-0.5" />
                              <span>Share inappropriate content</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <X className="h-4 w-4 text-red-500 mt-0.5" />
                              <span>Spam or self-promote excessively</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <X className="h-4 w-4 text-red-500 mt-0.5" />
                              <span>Plagiarize others' work</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <X className="h-4 w-4 text-red-500 mt-0.5" />
                              <span>Share personal information</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <X className="h-4 w-4 text-red-500 mt-0.5" />
                              <span>Use offensive language</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Building a Positive Community</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-medium mb-2">Be Welcoming</h4>
                          <p className="text-sm text-muted-foreground">
                            Remember that everyone was a beginner once. Offer
                            help and encouragement to newcomers, and create an
                            environment where people feel safe to ask questions.
                          </p>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                          <h4 className="font-medium mb-2">Share Knowledge</h4>
                          <p className="text-sm text-muted-foreground">
                            The best communities are built on knowledge sharing.
                            Write tutorials, share resources, and explain
                            concepts in ways others can understand.
                          </p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                          <h4 className="font-medium mb-2">Collaborate</h4>
                          <p className="text-sm text-muted-foreground">
                            Work together on projects, review each other's code,
                            and build amazing things as a team. Collaboration
                            makes everyone better.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="sharing" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Sharing Best Practices</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-3">
                              Before Sharing:
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  className="rounded"
                                  disabled
                                  checked
                                />
                                <span className="text-sm">
                                  Test your project thoroughly
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  className="rounded"
                                  disabled
                                  checked
                                />
                                <span className="text-sm">
                                  Write a clear README
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  className="rounded"
                                  disabled
                                  checked
                                />
                                <span className="text-sm">
                                  Add appropriate tags
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  className="rounded"
                                  disabled
                                  checked
                                />
                                <span className="text-sm">
                                  Choose an informative title
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-3">
                              Content Standards:
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">
                                  No inappropriate content
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">
                                  Respect copyright laws
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">
                                  No malicious code
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">
                                  Credit all sources
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Comment and Feedback Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <h4 className="font-medium text-sm mb-2 text-green-600">
                            Good Feedback Example:
                          </h4>
                          <blockquote className="text-sm italic border-l-2 border-green-500 pl-3">
                            "Really cool project! I love the UI design. One
                            suggestion: you might want to add input validation
                            for the email field. Overall, great work on the
                            responsive layout!"
                          </blockquote>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <h4 className="font-medium text-sm mb-2 text-red-600">
                            Poor Feedback Example:
                          </h4>
                          <blockquote className="text-sm italic border-l-2 border-red-500 pl-3">
                            "This is terrible. Why would you even share this? My
                            little sister could code better than this."
                          </blockquote>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="collaboration" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Effective Collaboration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                            <MessageSquare className="h-6 w-6 text-blue-500" />
                          </div>
                          <h4 className="font-medium mb-2">Communication</h4>
                          <p className="text-xs text-muted-foreground">
                            Be clear, patient, and respectful in all
                            interactions
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                            <Users className="h-6 w-6 text-green-500" />
                          </div>
                          <h4 className="font-medium mb-2">Teamwork</h4>
                          <p className="text-xs text-muted-foreground">
                            Contribute meaningfully and support team goals
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                            <Share2 className="h-6 w-6 text-purple-500" />
                          </div>
                          <h4 className="font-medium mb-2">
                            Knowledge Sharing
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Document decisions and share learnings with others
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Conflict Resolution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                              1
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Stay Calm</h4>
                              <p className="text-xs text-muted-foreground">
                                Take a step back and approach disagreements with
                                a level head
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                              2
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">
                                Listen Actively
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                Try to understand the other person's perspective
                                before responding
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                              3
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">
                                Find Common Ground
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                Focus on shared goals and work toward mutual
                                solutions
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                              4
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Seek Help</h4>
                              <p className="text-xs text-muted-foreground">
                                If conflicts persist, don't hesitate to involve
                                community moderators
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="moderation" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reporting and Moderation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-3">
                              When to Report:
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li>• Harassment or bullying behavior</li>
                              <li>• Inappropriate or offensive content</li>
                              <li>• Spam or excessive self-promotion</li>
                              <li>• Copyright violations</li>
                              <li>• Malicious code or security threats</li>
                              <li>• Doxxing or privacy violations</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-3">How to Report:</h4>
                            <ol className="list-decimal list-inside space-y-2 text-sm">
                              <li>Use the report button on the content</li>
                              <li>Provide specific details about the issue</li>
                              <li>Include evidence if available</li>
                              <li>
                                Contact moderators directly for urgent issues
                              </li>
                              <li>Follow up if necessary</li>
                            </ol>
                          </div>
                        </div>

                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-sm mb-1">
                                False Reports
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                Submitting false or malicious reports can result
                                in account restrictions. Only report genuine
                                violations of community guidelines.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Enforcement Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-4 gap-3">
                          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <h4 className="font-medium text-sm mb-1">
                              Warning
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              First-time minor violations
                            </p>
                          </div>
                          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <h4 className="font-medium text-sm mb-1">
                              Timeout
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Temporary restriction from posting
                            </p>
                          </div>
                          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <h4 className="font-medium text-sm mb-1">
                              Suspension
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Temporary account suspension
                            </p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                            <h4 className="font-medium text-sm mb-1">
                              Permanent Ban
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Severe or repeated violations
                            </p>
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <h4 className="font-medium text-sm mb-1">
                            Appeals Process
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            If you believe a moderation action was taken in
                            error, you can appeal through the official support
                            channels. Provide detailed information about your
                            case and any relevant evidence.
                          </p>
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
              <Link to="/ai-tools">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous: AI Tools
              </Link>
            </Button>
            <Button asChild>
              <Link to="/pricing">
                Next: Plans & Pricing
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}