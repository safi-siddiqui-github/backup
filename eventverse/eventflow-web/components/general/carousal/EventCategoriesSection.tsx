"use client";

import { Music, Palette, Utensils, Briefcase, Dumbbell, GraduationCap, Film, Heart } from "lucide-react";
import Link from "next/link";

const eventCategories = [
  {
    id: 1,
    name: "Music",
    icon: Music,
    eventCount: "1240 Events",
    bgColor: "#F3E8FF", // Light purple
  },
  {
    id: 2,
    name: "Arts & Culture",
    icon: Palette,
    eventCount: "120 Events",
    bgColor: "#E0F2FE", // Light blue
  },
  {
    id: 3,
    name: "Food & Drinks",
    icon: Utensils,
    eventCount: "120 Events",
    bgColor: "#FEF3C7", // Light yellow
  },
  {
    id: 4,
    name: "Business",
    icon: Briefcase,
    eventCount: "120 Events",
    bgColor: "#FCE7F3", // Light pink
  },
  {
    id: 5,
    name: "Fitness & Sports",
    icon: Dumbbell,
    eventCount: "1240 Events",
    bgColor: "#FCE7F3", // Light pink
  },
  {
    id: 6,
    name: "Education",
    icon: GraduationCap,
    eventCount: "120 Events",
    bgColor: "#D1FAE5", // Light green
  },
  {
    id: 7,
    name: "Entertainment",
    icon: Film,
    eventCount: "120 Events",
    bgColor: "#FCE7F3", // Light pink
  },
  {
    id: 8,
    name: "Charity & Causes",
    icon: Heart,
    eventCount: "120 Events",
    bgColor: "#D1FAE5", // Light green
  },
];

export default function EventCategoriesSection() {
  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 xl:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Explore Event Categories
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {eventCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={`/events?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <div
                  className="rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                  style={{ backgroundColor: category.bgColor }}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'white',
                        border: '1px solid #E9D9FF'
                      }}
                    >
                      <IconComponent 
                        className="h-6 w-6" 
                        style={{ color: '#6F5ACD' }}
                      />
                    </div>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>

                  {/* Event Count */}
                  <p className="text-sm text-gray-600">
                    {category.eventCount}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
