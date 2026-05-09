"use client";

import {
  ArrowRight,
  ChevronDown,
  Grid3X3,
  Settings,
  Sun,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeaderUserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      {/* User Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-full p-2 text-black transition-colors hover:bg-gray-100"
      >
        <User
          className="h-5 w-5 stroke-2"
          strokeWidth={2}
          fill="none"
        />
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full right-0 z-50 mt-4 rounded-lg shadow-lg"
          style={{
            width: "230px",
            height: "449px",
            border: "1px solid #E9D9FF",
            background: "#FFFFFF",
            opacity: 1,
          }}
        >
          <div className="p-6">
            {/* User Profile Section */}
            <div
              className="mb-6 flex flex-col items-center rounded-lg p-4"
              style={{ border: "1px solid #E1DFE1" }}
            >
              {/* Profile Picture */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                <User className="h-8 w-8 text-gray-600" />
              </div>

              {/* Name */}
              <h3 className="text-lg font-bold text-black">Name Surname</h3>
            </div>
            {/* Vendor Name Button */}
            <button
              className="mb-4 flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 transition-colors hover:bg-gray-50"
              style={{ border: "1px solid #E1DFE1" }}
            >
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                <span className="text-sm font-medium text-black">
                  Vendor Name
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-black" />
            </button>
            {/* Separator */}
            <div className="mb-4 border-t border-gray-200"></div>

            {/* Menu Items */}
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 rounded-lg px-4 py-3 text-sm text-black transition-colors hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                <Grid3X3 className="h-5 w-5" />
                <span>My Dashboard</span>
              </Link>

              <Link
                href="/settings"
                className="flex items-center space-x-3 rounded-lg px-4 py-3 text-sm text-black transition-colors hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-5 w-5" />
                <span>Account Settings</span>
              </Link>

              {/* Separator */}
              <div className="my-2 border-t border-gray-200"></div>

              <button
                className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left text-sm text-black transition-colors hover:bg-gray-50"
                onClick={() => {
                  setIsOpen(false);
                  // Handle light mode toggle logic here
                }}
              >
                <Sun className="h-5 w-5" />
                <span>Light Mode</span>
              </button>

              <button
                className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left text-sm text-black transition-colors hover:bg-gray-50"
                onClick={() => {
                  setIsOpen(false);
                  // Handle logout logic here
                }}
              >
                <ArrowRight className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
