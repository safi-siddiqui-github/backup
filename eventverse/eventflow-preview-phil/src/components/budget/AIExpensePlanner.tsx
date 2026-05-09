import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Sparkles, 
  Plus, 
  Target, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Users,
  MapPin,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Star,
  Heart,
  Eye,
  Settings,
  Gift
} from "lucide-react";
import { EVENT_TEMPLATES, MOCK_VENDORS } from "@/data/mockBudgetData";
import type { BudgetExpenseItem } from "./ComprehensiveBudgetModule";
import EditExpenseDialog from "./EditExpenseDialog";
import DeleteExpenseDialog from "./DeleteExpenseDialog";

interface AIExpensePlannerProps {
  eventType: string;
  eventSize: number;
  eventDate: Date;
  totalBudget: number;
  expenseItems: BudgetExpenseItem[];
  onAddExpenseItem: (item: Omit<BudgetExpenseItem, 'id'>) => void;
  onUpdateExpenseItem: (id: string, updates: Partial<BudgetExpenseItem>) => void;
  onDeleteExpenseItem: (id: string) => void;
  onTotalBudgetChange: (budget: number) => void;
}

interface AIRecommendation {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  estimatedCost: number;
  priority: 'essential' | 'guest_experience' | 'aesthetic' | 'operational' | 'enhanced';
  reasoning: string;
  percentageOfBudget: number;
  minGuestCount?: number;
  seasonal?: string[];
  conditionalOn?: string[];
  eventTypeSpecific?: string[];
}

const AIExpensePlanner = ({
  eventType,
  eventSize,
  eventDate,
  totalBudget,
  expenseItems,
  onAddExpenseItem,
  onUpdateExpenseItem,
  onDeleteExpenseItem,
  onTotalBudgetChange
}: AIExpensePlannerProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [allRecommendations, setAllRecommendations] = useState<AIRecommendation[]>([]);
  const [addedRecommendationIds, setAddedRecommendationIds] = useState<Set<string>>(new Set());
  const [selectedTemplate, setSelectedTemplate] = useState<string>(eventType.toLowerCase());
  const [customBudget, setCustomBudget] = useState(totalBudget.toString());
  const [eventLocation, setEventLocation] = useState("New York, NY");
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>("all");
  const [editingItem, setEditingItem] = useState<BudgetExpenseItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<BudgetExpenseItem | null>(null);
  const [customItem, setCustomItem] = useState({
    category: "",
    subcategory: "",
    title: "",
    description: "",
    estimatedCost: "",
    priority: "guest_experience" as 'essential' | 'guest_experience' | 'aesthetic' | 'operational' | 'enhanced',
    requirements: ""
  });

  // Load persisted state on component mount
  useEffect(() => {
    const savedIds = localStorage.getItem(`ai-recommendations-added-${eventType}-${eventSize}`);
    if (savedIds) {
      try {
        const parsedIds = JSON.parse(savedIds);
        setAddedRecommendationIds(new Set(parsedIds));
        console.log('Loaded persisted recommendation IDs:', parsedIds);
      } catch (error) {
        console.error('Error loading persisted recommendation IDs:', error);
      }
    }
  }, [eventType, eventSize]);

  // Persist state changes
  useEffect(() => {
    const idsArray = Array.from(addedRecommendationIds);
    localStorage.setItem(`ai-recommendations-added-${eventType}-${eventSize}`, JSON.stringify(idsArray));
    console.log('Persisted recommendation IDs:', idsArray);
  }, [addedRecommendationIds, eventType, eventSize]);

  // Enhanced recommendation database with 20+ recommendations
  const generateComprehensiveRecommendations = (): AIRecommendation[] => {
    const eventLower = selectedTemplate.toLowerCase();
    const season = getEventSeason(eventDate);
    const baseRecommendations: AIRecommendation[] = [];

    // Essential Requirements (Must-have items) - 6 items
    const essentialRecommendations = [
      {
        id: 'venue-main',
        category: "Venue",
        subcategory: "Main Event Space",
        title: `${eventType} Venue for ${eventSize} guests`,
        description: `Professional event space with capacity for ${eventSize} guests including necessary amenities`,
        estimatedCost: Math.round(totalBudget * 0.30),
        priority: 'essential' as const,
        reasoning: `Venue is the foundation of any event. This budget reflects premium venues in ${eventLocation} for ${eventSize} guests.`,
        percentageOfBudget: 30
      },
      {
        id: 'catering-main',
        category: "Catering",
        subcategory: "Full Service Catering",
        title: `Professional Catering for ${eventSize} guests`,
        description: `Complete catering service including appetizers, main course, dessert, and service staff`,
        estimatedCost: Math.round(totalBudget * 0.25),
        priority: 'essential' as const,
        reasoning: `Quality catering is essential for guest satisfaction. Budget reflects $${Math.round((totalBudget * 0.25) / eventSize)} per person for full service.`,
        percentageOfBudget: 25
      },
      {
        id: 'insurance-event',
        category: "Insurance",
        subcategory: "Event Insurance",
        title: "Event Liability Insurance",
        description: "Comprehensive event insurance covering liability, cancellation, and vendor issues",
        estimatedCost: Math.round(totalBudget * 0.02),
        priority: 'essential' as const,
        reasoning: "Event insurance protects against unexpected issues and is often required by venues.",
        percentageOfBudget: 2
      },
      {
        id: 'permits-licenses',
        category: "Legal",
        subcategory: "Permits & Licenses",
        title: "Event Permits and Licenses",
        description: "Required permits for music, alcohol service, and special events",
        estimatedCost: Math.round(totalBudget * 0.01),
        priority: 'essential' as const,
        reasoning: "Legal compliance is essential for event operation and avoiding penalties.",
        percentageOfBudget: 1
      },
      {
        id: 'restroom-facilities',
        category: "Facilities",
        subcategory: "Restroom Services",
        title: "Premium Restroom Facilities",
        description: "Clean, well-maintained restroom facilities with attendants",
        estimatedCost: Math.round(totalBudget * 0.03),
        priority: 'essential' as const,
        reasoning: "Quality restroom facilities are essential for guest comfort and event success.",
        percentageOfBudget: 3,
        minGuestCount: 50
      },
      {
        id: 'power-backup',
        category: "Equipment",
        subcategory: "Power & Utilities",
        title: "Backup Power Generator",
        description: "Backup power generator for outdoor or remote venues",
        estimatedCost: Math.round(totalBudget * 0.02),
        priority: 'essential' as const,
        reasoning: "Backup power ensures uninterrupted service for critical equipment.",
        percentageOfBudget: 2,
        minGuestCount: 75
      }
    ];

    // Guest Experience (High Impact) - 6 items
    const guestExperienceRecommendations = [
      {
        id: 'photography-main',
        category: "Photography",
        subcategory: "Event Photography",
        title: `Professional ${eventType} Photography`,
        description: "Full event photography coverage with professional editing and digital gallery",
        estimatedCost: Math.round(totalBudget * 0.10),
        priority: 'guest_experience' as const,
        reasoning: "Professional photography captures memories and provides lasting value for you and your guests.",
        percentageOfBudget: 10
      },
      {
        id: 'entertainment-main',
        category: "Entertainment",
        subcategory: eventType === "Wedding" ? "DJ & Music" : "Professional Entertainment",
        title: `${eventType} Entertainment`,
        description: "Professional entertainment including sound system, music, and MC services",
        estimatedCost: Math.round(totalBudget * 0.08),
        priority: 'guest_experience' as const,
        reasoning: "Quality entertainment keeps guests engaged and creates a memorable atmosphere.",
        percentageOfBudget: 8
      },
      {
        id: 'bar-service',
        category: "Bar Service",
        subcategory: "Full Bar",
        title: "Professional Bar Service",
        description: "Complete bar service with professional bartenders and premium selection",
        estimatedCost: Math.round(totalBudget * 0.08),
        priority: 'guest_experience' as const,
        reasoning: "Professional bar service enhances guest experience and ensures responsible service.",
        percentageOfBudget: 8,
        minGuestCount: 30
      },
      {
        id: 'welcome-reception',
        category: "Hospitality",
        subcategory: "Welcome Service",
        title: "Welcome Reception & Cocktail Hour",
        description: "Elegant welcome reception with cocktails and hors d'oeuvres",
        estimatedCost: Math.round(totalBudget * 0.06),
        priority: 'guest_experience' as const,
        reasoning: "A welcome reception sets the tone and helps guests mingle comfortably.",
        percentageOfBudget: 6
      },
      {
        id: 'guest-accommodation',
        category: "Hospitality",
        subcategory: "Guest Services",
        title: "Guest Accommodation Coordination",
        description: "Assistance with hotel bookings and accommodation arrangements for out-of-town guests",
        estimatedCost: Math.round(totalBudget * 0.03),
        priority: 'guest_experience' as const,
        reasoning: "Helping guests with accommodations shows thoughtfulness and improves attendance.",
        percentageOfBudget: 3,
        minGuestCount: 50
      },
      {
        id: 'dietary-accommodations',
        category: "Catering",
        subcategory: "Special Dietary",
        title: "Special Dietary Accommodations",
        description: "Specialized menu options for dietary restrictions and preferences",
        estimatedCost: Math.round(totalBudget * 0.04),
        priority: 'guest_experience' as const,
        reasoning: "Accommodating dietary needs ensures all guests can enjoy the meal.",
        percentageOfBudget: 4
      }
    ];

    // Aesthetic & Atmosphere - 5 items
    const aestheticRecommendations = [
      {
        id: 'florals-main',
        category: "Florals",
        subcategory: "Floral Design",
        title: `${eventType} Floral Arrangements`,
        description: "Professional floral design including centerpieces, ceremony flowers, and ambient arrangements",
        estimatedCost: Math.round(totalBudget * 0.07),
        priority: 'aesthetic' as const,
        reasoning: "Floral arrangements create ambiance and enhance the visual appeal of your event.",
        percentageOfBudget: 7
      },
      {
        id: 'lighting-ambient',
        category: "Lighting",
        subcategory: "Ambient Lighting",
        title: "Professional Event Lighting",
        description: "Ambient lighting design to create the perfect atmosphere",
        estimatedCost: Math.round(totalBudget * 0.04),
        priority: 'aesthetic' as const,
        reasoning: "Professional lighting transforms the venue and creates the desired mood.",
        percentageOfBudget: 4
      },
      {
        id: 'linens-decor',
        category: "Linens & Decor",
        subcategory: "Table Settings",
        title: "Premium Linens & Table Settings",
        description: "High-quality linens, place settings, and table decor",
        estimatedCost: Math.round(totalBudget * 0.03),
        priority: 'aesthetic' as const,
        reasoning: "Quality linens and table settings elevate the dining experience.",
        percentageOfBudget: 3
      },
      {
        id: 'ceiling-draping',
        category: "Decorations",
        subcategory: "Ceiling Treatment",
        title: "Ceiling Draping & Treatment",
        description: "Elegant ceiling draping and fabric treatments to transform the space",
        estimatedCost: Math.round(totalBudget * 0.04),
        priority: 'aesthetic' as const,
        reasoning: "Ceiling treatments create dramatic visual impact and soften harsh venue lighting.",
        percentageOfBudget: 4
      },
      {
        id: 'entrance-decor',
        category: "Decorations",
        subcategory: "Entrance Design",
        title: "Entrance Décor & Signage",
        description: "Professional entrance styling with welcome signage and decorative elements",
        estimatedCost: Math.round(totalBudget * 0.02),
        priority: 'aesthetic' as const,
        reasoning: "First impressions matter - entrance décor sets expectations for the entire event.",
        percentageOfBudget: 2
      }
    ];

    // Operational Support - 4 items
    const operationalRecommendations = [
      {
        id: 'coordinator-main',
        category: "Event Coordination",
        subcategory: "Day-of Coordination",
        title: "Professional Event Coordinator",
        description: "Experienced coordinator to manage vendors and timeline on event day",
        estimatedCost: Math.round(totalBudget * 0.06),
        priority: 'operational' as const,
        reasoning: "Professional coordination ensures smooth execution and allows you to enjoy your event.",
        percentageOfBudget: 6
      },
      {
        id: 'transportation-guest',
        category: "Transportation",
        subcategory: "Guest Transportation",
        title: "Guest Transportation Service",
        description: "Shuttle service or transportation coordination for guests",
        estimatedCost: Math.round(totalBudget * 0.04),
        priority: 'operational' as const,
        reasoning: "Guest transportation improves attendance and reduces parking concerns.",
        percentageOfBudget: 4,
        minGuestCount: 75
      },
      {
        id: 'security-event',
        category: "Security",
        subcategory: "Event Security",
        title: "Professional Security Service",
        description: "Professional security personnel for guest safety and crowd management",
        estimatedCost: Math.round(totalBudget * 0.03),
        priority: 'operational' as const,
        reasoning: "Security ensures guest safety and handles any issues discretely.",
        percentageOfBudget: 3,
        minGuestCount: 100
      },
      {
        id: 'vendor-coordination',
        category: "Coordination",
        subcategory: "Vendor Management",
        title: "Vendor Meal & Timeline Coordination",
        description: "Coordination of vendor meals, setup times, and service schedules",
        estimatedCost: Math.round(totalBudget * 0.02),
        priority: 'operational' as const,
        reasoning: "Proper vendor coordination prevents delays and ensures smooth service.",
        percentageOfBudget: 2
      }
    ];

    // Enhanced Touches - 6+ items
    const enhancedRecommendations = [
      {
        id: 'videography-main',
        category: "Videography",
        subcategory: "Event Videography",
        title: "Professional Event Videography",
        description: "Professional videography with highlight reel and full ceremony coverage",
        estimatedCost: Math.round(totalBudget * 0.07),
        priority: 'enhanced' as const,
        reasoning: "Videography captures the motion and emotion of your event in ways photos cannot.",
        percentageOfBudget: 7
      },
      {
        id: 'photo-booth',
        category: "Entertainment",
        subcategory: "Photo Booth",
        title: "Interactive Photo Booth",
        description: "Modern photo booth with props, instant prints, and digital sharing",
        estimatedCost: Math.round(totalBudget * 0.03),
        priority: 'enhanced' as const,
        reasoning: "Photo booths provide entertainment and create memorable keepsakes for guests.",
        percentageOfBudget: 3
      },
      {
        id: 'welcome-gifts',
        category: "Guest Gifts",
        subcategory: "Welcome Bags",
        title: "Guest Welcome Gifts",
        description: "Personalized welcome gifts or bags for all guests",
        estimatedCost: Math.round(totalBudget * 0.04),
        priority: 'enhanced' as const,
        reasoning: "Welcome gifts show appreciation and create a memorable first impression.",
        percentageOfBudget: 4
      },
      {
        id: 'specialty-station',
        category: "Catering",
        subcategory: "Specialty Station",
        title: "Interactive Food Station",
        description: "Specialty interactive food station (e.g., taco bar, dessert station, coffee bar)",
        estimatedCost: Math.round(totalBudget * 0.04),
        priority: 'enhanced' as const,
        reasoning: "Interactive food stations add entertainment value and dining variety.",
        percentageOfBudget: 4
      },
      {
        id: 'late-night-snacks',
        category: "Catering",
        subcategory: "Late Night Service",
        title: "Late-Night Snack Service",
        description: "Casual late-night snacks and comfort food for extended celebrations",
        estimatedCost: Math.round(totalBudget * 0.03),
        priority: 'enhanced' as const,
        reasoning: "Late-night snacks keep the energy up and extend the celebration.",
        percentageOfBudget: 3,
        minGuestCount: 50
      },
      {
        id: 'signature-cocktails',
        category: "Bar Service",
        subcategory: "Custom Cocktails",
        title: "Signature Cocktail Creation",
        description: "Custom signature cocktails designed specifically for your event",
        estimatedCost: Math.round(totalBudget * 0.02),
        priority: 'enhanced' as const,
        reasoning: "Signature cocktails add a personal touch and create talking points.",
        percentageOfBudget: 2
      },
      {
        id: 'ambient-scenting',
        category: "Atmosphere",
        subcategory: "Scent Design",
        title: "Professional Ambient Scenting",
        description: "Subtle, professional scenting to enhance the atmosphere",
        estimatedCost: Math.round(totalBudget * 0.01),
        priority: 'enhanced' as const,
        reasoning: "Ambient scenting creates a memorable sensory experience.",
        percentageOfBudget: 1
      }
    ];

    // Event-Type Specific Recommendations
    const eventSpecificRecommendations: AIRecommendation[] = [];
    
    if (eventLower === 'wedding') {
      eventSpecificRecommendations.push(
        {
          id: 'bridal-suite',
          category: "Bridal Services",
          subcategory: "Bridal Suite",
          title: "Bridal Suite Rental",
          description: "Private bridal suite for preparation and relaxation",
          estimatedCost: Math.round(totalBudget * 0.03),
          priority: 'enhanced' as const,
          reasoning: "A dedicated bridal suite provides privacy and convenience for wedding preparation.",
          percentageOfBudget: 3,
          eventTypeSpecific: ['wedding']
        },
        {
          id: 'ceremony-music',
          category: "Music",
          subcategory: "Ceremony Music",
          title: "Ceremony Musicians",
          description: "Live musicians for wedding ceremony (string quartet, pianist, etc.)",
          estimatedCost: Math.round(totalBudget * 0.04),
          priority: 'guest_experience' as const,
          reasoning: "Live ceremony music creates an elegant and emotional atmosphere.",
          percentageOfBudget: 4,
          eventTypeSpecific: ['wedding']
        },
        {
          id: 'wedding-cake',
          category: "Desserts",
          subcategory: "Wedding Cake",
          title: "Custom Wedding Cake",
          description: "Beautiful multi-tier wedding cake with custom design",
          estimatedCost: Math.round(totalBudget * 0.03),
          priority: 'essential' as const,
          reasoning: "The wedding cake is a traditional centerpiece and photo opportunity.",
          percentageOfBudget: 3,
          eventTypeSpecific: ['wedding']
        }
      );
    }

    if (eventLower === 'corporate') {
      eventSpecificRecommendations.push(
        {
          id: 'av-equipment',
          category: "Audio/Visual",
          subcategory: "AV Equipment",
          title: "Professional AV Equipment Package",
          description: "Complete AV setup with screens, projectors, microphones, and tech support",
          estimatedCost: Math.round(totalBudget * 0.08),
          priority: 'essential' as const,
          reasoning: "Professional AV equipment is crucial for corporate presentations and communication.",
          percentageOfBudget: 8,
          eventTypeSpecific: ['corporate']
        },
        {
          id: 'networking-areas',
          category: "Venue",
          subcategory: "Networking Space",
          title: "Dedicated Networking Areas",
          description: "Designated spaces for networking with comfortable seating and refreshments",
          estimatedCost: Math.round(totalBudget * 0.05),
          priority: 'guest_experience' as const,
          reasoning: "Networking opportunities are a key value proposition for corporate events.",
          percentageOfBudget: 5,
          eventTypeSpecific: ['corporate']
        },
        {
          id: 'branded-materials',
          category: "Marketing",
          subcategory: "Branded Materials",
          title: "Custom Branded Event Materials",
          description: "Branded signage, name badges, folders, and promotional materials",
          estimatedCost: Math.round(totalBudget * 0.03),
          priority: 'operational' as const,
          reasoning: "Branded materials reinforce company identity and professionalism.",
          percentageOfBudget: 3,
          eventTypeSpecific: ['corporate']
        }
      );
    }

    if (eventLower === 'birthday') {
      eventSpecificRecommendations.push(
        {
          id: 'themed-decorations',
          category: "Decorations",
          subcategory: "Theme Decorations",
          title: "Custom Themed Decorations",
          description: "Personalized decorations matching the birthday theme and style",
          estimatedCost: Math.round(totalBudget * 0.06),
          priority: 'aesthetic' as const,
          reasoning: "Themed decorations create a festive atmosphere and photo opportunities.",
          percentageOfBudget: 6,
          eventTypeSpecific: ['birthday']
        },
        {
          id: 'birthday-entertainment',
          category: "Entertainment",
          subcategory: "Special Entertainment",
          title: "Birthday-Themed Entertainment",
          description: "Age-appropriate entertainment such as magicians, face painters, or performers",
          estimatedCost: Math.round(totalBudget * 0.08),
          priority: 'guest_experience' as const,
          reasoning: "Special entertainment creates memorable moments and keeps guests engaged.",
          percentageOfBudget: 8,
          eventTypeSpecific: ['birthday']
        },
        {
          id: 'party-favors',
          category: "Guest Gifts",
          subcategory: "Party Favors",
          title: "Personalized Party Favors",
          description: "Custom party favors and take-home gifts for all guests",
          estimatedCost: Math.round(totalBudget * 0.04),
          priority: 'enhanced' as const,
          reasoning: "Party favors provide lasting memories of the celebration.",
          percentageOfBudget: 4,
          eventTypeSpecific: ['birthday']
        }
      );
    }

    // Combine all recommendations
    baseRecommendations.push(
      ...essentialRecommendations,
      ...guestExperienceRecommendations,
      ...aestheticRecommendations,
      ...operationalRecommendations,
      ...enhancedRecommendations,
      ...eventSpecificRecommendations
    );

    // Filter based on guest count and event type
    return baseRecommendations.filter(rec => {
      if (rec.minGuestCount && eventSize < rec.minGuestCount) return false;
      if (rec.eventTypeSpecific && !rec.eventTypeSpecific.includes(eventLower)) return false;
      return true;
    });
  };

  const getEventSeason = (date: Date): string => {
    const month = date.getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  };

  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case 'essential':
        return { 
          label: 'Essential Requirements', 
          icon: Star, 
          color: 'text-red-600', 
          bgColor: 'bg-red-50', 
          borderColor: 'border-red-200',
          description: 'Must-have items that are fundamental to your event'
        };
      case 'guest_experience':
        return { 
          label: 'Guest Experience', 
          icon: Heart, 
          color: 'text-pink-600', 
          bgColor: 'bg-pink-50', 
          borderColor: 'border-pink-200',
          description: 'High-impact items that significantly enhance guest satisfaction'
        };
      case 'aesthetic':
        return { 
          label: 'Aesthetic & Atmosphere', 
          icon: Eye, 
          color: 'text-purple-600', 
          bgColor: 'bg-purple-50', 
          borderColor: 'border-purple-200',
          description: 'Visual and sensory elements that create ambiance'
        };
      case 'operational':
        return { 
          label: 'Operational Support', 
          icon: Settings, 
          color: 'text-blue-600', 
          bgColor: 'bg-blue-50', 
          borderColor: 'border-blue-200',
          description: 'Behind-the-scenes services that ensure smooth execution'
        };
      case 'enhanced':
        return { 
          label: 'Enhanced Touches', 
          icon: Gift, 
          color: 'text-green-600', 
          bgColor: 'bg-green-50', 
          borderColor: 'border-green-200',
          description: 'Premium upgrades and special touches that make your event memorable'
        };
      default:
        return { 
          label: 'Other', 
          icon: Lightbulb, 
          color: 'text-gray-600', 
          bgColor: 'bg-gray-50', 
          borderColor: 'border-gray-200',
          description: 'Additional recommendations'
        };
    }
  };

  const generateAIRecommendations = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const recommendations = generateComprehensiveRecommendations();
      setAllRecommendations(recommendations);
      setIsGenerating(false);
      
      toast({
        title: "AI Recommendations Generated",
        description: `Generated ${recommendations.length} personalized recommendations for your ${eventType.toLowerCase()}.`,
      });
    }, 2000);
  };

  const addRecommendation = (recommendation: AIRecommendation) => {
    console.log('Adding recommendation:', recommendation.id);
    
    onAddExpenseItem({
      category: recommendation.category,
      subcategory: recommendation.subcategory,
      title: recommendation.title,
      description: recommendation.description,
      estimatedCost: recommendation.estimatedCost,
      allocatedBudget: Math.round(recommendation.estimatedCost * 1.1),
      actualCost: 0,
      priority: recommendation.priority === 'essential' ? 'high' : recommendation.priority === 'guest_experience' ? 'high' : 'medium',
      status: 'planning',
      aiSuggested: true,
      requirements: `Professional ${recommendation.category.toLowerCase()} service for ${eventSize} guests`,
      deadline: new Date(eventDate.getTime() - 30 * 24 * 60 * 60 * 1000)
    });

    // Mark this recommendation as added
    setAddedRecommendationIds(prev => {
      const newSet = new Set([...prev, recommendation.id]);
      console.log('Updated added recommendation IDs:', Array.from(newSet));
      return newSet;
    });

    // Show success message
    toast({
      title: "Recommendation Added",
      description: `${recommendation.title} has been added to your budget plan.`,
    });
  };

  const addCustomExpenseItem = () => {
    if (customItem.title && customItem.category && customItem.estimatedCost) {
      onAddExpenseItem({
        category: customItem.category,
        subcategory: customItem.subcategory || customItem.category,
        title: customItem.title,
        description: customItem.description,
        estimatedCost: parseFloat(customItem.estimatedCost),
        allocatedBudget: Math.round(parseFloat(customItem.estimatedCost) * 1.1),
        actualCost: 0,
        priority: customItem.priority === 'essential' || customItem.priority === 'guest_experience' ? 'high' : 'medium',
        status: 'planning',
        aiSuggested: false,
        requirements: customItem.requirements,
        deadline: new Date(eventDate.getTime() - 14 * 24 * 60 * 60 * 1000)
      });
      
      setCustomItem({
        category: "",
        subcategory: "",
        title: "",
        description: "",
        estimatedCost: "",
        priority: "guest_experience",
        requirements: ""
      });
    }
  };

  const handleEditExpenseItem = (item: BudgetExpenseItem) => {
    setEditingItem(item);
  };

  const handleDeleteExpenseItem = (item: BudgetExpenseItem) => {
    setDeletingItem(item);
  };

  const handleSaveEdit = (updates: Partial<BudgetExpenseItem>) => {
    if (editingItem) {
      onUpdateExpenseItem(editingItem.id, updates);
      setEditingItem(null);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingItem) {
      onDeleteExpenseItem(deletingItem.id);
      setDeletingItem(null);
    }
  };

  // Filter recommendations based on priority and availability
  const availableRecommendations = allRecommendations.filter(rec => {
    const isNotAdded = !addedRecommendationIds.has(rec.id);
    console.log(`Recommendation ${rec.id}: ${isNotAdded ? 'available' : 'already added'}`);
    return isNotAdded;
  });
  
  const filteredRecommendations = selectedPriorityFilter === 'all' 
    ? availableRecommendations 
    : availableRecommendations.filter(rec => rec.priority === selectedPriorityFilter);

  // Group recommendations by priority
  const groupedRecommendations = availableRecommendations.reduce((acc, rec) => {
    if (!acc[rec.priority]) acc[rec.priority] = [];
    acc[rec.priority].push(rec);
    return acc;
  }, {} as Record<string, AIRecommendation[]>);

  const totalAllocated = expenseItems.reduce((sum, item) => sum + item.allocatedBudget, 0);
  const budgetUtilization = totalBudget > 0 ? (totalAllocated / totalBudget) * 100 : 0;

  useEffect(() => {
    if (allRecommendations.length === 0) {
      generateAIRecommendations();
    }
  }, [selectedTemplate, totalBudget]);

  return (
    <div className="space-y-6">
      {/* AI Planning Header */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold">AI-Powered Expense Planning</div>
              <div className="text-sm font-normal text-gray-600">
                Intelligent budget recommendations based on your event details
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-white rounded-lg border">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold">{eventType}</div>
              <div className="text-sm text-gray-600">Event Type</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="font-semibold">{eventSize}</div>
              <div className="text-sm text-gray-600">Guests</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="font-semibold">${totalBudget.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Budget</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <MapPin className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <div className="font-semibold">{eventLocation}</div>
              <div className="text-sm text-gray-600">Location</div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Event Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="corporate">Corporate Event</SelectItem>
                <SelectItem value="birthday">Birthday Party</SelectItem>
              </SelectContent>
            </Select>
            
            <Input
              placeholder="Total Budget"
              value={customBudget}
              onChange={(e) => setCustomBudget(e.target.value)}
              onBlur={() => {
                const budget = parseFloat(customBudget);
                if (budget > 0) onTotalBudgetChange(budget);
              }}
              className="w-32"
            />
            
            <Button onClick={generateAIRecommendations} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Regenerate Plan
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Budget Allocation Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">${totalBudget.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Budget</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">${totalAllocated.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Allocated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ${(totalBudget - totalAllocated).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
          </div>
          <Progress value={budgetUtilization} className="h-3 mb-2" />
          <div className="text-center">
            <Badge variant={budgetUtilization > 100 ? "destructive" : "outline"}>
              {budgetUtilization.toFixed(1)}% Budget Used
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendations">
            AI Recommendations ({availableRecommendations.length} available)
          </TabsTrigger>
          <TabsTrigger value="current">Current Items ({expenseItems.length})</TabsTrigger>
          <TabsTrigger value="manual">Add Custom Item</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          {/* Priority Filter */}
          <div className="flex items-center gap-4 mb-6">
            <Label htmlFor="priority-filter">Filter by Category:</Label>
            <Select value={selectedPriorityFilter} onValueChange={setSelectedPriorityFilter}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="essential">Essential Requirements</SelectItem>
                <SelectItem value="guest_experience">Guest Experience</SelectItem>
                <SelectItem value="aesthetic">Aesthetic & Atmosphere</SelectItem>
                <SelectItem value="operational">Operational Support</SelectItem>
                <SelectItem value="enhanced">Enhanced Touches</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isGenerating ? (
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">AI is analyzing your event...</h3>
              <p className="text-gray-500">Creating personalized budget recommendations</p>
            </div>
          ) : selectedPriorityFilter === 'all' ? (
            // Show grouped recommendations
            <div className="space-y-8">
              {Object.entries(groupedRecommendations).map(([priority, recommendations]) => {
                const priorityInfo = getPriorityInfo(priority);
                const IconComponent = priorityInfo.icon;
                
                return (
                  <div key={priority} className="space-y-4">
                    <div className={`flex items-center gap-3 p-4 rounded-lg border-2 ${priorityInfo.bgColor} ${priorityInfo.borderColor}`}>
                      <IconComponent className={`w-6 h-6 ${priorityInfo.color}`} />
                      <div>
                        <h3 className={`text-lg font-semibold ${priorityInfo.color}`}>
                          {priorityInfo.label}
                        </h3>
                        <p className="text-sm text-gray-600">{priorityInfo.description}</p>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        {recommendations.length} items
                      </Badge>
                    </div>
                    
                    <div className="grid gap-4">
                      {recommendations.map((rec) => (
                        <Card key={rec.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                    {rec.category}
                                  </Badge>
                                  <Badge variant="outline" className="text-green-600">
                                    {rec.percentageOfBudget}% of budget
                                  </Badge>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{rec.title}</h3>
                                <p className="text-gray-600 mb-3">{rec.description}</p>
                                <div className="p-3 bg-blue-50 rounded-lg">
                                  <div className="flex items-start gap-2">
                                    <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                                    <div className="text-sm text-blue-800">
                                      <strong>AI Insight:</strong> {rec.reasoning}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-6 text-right">
                                <div className="text-2xl font-bold text-green-600 mb-2">
                                  ${rec.estimatedCost.toLocaleString()}
                                </div>
                                <Button onClick={() => addRecommendation(rec)}>
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add to Plan
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Show filtered recommendations
            <div className="space-y-4">
              {filteredRecommendations.map((rec) => (
                <Card key={rec.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {rec.category}
                          </Badge>
                          <Badge variant="outline" className="text-green-600">
                            {rec.percentageOfBudget}% of budget
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{rec.title}</h3>
                        <p className="text-gray-600 mb-3">{rec.description}</p>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                            <div className="text-sm text-blue-800">
                              <strong>AI Insight:</strong> {rec.reasoning}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-6 text-right">
                        <div className="text-2xl font-bold text-green-600 mb-2">
                          ${rec.estimatedCost.toLocaleString()}
                        </div>
                        <Button onClick={() => addRecommendation(rec)}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Plan
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredRecommendations.length === 0 && (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No recommendations available for this category</p>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="current" className="space-y-4">
          {expenseItems.length > 0 ? (
            <div className="space-y-4">
              {expenseItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'secondary' : 'outline'}>
                            {item.priority}
                          </Badge>
                          <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                            {item.status.replace('_', ' ')}
                          </Badge>
                          {item.aiSuggested && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              <Brain className="w-3 h-3 mr-1" />
                              AI Suggested
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        {item.requirements && (
                          <div className="text-sm text-gray-500 mb-2">
                            <strong>Requirements:</strong> {item.requirements}
                          </div>
                        )}
                        {item.deadline && (
                          <div className="text-sm text-orange-600">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Deadline: {item.deadline.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <div className="ml-6 text-right">
                        <div className="text-lg font-bold mb-1">
                          ${item.estimatedCost.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          Budget: ${item.allocatedBudget.toLocaleString()}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditExpenseItem(item)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteExpenseItem(item)}
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No expense items yet</h3>
              <p className="text-gray-500 mb-4">Start by adding AI recommendations or create custom items</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Custom Expense Item</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={customItem.category} onValueChange={(value) => setCustomItem({...customItem, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Venue">Venue</SelectItem>
                      <SelectItem value="Catering">Catering</SelectItem>
                      <SelectItem value="Photography">Photography</SelectItem>
                      <SelectItem value="Florals">Florals</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Audio/Visual">Audio/Visual</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Decorations">Decorations</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Input
                    id="subcategory"
                    value={customItem.subcategory}
                    onChange={(e) => setCustomItem({...customItem, subcategory: e.target.value})}
                    placeholder="e.g., Reception Hall"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={customItem.title}
                  onChange={(e) => setCustomItem({...customItem, title: e.target.value})}
                  placeholder="e.g., Wedding Reception Venue"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={customItem.description}
                  onChange={(e) => setCustomItem({...customItem, description: e.target.value})}
                  placeholder="Detailed description of the expense item"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="estimatedCost">Estimated Cost</Label>
                  <Input
                    id="estimatedCost"
                    type="number"
                    value={customItem.estimatedCost}
                    onChange={(e) => setCustomItem({...customItem, estimatedCost: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Category</Label>
                  <Select value={customItem.priority} onValueChange={(value: typeof customItem.priority) => setCustomItem({...customItem, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="essential">Essential Requirements</SelectItem>
                      <SelectItem value="guest_experience">Guest Experience</SelectItem>
                      <SelectItem value="aesthetic">Aesthetic & Atmosphere</SelectItem>
                      <SelectItem value="operational">Operational Support</SelectItem>
                      <SelectItem value="enhanced">Enhanced Touches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={customItem.requirements}
                  onChange={(e) => setCustomItem({...customItem, requirements: e.target.value})}
                  placeholder="Specific requirements for vendors"
                />
              </div>
              
              <Button onClick={addCustomExpenseItem} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Expense Item
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <EditExpenseDialog
        open={!!editingItem}
        onOpenChange={(open) => !open && setEditingItem(null)}
        onSave={handleSaveEdit}
        expenseItem={editingItem}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteExpenseDialog
        open={!!deletingItem}
        onOpenChange={(open) => !open && setDeletingItem(null)}
        onConfirm={handleConfirmDelete}
        expenseTitle={deletingItem?.title || ""}
      />
    </div>
  );
};

export default AIExpensePlanner;
