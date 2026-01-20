import { Link } from "react-router-dom";
import { Home, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  "Properties": [
    { name: "For Rent", href: "/listings?type=rent" },
    { name: "For Sale", href: "/listings?type=sale" },
    { name: "Apartments", href: "/listings?category=apartment" },
    { name: "Residential", href: "/listings?category=residential" },
    { name: "Corporate", href: "/listings?category=corporate" },
  ],
  "Company": [
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ],
  "Support": [
    { name: "Help Center", href: "/help" },
    { name: "FAQs", href: "/faqs" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="hero-gradient p-2 rounded-lg">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">NyumbaPaEasy</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Your trusted partner in finding the perfect property in Kenya. 
              Whether buying, selling, or renting - we make it easy.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/70 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 NyumbaPaEasy. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-sm">
            Made with ❤️ in Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
