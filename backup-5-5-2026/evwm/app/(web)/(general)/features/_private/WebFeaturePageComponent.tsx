"use client";
import { X } from "lucide-react";
import {  useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Shield,  } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { 
  Users, 
  Calculator, 
  Grid3X3, 
  Ticket, 
  Image, 
  Calendar, 
  Bell, 
  BarChart3, 
  Gamepad2, 
  MessageSquare, 
  Globe, 
  Plane, 
  Megaphone 
} from "lucide-react";
import { Play,   CheckCircle2 } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/lib-shadcn";
type Feature = {  
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  color: string;
};
const featuresData : Feature[] = [
  {
    id: "rsvp",
    title: "RSVP Management",
    description: "Streamline your guest management with intelligent RSVP tracking. Manage groups, plus-ones, and dietary preferences all in one place with real-time analytics and automated reminders.",
    icon: Users,
    features: [
      "Smart guest list management with groups",
      "Automated RSVP reminders and follow-ups",
      "Dietary and accessibility tracking",
      "Real-time attendance analytics"
    ],
    color: "#ff6a1a"
  },
  {
    id: "budget",
    title: "Budget Planning",
    description: "Take control of your event finances with comprehensive budget planning tools. Track expenses, manage vendors, and ensure you stay within budget with smart forecasting.",
    icon: Calculator,
    features: [
      "Customizable budget categories",
      "Vendor payment tracking",
      "Expense forecasting and alerts",
      "Financial reporting and exports"
    ],
    color: "#ff6a1a"
  },
  {
    id: "seating",
    title: "Seating Arrangements",
    description: "Create perfect seating arrangements with our intuitive visual editor. Drag-and-drop guests, manage table layouts, and ensure optimal guest experiences.",
    icon: Grid3X3,
    features: [
      "Drag-and-drop visual editor",
      "Multiple table layout templates",
      "Guest relationship management",
      "Print-ready seating charts"
    ],
    color: "#ff6a1a"
  },
  {
    id: "ticketing",
    title: "Ticketing System",
    description: "Sell tickets seamlessly with flexible pricing tiers, promo codes, and integrated check-in. Perfect for conferences, galas, and large-scale events.",
    icon: Ticket,
    features: [
      "Multiple ticket types and pricing",
      "Promo codes and early bird discounts",
      "QR code check-in system",
      "Sales analytics dashboard"
    ],
    color: "#ff6a1a"
  },
  {
    id: "media",
    title: "Media Management",
    description: "Capture and share event memories with powerful media management. Create galleries, enable guest uploads, and organize photos and videos effortlessly.",
    icon: Image,
    features: [
      "Unlimited photo galleries",
      "Guest upload portals",
      "AI-powered photo tagging",
      "Social media integration"
    ],
    color: "#ff6a1a"
  },
  {
    id: "schedule",
    title: "Schedule & Timeline",
    description: "Keep your event on track with detailed scheduling tools. Create timelines, assign tasks, and coordinate with vendors and staff seamlessly.",
    icon: Calendar,
    features: [
      "Interactive timeline builder",
      "Task assignment and tracking",
      "Vendor coordination tools",
      "Mobile schedule access"
    ],
    color: "#ff6a1a"
  },
  {
    id: "announcements",
    title: "Announcements",
    description: "Keep guests informed with real-time announcements and updates. Schedule notifications, send emergency alerts, and ensure everyone stays in the loop.",
    icon: Bell,
    features: [
      "Push notifications to guests",
      "Scheduled announcements",
      "Emergency broadcast system",
      "Multi-channel delivery"
    ],
    color: "#ff6a1a"
  },
  {
    id: "analytics",
    title: "Analytics & Reporting",
    description: "Make data-driven decisions with comprehensive analytics. Track engagement, measure success, and generate insights that improve future events.",
    icon: BarChart3,
    features: [
      "Real-time event dashboards",
      "Guest behavior analytics",
      "ROI tracking and reporting",
      "Custom report builder"
    ],
    color: "#ff6a1a"
  },
  {
    id: "games",
    title: "Games & Activities",
    description: "Boost guest engagement with interactive games and activities. From trivia to scavenger hunts, create memorable experiences that bring people together.",
    icon: Gamepad2,
    features: [
      "Ready-made game templates",
      "Custom activity creation",
      "Live leaderboards",
      "Prize management"
    ],
    color: "#ff6a1a"
  },
  {
    id: "survey",
    title: "Survey & Feedback",
    description: "Gather valuable insights with smart surveys and feedback forms. Understand guest satisfaction and continuously improve your events.",
    icon: MessageSquare,
    features: [
      "Customizable survey builder",
      "Real-time response tracking",
      "Sentiment analysis",
      "Automated follow-up emails"
    ],
    color: "#ff6a1a"
  },
  {
    id: "websites",
    title: "Event Websites",
    description: "Create stunning event websites with our drag-and-drop builder. Choose from beautiful templates, customize everything, and connect your own domain.",
    icon: Globe,
    features: [
      "Professional templates",
      "Drag-and-drop editor",
      "Custom domain support",
      "Mobile-responsive design"
    ],
    color: "#ff6a1a"
  },
  {
    id: "travel",
    title: "Travel & Accommodation",
    description: "Simplify guest travel with comprehensive booking tools. Help attendees find hotels, flights, and local experiences all in one place.",
    icon: Plane,
    features: [
      "Hotel block reservations",
      "Flight search integration",
      "Local activity recommendations",
      "Group transportation"
    ],
    color: "#ff6a1a"
  },
  {
    id: "marketing",
    title: "Marketing & Campaigns",
    description: "Drive attendance with powerful marketing tools. Create targeted campaigns, segment your audience, and track performance across all channels.",
    icon: Megaphone,
    features: [
      "Email campaign builder",
      "Social media integration",
      "Audience segmentation",
      "Performance analytics"
    ],
    color: "#ff6a1a"
  },
];


const Features = () => {
  const [activeFeatureId] = useState<string | undefined>();
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const handleLearnMore = (featureId: string) => {
    const feature = featuresData.find(f => f.id === featureId);
    setSelectedFeature(feature || null);
  };

  return (
      <main className="min-h-screen bg-white dark:bg-transparent"> 
      <FeatureHero />
      <FeatureShowcase activeFeatureId={activeFeatureId} onLearnMore={handleLearnMore} />
      <FeatureCTA />
      <FeatureModal
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        feature={selectedFeature}
      />
    </main>
  );
};

export default Features;
//

const FeatureHero = () => {
  const floatingIcons = [
    { Icon: Zap, delay: 0, x: "left-[10%] top-[20%]" },
    { Icon: Shield, delay: 0.5, x: "left-[85%] top-[25%]" },
    { Icon: Globe, delay: 1, x: "left-[15%] top-[70%]" },
  ];

  return (
    <section className={cn("relative min-h-[70vh] py-5 flex items-center justify-center overflow-hidden bg-[#181c2a]")}> 
      {/* Mesh Gradient Background */}
      <div className={cn("absolute inset-0")}> 
        <div className={cn("absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,#ff6a1a4d,transparent)]")}/>
        <div className={cn("absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_100%,#ffb36626,transparent)]")}/>
      </div>

      {/* Animated Grid */}
      <div className={cn("absolute inset-0 opacity-[0.03]")}> 
        <div className={cn("absolute inset-0 bg-[linear-gradient(#f5f7fa_1px,transparent_1px),linear-gradient(90deg,#f5f7fa_1px,transparent_1px)] bg-size-[60px_60px]")}/>
      </div>
      
      {/* Floating Gradient Orbs */}
      <div 
        className={cn("absolute top-1/4 left-1/4 w-lg h-128 rounded-full blur-[120px] opacity-40 bg-linear-to-tr from-[#181c2a] to-[#ff6a1a]")}
      />
      <div 
        className={cn("absolute bottom-1/4 right-1/4 w-100 h-100 rounded-full blur-[100px] opacity-25 bg-linear-to-br from-[#ff6a1a] to-[#181c2a]")}
      />

      {/* Floating Icons (Animated) */}
      {floatingIcons.map(({ Icon, x, delay }, i) => (
        <motion.div
          key={i}
          className={cn("absolute hidden lg:flex", x)}
          initial={{ y: 0, scale: 1, opacity: 0.85 }}
          animate={{
            y: [0, -20, 0, 20, 0],
            scale: [1, 1.08, 1],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 7 + i,
            repeat: Infinity,
            repeatType: "loop",
            delay: delay || 0,
            ease: "easeInOut",
          }}
        >
          <div
            className={cn("w-16 h-16 rounded-2xl bg-[#e5e9f0] backdrop-blur-sm border border-[#e5e9f0] flex items-center justify-center")}
          >
            <Icon className="w-8 h-8 text-[#7b809a]" />
          </div>
        </motion.div>
      ))}

      <div className={cn("container relative z-10 px-6")}> 
        <div className={cn("max-w-5xl mx-auto text-center")}> 
          {/* Badge */}
          <div className={cn("inline-flex flex-wrap items-center justify-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-[#7c3aed] shadow-lg shadow-[#a78bfa80] mb-10 text-center")}> 
            <Sparkles className="w-4 h-4 text-[#7c3aed]" />
            <span className="text-sm font-medium">Complete Event Management Suite</span>
            <span className={cn("px-2 py-0.5 rounded-full bg-[#a78bfa] text-white mt-2 sm:mt-0")}>13 Modules</span>
          </div>

          {/* Headline */}
          <h1 className={cn("font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight drop-shadow-[0_2px_24px_#a78bfa]")}> 
            Craft{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#ff6a1a]">Extraordinary</span>
              <span className={cn("absolute -bottom-2 left-0 right-0 h-4 bg-[#a78bfa] rounded-full z-0 blur-sm")}/>
            </span>
            <br />
            <span className={cn("text-white/80")}>Events</span>
          </h1>

          {/* Subheadline */}
          <p className={cn("text-xl md:text-2xl lg:text-3xl mb-14 max-w-3xl mx-auto leading-relaxed font-light text-white/80")}> 
            From guest management to analytics, our premium suite transforms how you plan, execute, and measure event success.
          </p>

          {/* CTA Buttons */}
          <div className={cn("flex flex-wrap items-center justify-center gap-5")}> 
            <button className={cn("px-10 py-5 font-semibold rounded-2xl text-lg bg-[#7c3aed] text-white shadow-lg shadow-[#a78bfa] hover:bg-[#a78bfa] hover:text-[#4f378b]")}> 
              Start Free Trial
            </button>
            <button className={cn("px-10 py-5 font-semibold rounded-2xl text-lg border-2 border-[#a78bfa] text-white bg-[#a78bfa] hover:bg-white hover:text-[#7c3aed]")}> 
              Watch Demo
            </button>
          </div>

          {/* Trust Badges */}
          <div className={cn("mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-[#7b809a]")}> 
            <span className={cn("flex items-center gap-2")}> <Shield className="w-4 h-4" /> Enterprise Security </span>
            <span className={cn("flex items-center gap-2")}> <Zap className="w-4 h-4" /> 99.9% Uptime </span>
            <span className={cn("flex items-center gap-2")}> <Globe className="w-4 h-4" /> Used Worldwide </span>
          </div>
        </div>

        {/* Scroll Indicator (Animated) */}
        <div className={cn("absolute bottom-12 left-1/2 -translate-x-1/2")}> 
          <div className={cn("flex flex-col items-center gap-3 text-[#7b809a]")}> 
            {/* <span className="text-sm font-medium">Explore Features</span> */}
            <div className={cn("w-6 h-10 rounded-full flex flex-col items-center justify-start p-2 border-2 border-[#e5e9f0] relative overflow-visible")}> 
              {/* Animated bouncing dot */}
              <motion.div
                className={cn("w-1.5 h-1.5 rounded-full bg-[#ff6a1a]")}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Animated arrow icon below dot */}
              <motion.div
                className={cn("absolute left-1/2 -translate-x-1/2 bottom-0 mt-2")}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: [0, 8, 16] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 4V12M8 12L4 8M8 12L12 8" stroke="#ff6a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
//

const FeatureCTA = () => {
  return (
    <section className={cn("relative py-32 overflow-hidden flex items-center justify-center")}> 
      {/* Background */}
      <div className={cn("absolute inset-0 bg-[#181c2a]")} />
      {/* Gradient Overlay */}
      <div className={cn("absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_center,#ff6a1a4d_0%,transparent_70%)]")}/>
      {/* Pattern */}
      <div className={cn("absolute inset-0 opacity-10")}> 
        <div className={cn("absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#f5f7fa_1px,transparent_0)] bg-size-[32px_32px]")}/>
      </div>
      <div className={cn("container relative z-10 px-6 flex items-center justify-center")}> 
        <div className={cn("max-w-3xl w-full text-center mx-auto")}> 
          <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-white text-[#7c3aed] shadow-lg shadow-[#a78bfa80]")}> 
            <Sparkles className="w-4 h-4 text-[#7c3aed]" />
            <span className="text-sm font-medium">Start Creating Today</span>
          </div>
          <h2 className={cn("font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-[0_2px_24px_#a78bfa]")}> 
            Ready to Create
            <br />
            <span className={cn("text-[#ff6a1a] drop-shadow-[0_2px_24px_#7c3aed]")}>Unforgettable Events?</span>
          </h2>
          <p className={cn("text-xl mb-10 max-w-xl mx-auto text-white/80")}> 
            Join thousands of event planners who trust our platform to bring their visions to life.
          </p>
          <div className={cn("flex flex-wrap items-center justify-center gap-4")}> 
            <button className={cn("inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-all duration-300 bg-[#7c3aed] text-white shadow-lg shadow-[#a78bfa] hover:bg-[#a78bfa] hover:text-[#4f378b]")}> 
              Create Your Next Event
              <ArrowRight className="w-5 h-5 text-white drop-shadow-[0_2px_12px_#a78bfa]" />
            </button>
            <button className={cn("px-8 py-4 font-semibold rounded-full transition-all duration-300 border border-[#a78bfa] text-white bg-[#a78bfa] hover:bg-white hover:text-[#7c3aed]")}> 
              Schedule Demo
            </button>
          </div>
          <p className={cn("mt-8 text-sm text-white/60")}> 
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};
 

const FeatureShowcase = ({ onLearnMore }: {
  activeFeatureId: string | undefined;
  onLearnMore?: (featureId: string) => void;
}) => {
  return (
      <section> 
      <div className={ "container px-6 mx-auto"}> 
        {featuresData.map((feature, index) => (
          <div
            key={feature.id}
            id={`feature-${feature.id}`}
            className={cn(
              "w-full flex justify-center",
              index !== featuresData.length - 1 && "border-b border-[#e5e9f0]"
            )}
          >
            <div className={cn("w-full max-w-300")}> 
              <FeatureCard
                feature={feature}
                index={index}
                reversed={index % 2 !== 0}
                onLearnMore={onLearnMore}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
//

 
const FeatureCard = ({ 
 feature ,
  onLearnMore,
  index,
  reversed
}: {
  feature: Feature;
  onLearnMore?: (featureId: string) => void;
  index: number;
  reversed?: boolean;
}) => {
  const { id, title, description, icon: Icon, features } = feature;
  const isEven = index % 2 === 0;
  const shouldReverse = reversed || !isEven;

  return (
    <div
      className={cn(
        "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20",
        shouldReverse && "lg:flex-row-reverse"
      )}
    >
      {/* Content */}

      <div className={cn("space-y-6", shouldReverse && "lg:order-2")}> 
        {/* Colorful accent for Travel & Accommodation in dark mode */}
     
            <div className="inline-flex items-center justify-center bg-[#ede9fe] rounded-xl w-14 h-14 dark:bg-[#7c3aed]/20"> 
              <Icon className="w-7 h-7 text-[#7c3aed] dark:text-white"/>
            </div>
            <h3 className="font-display font-bold text-2xl lg:text-4xl leading-tight text-[#4f378b] dark:text-purple-800"> 
              {title}
            </h3>
            <p className="text-base md:text-lg text-purple-500 dark:text-[#c4b5fd] leading-relaxed"> 
              {description}
            </p>
            <ul className="list-none p-0 m-0 space-y-2"> 
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-[#4f378b] dark:text-[#c4b5fd] text-base"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#7c3aed] dark:text-[#a78bfa] shrink-0"/>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className="inline-flex items-center gap-2 text-[#7c3aed] dark:text-[#a78bfa] font-semibold text-base bg-transparent border-none cursor-pointer transition-all duration-300 hover:gap-3 focus:outline-none"
              onClick={() => onLearnMore && onLearnMore(id)}
            >
              Learn more <ArrowRight className="w-5 h-5 text-[#a78bfa] dark:text-[#c4b5fd]"/>
            </button>
           
       
      </div>

      {/* Video/Demo Area */}
      <div className={cn("relative", shouldReverse && "lg:order-1")}> 
        <div
          className={cn(
            "aspect-video group cursor-pointer bg-linear-to-b from-white to-[#ede9fe] rounded-xl overflow-hidden relative shadow-2xl"
          )}
        >
          {/* Gradient Background */}
          <div className={cn("absolute inset-0 bg-linear-to-br from-[#ede9fe] to-[#a78bfa] opacity-70")}/>
          {/* Grid Pattern */}
          <div className={cn("absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,#4f378b1a_1px,transparent_0)] bg-size-[24px_24px]")}/>
          {/* Play Button */}
          <div className={cn("absolute inset-0 flex items-center justify-center")}> 
            <div className={cn("flex items-center justify-center w-20 h-20 rounded-full bg-[#7c3aed] shadow-lg shadow-[#a78bfa66] ml-1")}> 
              <Play className={cn("w-8 h-8 text-white")}/>
            </div>
          </div>
          {/* Feature Label */}
          <div className={cn("absolute bottom-4 left-4")}> 
            <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#ede9fe] text-[#7c3aed]")}>{title} Demo</span>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className={cn("absolute -top-4 -right-4 w-24 h-24 rounded-2xl -z-10 bg-[#b194d1]")}/>
        <div className={cn("absolute -bottom-4 -left-4 w-32 h-32 rounded-2xl -z-10 bg-[#7243ff]")}/>
      </div>
    </div>
  );
};


const Modal = ({ isOpen, onClose, children }: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn"
      )}
    >
      <div
        className={cn("absolute inset-0 cursor-pointer")}
        onClick={onClose}
      />
      <div className={cn("relative z-10 w-full max-w-3xl mx-auto")}> 
        {children}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.2s; }
      `}</style>
    </div>
  );
};

const FeatureModal = ({ isOpen, onClose, feature }: {
  isOpen: boolean;
  onClose: () => void;
  feature: Feature | null;
}) => {
  if (!feature) return null;
  const Icon = feature.icon;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn("relative bg-card rounded-3xl overflow-hidden shadow-2xl w-full max-h-175 flex flex-col justify-center")}
      >
        {/* Animated Background */}
        <div className={cn("absolute inset-0 overflow-hidden")}> 
          <motion.div
            className={cn("absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-20")}
            style={{ background: `#ff6a1a` }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className={cn("absolute -bottom-1/2 -left-1/2 w-3/4 h-3/4 rounded-full blur-3xl opacity-10")}
            style={{ background: `#232946` }}
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className={cn("absolute top-6 right-6 z-50 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors bg-[#f5f7faCC] border border-[#e5e9f0]")}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className={cn("w-5 h-5 text-[#232946]")} />
        </motion.button>

        <div className={cn("relative z-10 grid lg:grid-cols-2 min-h-125")}>
          {/* Left: Visual Demo Area */}
          <div className={cn("relative flex flex-col justify-center items-center bg-[linear-gradient(135deg,#232946_0%,#232946cc_80%)] px-8")}> 
            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={cn("absolute w-2 h-2 rounded-full bg-orange-400/40")}
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${10 + i * 15}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* Icon Display */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="relative"
            >
              <div className={cn("w-32 h-32 rounded-3xl flex items-center justify-center border bg-[#fff3ed] border-orange-200")}> 
                <Icon className={cn("w-16 h-16 text-orange-500")} />
              </div>
              <motion.div
                className={cn("absolute -inset-4 rounded-3xl border-2 border-orange-200/20")}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Demo Video Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 w-full max-w-xs"
            >
              <div className={cn("relative aspect-video rounded-2xl overflow-hidden group cursor-pointer bg-[#f5f7fa] border border-[#e5e9f0]")}> 
                <div className={cn("absolute inset-0 flex items-center justify-center")}> 
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={cn("w-14 h-14 rounded-full flex items-center justify-center bg-orange-500 shadow-lg shadow-orange-200/40 ml-0.5")}
                  >
                    <Play className={cn("w-6 h-6 text-white")}/>
                  </motion.div>
                </div>
                <div className={cn("absolute bottom-3 left-3")}> 
                  <span className={cn("text-xs font-medium text-[#7b809a]")}>Watch Demo</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className={cn("p-8 lg:p-10 flex flex-col justify-center")}> 
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={cn("inline-flex items-center gap-2 mb-4")}
            >
              <Sparkles className={cn("w-4 h-4 text-orange-500")} />
              <span className={cn("text-sm font-medium text-orange-500")}>Premium Feature</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={cn("font-display text-3xl lg:text-4xl font-bold mb-4 text-[#232946]")}
            >
              {feature.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={cn("text-lg leading-relaxed mb-8 text-[#7b809a]")}
            >
              {feature.description}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={cn("space-y-4 mb-8")}
            >
              {feature.features.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={cn("flex items-start gap-3")}
                >
                  <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-orange-400/10")}> 
                    <CheckCircle2 className={cn("w-4 h-4 text-orange-500")} />
                  </div>
                  <span className={cn("text-[#232946]")}>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className={cn("flex flex-wrap gap-4")}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn("px-6 py-3 font-semibold rounded-xl inline-flex items-center gap-2 bg-orange-500 text-white shadow-lg shadow-orange-200/40")}
              >
                Create Your Next Event

                <ArrowRight className={cn("w-4 h-4")}/>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};

