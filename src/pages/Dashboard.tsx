import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home, Building2, Plus, Settings, LogOut, BarChart3, Users,
  Eye, Heart, MessageSquare, TrendingUp, MoreVertical, Pencil, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { mockProperties } from "@/data/mockProperties";

const sidebarItems = [
  { name: "Overview", icon: BarChart3, href: "#overview" },
  { name: "My Properties", icon: Building2, href: "#properties" },
  { name: "Messages", icon: MessageSquare, href: "#messages", badge: 3 },
  { name: "Leads", icon: Users, href: "#leads" },
  { name: "Analytics", icon: TrendingUp, href: "#analytics" },
  { name: "Settings", icon: Settings, href: "#settings" },
];

const stats = [
  { label: "Total Properties", value: "12", change: "+2 this month", icon: Building2 },
  { label: "Total Views", value: "2,847", change: "+15% vs last month", icon: Eye },
  { label: "Saved by Users", value: "156", change: "+8 this week", icon: Heart },
  { label: "Messages", value: "23", change: "5 unread", icon: MessageSquare },
];

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const myProperties = mockProperties.slice(0, 4);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border fixed h-full">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="hero-gradient p-2 rounded-lg">
              <Home className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">NyumbaPaEasy</span>
          </Link>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveSection(item.href.slice(1))}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors",
                  activeSection === item.href.slice(1)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="h-5 min-w-5 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-semibold text-primary">JM</span>
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">James Mwangi</p>
              <p className="text-xs text-muted-foreground">Premium Agent</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, James!</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="font-display text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-accent mt-1">{stat.change}</p>
                    </div>
                    <div className="hero-gradient p-3 rounded-xl">
                      <stat.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* My Properties */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Properties</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myProperties.map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="h-20 w-28 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground truncate">
                            {property.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                        </div>
                        <Badge variant={property.priceType === "month" ? "secondary" : "default"}>
                          {property.priceType === "month" ? "For Rent" : "For Sale"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" /> 234 views
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" /> 18 saves
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" /> 5 inquiries
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
