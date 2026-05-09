"use client";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardTitle } from "@/shadcn/ui/card";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import {
  CheckCircle2,
  Heart,
  Lightbulb,
  Shield,
  SquareArrowOutUpRight,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/lib-shadcn";

type ValueItem = {
  icon: React.ElementType;
  title: string;
  description: string;
};

export default function WebAboutPageComponent() {
  const values: ValueItem[] = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously push boundaries to deliver cutting-edge event management solutions.",
    },
    {
      icon: Shield,
      title: "Reliability",
      description:
        "Your events matter. We ensure 99.9% uptime and rock-solid security for peace of mind.",
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "We believe in the power of connections and building meaningful experiences together.",
    },
    {
      icon: Zap,
      title: "Excellence",
      description:
        "We're committed to delivering exceptional quality in everything we do.",
    },
    {
      icon: Users,
      title: "User-Centric",
      description:
        "Our platform is designed with you in mind, prioritizing ease of use and customer satisfaction.",
    },
    {
      icon: Target,
      title: "Integrity",
      description:
        "We operate with transparency and honesty, earning your trust every step of the way.",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Event Planners" },
    { value: "500K+", label: "Events Created" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9★", label: "User Rating" },
  ];

  const timeline = [
    {
      year: "2022",
      title: "The Beginning",
      description:
        "Founded with a vision to simplify event planning for everyone.",
    },
    {
      year: "2023",
      title: "Rapid Growth",
      description: "Reached 5,000 users and launched our vendor marketplace.",
    },
    {
      year: "2024",
      title: "Innovation",
      description: "Introduced AI-powered features and mobile apps.",
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Serving customers in over 50 countries worldwide.",
    },
    {
      year: "2026",
      title: "Future Plans",
      description:
        "Continuing to innovate and expand our platform's capabilities.",
    },
  ];

  return (
    <main className="  bg-white dark:bg-transparent  min-h-screen">
      {/* HERO (keeps existing background) */}
      <section
        className="relative overflow-hidden min-h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${Images.asset.gif.bgGif})` }}
        aria-label="About EventVerse hero"
      >
        {/* Glassy overlay and color fade, visible in both modes */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/60 via-[#7c3aed]/20 to-white/80 dark:to-black/60" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-purple-400/10" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-5 py-24">
          <div className="rounded-[2.5rem] border border-purple-500/20 bg-white/80 dark:bg-white/10 backdrop-blur-2xl shadow-[0_10px_40px_rgba(124,58,237,0.10)] hover:shadow-[0_16px_48px_0_rgba(124,58,237,0.18)] transition-all duration-300 p-10 md:p-16 flex flex-col items-center">
            <CardTitle className="text-center text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white mb-4">
              About EventVerse
            </CardTitle>
            <p className="mx-auto max-w-2xl text-center text-zinc-700 dark:text-white/90 text-lg md:text-xl mb-8">
              Our app makes event planning simple and enjoyable. Whether you&apos;re an organizer setting up a conference, an attendee discovering new experiences, or a vendor connecting with customers, we provide the tools to make every event successful.
            </p>
            <div className="mt-2 flex justify-center">
              <Button asChild variant="default" className="gap-2 bg-purple-500/80 hover:bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
                <Link
                  href={Routes.web?.general?.eventsDiscover}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <SquareArrowOutUpRight className="h-5 w-5" />
                  <span className="font-semibold">Explore Our Events</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <header className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-500 dark:text-purple-400 mb-8">
              <Heart className="w-4 h-4" />
              <span>Our Purpose</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[1.1]">
              We&apos;re on a mission to make event planning{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-400">
                effortless.
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Enjoyable, accessible, and built to scale with you—from your first
              meetup to your thousandth conference.
            </p>
          </header>
          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {values.map((value, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-4xl border border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-white/2 hover:bg-white/90 dark:hover:bg-white/5 transition-all duration-300 shadow-lg dark:shadow-none"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500 dark:text-purple-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-24 rounded-[3rem] border border-purple-500/20 bg-linear-to-b from-purple-500/5 to-white/80 dark:to-transparent p-12 shadow-lg dark:shadow-none">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold uppercase tracking-widest text-purple-500/60 dark:text-purple-400/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex flex-wrap justify-center gap-4 text-zinc-600 dark:text-zinc-500 text-sm font-medium">
            {[
              "Instant Payouts",
              "No Hidden Fees",
              "Dedicated Support",
              "GDPR Compliant",
            ].map((tag) => (
              <div key={tag} className="flex items-center gap-2 px-3 py-1">
                <CheckCircle2 className="w-4 h-4 text-purple-500/50" />
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-purple-400/10 dark:bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* TIMELINE (Our Story) — inside a scrollable container */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-16 text-center">
            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[1.1]">
              Our
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-400">
                {" "}Journey {" "}
              </span>
              So Far
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl mx-auto text-lg">
              From a simple idea to the most comprehensive event management
              platform in the industry.
            </p>
          </div>
          <div className="relative">
            <div
              className="relative max-h-150 overflow-y-auto scroll-smooth no-scrollbar px-2 py-10"
              role="region"
              aria-label="Company timeline"
            >
              <div className="relative mx-auto max-w-4xl">
                {/* Central Glowing Rail */}
                <div
                  aria-hidden
                  className="absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 bg-linear-to-b from-transparent via-[#a78bfa]/50 to-transparent sm:block"
                />
                <div className="space-y-12">
                  {timeline.map((item, i) => {
                    const isLeft = i % 2 === 0;
                    return (
                      <div key={i}>
                        <div
                          className={cn(
                            "relative grid items-center gap-8 sm:grid-cols-2",
                            !isLeft && "sm:[&>*:first-child]:order-2"
                          )}
                        >
                          {/* Year Indicator */}
                          <div
                            className={cn(
                              "flex items-center",
                              isLeft ? "sm:justify-end" : "sm:justify-start"
                            )}
                          >
                            <div className="z-10 rounded-full border border-[#a78bfa]/30 bg-[#a78bfa]/10 dark:bg-[#7c3aed]/10 px-6 py-2 backdrop-blur-md">
                              <span className="text-lg font-black text-[#7c3aed] dark:text-[#a78bfa]">
                                {item.year}
                              </span>
                            </div>
                          </div>
                          {/* Content Card */}
                          <Card className="group relative border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-white/3 backdrop-blur-xl transition-all duration-300 hover:bg-purple-50 dark:hover:bg-white/[0.07] hover:border-[#a78bfa]/30 shadow-lg dark:shadow-2xl dark:shadow-purple-600/20">
                            <CardContent className="p-8">
                              <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-[#7c3aed] dark:group-hover:text-[#a78bfa] transition-colors">
                                {item.title}
                              </h3>
                              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">
                                {item.description}
                              </p>
                            </CardContent>
                          </Card>
                          {/* Central Node Point */}
                          <div
                            aria-hidden
                            className="absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
                          >
                            <div className="h-4 w-4 rounded-full border-2 border-[#a78bfa] bg-white dark:bg-[#030014] shadow-[0_0_15px_#a78bfa] dark:shadow-[0_0_15px_#7c3aed]" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>

      <section className="relative">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:gap-12">
          <Card className="border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg dark:shadow-[0_8px_32px_0_rgba(124,58,237,0.10)] hover:shadow-xl dark:hover:shadow-[0_12px_40px_0_rgba(124,58,237,0.18)] transition-all duration-300">
            <CardContent className="p-10">
              <Target className="text-[#7c3aed] dark:text-[#a78bfa] mb-4 h-12 w-12" aria-hidden />
              <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
                Our Mission
              </h3>
              <p className="text-zinc-700 dark:text-white/80 mt-3 leading-relaxed text-lg">
                To empower event planners with intuitive, powerful tools that
                turn complex logistics into seamless experiences. We believe
                every event deserves to be extraordinary, and we are here to
                make that happen.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg dark:shadow-[0_8px_32px_0_rgba(124,58,237,0.10)] hover:shadow-xl dark:hover:shadow-[0_12px_40px_0_rgba(124,58,237,0.18)] transition-all duration-300">
            <CardContent className="p-10">
              <Users className="text-[#7c3aed] dark:text-[#a78bfa] mb-4 h-12 w-12" aria-hidden />
              <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">Our Vision</h3>
              <p className="text-zinc-700 dark:text-white/80 mt-3 leading-relaxed text-lg">
                To become the most trusted event management platform, where
                millions of planners create unforgettable moments. We envision a
                future where technology enhances human connections, not replaces
                them.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="relative w-full py-20 px-4 bg-linear-to-r from-[#ede9fe]/60 via-[#f3e8ff]/40 to-[#f5f3ff]/60 dark:from-[#7c3aed]/30 dark:via-[#a78bfa]/10 dark:to-[#c084fc]/30 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-xs font-bold tracking-widest text-zinc-900 dark:text-white uppercase bg-white/60 dark:bg-white/20 border border-zinc-200 dark:border-white/20 rounded-full backdrop-blur-md shadow-lg">
            <Users className="w-4 h-4 animate-pulse text-[#7c3aed] dark:text-white" />
            Join Our Community
          </div>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[1.1]">
            Be Part of Something Bigger
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-zinc-700 dark:text-white/80 mb-10">
            Connect with thousands of event professionals, share your
            experiences, and help shape the future of event management.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              {
                icon: (
                  <Heart className="h-12 w-12 mb-3 text-[#7c3aed] dark:text-[#a78bfa] animate-bounce" />
                ),
                title: "10,000+ Members",
                subtitle: "Worldwide",
                delay: "",
              },
              {
                icon: (
                  <Lightbulb className="h-12 w-12 mb-3 text-[#7c3aed] dark:text-[#a78bfa] animate-pulse" />
                ),
                title: "1,000+ Ideas Shared",
                subtitle: "Community Driven",
                delay: "delay-100",
              },
              {
                icon: (
                  <CheckCircle2 className="h-12 w-12 mb-3 text-[#7c3aed] dark:text-[#a78bfa] animate-bounce" />
                ),
                title: "99.9% Satisfaction",
                subtitle: "Trusted Platform",
                delay: "delay-200",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={
                  "flex flex-col items-center bg-white/80 dark:bg-white/10 border border-zinc-200 dark:border-white/20 rounded-2xl px-8 py-6 shadow-xl backdrop-blur-md min-w-55 max-w-xs animate-fade-in-up "+
                  item.delay
                }
              >
                {item.icon}
                <span className="text-xl font-bold text-zinc-900 dark:text-[#a78bfa] mb-1">
                  {item.title}
                </span>
                <span className="text-zinc-600 dark:text-white/80 text-sm">{item.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
