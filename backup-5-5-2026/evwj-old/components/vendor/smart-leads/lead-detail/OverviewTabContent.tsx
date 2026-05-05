"use client";

import { Badge } from "@/components/ui/badge";
import { User, Calendar, FileText } from "lucide-react";
import { Lead } from "../mockLeads";
import OtherServicesSection from "./OtherServicesSection";

interface OverviewTabContentProps {
  lead: Lead;
  allLeads?: Lead[];
  onServiceClick?: (leadId: string) => void;
}

export default function OverviewTabContent({ 
  lead, 
  allLeads = [], 
  onServiceClick = () => {} 
}: OverviewTabContentProps) {
  return (
    <div className="flex flex-col min-h-0 overflow-y-auto pr-2 -mr-2 md:pr-0 md:mr-0 h-[calc(100vh-200px)]">
      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0 mb-4">
        {/* Client Information Card */}
        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Client Information
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Name:</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {lead.clientName}
              </span>
            </div>
            {lead.email && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">Email:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {lead.email}
                </span>
              </div>
            )}
            {lead.phone && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">Phone:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {lead.phone}
                </span>
              </div>
            )}
            {lead.preferredContact && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Preferred Contact:
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {lead.preferredContact}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Event Details Card */}
        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Event Details
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Date:</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {lead.eventDate}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Location:</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {lead.location}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Guests:</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {lead.guests}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Budget:</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {lead.price}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements & Notes Card - Takes remaining height */}
      <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col min-h-[200px] mb-4">
        <div className="flex items-center gap-2 mb-4 shrink-0">
          <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Requirements & Notes
          </h3>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-sm text-gray-900 dark:text-white">{lead.description}</p>

          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Special Requirements:
            </p>

            <div className="flex flex-wrap gap-2">
              {lead.specialRequirements && lead.specialRequirements.length > 0 ? (
                lead.specialRequirements.map((requirement, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium 
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-white border 
                      border-gray-300 dark:border-gray-600"
                  >
                    {requirement}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  No special requirements
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Other Services Section */}
      {lead.relatedServices && lead.relatedServices.length > 0 && (
        <OtherServicesSection
          relatedServices={lead.relatedServices}
          allLeads={allLeads}
          onServiceClick={onServiceClick}
        />
      )}
    </div>
  );
}
