import { useState } from "react";
import { 
  ArrowLeft, Heart, Share2, MapPin, BedDouble, Bath, Square, 
  Car, TreePine, Shield, Wifi, Wind, CheckCircle, Phone, Mail,
  Calendar, X, ChevronLeft, ChevronRight, Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const VerifiedBadge = ({ size = "md", showLabel = false }) => {
  const sizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-6 w-6"
  };
  
  return (
    <div className="flex items-center gap-1">
      <Shield className={`${sizes[size]} text-blue-600 fill-blue-600`} />
      {showLabel && <span className="text-xs font-medium">Verified</span>}
    </div>
  );
};

const mockProperty = {
  id: "1",
  title: "Modern 3BR Apartment in Westlands",
  location: "Westlands, Nairobi",
  price: 150000,
  priceType: "month",
  bedrooms: 3,
  bathrooms: 2,
  area: 1500,
  category: "apartment",
  featured: true,
  isNew: false,
  verified: true,
  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop"
};

const mockAgent = {
  name: "Sarah Johnson",
  company: "Prime Properties Ltd",
  verified: true,
  phone: "+265 999 123 456",
  email: "sarah@primeproperties.com"
};

const amenities = [
  { name: "Parking", icon: Car },
  { name: "Garden", icon: TreePine },
  { name: "Security", icon: Shield },
  { name: "WiFi", icon: Wifi },
  { name: "Air Conditioning", icon: Wind },
];

const features = [
  "Modern Kitchen",
  "Marble Flooring",
  "Built-in Wardrobes",
  "Backup Generator",
  "Water Tank",
  "Staff Quarters",
  "DSQ Available",
  "Balcony/Terrace",
];

const galleryImages = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&auto=format&fit=crop",
];

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-MW", {
    style: "currency",
    currency: "MWK",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function PropertyDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border/40 sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-violet-600 p-2 rounded-xl">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg hidden sm:block">NyumbaPaEasy</span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsSaved(!isSaved)}
                className={isSaved ? "text-red-500 border-red-200 bg-red-50" : ""}
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-4">
        {/* Back Button */}
        <div className="container px-4 lg:px-8 py-4">
          <Button variant="ghost" size="sm" className="gap-2 -ml-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Listings
          </Button>
        </div>

        {/* Image Gallery */}
        <div className="container px-4 lg:px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div 
              className="aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group relative"
              onClick={() => setIsLightboxOpen(true)}
            >
              <img
                src={galleryImages[0]}
                alt={mockProperty.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {galleryImages.slice(1).map((img, i) => (
                <div 
                  key={i} 
                  className="aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group relative"
                  onClick={() => {
                    setCurrentImageIndex(i + 1);
                    setIsLightboxOpen(true);
                  }}
                >
                  <img
                    src={img}
                    alt={`${mockProperty.title} ${i + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container px-4 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {mockProperty.featured && (
                        <Badge className="bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0">
                          Featured
                        </Badge>
                      )}
                      {mockProperty.isNew && (
                        <Badge variant="secondary">New</Badge>
                      )}
                      <Badge variant="outline" className="capitalize">
                        {mockProperty.category}
                      </Badge>
                      {mockProperty.verified && (
                        <Badge variant="secondary" className="gap-1.5 bg-blue-50 text-blue-700 border-blue-200">
                          <VerifiedBadge size="sm" />
                          Verified Listing
                        </Badge>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-3">
                      {mockProperty.title}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{mockProperty.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    {formatPrice(mockProperty.price)}
                  </span>
                  {mockProperty.priceType === "month" && (
                    <span className="text-lg text-muted-foreground">/month</span>
                  )}
                </div>
              </div>

              <Separator />

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Bedrooms", value: mockProperty.bedrooms, icon: BedDouble },
                  { label: "Bathrooms", value: mockProperty.bathrooms, icon: Bath },
                  { label: "Area", value: `${mockProperty.area} sq.ft`, icon: Square },
                  { label: "Parking", value: "2 Cars", icon: Car },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-5 bg-muted/50 rounded-2xl hover:bg-muted/70 transition-colors">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-blue-100 to-violet-100 mb-3">
                      <stat.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-xl md:text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    This stunning {mockProperty.bedrooms}-bedroom property is located in the heart of {mockProperty.location}. 
                    The property features modern finishes throughout, with spacious living areas that are perfect 
                    for entertaining. The kitchen comes fully equipped with high-end appliances, and the master 
                    bedroom boasts an en-suite bathroom with premium fixtures.
                  </p>
                  <p>
                    The property is situated in a secure compound with 24-hour security, ample parking space, 
                    and beautifully landscaped gardens. Close proximity to shopping centers, schools, and 
                    major transport links makes this an ideal location for families and professionals alike.
                  </p>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenities.map((amenity) => (
                    <div key={amenity.name} className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                      <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center flex-shrink-0">
                        <amenity.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="border-border/40 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">
                        {mockAgent.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-foreground truncate">
                          {mockAgent.name}
                        </p>
                        {mockAgent.verified && <VerifiedBadge size="sm" />}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {mockAgent.company}
                      </p>
                    </div>
                  </div>

                  {mockAgent.verified && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-blue-700 mb-1">
                        <VerifiedBadge size="sm" showLabel />
                        <span className="text-xs">Agent</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        This agent has verified their identity and business documents.
                      </p>
                    </div>
                  )}

                  <Separator />

                  <Button className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    Call Agent
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Mail className="h-4 w-4" />
                    Send Message
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By contacting, you agree to our Terms of Service
                  </p>
                </CardContent>
              </Card>

              {/* Schedule Tour */}
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg">Schedule a Tour</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Book a viewing to see this property in person
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Calendar className="h-4 w-4" />
                    Book Viewing
                  </Button>
                </CardContent>
              </Card>

              {/* Safety Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-900 mb-1">Stay Safe</p>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Never pay before viewing. Meet in public places. Report suspicious listings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border/40 py-8">
        <div className="container px-4 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <div className="bg-gradient-to-br from-blue-600 to-violet-600 p-1.5 rounded-lg">
              <Home className="h-4 w-4 text-white" />
            </div>
            <span>© 2026 NyumbaPaEasy. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-full p-2 transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:bg-white/10 rounded-full p-2 transition-colors z-10"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:bg-white/10 rounded-full p-2 transition-colors z-10"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <img
            src={galleryImages[currentImageIndex]}
            alt="Property"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
}