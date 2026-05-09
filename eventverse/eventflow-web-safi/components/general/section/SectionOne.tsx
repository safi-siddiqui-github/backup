"use client";

import {
  ArrowRight,
  Calendar,
  CircleCheckBig,
  Disc2,
  Globe,
  Shield,
  Users,
} from "lucide-react";
import { useMemo } from "react";

export default function SectionOne() {
  const list = useMemo(
    () => [
      {
        type: "schedule",
        title: "Smart Scheduling",
        description:
          "Multi-day planning with intelligent timeline management and automated notifications",
        isFree: true,
        price: 0,
      },
      {
        type: "rsvp",
        title: "RSVP & Guest Management",
        description:
          "Organize guests into groups, track responses, and manage seating arrangements",
        isFree: true,
        price: 0,
      },
      {
        type: "seating",
        title: "Advanced Seating",
        description:
          "Visual table planning with drag-and-drop interface and guest preferences",
        isFree: false,
        price: 5.99,
      },
      {
        type: "check",
        title: "Digital Check-in",
        description:
          "QR code tickets, mobile check-in, and real-time attendance tracking",
        isFree: false,
        price: 5.99,
      },
      {
        type: "budget",
        title: "Budget & Vendors",
        description:
          "Comprehensive cost tracking, vendor management, and payment processing",
        isFree: false,
        price: 5.99,
      },
      {
        type: "media",
        title: "Media & Sharing",
        description:
          "Photo albums with QR access, live feeds, and guest contribution features",
        isFree: false,
        price: 5.99,
      },
    ],
    [],
  );

  return (
    <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-0">
      {list.map(({ type, title, description, isFree, price }, index) => (
        <div
          key={index}
          className="flex flex-col items-start gap-4 rounded-xl border bg-black/5 p-4 text-left transition lg:scale-95 lg:hover:scale-100"
        >
          {type === "schedule" ? (
            <div className="rounded bg-gradient-to-br from-blue-700 to-blue-500 p-3">
              <Calendar />
            </div>
          ) : type === "rsvp" ? (
            <div className="rounded bg-gradient-to-br from-green-700 to-green-500 p-3">
              <Users />
            </div>
          ) : type === "seating" ? (
            <div className="rounded bg-gradient-to-br from-pink-700 to-pink-500 p-3">
              <Disc2 />
            </div>
          ) : type === "check" ? (
            <div className="rounded bg-gradient-to-br from-orange-700 to-orange-500 p-3">
              <CircleCheckBig />
            </div>
          ) : type === "budget" ? (
            <div className="rounded bg-gradient-to-br from-purple-700 to-purple-500 p-3">
              <Shield />
            </div>
          ) : type === "media" ? (
            <div className="rounded bg-gradient-to-br from-cyan-700 to-cyan-500 p-3">
              <Globe />
            </div>
          ) : null}

          <p className="text-xl font-semibold">{title}</p>
          <p className="">{description}</p>

          <div className="flex w-full items-center justify-between">
            {isFree ? (
              <div className="rounded border border-green-400 bg-green-400/20 p-2 text-xs font-medium text-green-300">
                Free Forever
              </div>
            ) : (
              <div className="rounded border border-orange-400 bg-orange-400/20 p-2 text-xs font-medium text-orange-300">
                Premium ${price}
              </div>
            )}
            <ArrowRight />
          </div>
        </div>
      ))}
    </div>
  );
}
