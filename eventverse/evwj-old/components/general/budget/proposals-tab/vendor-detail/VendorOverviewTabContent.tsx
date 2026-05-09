"use client";

import { Badge } from "@/components/ui/badge";
import { User, Calendar, FileText, DollarSign, TrendingUp } from "lucide-react";
import { Vendor } from "../../vendor-mgmt-tab/VendorListView";

interface VendorOverviewTabContentProps {
  vendor: Vendor;
}

export default function VendorOverviewTabContent({ vendor }: VendorOverviewTabContentProps) {
  return (
    <div className="flex flex-col min-h-0 overflow-y-auto pr-2 -mr-2 md:pr-0 md:mr-0 h-[calc(100vh-200px)]">
      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0 mb-4">
        {/* Vendor Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Vendor Information
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Name:</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {vendor.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Category:</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {vendor.category}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Rating:</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {vendor.rating}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">/ 5.0</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Status:</span>
              <Badge
                variant="secondary"
                className={
                  vendor.status === "active"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    : vendor.status === "pending"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                      : vendor.status === "completed"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                }
              >
                {vendor.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Event Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Event Details
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Total Value:</span>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                ${vendor.totalValue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Active Events:</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {vendor.activeEvents}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Statistics Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0 mb-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Upcoming</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {vendor.upcomingCount}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">milestones</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Completed</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {vendor.completedCount}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">milestones</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {vendor.events?.length || 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">events</p>
        </div>
      </div>
    </div>
  );
}

