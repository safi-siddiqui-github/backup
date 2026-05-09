"use client";

import AuthenticationModal from "@/components/AuthenticationModal";
import EventDashboard from "@/components/EventDashboard";
import ProfileDropdown from "@/components/ProfileDropdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Routes } from "@/lib/routes";
// import { useAuth } from "@/hooks/useAuth";
import {
  ArrowRight,
  Building,
  Calendar,
  CalendarIcon,
  CheckCircle,
  Eye,
  Globe,
  Plus,
  Shield,
  Star,
  Target,
  User,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  // const navigate = useNavigate();
  const navigate = () => {};
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const fake = { user: null, isAuthenticated: null };
  const { user, isAuthenticated } = fake;

  useEffect(() => {
    // Check if there's an event in sessionStorage (from events page)
    const storedEvent = sessionStorage.getItem("currentEvent");
    if (storedEvent) {
      setCurrentEvent(JSON.parse(storedEvent));
      sessionStorage.removeItem("currentEvent"); // Clean up
    }
  }, []);

  const handleCreateEventClick = () => {
    if (true) {
      // if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      // navigate("/create-event");
    }
  };

  const handleAuthenticated = (user: unknown) => {
    // User is now logged in, they can proceed with event creation
    // navigate("/create-event");
  };

  const handleEditEvent = () => {
    // navigate("/create-event", { state: { editingEvent: currentEvent } });
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
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute right-10 bottom-20 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-r from-purple-500/5 to-blue-500/5 blur-3xl delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">EventFlow</h1>
              <p className="text-purple-100">
                Your all-in-one event management platform
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={Routes.discover}>
                <Button variant="outlineLight">
                  <Calendar className="mr-2 h-4 w-4" />
                  Discover Events
                </Button>
              </Link>
              <Button
                onClick={handleCreateEventClick}
                variant="outlineLight"
              >
                <Plus className="mr-2 h-4 w-4" />
                {isAuthenticated ? "Create Event" : "Get Started"}
              </Button>
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-medium text-white">
              Professional Event Management Made Simple
            </span>
          </div>

          <h1 className="mb-6 text-5xl leading-tight font-bold text-white md:text-7xl">
            Create Unforgettable
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {" "}
              Events
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-purple-100">
            From intimate gatherings to large-scale conferences, EventFlow
            provides everything you need to plan, manage, and execute memorable
            events with ease.
          </p>

          <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              onClick={handleCreateEventClick}
              size="lg"
              className="transform rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="mr-2 h-5 w-5" />
              {isAuthenticated
                ? "Start Planning Your Event"
                : "Start Free - No Credit Card"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Link href={Routes.discover}>
              <Button
                variant="outlineLight"
                size="lg"
                className="rounded-xl px-8 py-4 font-semibold"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Discover Events
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col items-center justify-center gap-8 text-white/80 sm:flex-row">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>10,000+ Happy Event Planners</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span>4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span>50+ Countries Worldwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Everything You Need in One Platform
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-purple-100">
            Powerful tools designed to streamline every aspect of event planning
            and management.
          </p>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: CalendarIcon,
              title: "Smart Scheduling",
              desc: "Multi-day planning with intelligent timeline management and automated notifications",
              free: true,
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: Users,
              title: "RSVP & Guest Management",
              desc: "Organize guests into groups, track responses, and manage seating arrangements",
              free: true,
              gradient: "from-green-500 to-emerald-500",
            },
            {
              icon: Target,
              title: "Advanced Seating",
              desc: "Visual table planning with drag-and-drop interface and guest preferences",
              premium: true,
              gradient: "from-purple-500 to-pink-500",
            },
            {
              icon: CheckCircle,
              title: "Digital Check-in",
              desc: "QR code tickets, mobile check-in, and real-time attendance tracking",
              premium: true,
              gradient: "from-orange-500 to-red-500",
            },
            {
              icon: Shield,
              title: "Budget & Vendors",
              desc: "Comprehensive cost tracking, vendor management, and payment processing",
              premium: true,
              gradient: "from-indigo-500 to-purple-500",
            },
            {
              icon: Globe,
              title: "Media & Sharing",
              desc: "Photo albums with QR access, live feeds, and guest contribution features",
              premium: true,
              gradient: "from-teal-500 to-blue-500",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative transform rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40">
                <div
                  className={`h-12 w-12 bg-gradient-to-r ${feature.gradient} mb-4 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-purple-100">
                  {feature.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      feature.free
                        ? "border border-green-500/30 bg-green-500/20 text-green-200"
                        : "border border-yellow-500/30 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-200"
                    }`}
                  >
                    {feature.free ? "Free Forever" : "Premium - $5.99"}
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">How It Works</h2>
          <p className="mb-12 text-lg text-purple-100">
            Get started in minutes with our intuitive three-step process
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create Your Event",
                desc: "Set up your event details, dates, and basic information in just a few clicks",
              },
              {
                step: "02",
                title: "Customize & Plan",
                desc: "Add guests, create schedules, manage budgets, and configure all your event features",
              },
              {
                step: "03",
                title: "Execute & Enjoy",
                desc: "Use our real-time tools during your event and collect memories afterward",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative"
              >
                <div className="mb-4 text-6xl font-bold text-white/10">
                  {step.step}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-purple-100">{step.desc}</p>
                {index < 2 && (
                  <ArrowRight className="absolute top-8 -right-4 hidden h-8 w-8 text-white/20 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to Create Something Amazing?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-purple-100">
            Join thousands of event planners who trust EventFlow to bring their
            visions to life.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              onClick={handleCreateEventClick}
              size="lg"
              className="transform rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="mr-2 h-5 w-5" />
              {isAuthenticated
                ? "Start Your Next Event"
                : "Start Your Free Event"}
            </Button>

            <Button
              variant="outlineLight"
              size="lg"
              className="rounded-xl px-8 py-4 font-semibold"
            >
              Schedule a Demo
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/60">
            No credit card required • Free forever plan available • Cancel
            anytime
          </p>
        </div>
      </div>

      {/* Quick Access */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Explore Our Platform
            </h2>
            <p className="text-xl text-gray-600">
              See how our platform adapts to every type of event
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href={Routes.discover}
              className="group"
            >
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-purple-100 p-4">
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Browse Events
                  </h3>
                  <p className="text-sm text-gray-600">
                    Discover amazing events happening near you
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link
              href={Routes.home}
              className="group"
            >
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 p-4">
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Guest Experience Demo
                  </h3>
                  <p className="text-sm text-gray-600">
                    See every possible guest experience configuration
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link
              href={Routes.home}
              className="group"
            >
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 p-4">
                    <Building className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Vendor Portal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Manage your business and connect with clients
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link
              href={Routes.home}
              className="group"
            >
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-orange-100 p-4">
                    <User className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    My Dashboard
                  </h3>
                  <p className="text-sm text-gray-600">
                    Manage your events and account
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      <AuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
}
