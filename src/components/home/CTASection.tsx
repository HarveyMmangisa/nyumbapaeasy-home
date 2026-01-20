import { Building2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const benefits = [
  "Reach thousands of potential buyers & tenants",
  "Easy-to-use property management dashboard",
  "Professional photography services available",
  "24/7 customer support",
];

export function CTASection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="relative hero-gradient rounded-3xl overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-foreground rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-foreground rounded-full blur-3xl" />
          </div>

          <div className="relative grid md:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full mb-6">
                <Building2 className="h-4 w-4 text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground">For Property Owners</span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                List Your Property & Start Earning Today
              </h2>

              <p className="text-primary-foreground/80 text-lg mb-8">
                Join thousands of property owners who trust NyumbaPaEasy to connect 
                them with quality tenants and buyers. Get your property in front of 
                the right audience.
              </p>

              <ul className="space-y-3 mb-8">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-primary-foreground/90">
                    <CheckCircle className="h-5 w-5 text-primary-foreground flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/dashboard">
                    List Your Property
                  </Link>
                </Button>
                <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/how-it-works">
                    Learn How It Works
                  </Link>
                </Button>
              </div>
            </div>

            {/* Image/Stats side */}
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                {[
                  { value: "98%", label: "Owner Satisfaction" },
                  { value: "48hrs", label: "Average Response" },
                  { value: "1000+", label: "Active Listings" },
                  { value: "Free", label: "Basic Listing" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                  >
                    <p className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-primary-foreground/70 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
