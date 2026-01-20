import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Building2, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Buy", href: "/listings?type=sale" },
  { name: "Rent", href: "/listings?type=rent" },
  { name: "Lodges & BnB", href: "/listings?category=bnb" },
  { name: "Corporate", href: "/listings?category=corporate" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isHome ? "bg-transparent" : "bg-card/95 backdrop-blur-md border-b border-border"
      )}
    >
       <nav className="container flex items-center justify-between py-3 sm:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="hero-gradient p-1.5 sm:p-2 rounded-lg">
            <Home className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
          </div>
          <span className={cn(
            "font-display font-bold text-lg sm:text-xl",
            isHome ? "text-primary-foreground" : "text-foreground"
          )}>
            NyumbaPaEasy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "font-medium transition-colors hover:text-primary",
                isHome ? "text-primary-foreground/90 hover:text-primary-foreground" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2 sm:gap-3">
          <Button variant={isHome ? "ghost" : "outline"} size="sm" asChild
            className={cn(isHome && "text-primary-foreground hover:bg-primary-foreground/10")}
          >
            <Link to="/dashboard">
              <Building2 className="h-4 w-4 mr-2" />
              List Property
            </Link>
          </Button>
          <Button variant={isHome ? "secondary" : "default"} size="sm" asChild>
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={cn("h-5 w-5 sm:h-6 sm:w-6", isHome ? "text-primary-foreground" : "text-foreground")} />
          ) : (
            <Menu className={cn("h-5 w-5 sm:h-6 sm:w-6", isHome ? "text-primary-foreground" : "text-foreground")} />
          )}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-slide-up">
          <div className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-2 font-medium text-muted-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-3">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/dashboard">
                  <Building2 className="h-4 w-4 mr-2" />
                  List Property
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
