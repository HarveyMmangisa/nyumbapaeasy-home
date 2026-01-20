import { Heart, MapPin, BedDouble, Bath, Square, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
}

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      to={`/property/${property.id}`}
      className={cn(
        "group block bg-card rounded-2xl overflow-hidden card-shadow transition-all duration-300",
        "hover:card-shadow-hover hover:-translate-y-1",
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
        </div>

        {/* Favorite Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-4 right-4 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card hover:text-destructive"
          onClick={(e) => {
            e.preventDefault();
            // Handle favorite
          }}
        >
          <Heart className="h-4 w-4" />
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
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-display font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
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

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <BedDouble className="h-4 w-4" />
            <span className="text-sm">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Bath className="h-4 w-4" />
            <span className="text-sm">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Square className="h-4 w-4" />
            <span className="text-sm">{property.area} sq.ft</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
