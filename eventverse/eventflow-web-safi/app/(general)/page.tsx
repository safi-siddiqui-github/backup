import HeaderGeneralPrefix from "@/components/general/header/HeaderGeneralPrefix";
import SectionOne from "@/components/general/section/SectionOne";
import SectionTwo from "@/components/general/section/SectionTwo";
import { Routes } from "@/lib/routes";
import {
  ArrowRight,
  Building,
  Calendar,
  CalendarDays,
  Eye,
  Globe,
  Plus,
  Star,
  User,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-gradient-to-br from-purple-700 to-blue-700 2xl:items-center">
        <HeaderGeneralPrefix />

        <div className="flex flex-col gap-20 md:py-10 2xl:container">
          <div className="flex flex-col items-center gap-8 p-4 text-center text-white md:gap-12">
            <div className="flex flex-wrap items-center justify-center gap-2 rounded bg-white/10 p-2">
              <Zap className="size-4 text-yellow-400" />
              <p className="">Professional Event Management Made Simple</p>
            </div>

            <div className="flex flex-col text-2xl font-bold md:text-5xl lg:text-7xl">
              <p className="">Create Unforgettable</p>
              <p className="bg-linear-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Events
              </p>
            </div>

            <p className="max-w-md md:max-w-lg md:text-lg">
              From intimate gatherings to large-scale conferences, EventFlow
              provides everything you need to plan, manage, and execute
              memorable events with ease.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={Routes.home}
                className="flex items-center gap-2 rounded bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm"
              >
                <Plus className="size-4" />
                Start Planning Your Event
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={Routes.home}
                className="flex items-center gap-2 rounded border bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
              >
                <Calendar className="size-4" />
                Discover Events
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Users />
                <p className="">10,000+ Happy Event Planners</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Star className="text-yellow-400" />
                <p className="">4.9/5 Average Rating</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Globe />
                <p className="">50+ Countries Worldwide</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 p-4 text-center text-white">
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-2xl font-bold md:text-3xl">
                Everything You Need in One Platform
              </p>
              <p className="max-w-sm">
                Powerful tools designed to streamline every aspect of event
                planning and management
              </p>
            </div>

            <SectionOne />
          </div>

          <div className="flex flex-col gap-10 p-4 text-center text-white">
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-2xl font-bold md:text-3xl">How It Works</p>
              <p className="">
                Get started in minutes with our intuitive three-step process
              </p>
            </div>

            <SectionTwo />
          </div>

          <div className="flex flex-col p-4 text-white">
            <div className="flex flex-col gap-8 rounded-xl border bg-black/5 p-4 py-20 text-center">
              <div className="flex flex-col items-center gap-4">
                <p className="text-2xl font-bold md:text-3xl lg:text-4xl">
                  Ready to Create Something Amazing?
                </p>
                <p className="max-w-sm">
                  Join thousands of event planners who trust EventFlow to bring
                  their visions to life.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={Routes.home}
                  className="flex items-center gap-2 rounded bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm"
                >
                  <Plus className="size-4" />
                  Start Your Next Event
                </Link>
                <Link
                  href={Routes.home}
                  className="flex items-center gap-2 rounded border bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                >
                  <Calendar className="size-4" />
                  Schedule A Demo
                </Link>
              </div>

              <p className="">
                No credit card required • Free forever plan available • Cancel
                anytime
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col py-20 2xl:items-center">
        <div className="flex flex-col gap-10 p-4 2xl:container">
          <div className="flex flex-col items-center gap-4">
            <p className="text-2xl font-bold md:text-3xl lg:text-4xl">
              Explore Our Platform
            </p>
            <p className="max-w-sm">
              See how our platform adapts to every type of event
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-4">
            <Link
              href={Routes.home}
              className="flex flex-col items-center gap-4 rounded border border-purple-500 bg-purple-50 p-4 py-10"
            >
              <div className="rounded bg-purple-200 p-4 text-purple-600">
                <CalendarDays />
              </div>
              <p className="text-xl font-medium">Browse Events</p>
              <p className="">Discover amazing events happening near you</p>
            </Link>
            <Link
              href={Routes.home}
              className="flex flex-col items-center gap-4 rounded border border-blue-500 bg-blue-50 p-4 py-10"
            >
              <div className="rounded bg-blue-200 p-4 text-blue-600">
                <Eye />
              </div>
              <p className="text-xl font-medium">Guest Experience Demo</p>
              <p className="">
                See every possible guest experience configuration
              </p>
            </Link>
            <Link
              href={Routes.home}
              className="flex flex-col items-center gap-4 rounded border border-green-500 bg-green-50 p-4 py-10"
            >
              <div className="rounded bg-green-200 p-4 text-green-600">
                <Building />
              </div>
              <p className="text-xl font-medium">Vendor Portal</p>
              <p className="">Manage your business and connect with clients</p>
            </Link>
            <Link
              href={Routes.home}
              className="flex flex-col items-center gap-4 rounded border border-orange-500 bg-orange-50 p-4 py-10"
            >
              <div className="rounded bg-orange-200 p-4 text-orange-600">
                <User />
              </div>
              <p className="text-xl font-medium">My Dashboard</p>
              <p className="">Manage your events and account using dashboard</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
