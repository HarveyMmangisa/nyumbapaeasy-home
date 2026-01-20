import { Home, Building, Hotel, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Residential",
    description: "Family homes & villas",
    icon: Home,
    href: "/listings?category=residential",
    count: "4,500+ listings",
  },
  {
    name: "Apartments",
    description: "Modern living spaces",
    icon: Building,
    href: "/listings?category=apartment",
    count: "3,200+ listings",
  },
  {
    name: "Lodges & BnB",
    description: "Short stays & retreats",
    icon: Hotel,
    href: "/listings?category=bnb",
    count: "1,800+ listings",
  },
  {
    name: "Corporate",
    description: "Office & commercial",
    icon: Building2,
    href: "/listings?category=corporate",
    count: "900+ listings",
  },
];

export function CategorySection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore by Property Type
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking for a cozy apartment, a family home, or commercial space, 
            we have the perfect property waiting for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.href}
              className={cn(
                "group relative bg-card rounded-2xl p-6 card-shadow transition-all duration-300",
                "hover:card-shadow-hover hover:-translate-y-1",
                "animate-slide-up"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="hero-gradient w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <category.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {category.name}
              </h3>
              <p className="text-muted-foreground mb-3">{category.description}</p>
              <p className="text-sm font-medium text-primary">{category.count}</p>

              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
