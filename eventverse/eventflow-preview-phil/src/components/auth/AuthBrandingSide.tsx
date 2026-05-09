import { Calendar, Users, Star, Shield, Zap, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import eventCrowdImage from "@/assets/event-crowd-recording.jpg";

const testimonials = [
  {
    quote: "EventVerse transformed how we plan our company events. The ROI has been incredible!",
    author: "Sarah M.",
    role: "HR Director at TechCorp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah1"
  },
  {
    quote: "I've planned over 50 weddings with EventVerse. It's simply the best tool out there.",
    author: "Michael R.",
    role: "Wedding Planner",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael1"
  },
  {
    quote: "The seating chart feature alone saved me hours. Everything just works beautifully.",
    author: "Jessica L.",
    role: "Event Coordinator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica1"
  }
];

const AuthBrandingSide = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${eventCrowdImage})` }}
      >
        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-12">
        {/* Logo & Tagline */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">EventVerse</h1>
              <p className="text-white/80 text-sm">Where Moments Become Memories</p>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Create Unforgettable Events
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">
            Join thousands of event planners who trust EventVerse to bring their visions to life with powerful tools and intuitive design.
          </p>
        </div>



        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Shield className="w-4 h-4" />
            <span>SOC 2 Certified</span>
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Zap className="w-4 h-4" />
            <span>99.9% Uptime</span>
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Fast Growing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBrandingSide;
