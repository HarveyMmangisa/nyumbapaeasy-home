import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin, SlidersHorizontal, Grid3X3, List, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { mockProperties } from "@/data/mockProperties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const activeFilters = {
    type: searchParams.get("type") || "",
    category: searchParams.get("category") || "",
    location: searchParams.get("location") || "",
    price: searchParams.get("price") || "",
    bedrooms: searchParams.get("bedrooms") || "",
  };

  const clearFilter = (key: string) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters = Object.values(activeFilters).some(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Search Header */}
        <div className="bg-card border-b border-border sticky top-16 z-40">
          <div className="container py-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by location, city, or neighborhood..."
                  className="pl-10"
                  value={activeFilters.location}
                  onChange={(e) => {
                    if (e.target.value) {
                      searchParams.set("location", e.target.value);
                    } else {
                      searchParams.delete("location");
                    }
                    setSearchParams(searchParams);
                  }}
                />
              </div>

              {/* Quick Filters */}
              <div className="flex gap-2 flex-wrap">
                <Select
                  value={activeFilters.type}
                  onValueChange={(value) => {
                    searchParams.set("type", value);
                    setSearchParams(searchParams);
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">For Rent</SelectItem>
                    <SelectItem value="sale">For Sale</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={activeFilters.category}
                  onValueChange={(value) => {
                    searchParams.set("category", value);
                    setSearchParams(searchParams);
                  }}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="bnb">Lodge & BnB</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={activeFilters.bedrooms}
                  onValueChange={(value) => {
                    searchParams.set("bedrooms", value);
                    setSearchParams(searchParams);
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Beds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Bed</SelectItem>
                    <SelectItem value="2">2 Beds</SelectItem>
                    <SelectItem value="3">3 Beds</SelectItem>
                    <SelectItem value="4">4+ Beds</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  More Filters
                </Button>
              </div>

              {/* View Toggle */}
              <div className="hidden lg:flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {Object.entries(activeFilters).map(([key, value]) =>
                  value ? (
                    <Badge key={key} variant="secondary" className="gap-1">
                      {key}: {value}
                      <button onClick={() => clearFilter(key)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ) : null
                )}
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{mockProperties.length}</span> properties found
            </p>
            <Select defaultValue="featured">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div
            className={cn(
              "grid gap-6",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            )}
          >
            {mockProperties.map((property, index) => (
              <div
                key={property.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Properties
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
