"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section className="py-10 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 xl:px-8 text-center">
        {/* Main Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight whitespace-nowrap">
          Ready to Create Something Amazing?
        </h2>

        {/* Supporting Text */}
        <p className="text-base md:text-lg text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed font-semibold">
          Join thousands of event planners who trust EventFlow to bring their visions to life.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          {/* Primary Button */}
          <Link
            href="/create-event"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium text-base transition-all hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#6F5ACD' }}
          >
            <Plus className="h-4 w-4" />
            <span>Create Your Next Event</span>
          </Link>

          {/* Secondary Button */}
          <Link
            href="/join-event"
            className="px-6 py-3 rounded-full text-gray-700 font-medium text-base bg-gray-100 hover:bg-gray-200 transition-all hover:scale-105"
          >
            Join Event
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-gray-500">
          No credit card required • Free forever plan available • Cancel anytime
        </p>
      </div>
    </section>
  );
}
