import { Heart, MapPin, BedDouble, Bath, Square, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { cn } from "@/lib/utils";

export interface Property {
  id: string;
  title: string;
  price: number;
  priceType: "month" | "sale";
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  category: "residential" | "apartment" | "bnb" | "corporate";
  featured?: boolean;
  rating?: number;
  isNew?: boolean;
  agentId?: string;
  verified?: boolean;
}

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-MW", {
      style: "currency",
      currency: "MWK",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
     <Link
       to={`/property/${property.id}`}
       className={cn(
         "group block bg-card rounded-2xl overflow-hidden card-shadow transition-all duration-300 hover-lift",
         className
       )}
     >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 overlay-gradient opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {property.isNew && (
            <Badge className="bg-accent text-accent-foreground">New</Badge>
          )}
          {property.featured && (
            <Badge className="hero-gradient text-primary-foreground border-0">Featured</Badge>
          )}
          {property.verified && (
            <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm gap-1 pr-2">
              <VerifiedBadge size="sm" />
              <span className="text-xs">Verified</span>
            </Badge>
          )}
        </div>

         {/* Favorite Button */}
         <Button
           size="icon"
           variant="ghost"
           className="absolute top-4 right-4 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card hover:text-destructive transition-all duration-200 hover:scale-110"
           onClick={(e) => {
             e.preventDefault();
             // Handle favorite
           }}
         >
           <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors duration-200" />
         </Button>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4">
          <div className="glass-card px-3 py-1.5 rounded-lg">
            <span className="font-display font-bold text-foreground">
              {formatPrice(property.price)}
            </span>
            {property.priceType === "month" && (
              <span className="text-muted-foreground text-sm">/month</span>
            )}
          </div>
        </div>
      </div>

       {/* Content */}
       <div className="p-4 sm:p-5">
         <div className="flex items-start justify-between gap-2 mb-3">
           <h3 className="font-display font-semibold text-base sm:text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
             {property.title}
           </h3>
          {property.rating && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{property.rating}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

         <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border">
           <div className="flex items-center gap-1 text-muted-foreground">
             <BedDouble className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
             <span className="text-xs sm:text-sm">{property.bedrooms} Beds</span>
           </div>
           <div className="flex items-center gap-1 text-muted-foreground">
             <Bath className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
             <span className="text-xs sm:text-sm">{property.bathrooms} Baths</span>
           </div>
           <div className="flex items-center gap-1 text-muted-foreground">
             <Square className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
             <span className="text-xs sm:text-sm">{property.area} sq.ft</span>
           </div>
         </div>
      </div>
    </Link>
  );
}
