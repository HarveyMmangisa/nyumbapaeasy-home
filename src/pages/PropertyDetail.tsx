import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, Heart, Share2, MapPin, BedDouble, Bath, Square, 
  Car, TreePine, Shield, Wifi, Wind, CheckCircle, User, Phone, Mail
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockProperties } from "@/data/mockProperties";

const amenities = [
  { name: "Parking", icon: Car },
  { name: "Garden", icon: TreePine },
  { name: "Security", icon: Shield },
  { name: "WiFi", icon: Wifi },
  { name: "Air Conditioning", icon: Wind },
];

export default function PropertyDetail() {
  const { id } = useParams();
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Property not found</p>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const galleryImages = [
    property.image,
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&auto=format&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Back Button */}
        <div className="container py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/listings">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Listings
            </Link>
          </Button>
        </div>

        {/* Image Gallery */}
        <div className="container pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src={galleryImages[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.slice(1).map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={img}
                    alt={`${property.title} ${i + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {property.featured && (
                        <Badge className="hero-gradient text-primary-foreground border-0">Featured</Badge>
                      )}
                      {property.isNew && (
                        <Badge variant="secondary">New</Badge>
                      )}
                      <Badge variant="outline" className="capitalize">{property.category}</Badge>
                    </div>
                    <h1 className="font-display text-3xl font-bold text-foreground">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-1 text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-primary">
                    {formatPrice(property.price)}
                  </span>
                  {property.priceType === "month" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
              </div>

              <Separator />

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Bedrooms", value: property.bedrooms, icon: BedDouble },
                  { label: "Bathrooms", value: property.bathrooms, icon: Bath },
                  { label: "Area", value: `${property.area} sq.ft`, icon: Square },
                  { label: "Parking", value: "2 Cars", icon: Car },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-muted rounded-xl">
                    <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="font-semibold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This stunning {property.bedrooms}-bedroom property is located in the heart of {property.location}. 
                  The property features modern finishes throughout, with spacious living areas that are perfect 
                  for entertaining. The kitchen comes fully equipped with high-end appliances, and the master 
                  bedroom boasts an en-suite bathroom with premium fixtures.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  The property is situated in a secure compound with 24-hour security, ample parking space, 
                  and beautifully landscaped gardens. Close proximity to shopping centers, schools, and 
                  major transport links makes this an ideal location for families and professionals alike.
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.map((amenity) => (
                    <div key={amenity.name} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <amenity.icon className="h-5 w-5 text-primary" />
                      <span className="text-foreground">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Modern Kitchen",
                    "Marble Flooring",
                    "Built-in Wardrobes",
                    "Backup Generator",
                    "Water Tank",
                    "Staff Quarters",
                    "DSQ Available",
                    "Balcony/Terrace",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="card-shadow sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">James Mwangi</p>
                      <p className="text-sm text-muted-foreground">Premier Properties Ltd</p>
                    </div>
                  </div>

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
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Schedule a Tour</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Book a viewing to see this property in person
                  </p>
                  <Button variant="outline" className="w-full">
                    Book Viewing
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
