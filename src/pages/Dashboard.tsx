import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, Building2, Plus, Settings, LogOut, BarChart3, Users,
  Eye, Heart, MessageSquare, TrendingUp, MoreVertical, Pencil, Trash2,
  FileCheck, AlertCircle, Bell, ChevronRight, Shield
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

const sidebarItems = [
  { name: "Overview", icon: BarChart3, href: "#overview" },
  { name: "Properties", icon: Building2, href: "#properties" },
  { name: "Messages", icon: MessageSquare, href: "#messages", badge: 3 },
  { name: "Leads", icon: Users, href: "#leads" },
  { name: "Analytics", icon: TrendingUp, href: "#analytics" },
  { name: "Verification", icon: FileCheck, href: "#verification" },
];

const stats = [
  { label: "Properties", value: "12", change: "+2", trend: "up", icon: Building2 },
  { label: "Total Views", value: "2.8K", change: "+15%", trend: "up", icon: Eye },
  { label: "Saved", value: "156", change: "+8", trend: "up", icon: Heart },
  { label: "Messages", value: "23", change: "5 new", trend: "neutral", icon: MessageSquare },
];

const mockProperties = [
  {
    id: 1,
    title: "Modern 3BR Apartment in Westlands",
    location: "Westlands, Nairobi",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    priceType: "month",
    verified: true
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    location: "Karen, Nairobi",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
    priceType: "sale",
    verified: true
  },
  {
    id: 3,
    title: "2BR Apartment Near Mall",
    location: "Kilimani, Nairobi",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    priceType: "month",
    verified: false
  },
  {
    id: 4,
    title: "Spacious Studio Downtown",
    location: "CBD, Nairobi",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    priceType: "month",
    verified: true
  }
];

const VerifiedBadge = ({ size = "md" }) => {
  const sizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-6 w-6"
  };
  
  return (
    <Shield className={`${sizes[size]} text-accent fill-accent`} />
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const isVerified = true;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border/40 fixed h-full flex flex-col">
        <div className="p-6 border-b border-border/40">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="bg-gradient-to-br from-blue-600 to-violet-600 p-2 rounded-xl">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">NyumbaPaEasy</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.href.slice(1))}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
                activeSection === item.href.slice(1)
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                <span className="font-medium text-sm">{item.name}</span>
              </div>
              {item.badge && (
                <Badge variant="secondary" className="h-5 min-w-5 px-1.5 text-xs font-semibold">
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border/40">
          <div className="flex items-center gap-3 p-3 mb-2 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center flex-shrink-0">
              <span className="font-semibold text-white text-sm">JM</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-medium text-sm truncate">James Mwangi</p>
                {isVerified && <VerifiedBadge size="sm" />}
              </div>
              <p className="text-xs text-muted-foreground">Premium Agent</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-card/50 backdrop-blur-xl border-b border-border/40 sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-5">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-0.5">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">Monitor your property performance</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-600 rounded-full"></span>
              </Button>
              <Button 
                className="gap-2 shadow-sm"
                onClick={() => navigate("/add-property")}
              >
                <Plus className="h-4 w-4" />
                Add Property
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl">
          {/* Verification Status Card */}
          {isVerified ? (
            <Card className="mb-8 border-blue-200/40 bg-gradient-to-br from-blue-50/50 to-violet-50/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <VerifiedBadge size="lg" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        Verified Lister
                      </h3>
                      <Badge className="bg-blue-600 text-white text-xs hover:bg-blue-700">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      Your verification badge increases trust and visibility with potential clients
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs border-blue-200 bg-white">
                        ID Verified
                      </Badge>
                      <Badge variant="outline" className="text-xs border-blue-200 bg-white">
                        Business Registered
                      </Badge>
                      <Badge variant="outline" className="text-xs border-blue-200 bg-white">
                        Address Confirmed
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-8 border-amber-200/40 bg-gradient-to-br from-amber-50/50 to-orange-50/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      Get Verified to Build Trust
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      Verified listers receive 3x more inquiries on average
                    </p>
                    <Button size="sm" className="shadow-sm">
                      Start Verification
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {stats.map((stat, index) => (
              <Card 
                key={stat.label} 
                className="border-border/40 hover:shadow-md transition-shadow" 
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <Badge variant="secondary" className="text-xs bg-muted/50">
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* My Properties */}
          <Card className="border-border/40">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl">Active Properties</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Manage your listings</p>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-3">
                {mockProperties.map((property) => (
                  <div
                    key={property.id}
                    className="group flex items-center gap-4 p-4 bg-muted/30 rounded-2xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border/40"
                  >
                    <div className="h-20 w-28 rounded-xl overflow-hidden flex-shrink-0 relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {property.verified && (
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-sm">
                          <VerifiedBadge size="sm" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate mb-0.5">
                            {property.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                        </div>
                        <Badge 
                          variant={property.priceType === "month" ? "secondary" : "default"}
                          className="flex-shrink-0"
                        >
                          {property.priceType === "month" ? "Rent" : "Sale"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5" /> 234
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Heart className="h-3.5 w-3.5" /> 18
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MessageSquare className="h-3.5 w-3.5" /> 5
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
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