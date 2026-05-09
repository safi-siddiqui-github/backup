"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ContentBlock, SectionType } from "@/types/website";
import {
  Award,
  Building,
  Calendar,
  CalendarDays,
  Camera,
  Clock,
  CreditCard,
  DollarSign,
  Grid3x3,
  Hash,
  Heart,
  Image,
  Layout,
  Mail,
  MapPin,
  MessageSquare,
  Network,
  Play,
  Star,
  Type,
  UserCheck,
  Users,
} from "lucide-react";
import { ElementType } from "react";

interface ContentBlockLibraryProps {
  onAddSection: (sectionType: SectionType, content: unknown) => void;
}

export const ContentBlockLibrary = ({
  onAddSection,
}: ContentBlockLibraryProps) => {
  const contentBlocks: ContentBlock[] = [
    // Layout Blocks
    {
      id: "hero",
      name: "Hero Section",
      icon: "Layout",
      type: "hero",
      category: "layout",
      defaultContent: {
        title: "Welcome to Our Event",
        subtitle: "Join us for an amazing experience",
        description: "This is going to be an unforgettable event",
        buttons: [{ text: "Learn More", link: "#about", style: "primary" }],
      },
      defaultStyling: {
        backgroundColor: "hsl(var(--primary))",
        textColor: "hsl(var(--primary-foreground))",
        padding: "6rem 0",
      },
    },
    {
      id: "about",
      name: "About Section",
      icon: "Type",
      type: "about",
      category: "content",
      defaultContent: {
        title: "About This Event",
        description: "Learn more about what makes this event special.",
      },
      defaultStyling: {
        padding: "4rem 0",
      },
    },

    // Content Blocks
    {
      id: "text",
      name: "Text Block",
      icon: "Type",
      type: "text",
      category: "content",
      defaultContent: {
        title: "Section Title",
        content:
          "Add your content here. You can include multiple paragraphs and format the text as needed.",
      },
      defaultStyling: {
        padding: "2rem 0",
      },
    },
    {
      id: "image",
      name: "Image Block",
      icon: "Image",
      type: "image",
      category: "media",
      defaultContent: {
        title: "Image Gallery",
        images: [
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
        ],
      },
      defaultStyling: {
        padding: "2rem 0",
      },
    },

    // Media Blocks
    {
      id: "gallery",
      name: "Photo Gallery",
      icon: "Camera",
      type: "gallery",
      category: "media",
      defaultContent: {
        title: "Photo Gallery",
        description: "Check out photos from our events",
        images: [
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
        ],
      },
      defaultStyling: {
        padding: "4rem 0",
      },
    },

    // Form Blocks
    {
      id: "contact",
      name: "Contact Form",
      icon: "Mail",
      type: "contact",
      category: "forms",
      defaultContent: {
        title: "Get In Touch",
        description: "We'd love to hear from you",
        formFields: [
          {
            id: "name",
            type: "text",
            label: "Name",
            required: true,
            placeholder: "Your name",
          },
          {
            id: "email",
            type: "email",
            label: "Email",
            required: true,
            placeholder: "your@email.com",
          },
          {
            id: "message",
            type: "textarea",
            label: "Message",
            required: true,
            placeholder: "Your message",
          },
        ],
      },
      defaultStyling: {
        padding: "4rem 0",
        backgroundColor: "hsl(var(--muted))",
      },
    },

    // Integration Blocks
    {
      id: "rsvp",
      name: "RSVP Form",
      icon: "Users",
      type: "rsvp",
      category: "integrations",
      defaultContent: {
        title: "RSVP",
        description: "Please confirm your attendance",
        data: {
          eventDate: "2024-06-15",
          eventLocation: "Grand Conference Center",
          maxGuests: 5,
        },
      },
      defaultStyling: {
        padding: "4rem 0",
      },
    },
    {
      id: "schedule",
      name: "Event Schedule",
      icon: "Calendar",
      type: "schedule",
      category: "integrations",
      defaultContent: {
        title: "Event Schedule",
        description: "Don't miss out on these exciting sessions",
        schedule: [
          {
            id: "1",
            title: "Registration & Coffee",
            startTime: "08:00",
            endTime: "09:00",
            date: "2024-06-15",
            type: "networking",
            location: "Main Lobby",
          },
          {
            id: "2",
            title: "Opening Keynote",
            startTime: "09:00",
            endTime: "10:00",
            date: "2024-06-15",
            type: "keynote",
            location: "Main Auditorium",
            description: "Welcome address and industry overview",
          },
        ],
      },
      defaultStyling: {
        padding: "4rem 0",
      },
    },
    {
      id: "ticketing",
      name: "Ticket Sales",
      icon: "CreditCard",
      type: "ticketing",
      category: "integrations",
      defaultContent: {
        title: "Get Your Tickets",
        description: "Choose the perfect ticket for your needs",
        data: {
          ticketTypes: [
            {
              id: "1",
              name: "Early Bird",
              price: 299,
              currency: "USD",
              description: "Perfect for early supporters",
              features: [
                "Full conference access",
                "Welcome kit",
                "Networking lunch",
                "Certificate",
              ],
              available: 50,
              maxPerPerson: 5,
              isPopular: true,
            },
            {
              id: "2",
              name: "Standard",
              price: 399,
              currency: "USD",
              description: "Complete conference experience",
              features: [
                "Full conference access",
                "Welcome kit",
                "Networking lunch",
                "Certificate",
                "Workshop access",
              ],
              available: 100,
              maxPerPerson: 5,
            },
          ],
        },
      },
      defaultStyling: {
        padding: "4rem 0",
      },
    },

    // Special Blocks
    {
      id: "countdown",
      name: "Countdown Timer",
      icon: "Clock",
      type: "countdown",
      category: "content",
      defaultContent: {
        title: "Event Countdown",
        description: "Don't miss out on this amazing event",
        data: {
          targetDate: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      },
      defaultStyling: {
        padding: "3rem 0",
        backgroundColor: "hsl(var(--accent))",
        textColor: "hsl(var(--accent-foreground))",
      },
    },
    {
      id: "map",
      name: "Location Map",
      icon: "MapPin",
      type: "map",
      category: "content",
      defaultContent: {
        title: "Find Us",
        description: "Event location and directions",
      },
      defaultStyling: {
        padding: "4rem 0",
      },
    },

    // Advanced Content Components
    {
      id: "sessions-grid",
      name: "Sessions Grid",
      icon: "Grid3x3",
      type: "sessions-grid",
      category: "advanced",
      isPremium: true,
      defaultContent: {
        title: "Conference Sessions",
        description: "Explore our diverse lineup of sessions and workshops",
        sessions: [
          {
            id: "1",
            title: "Opening Keynote: The Future of Innovation",
            description:
              "Join us for an inspiring keynote about emerging technologies and their impact on business.",
            speaker: "Dr. Sarah Johnson",
            speakerBio:
              "Leading technology researcher and innovation strategist",
            startTime: "09:00",
            endTime: "10:00",
            date: "2024-03-15",
            location: "Main Auditorium",
            category: "Keynote",
            level: "beginner",
            tags: ["innovation", "technology", "future"],
          },
          {
            id: "2",
            title: "AI in Modern Development",
            description:
              "Learn how artificial intelligence is transforming software development practices.",
            speaker: "Michael Chen",
            speakerBio: "Senior AI Engineer at TechCorp",
            startTime: "10:30",
            endTime: "11:30",
            date: "2024-03-15",
            location: "Room A",
            category: "Technical",
            level: "intermediate",
            tags: ["AI", "development", "automation"],
          },
        ],
      },
      defaultStyling: {
        padding: "4rem 0",
      },
    },
    {
      id: "speaker-profiles",
      name: "Speaker Profiles",
      icon: "UserCheck",
      type: "speaker-profiles",
      category: "advanced",
      isPremium: true,
      defaultContent: {
        title: "Meet Our Speakers",
        description: "Learn from industry experts and thought leaders",
        speakers: [
          {
            id: "1",
            name: "Dr. Sarah Johnson",
            title: "Chief Innovation Officer",
            bio: "Dr. Johnson is a renowned technology researcher with over 15 years of experience in innovation strategy and emerging technologies.",
            company: "InnovateTech Corp",
            image:
              "https://images.unsplash.com/photo-1494790108755-2616b612b287?w=400&h=400&fit=crop",
            social: {
              twitter: "https://twitter.com/sarahjohnson",
              linkedin: "https://linkedin.com/in/sarahjohnson",
              website: "https://sarahjohnson.com",
            },
            sessions: ["1"],
          },
          {
            id: "2",
            name: "Michael Chen",
            title: "Senior AI Engineer",
            bio: "Michael specializes in machine learning and AI development, with a focus on practical applications in software engineering.",
            company: "TechCorp",
            image:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
            social: {
              linkedin: "https://linkedin.com/in/michaelchen",
              website: "https://michaelchen.dev",
            },
            sessions: ["2"],
          },
        ],
      },
      defaultStyling: {
        padding: "4rem 0",
        backgroundColor: "hsl(var(--muted)/0.3)",
      },
    },
    {
      id: "pricing-table",
      name: "Pricing Table",
      icon: "DollarSign",
      type: "pricing-table",
      category: "advanced",
      isPremium: true,
      defaultContent: {
        title: "Event Tickets",
        description: "Choose the perfect ticket for your needs",
        pricing: [
          {
            id: "1",
            name: "Early Bird",
            price: 299,
            currency: "USD",
            description: "Perfect for individual attendees",
            features: [
              "Access to all sessions",
              "Welcome reception",
              "Lunch and coffee breaks",
              "Digital resources",
              "Networking opportunities",
            ],
            isPopular: false,
            earlyBird: {
              price: 249,
              deadline: "2024-02-15",
            },
          },
          {
            id: "2",
            name: "Professional",
            price: 499,
            currency: "USD",
            description: "Best value for professionals",
            features: [
              "Everything in Early Bird",
              "VIP seating",
              "Access to workshops",
              "One-on-one speaker meetings",
              "Premium networking events",
              "Certificate of completion",
            ],
            isPopular: true,
          },
          {
            id: "3",
            name: "Enterprise",
            price: 799,
            currency: "USD",
            description: "For teams and organizations",
            features: [
              "Everything in Professional",
              "Group discounts available",
              "Custom training sessions",
              "Dedicated support",
              "Priority booking",
              "Team collaboration tools",
            ],
            isPopular: false,
          },
        ],
      },
      defaultStyling: {
        padding: "4rem 0",
      },
    },
    {
      id: "multi-day-schedule",
      name: "Multi-Day Schedule",
      icon: "CalendarDays",
      type: "multi-day-schedule",
      category: "advanced",
      isPremium: true,
      defaultContent: {
        title: "Event Schedule",
        description: "Full agenda for all event days",
        schedule: [
          {
            id: "1",
            title: "Registration & Welcome Coffee",
            startTime: "08:00",
            endTime: "09:00",
            date: "2024-03-15",
            type: "break",
            location: "Main Lobby",
            description: "Get your badge and enjoy coffee while networking",
          },
          {
            id: "2",
            title: "Opening Keynote",
            startTime: "09:00",
            endTime: "10:00",
            date: "2024-03-15",
            type: "keynote",
            location: "Main Auditorium",
            description: "Welcome address and vision for the future",
          },
          {
            id: "3",
            title: "AI Workshop",
            startTime: "10:30",
            endTime: "12:00",
            date: "2024-03-15",
            type: "workshop",
            location: "Workshop Room 1",
            description: "Hands-on AI development workshop",
          },
          {
            id: "4",
            title: "Networking Lunch",
            startTime: "12:00",
            endTime: "13:30",
            date: "2024-03-15",
            type: "networking",
            location: "Dining Hall",
            description: "Connect with peers over lunch",
          },
        ],
      },
      defaultStyling: {
        padding: "4rem 0",
        backgroundColor: "hsl(var(--muted)/0.3)",
      },
    },
    {
      id: "social-feed",
      name: "Social Media Feed",
      icon: "Hash",
      type: "social-feed",
      category: "professional",
      defaultContent: {
        title: "Join the Conversation",
        description: "Follow us on social media for live updates",
        socialFeeds: [
          {
            id: "1",
            platform: "twitter",
            hashtag: "#EventName2024",
            embedCode: "",
          },
        ],
      },
      defaultStyling: {
        padding: "4rem 0",
      },
    },
    {
      id: "testimonials",
      name: "Testimonials",
      icon: "MessageSquare",
      type: "testimonials",
      category: "professional",
      defaultContent: {
        title: "What Attendees Say",
        description: "Hear from previous event participants",
        testimonials: [
          {
            id: "1",
            name: "Jennifer Martinez",
            role: "Product Manager",
            company: "StartupCo",
            content:
              "This event exceeded my expectations! The speakers were incredible and I made valuable connections.",
            image:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
            rating: 5,
          },
          {
            id: "2",
            name: "David Park",
            role: "Software Engineer",
            company: "TechFirm",
            content:
              "Great organization, excellent content, and perfect networking opportunities. Will definitely attend next year!",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            rating: 5,
          },
        ],
      },
      defaultStyling: {
        padding: "4rem 0",
        backgroundColor: "hsl(var(--muted)/0.3)",
      },
    },
    {
      id: "sponsor-showcase",
      name: "Sponsor Showcase",
      icon: "Award",
      type: "sponsor-showcase",
      category: "professional",
      defaultContent: {
        title: "Our Sponsors",
        description:
          "Thank you to our amazing sponsors who make this event possible",
        sponsors: [
          {
            id: "1",
            name: "TechCorp",
            logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
            website: "https://techcorp.com",
            tier: "platinum",
            description: "Leading technology solutions provider",
          },
          {
            id: "2",
            name: "InnovateLabs",
            logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
            website: "https://innovatelabs.com",
            tier: "gold",
            description: "Innovation and research company",
          },
        ],
      },
      defaultStyling: {
        padding: "4rem 0",
      },
    },
    {
      id: "venue-map",
      name: "Venue Map",
      icon: "Building",
      type: "venue-map",
      category: "professional",
      defaultContent: {
        title: "Event Venue",
        description: "Find your way around our venue",
        venues: [
          {
            id: "1",
            name: "Main Convention Center",
            address: "123 Event Avenue, Conference City, CC 12345",
            coordinates: { lat: 40.7128, lng: -74.006 },
            capacity: 2000,
            amenities: [
              "WiFi",
              "Parking",
              "Accessibility",
              "Catering",
              "AV Equipment",
            ],
            images: [
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
            ],
            description:
              "State-of-the-art convention center with modern facilities",
          },
        ],
      },
      defaultStyling: {
        padding: "4rem 0",
      },
    },
    {
      id: "live-stream",
      name: "Live Stream",
      icon: "Play",
      type: "live-stream",
      category: "professional",
      isPremium: true,
      defaultContent: {
        title: "Watch Live",
        description: "Join us virtually for the live stream",
        liveStreamConfig: {
          id: "1",
          title: "Main Stage Live Stream",
          platform: "youtube",
          embedCode: "",
          streamUrl: "",
          isLive: false,
          schedule: {
            startTime: "09:00",
            endTime: "17:00",
            date: "2024-03-15",
          },
        },
      },
      defaultStyling: {
        padding: "4rem 0",
        backgroundColor: "hsl(var(--background))",
      },
    },
    {
      id: "networking-hub",
      name: "Networking Hub",
      icon: "Network",
      type: "networking-hub",
      category: "professional",
      isPremium: true,
      defaultContent: {
        title: "Network & Connect",
        description:
          "Meet fellow attendees and expand your professional network",
      },
      defaultStyling: {
        padding: "4rem 0",
        backgroundColor: "hsl(var(--muted)/0.3)",
      },
    },
  ];

  const categories = [
    { id: "layout", name: "Layout", icon: Layout },
    { id: "content", name: "Content", icon: Type },
    { id: "media", name: "Media", icon: Image },
    { id: "forms", name: "Forms", icon: Mail },
    { id: "integrations", name: "Integrations", icon: Users },
    { id: "advanced", name: "Advanced", icon: Grid3x3 },
    { id: "professional", name: "Professional", icon: Star },
  ];

  const getIcon = (iconName: string) => {
    const icons: Record<string, ElementType> = {
      Layout,
      Type,
      Image,
      Mail,
      Calendar,
      Users,
      CreditCard,
      MapPin,
      Clock,
      Star,
      Heart,
      Camera,
      Grid3x3,
      UserCheck,
      DollarSign,
      CalendarDays,
      Hash,
      MessageSquare,
      Award,
      Building,
      Play,
      Network,
    };
    const IconComponent = icons[iconName] || Type;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 font-semibold">Add Content Blocks</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Drag and drop blocks to build your website
        </p>
      </div>

      {categories.map((category) => {
        const blocks = contentBlocks.filter(
          (block) => block.category === category.id,
        );
        if (blocks.length === 0) return null;

        return (
          <div key={category.id}>
            <div className="mb-3 flex items-center gap-2">
              <category.icon className="text-muted-foreground h-4 w-4" />
              <h4 className="text-sm font-medium">{category.name}</h4>
            </div>

            <div className="space-y-2">
              {blocks.map((block) => (
                <Card
                  key={block.id}
                  className={`cursor-pointer border-2 border-dashed transition-shadow hover:border-solid hover:shadow-md ${
                    block.isPremium
                      ? "border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                      : ""
                  }`}
                  onClick={() => onAddSection(block.type, block.defaultContent)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-md p-2 ${
                          block.isPremium ? "bg-yellow-100" : "bg-muted"
                        }`}
                      >
                        {getIcon(block.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-medium">{block.name}</h5>
                          {block.isPremium && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-xs text-white">
                              <Star className="mr-1 h-3 w-3" />
                              Pro
                            </Badge>
                          )}
                        </div>
                        <Badge
                          variant="outline"
                          className="mt-1 text-xs"
                        >
                          {block.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      <div className="border-t pt-4">
        <p className="text-muted-foreground text-xs">
          💡 Tip: Click on any block to add it to your page. You can customize
          it after adding.
        </p>
      </div>
    </div>
  );
};
