"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Star,
  Clock,
  Calendar,
  ArrowUp,
} from "lucide-react";
import { Proposal } from "./types";

interface ProposalCardProps {
  proposal: Proposal;
  onViewDetails: () => void;
}

export default function ProposalCard({
  proposal,
  onViewDetails,
}: ProposalCardProps) {
  const overBudget = proposal.totalCost > proposal.budget;
  const budgetDiff = proposal.totalCost - proposal.budget;
  const budgetPercentage = ((budgetDiff / proposal.budget) * 100).toFixed(1);

  return (
    <Card className="transition-all hover:border-primary/50">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          {/* Left Section */}
          <div className="flex flex-1 gap-4">
            {/* Avatar */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg text-white font-bold bg-linear-to-br from-blue-500 to-purple-500 dark:bg-white">
              {proposal.vendorName.charAt(0)}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 sm:gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-semibold truncate">
                      {proposal.vendorName}
                    </h3>
                    {proposal.isFavorite && (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {proposal.vendorCompany}
                  </p>
                </div>

                {/* Badges - Aligned with header on large screens */}
                <div className="flex flex-wrap items-center gap-2 lg:flex-nowrap lg:items-center">
                  <Badge variant="outline">{proposal.category}</Badge>

                  {proposal.status === "pending" && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </Badge>
                  )}

                  {proposal.status === "shortlisted" && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Shortlisted
                    </Badge>
                  )}

                  {proposal.status === "negotiation" && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      In Negotiation
                    </Badge>
                  )}

                  {proposal.status === "hired" && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Hired
                    </Badge>
                  )}

                  {proposal.isNew && (
                    <Badge variant="destructive" className="bg-red-600">
                      NEW
                    </Badge>
                  )}

                  {proposal.editedBy && (
                    <Badge 
                      variant="secondary" 
                      className={proposal.editedBy === "vendor" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" : "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"}
                    >
                      Edited by {proposal.editedBy === "vendor" ? "You" : "Host"}
                    </Badge>
                  )}

                  {proposal.version && proposal.version > 1 && (
                    <Badge variant="outline" className="text-xs">
                      v{proposal.version}
                    </Badge>
                  )}

                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{proposal.rating}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {proposal.description}
              </p>

              {/* Timeline & Dates */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{proposal.timeline}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Valid until {proposal.validUntil}</span>
                </div>
              </div>

              {/* Action Buttons - Mobile */}
              <div className="flex gap-2 md:hidden">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={onViewDetails}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
          </div>

          {/* Right Section - Mobile Price */}
          <div className="flex md:hidden items-center justify-between gap-2 pt-2 border-t">
            <div>
              <p className="text-xl font-bold text-green-600">
                ${proposal.totalCost.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Total Cost</p>
            </div>
            {overBudget ? (
              <Badge
                variant="secondary"
                className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs"
              >
                <ArrowUp className="h-3 w-3 mr-1" />
                ${Math.abs(budgetDiff).toLocaleString()} over (+{budgetPercentage}%)
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs"
              >
                Within Budget
              </Badge>
            )}
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex md:flex-col md:items-end md:gap-3">
            {/* Price */}
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                ${proposal.totalCost.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Total Cost</p>
            </div>

            {/* Budget Comparison */}
            {overBudget ? (
              <Badge
                variant="secondary"
                className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              >
                <ArrowUp className="h-4 w-4" />
                <span className="ml-1">${Math.abs(budgetDiff).toLocaleString()} over</span>
                <span className="ml-1">+{budgetPercentage}%</span>
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              >
                Within Budget
              </Badge>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onViewDetails}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

