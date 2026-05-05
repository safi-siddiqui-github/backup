import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import {
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

type ValueItem = {
  icon: React.ElementType;
  title: string;
  description: string;
};

export default function AboutHeroSectionComponent() {
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
    // add as many items as you want—height stays fixed, scrolls within
  ];

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* HERO (keeps existing background) */}
      <section
        className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${Images.landingPage})` }}
        aria-label="About EventVerse hero"
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-24">
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/15 bg-white/10 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md">
            <CardTitle className="text-center text-3xl font-semibold tracking-tight text-white md:text-5xl">
              About EventVerse
            </CardTitle>
            <p className="mx-auto mt-4 max-w-xl text-center text-white/90 md:text-lg">
              Our app makes event planning simple and enjoyable. Whether
              you&apos;re an organizer setting up a conference, an attendee
              discovering new experiences, or a vendor connecting with
              customers, we provide the tools to make every event successful.
            </p>
            <div className="mt-6 flex justify-center">
              <Button
                asChild
                variant="default"
                className="gap-2"
              >
                <Link href={Routes.web?.general?.events}>
                  <SquareArrowOutUpRight className="h-4 w-4" />
                  <span>Explore Our Events</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
      </section>

      {/* INTRO */}
      <section className="border-border/50 from-background via-background to-background border-t bg-linear-to-b">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <header className="mx-auto max-w-3xl text-center">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              We&apos;re on a mission to make event planning effortless
            </h1>
            <p className="text-muted-foreground mt-3">
              Enjoyable, accessible, and built to scale with you—from your first
              meetup to your thousandth conference.
            </p>
          </header>
        </div>
      </section>

      {/* TIMELINE (Our Story) — inside a scrollable container */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-semibold md:text-2xl">Our Story</h2>
            <p className="text-muted-foreground mt-2">
              From a simple idea to the most comprehensive event management
              platform
            </p>
          </div>

          {/* Scroll shell with gradient masks */}
          <div className="relative">
            {/* Top/Bottom fade masks (do not block scroll) */}
            <div className="from-background pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-linear-to-b to-transparent" />
            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-linear-to-t to-transparent" />

            {/* Scrollable container */}
            <div
              className="relative max-h-112 overflow-y-auto scroll-smooth pr-2"
              role="region"
              aria-label="Company timeline"
            >
              {/* Inner content is relative so the rail can be absolute to it */}
              <div className="relative mx-auto max-w-4xl py-2">
                {/* Central rail spans the scrollable content only */}
                <div
                  aria-hidden
                  className="bg-primary/30 pointer-events-none absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 sm:block"
                />

                <div
                  className="space-y-10"
                  role="list"
                >
                  {timeline.map((item, i) => {
                    const isLeft = i % 2 === 0;
                    return (
                      <div
                        key={`${item.year}-${i}`}
                        role="listitem"
                        className={`relative grid items-start gap-8 sm:grid-cols-2 ${
                          isLeft ? "" : "sm:[&>*:first-child]:order-2"
                        }`}
                      >
                        {/* Year */}
                        <div
                          className={`flex items-center ${isLeft ? "sm:justify-end" : "sm:justify-start"}`}
                        >
                          <div className="border-primary/30 bg-primary/10 text-primary inline-flex min-w-24 items-center justify-center rounded-full border px-4 py-1">
                            <span className="text-base font-bold">
                              {item.year}
                            </span>
                          </div>
                        </div>

                        {/* Card */}
                        <Card className="border-border/70 relative transition-transform duration-200 hover:-translate-y-0.5">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground mt-2 text-sm">
                              {item.description}
                            </p>
                          </CardContent>
                        </Card>

                        {/* Dot centered on rail & row */}
                        <div
                          aria-hidden
                          className="bg-primary absolute top-1/2 left-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full sm:block"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* divider */}
      <div className="via-border mx-auto my-2 h-px max-w-6xl bg-linear-to-r from-transparent to-transparent" />

      {/* MISSION & VISION */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-2 md:gap-8 md:py-16">
          <Card className="border-border from-primary/5 bg-linear-to-br to-transparent">
            <CardContent className="p-8">
              <Target
                className="text-primary mb-4 h-12 w-12"
                aria-hidden
              />
              <h3 className="text-2xl font-semibold">Our Mission</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                To empower event planners with intuitive, powerful tools that
                turn complex logistics into seamless experiences. We believe
                every event deserves to be extraordinary, and we are here to
                make that happen.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border from-accent/5 bg-linear-to-br to-transparent">
            <CardContent className="p-8">
              <Users
                className="text-primary mb-4 h-12 w-12"
                aria-hidden
              />
              <h3 className="text-2xl font-semibold">Our Vision</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                To become the most trusted event management platform, where
                millions of planners create unforgettable moments. We envision a
                future where technology enhances human connections, not replaces
                them.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <div className="mb-10 text-center">
            <h2 className="text-xl font-semibold md:text-2xl">
              Our Core Values
            </h2>
            <p className="text-muted-foreground mt-2">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Card
                key={i}
                className="group border-border/80 from-background to-background hover:from-primary/5 bg-linear-to-br transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="from-primary/20 to-accent/20 ring-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br ring-1 transition-transform duration-200 group-hover:scale-105">
                    <value.icon
                      className="text-primary h-8 w-8"
                      aria-hidden
                    />
                  </div>
                  <h3 className="text-base font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* divider */}
      <div className="via-border mx-auto my-2 h-px max-w-6xl bg-linear-to-r from-transparent to-transparent" />

      {/* BY THE NUMBERS */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <div className="mb-10 text-center">
            <h2 className="text-xl font-semibold md:text-2xl">
              By The Numbers
            </h2>
            <p className="text-muted-foreground mt-2">
              Our impact in the event planning community
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Card
                key={i}
                className="border-border from-primary/5 bg-linear-to-br to-transparent transition-transform duration-200 hover:-translate-y-0.5"
              >
                <CardContent className="p-8 text-center">
                  <div className="text-primary text-3xl font-bold md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground mt-1 text-xs md:text-sm">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
