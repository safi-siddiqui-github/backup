import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      company: "Elite Catering Co.",
      role: "Owner",
      category: "Catering",
      quote: "We tripled our bookings in 6 months using AI lead scoring. The automated follow-ups alone have saved us countless hours.",
      metric: "Revenue: $45K → $135K",
      rating: 5,
      initials: "SC",
    },
    {
      name: "Michael Torres",
      company: "Sunset Venues",
      role: "General Manager",
      category: "Venue",
      quote: "The floor plan designer helped us win $200K in corporate events. Clients love the interactive booth selection.",
      metric: "Bookings: 24/year → 87/year",
      rating: 5,
      initials: "MT",
    },
    {
      name: "Emily Rodriguez",
      company: "Lens Masters Photography",
      role: "Lead Photographer",
      category: "Photography",
      quote: "Automated invoicing alone saved us 15 hours per week. We can now focus on what we love - creating amazing photos.",
      metric: "Client satisfaction: 4.2 → 4.9 stars",
      rating: 5,
      initials: "ER",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by Thousands of Vendors
          </h2>
          <p className="text-xl text-muted-foreground">
            See how EventVerse is transforming event businesses
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>

              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-semibold text-primary">{testimonial.metric}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust bar */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            {["VenueX", "CaterPro", "PhotoHub", "EventMasters", "DecorElite"].map((brand) => (
              <div key={brand} className="text-2xl font-bold text-muted-foreground">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
