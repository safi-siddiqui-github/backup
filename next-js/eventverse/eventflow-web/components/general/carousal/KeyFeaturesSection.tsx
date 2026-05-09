"use client";

import { Calendar, Search, Ticket } from "lucide-react";

const keyFeatures = [
  {
    id: 1,
    icon: Calendar,
    title: "Create Events Easily",
    description: "Transform ideas into action by launching your own experiences to share with the world. Build memorable moments that bring people together and create lasting connections."
  },
  {
    id: 2,
    icon: Search,
    title: "Explore Options",
    description: "Dive into a variety of offerings tailored to your interests and preferences. Discover new experiences and connect with like-minded individuals in your community."
  },
  {
    id: 3,
    icon: Ticket,
    title: "Join Event and Get Tickets",
    description: "Secure your spot for your favorite events with ease and efficiency. Get instant access to tickets and never miss out on amazing experiences."
  }
];

export default function KeyFeaturesSection() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 xl:px-8">
        {/* Circular Images */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex -space-x-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/featured3.png')` }}
              />
            </div>
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg z-10">
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/keyfeature.png')` }}
              />
            </div>
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/keyfeatured3.png')` }}
              />
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Key Features
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {keyFeatures.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <feature.icon 
                  className="h-8 w-8" 
                  style={{ color: '#6F5ACD' }}
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
