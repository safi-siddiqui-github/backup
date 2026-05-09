import {
    Armchair,
    BarChart3,
    Calendar,
    Camera,
    CheckCircle,
    CheckSquare,
    Crown,
    DollarSign,
    FileText,
    Gamepad2,
    Info,
    LucideIcon,
    Megaphone,
    Star,
    Ticket,
    TrendingDown,
    Zap,
} from "lucide-react";
import { EventFormData } from "../../types/types";
 import { useState, useEffect, useRef } from "react";
 import {
     Card,
     CardContent,
     CardDescription,
     CardHeader,
     CardTitle,
 } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { Button } from "@/components/ui/button";
 import {  Circle  } from "lucide-react";
 import { cn } from "@/lib/utils";
 
// ---------------------------- TYPES ---------------------------- //
type ModuleCategory = {
    title: string;
    description: string;
    icon: typeof CheckCircle;
    modules: Module[];
};


type Module = {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
    features: string[];
    price: number;
    recommended?: boolean;
    popular?: boolean;
    premium?: boolean;
}

type ModuleCardProps ={
    module: Module;
    isSelected: boolean;
    isRecommended: boolean;
    onToggle: () => void;
}
type DynamicPricingDisplayProps = {
    selectedModules: string[];
    eventType: string;
    expectedAttendees: number;
}
type ModuleFeaturesSectionProps = {
    formData: EventFormData;
    onUpdate: (updates: Partial<EventFormData>) => void;
};
 // ---------------------------- DATA ---------------------------- //
const moduleCategories: Record<string, ModuleCategory> = {
    essential: {
        title: "Essential Modules",
        description: "Core functionality every event needs",
        icon: CheckCircle,
        modules: [
            {
                id: "schedules",
                name: "Event Schedule",
                description: "Timeline and agenda management",
                icon: Calendar,
                features: ["Custom timeline", "Session management", "Speaker profiles"],
                price: 0,
            },
            {
                id: "announcements",
                name: "Announcements",
                description: "Keep guests informed with updates",
                icon: Megaphone,
                features: [
                    "Real-time updates",
                    "Push notifications",
                    "Priority messaging",
                ],
                price: 0,
            },
            {
                id: "rsvp",
                name: "RSVP Management",
                description: "Guest responses and attendance tracking",
                icon: CheckSquare,
                features: [
                    "Response tracking",
                    "Dietary preferences",
                    "Plus-one management",
                ],
                price: 0,
            },
        ],
    },
    engagement: {
        title: "Guest Engagement",
        description: "Interactive features to enhance experience",
        icon: Zap,
        modules: [
            {
                id: "games",
                name: "Interactive Games",
                description: "Fun activities and competitions",
                icon: Gamepad2,
                features: ["Trivia games", "Photo contests", "Leaderboards"],
                price: 15,
            },
            {
                id: "survey",
                name: "Surveys & Feedback",
                description: "Collect guest opinions and feedback",
                icon: FileText,
                features: ["Custom surveys", "Real-time results", "Analytics"],
                price: 10,
            },
            {
                id: "media",
                name: "Photo & Media Sharing",
                description: "Collaborative photo galleries",
                icon: Camera,
                features: ["Shared albums", "Live photo feed", "QR code sharing"],
                price: 20,
            },
        ],
    },
    business: {
        title: "Business Features",
        description: "Professional event management tools",
        icon: Star,
        modules: [
            {
                id: "ticketing",
                name: "Ticketing System",
                description: "Sell tickets and manage registrations",
                icon: Ticket,
                features: [
                    "Multiple ticket types",
                    "Payment processing",
                    "Promo codes",
                ],
                price: 25,
            },
            {
                id: "seating",
                name: "Seating Management",
                description: "Table assignments and floor plans",
                icon: Armchair,
                features: [
                    "Visual seating charts",
                    "Auto-assignment",
                    "Guest preferences",
                ],
                price: 30,
            },
            {
                id: "budgeting",
                name: "Budget Planner",
                description: "Track expenses and manage costs",
                icon: DollarSign,
                features: ["Expense tracking", "Vendor management", "Budget analytics"],
                price: 20,
            },
        ],
    },
    analytics: {
        title: "Analytics & Insights",
        description: "Data-driven event optimization",
        icon: Crown,
        modules: [
            {
                id: "analytics",
                name: "Event Analytics",
                description: "Detailed insights and reporting",
                icon: BarChart3,
                features: [
                    "Attendance tracking",
                    "Engagement metrics",
                    "Custom reports",
                ],
                price: 35,
            },
        ],
    },
};


// ---------------------------- COMPONENT ---------------------------- //
export default function FeaturesSection   ({
    formData,
    onUpdate,
}: ModuleFeaturesSectionProps)  {
    const toggleModule = (moduleId: string) => {
        const isSelected = formData.selectedModules.includes(moduleId);
        const newModules = isSelected
            ? formData.selectedModules.filter((id) => id !== moduleId)
            : [...formData.selectedModules, moduleId];

        onUpdate({ selectedModules: newModules });
    };

    const getRecommendedModules = () => {
        const eventTypeModules: Record<string, string[]> = {
            Wedding: ["schedules", "rsvp", "media", "seating"],
            Corporate: ["schedules", "announcements", "analytics", "survey"],
            Birthday: ["rsvp", "media", "games"],
            Cultural: ["schedules", "media", "survey"],
            Charity: ["ticketing", "analytics", "budgeting"],
            Festival: ["ticketing", "schedules", "media", "analytics"],
            Business: ["rsvp", "survey", "analytics"],
            Personal: ["rsvp", "media", "games"],
            Workshop: ["schedules", "survey", "analytics"],
            Conference: ["schedules", "ticketing", "analytics", "survey"],
        };

        return (
            eventTypeModules[formData.eventType] || [
                "schedules",
                "rsvp",
                "announcements",
            ]
        );
    };

    const calculateTotalCost = () => {
        let total = 0;
        Object.values(moduleCategories).forEach((category) => {
            category.modules.forEach((module) => {
                if (formData.selectedModules.includes(module.id)) {
                    total += module.price;
                }
            });
        });
        return total;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">
                    {formData.selectedModules.length} modules selected
                </p>
                <div className="text-right">
                    <div className="text-foreground text-lg font-semibold">
                        ${calculateTotalCost()}{" "}
                        <span className="text-muted-foreground text-sm font-normal">
                            per month
                        </span>
                    </div>
                </div>
            </div>

            <DynamicPricingDisplay
                selectedModules={formData.selectedModules}
                eventType={formData.eventType}
                expectedAttendees={formData.expectedAttendees}
            />

            {Object.entries(moduleCategories).map(([categoryKey, category]) => {
                const CategoryIcon = category.icon;
                return (
                    <div key={categoryKey} className="space-y-4">
                        <div className="flex items-center gap-2">
                            <CategoryIcon className="text-primary h-4 w-4" />
                            <div>
                                <h3 className="text-base font-semibold">{category.title}</h3>
                                <p className="text-muted-foreground text-sm">
                                    {category.description}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {category.modules.map((module) => {
                                const isSelected = formData.selectedModules.includes(module.id);
                                const isRecommended = getRecommendedModules().includes(
                                    module.id,
                                );

                                return (
                                    <FeatureModuleCard
                                        key={module.id}
                                        module={module}
                                        isSelected={isSelected}
                                        isRecommended={false}
                                        onToggle={() => toggleModule(module.id)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
 
// ---------------------------- Feature Module Card ---------------------------- //
function FeatureModuleCard   ({
    module,
    isSelected,
    isRecommended,
    onToggle,
}: ModuleCardProps)   {
    const [isHovered, setIsHovered] = useState(false);
    const [showExpanded, setShowExpanded] = useState(false);
    const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        hoverTimerRef.current = setTimeout(() => {
            setShowExpanded(true);
        }, 2000);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current);
            hoverTimerRef.current = null;
        }
        setShowExpanded(false);
    };

    useEffect(() => {
        return () => {
            if (hoverTimerRef.current) {
                clearTimeout(hoverTimerRef.current);
            }
        };
    }, []);

    // Mock showcase images (would be from module data in production)
    const showcaseImages = [
        `https://placehold.co/300x160/6366f1/ffffff?text=${encodeURIComponent(module.name + " 1")}`,
        `https://placehold.co/300x160/8b5cf6/ffffff?text=${encodeURIComponent(module.name + " 2")}`,
    ];

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
        >
            <Card
                className={cn(
                    "cursor-pointer transition-all duration-300 relative h-full !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]",
                    showExpanded
                        ? "absolute z-50 shadow-2xl border-primary scale-105 min-h-[400px]"
                        : "hover:shadow-md min-h-[140px]",
                    isSelected
                        ? "border-primary bg-primary/5 dark:bg-primary/10"
                        : "border hover:border-primary/40",
                )}
                onClick={onToggle}
                style={showExpanded ? { width: "350px" } : undefined}
            >
                {/* Badges - Only show "For You" recommendation */}
                <div className="absolute top-2 right-2 flex gap-1 z-10">
                    {isRecommended && (
                        <Badge variant="secondary" className="text-xs">
                            Recommended
                        </Badge>
                    )}
                </div>

                <CardHeader className={cn("pb-3", showExpanded ? "p-4" : "p-4")}>
                    <div className="flex items-center gap-3">
                        <div
                            className={cn(
                                "p-2.5 rounded-lg bg-primary/8 transition-transform",
                                showExpanded && "scale-110",
                            )}
                        >
                            {module.icon && <module.icon className="w-5 h-5 text-primary" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <CardTitle
                                className={cn(
                                    showExpanded ? "text-base" : "text-sm leading-tight",
                                )}
                            >
                                {module.name}
                            </CardTitle>
                            {!showExpanded && (
                                <CardDescription className="text-xs mt-1 line-clamp-2">
                                    {module.description}
                                </CardDescription>
                            )}
                            {showExpanded && (
                                <CardDescription className="text-sm mt-1">
                                    {module.description}
                                </CardDescription>
                            )}
                        </div>
                        <div
                            className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                                isSelected
                                    ? "border-primary bg-primary"
                                    : "border-muted-foreground/30",
                            )}
                        >
                            {isSelected && (
                                <CheckCircle className="w-3 h-3 text-primary-foreground" />
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardContent
                    className={cn(
                        "pt-0",
                        showExpanded ? "p-4 space-y-3" : "p-4 space-y-2",
                    )}
                >
                    <div className="flex items-center justify-between">
                        <span
                            className={cn(
                                "font-semibold",
                                showExpanded ? "text-base" : "text-base",
                            )}
                        >
                            {module.price === 0 ? "Free" : `$${module.price} per month`}
                        </span>
                        {!showExpanded && (
                            <Button
                                variant={isSelected ? "default" : "outline"}
                                size="sm"
                                className="h-8 px-3 text-xs"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggle();
                                }}
                            >
                                {isSelected ? "Selected" : "Select"}
                            </Button>
                        )}
                    </div>

                    {/* Expanded Content */}
                    {showExpanded && (
                        <div className="space-y-3 animate-fade-in">
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm">Features:</h4>
                                <ul className="space-y-1">
                                    {module.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="text-sm text-muted-foreground flex items-start gap-2"
                                        >
                                            <Circle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Feature Showcase */}
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm">Preview:</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {showcaseImages.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-md border overflow-hidden bg-muted/30"
                                        >
                                            <img
                                                src={img}
                                                alt={`${module.name} showcase ${idx + 1}`}
                                                className="w-full h-24 object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                variant={isSelected ? "default" : "outline"}
                                className="w-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggle();
                                }}
                            >
                                {isSelected ? "Selected" : "Select module"}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};


// ---------------------------- Dynamic Pricing Display ---------------------------- //
function DynamicPricingDisplay  ({
    selectedModules,
    eventType,
    expectedAttendees,
}: DynamicPricingDisplayProps)   {
    const [pricing, setPricing] = useState({
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        savings: 0,
        bundleDiscount: 0,
    });

    useEffect(() => {
        calculateDynamicPricing();
    }, [selectedModules, eventType, expectedAttendees]);

    const calculateDynamicPricing = () => {
        const modulePrices: Record<string, number> = {
            schedules: 0,
            announcements: 0,
            rsvp: 0,
            seating: 30,
            ticketing: 25,
            budgeting: 20,
            media: 20,
            analytics: 35,
            games: 15,
            survey: 10,
        };

        let basePrice = selectedModules.reduce((sum, moduleId) => {
            return sum + (modulePrices[moduleId] || 0);
        }, 0);

        let discount = 0;
        let bundleDiscount = 0;

        // Bundle discounts
        const paidModules = selectedModules.filter((id) => modulePrices[id] > 0);

        if (paidModules.length >= 3) {
            bundleDiscount = 15; // 15% off for 3+ modules
        } else if (paidModules.length >= 2) {
            bundleDiscount = 10; // 10% off for 2+ modules
        }

        // Event type discounts
        if (eventType === "Charity") {
            discount += 20; // 20% discount for charity events
        }

        // Volume discounts
        if (expectedAttendees > 200) {
            discount += 15;
        } else if (expectedAttendees > 100) {
            discount += 10;
        } else if (expectedAttendees > 50) {
            discount += 5;
        }

        const totalDiscount = Math.min(discount + bundleDiscount, 50); // Max 50% discount
        const finalPrice = basePrice * (1 - totalDiscount / 100);
        const savings = basePrice - finalPrice;

        setPricing({
            basePrice,
            discount: totalDiscount,
            finalPrice,
            savings,
            bundleDiscount,
        });
    };

    if (pricing.basePrice === 0) {
        return (
            <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-800">
                            100% Free Setup!
                        </span>
                    </div>
                    <p className="mt-1 text-sm text-green-700">
                        Your selected modules are completely free. Upgrade anytime for
                        advanced features.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-purple-200 bg-linear-to-r from-purple-50 to-blue-50">
            <CardContent className="space-y-3 p-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Smart Pricing</h3>
                    <Badge className="bg-purple-100 text-purple-700">
                        <Zap className="mr-1 h-3 w-3" />
                        AI Optimized
                    </Badge>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Base Price</span>
                        <span
                            className={cn(
                                pricing.discount > 0
                                    ? "text-gray-500 line-through"
                                    : "font-semibold",
                            )}
                        >
                            ${pricing.basePrice}/month
                        </span>
                    </div>

                    {pricing.bundleDiscount > 0 && (
                        <div className="flex justify-between text-sm text-blue-600">
                            <span>Bundle Discount</span>
                            <span>-{pricing.bundleDiscount}%</span>
                        </div>
                    )}

                    {pricing.discount - pricing.bundleDiscount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                            <span>Smart Discounts</span>
                            <span>-{pricing.discount - pricing.bundleDiscount}%</span>
                        </div>
                    )}

                    {pricing.savings > 0 && (
                        <div className="border-t pt-2">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-800">Final Price</span>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-purple-600">
                                        ${pricing.finalPrice.toFixed(2)}/month
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-green-600">
                                        <TrendingDown className="h-3 w-3" />
                                        Save ${pricing.savings.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-blue-25 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                        <Info className="mt-0.5 h-4 w-4 text-blue-600" />
                        <div className="text-sm text-blue-800">
                            <p className="font-medium">Why this price?</p>
                            <ul className="mt-1 space-y-1 text-xs text-blue-700">
                                {pricing.bundleDiscount > 0 && (
                                    <li>• {pricing.bundleDiscount}% bundle discount applied</li>
                                )}
                                {eventType === "Charity" && (
                                    <li>• 20% charity event discount</li>
                                )}
                                {expectedAttendees > 50 && (
                                    <li>• Volume discount for {expectedAttendees}+ attendees</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
 

 
