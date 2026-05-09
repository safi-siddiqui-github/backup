import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Calendar, CheckCircle, Users, Calendar as CalendarIcon, Target, ArrowRight, Star, Zap, Shield, Globe, Eye, Building, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import EventDashboard from "@/components/EventDashboard";
import AuthenticationModal from "@/components/AuthenticationModal";
import ProfileDropdown from "@/components/ProfileDropdown";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if there's an event in sessionStorage (from events page)
    const storedEvent = sessionStorage.getItem('currentEvent');
    if (storedEvent) {
      setCurrentEvent(JSON.parse(storedEvent));
      sessionStorage.removeItem('currentEvent'); // Clean up
    }
  }, []);

  const handleCreateEventClick = () => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      navigate('/create-event');
    }
  };

  const handleAuthenticated = (user) => {
    // User is now logged in, they can proceed with event creation
    navigate('/create-event');
  };

  const handleEditEvent = () => {
    navigate('/create-event', { state: { editingEvent: currentEvent } });
  };

  if (currentEvent) {
    return (
      <EventDashboard 
        event={currentEvent} 
        onBack={() => setCurrentEvent(null)}
        onEdit={handleEditEvent}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">EventFlow</h1>
              <p className="text-purple-100">Your all-in-one event management platform</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/public-events">
                <Button variant="outlineLight">
                  <Calendar className="w-4 h-4 mr-2" />
                  Discover Events
                </Button>
              </Link>
              <Button 
                onClick={handleCreateEventClick}
                variant="outlineLight"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isAuthenticated ? 'Create Event' : 'Get Started'}
              </Button>
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-white text-sm font-medium">Professional Event Management Made Simple</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            Create Unforgettable
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mt-2"> Events</span>
          </h1>
          
          <p className="text-xl text-purple-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            From intimate gatherings to large-scale conferences, EventFlow provides everything you need to plan, manage, and execute memorable events with ease.
          </p>

          <Button 
            onClick={handleCreateEventClick}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 px-10 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-2xl text-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            {isAuthenticated ? 'Start Planning Your Event' : 'Start Free - No Credit Card'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80 mt-12">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>10,000+ Event Planners</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-6">Everything You Need</h2>
          <p className="text-purple-100 text-xl max-w-2xl mx-auto">
            Powerful tools to streamline every aspect of event planning
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            { 
              icon: CalendarIcon, 
              title: "Smart Scheduling", 
              desc: "Multi-day planning with intelligent timeline management and automated notifications",
              free: true,
              gradient: "from-blue-500 to-cyan-500"
            },
            { 
              icon: Users, 
              title: "RSVP & Guest Management", 
              desc: "Organize guests into groups, track responses, and manage seating arrangements",
              free: true,
              gradient: "from-green-500 to-emerald-500"
            },
            { 
              icon: Target, 
              title: "Advanced Seating", 
              desc: "Visual table planning with drag-and-drop interface and guest preferences",
              premium: true,
              gradient: "from-purple-500 to-pink-500"
            },
            { 
              icon: CheckCircle, 
              title: "Digital Check-in", 
              desc: "QR code tickets, mobile check-in, and real-time attendance tracking",
              premium: true,
              gradient: "from-orange-500 to-red-500"
            },
            { 
              icon: Shield, 
              title: "Budget & Vendors", 
              desc: "Comprehensive cost tracking, vendor management, and payment processing",
              premium: true,
              gradient: "from-indigo-500 to-purple-500"
            },
            { 
              icon: Globe, 
              title: "Media & Sharing", 
              desc: "Photo albums with QR access, live feeds, and guest contribution features",
              premium: true,
              gradient: "from-teal-500 to-blue-500"
            }
          ].map((feature, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl from-white/10 to-white/5"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-xl mb-4">{feature.title}</h3>
                <p className="text-purple-100 leading-relaxed mb-6">{feature.desc}</p>
                <span className={`inline-block px-4 py-2 rounded-full text-xs font-medium ${
                  feature.free 
                    ? 'bg-green-500/20 text-green-200 border border-green-500/30' 
                    : 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-200 border border-yellow-500/30'
                }`}>
                  {feature.free ? 'Free Forever' : 'Premium'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-purple-100 text-lg mb-12">Get started in minutes with our intuitive three-step process</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create Your Event", desc: "Set up your event details, dates, and basic information in just a few clicks" },
              { step: "02", title: "Customize & Plan", desc: "Add guests, create schedules, manage budgets, and configure all your event features" },
              { step: "03", title: "Execute & Enjoy", desc: "Use our real-time tools during your event and collect memories afterward" }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-white/10 mb-4">{step.step}</div>
                <h3 className="text-white font-semibold text-xl mb-3">{step.title}</h3>
                <p className="text-purple-100 leading-relaxed">{step.desc}</p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-3xl p-16 border border-white/10">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Something Amazing?</h2>
          <p className="text-purple-100 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of event planners who trust EventFlow
          </p>
          
          <Button 
            onClick={handleCreateEventClick}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 px-10 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            {isAuthenticated ? 'Start Your Next Event' : 'Start Your Free Event'}
          </Button>
          
          <p className="text-white/60 text-sm mt-8">
            No credit card required • Free forever plan available
          </p>
        </div>
      </div>

      {/* Footer removed - simplify landing page */}
    </div>
  );
};

export default Index;
