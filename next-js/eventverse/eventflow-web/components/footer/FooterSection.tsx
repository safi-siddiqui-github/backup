"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer 
      className="py-12 lg:py-16 mt-5 ml-6 lg:ml-0" 
      style={{ 
      
        opacity: 1,
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        backgroundColor: '#EEECEC',
        marginTop: '110px'
      }}
    >
      <div className="max-w-6xl mx-auto px-6 xl:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Branding */}
          <div className="space-y-6">
            {/* Logo */}
            <h3 
              className="text-2xl md:text-3xl font-bold"
              style={{ color: '#6F5ACD' }}
            >
              EventVerse
            </h3>
            
            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              We create an event website where customers can join upcoming events and get tickets or create new events.
            </p>
            
           
          </div>

          {/* Middle Section - Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            {/* About EventVerse */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900">About EventVerse</h4>
              <div className="space-y-2">
                <Link href="/create-event" className="block text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Create Event
                </Link>
                <Link href="/browse-events" className="block text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Browse Event
                </Link>
                <Link href="/pricing" className="block text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
                <Link href="/how-it-works" className="block text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  How it works
                </Link>
              </div>
            </div>

            {/* Other */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900">Other</h4>
              <div className="space-y-2">
                <Link href="/contact" className="block text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
                <Link href="/about-us" className="block text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  About Us
                </Link>
                <Link href="/help" className="block text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Help Centre
                </Link>
                <Link href="/blog" className="block text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section - Newsletter */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-3">
              Get our newsletter
            </h4>
            
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Be the first to hear about new arrivals, promotions, style inspiration and exclusive sneak peeks.
            </p>
            
            {/* Email Input and Button */}
            <div className="flex">
              <input
                type="email"
                placeholder="E-mail"
                className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                style={{ backgroundColor: '#F5F5F5' }}
              />
              <button
                className="px-4 py-2 rounded-r-lg text-white text-xs font-medium transition-colors"
                style={{ backgroundColor: '#6F5ACD' }}
              >
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
         {/* Separator */}
         <div className="w-full h-px bg-gray-300 mt-4 bg-white"></div>
            
            {/* Copyright */}
            <p className="text-xs text-gray-500 mt-4">
              © 2025 event. All Rights Reserved.
            </p>
      </div>
    </footer>
  );
}
