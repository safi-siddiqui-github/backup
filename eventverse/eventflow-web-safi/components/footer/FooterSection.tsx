"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer
      className="mt-5 ml-6 py-12 lg:ml-0 lg:py-16"
      style={{
        opacity: 1,
        borderTopLeftRadius: "40px",
        borderTopRightRadius: "40px",
        backgroundColor: "#EEECEC",
        marginTop: "110px",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 xl:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Section - Branding */}
          <div className="space-y-6">
            {/* Logo */}
            <h3
              className="text-2xl font-bold md:text-3xl"
              style={{ color: "#6F5ACD" }}
            >
              EventVerse
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed text-gray-600">
              We create an event website where customers can join upcoming
              events and get tickets or create new events.
            </p>
          </div>

          {/* Middle Section - Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            {/* About EventVerse */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900">
                About EventVerse
              </h4>
              <div className="space-y-2">
                <Link
                  href="/create-event"
                  className="block text-xs text-gray-600 transition-colors hover:text-gray-900"
                >
                  Create Event
                </Link>
                <Link
                  href="/browse-events"
                  className="block text-xs text-gray-600 transition-colors hover:text-gray-900"
                >
                  Browse Event
                </Link>
                <Link
                  href="/pricing"
                  className="block text-xs text-gray-600 transition-colors hover:text-gray-900"
                >
                  Pricing
                </Link>
                <Link
                  href="/how-it-works"
                  className="block text-xs text-gray-600 transition-colors hover:text-gray-900"
                >
                  How it works
                </Link>
              </div>
            </div>

            {/* Other */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900">Other</h4>
              <div className="space-y-2">
                <Link
                  href="/contact"
                  className="block text-xs text-gray-600 transition-colors hover:text-gray-900"
                >
                  Contact
                </Link>
                <Link
                  href="/about-us"
                  className="block text-xs text-gray-600 transition-colors hover:text-gray-900"
                >
                  About Us
                </Link>
                <Link
                  href="/help"
                  className="block text-xs text-gray-600 transition-colors hover:text-gray-900"
                >
                  Help Centre
                </Link>
                <Link
                  href="/blog"
                  className="block text-xs text-gray-600 transition-colors hover:text-gray-900"
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section - Newsletter */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h4 className="mb-3 text-lg font-bold text-gray-900">
              Get our newsletter
            </h4>

            <p className="mb-4 text-xs leading-relaxed text-gray-600">
              Be the first to hear about new arrivals, promotions, style
              inspiration and exclusive sneak peeks.
            </p>

            {/* Email Input and Button */}
            <div className="flex">
              <input
                type="email"
                placeholder="E-mail"
                className="flex-1 rounded-l-lg border border-gray-200 px-3 py-2 text-xs focus:ring-1 focus:ring-purple-500 focus:outline-none"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              <button
                className="rounded-r-lg px-4 py-2 text-xs font-medium text-white transition-colors"
                style={{ backgroundColor: "#6F5ACD" }}
              >
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
        {/* Separator */}
        <div className="mt-4 h-px w-full bg-gray-300 bg-white"></div>

        {/* Copyright */}
        <p className="mt-4 text-xs text-gray-500">
          © 2025 event. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
