import { Search, MapPin, Home, DollarSign, BedDouble } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState<"rent" | "sale">("rent");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("type", listingType);
    if (location) params.set("location", location);
    if (priceRange) params.set("price", priceRange);
    if (bedrooms) params.set("bedrooms", bedrooms);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Home className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              Find Your Perfect Home in Malawi
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 sm:mb-6 animate-slide-up">
            Discover Your Dream Home with{" "}
            <span className="relative">
              NyumbaPaEasy
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 4 100 2 150 4C200 6 250 4 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary-foreground/40"/>
              </svg>
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 mb-6 sm:mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Browse thousands of properties for sale and rent across Malawi. 
            Find residential homes, apartments, lodges, and commercial spaces.
          </p>

          {/* Search Card */}
          <div className="glass-card rounded-2xl p-4 sm:p-6 card-shadow animate-scale-in" style={{ animationDelay: "0.2s" }}>
            {/* Listing Type Toggle */}
            <div className="flex gap-2 mb-4 sm:mb-6">
              <Button
                variant={listingType === "rent" ? "default" : "outline"}
                onClick={() => setListingType("rent")}
                className="flex-1 text-sm sm:text-base"
              >
                For Rent
              </Button>
              <Button
                variant={listingType === "sale" ? "default" : "outline"}
                onClick={() => setListingType("sale")}
                className="flex-1 text-sm sm:text-base"
              >
                For Sale
              </Button>
            </div>

            {/* Search Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="relative md:col-span-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  className="pl-10"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50000">KES 0 - 50,000</SelectItem>
                  <SelectItem value="50000-100000">KES 50,000 - 100,000</SelectItem>
                  <SelectItem value="100000-200000">KES 100,000 - 200,000</SelectItem>
                  <SelectItem value="200000+">KES 200,000+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger>
                  <BedDouble className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4">4+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleSearch} className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>

           {/* Stats */}
           <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
             {[
               { value: "10K+", label: "Properties Listed" },
               { value: "5K+", label: "Happy Customers" },
               { value: "200+", label: "Verified Agents" },
             ].map((stat) => (
               <div key={stat.label} className="text-center">
                 <p className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground">{stat.value}</p>
                 <p className="text-xs sm:text-sm text-primary-foreground/70">{stat.label}</p>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
