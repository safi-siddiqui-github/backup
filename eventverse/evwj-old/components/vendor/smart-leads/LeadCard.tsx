"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { useVendorNavigationStore } from "@/lib/lib-vendor-navigation-store";
import { cn } from "@/lib/utils";
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  MessageSquare,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LeadDetailDialog from "./lead-detail/LeadDetailDialog";
import { Lead } from "./mockLeads";

interface LeadCardProps {
  lead: Lead;
  allLeads: Lead[];
  onChat: () => void;
  onAccept: () => void;
  onReject: () => void;
}

export default function LeadCard({
  lead,
  allLeads,
  onChat,
  onAccept,
  onReject,
}: LeadCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const ignoreNextClickRef = useRef(false);
  const { leadToOpen, clearLeadToOpen } = useVendorNavigationStore();
  const [dialogInitialTab, setDialogInitialTab] = useState<
    string | undefined
  >();
  const [currentLeadId, setCurrentLeadId] = useState(lead.id);

  // Handle programmatic opening from store
  useEffect(() => {
    if (leadToOpen?.leadId === lead.id && !isDialogOpen && !isClosing) {
      setDialogInitialTab(leadToOpen.initialTab);
      setIsDialogOpen(true);
      clearLeadToOpen();
    }
  }, [leadToOpen, lead.id, isDialogOpen, isClosing, clearLeadToOpen]);

  const handleOpenDialog = () => {
    // Don't open if detail dialog is already open, closing, or if a confirmation dialog is open
    // Also ignore if we just closed a confirmation dialog
    if (
      !isDialogOpen &&
      !isClosing &&
      !isAcceptDialogOpen &&
      !isRejectDialogOpen &&
      !ignoreNextClickRef.current
    ) {
      setIsDialogOpen(true);
    }
  };

  const handleConfirmationClose = () => {
    ignoreNextClickRef.current = true;
    // Clear the flag after the current event loop completes
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ignoreNextClickRef.current = false;
      });
    });
  };

  const handleCloseDialog = (open: boolean) => {
    if (!open) {
      setIsClosing(true);
      setIsDialogOpen(false);
      // Reset closing state after a short delay to prevent immediate reopening
      setTimeout(() => {
        setIsClosing(false);
        setCurrentLeadId(lead.id); // Reset to original lead when closing
      }, 100);
    } else {
      setIsDialogOpen(open);
    }
  };

  const handleServiceClick = (leadId: string) => {
    setCurrentLeadId(leadId);
    setDialogInitialTab("overview");
    // Keep dialog open, just switch to the new lead
  };

  const priorityConfig = {
    high: {
      className: "text-red-600 dark:text-red-400",
      label: "HIGH PRIORITY",
    },
    medium: {
      className: "text-orange-600 dark:text-orange-400",
      label: "MEDIUM PRIORITY",
    },
    low: {
      className: "text-blue-600 dark:text-blue-400",
      label: "LOW PRIORITY",
    },
  };

  const statusConfig = {
    new: {
      className:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      label: "new",
    },
    contacted: {
      className:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      label: "contacted",
    },
    quoted: {
      className:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
      label: "quoted",
    },
    won: {
      className:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      label: "won",
    },
    lost: {
      className:
        "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300",
      label: "lost",
    },
  };

  const priority = priorityConfig[lead.priority];
  const status = statusConfig[lead.status];

  return (
    <Card className="group cursor-pointer !bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617] transition-all duration-200 hover:border-primary/50 hover:shadow-md dark:hover:border-primary/30">
      <CardContent
        className="p-2.5 sm:p-3"
        onClick={handleOpenDialog}
      >
        {/* Top Section: Title/Content on Left, Budget/Priority on Right */}
        <div className="mb-2 flex items-start justify-between gap-4">
          {/* Left Side: Title, Status, Categories, Client Info */}
          <div className="flex-1 min-w-0">
            {/* Title with Status and Match */}
            <div className="mb-1">
              <div className="mb-0.5 flex items-center gap-2 flex-wrap">
                <h3 className="line-clamp-1 text-base font-bold text-gray-900 dark:text-white">
                  {lead.eventTitle}
                </h3>
                <div className="flex flex-wrap items-center gap-1">
                  <Badge
                    variant="secondary"
                    className={cn("shrink-0 px-1.5 py-0.5 text-xs font-medium", status.className)}
                  >
                    {status.label}
                  </Badge>
                  <div className="flex items-center gap-0.5 rounded-full bg-yellow-50 px-1.5 py-0.5 dark:bg-yellow-900/20">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 dark:fill-yellow-400 dark:text-yellow-400" />
                    <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-300">
                      {lead.matchPercentage}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-1 flex flex-wrap items-center gap-0.5">
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  {lead.category}
                </Badge>
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  {lead.serviceType}
                </Badge>
              </div>
            </div>

            {/* Client and Description */}
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {lead.clientName}
              </p>
              <p className="line-clamp-1 text-xs text-gray-600 dark:text-gray-400">
                {lead.description}
              </p>
            </div>
          </div>

          {/* Right Side: Budget and Priority */}
          <div className="flex shrink-0 flex-col items-end gap-0.5">
            <div className="flex flex-col items-end">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide leading-tight">Budget</p>
              <p className="text-base font-bold text-green-600 dark:text-green-400 leading-tight">
                {lead.price}
              </p>
            </div>
            <div className="flex flex-col items-end gap-0">
              <p className={cn("text-xs font-bold uppercase tracking-wide leading-tight", priority.className)}>
                {priority.label}
              </p>
              <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{lead.dueDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Details Grid */}
        <div className="mb-2 grid grid-cols-3 gap-1 rounded-md bg-gray-50/50 p-2 dark:bg-gray-900/30">
          <div className="flex flex-col items-center gap-0.5">
            <Calendar className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
            <p className="truncate text-xs text-muted-foreground">Date</p>
            <p className="truncate text-xs font-medium text-gray-900 dark:text-white">
              {lead.eventDate}
            </p>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <MapPin className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
            <p className="truncate text-xs text-muted-foreground">Location</p>
            <p className="truncate text-xs font-medium text-gray-900 dark:text-white">
              {lead.location}
            </p>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <Users className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
            <p className="truncate text-xs text-muted-foreground">Guests</p>
            <p className="truncate text-xs font-medium text-gray-900 dark:text-white">
              {lead.guests}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-1">
          <div className="flex w-full gap-1">
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsRejectDialogOpen(true);
              }}
              className="h-7 flex-1 cursor-pointer px-2 text-xs"
            >
              <XCircle className="mr-1 h-3 w-3" />
              <span>Reject</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                // Update lead status
                onChat();
                // Set initial tab first
                setDialogInitialTab("communications");
                // If dialog is open, close it first then reopen
                if (isDialogOpen) {
                  setIsDialogOpen(false);
                  setIsClosing(true);
                  setTimeout(() => {
                    setIsClosing(false);
                    setIsDialogOpen(true);
                  }, 150);
                } else {
                  // If dialog is closed, just open it
                  setIsClosing(false);
                  setIsDialogOpen(true);
                }
              }}
              className="h-7 flex-1 cursor-pointer px-2 text-xs"
            >
              <MessageSquare className="mr-1 h-3 w-3" />
              <span>Chat</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsAcceptDialogOpen(true);
              }}
              className="h-7 flex-1 cursor-pointer bg-green-600 px-2 text-xs text-white hover:bg-green-700"
            >
              <CheckCircle className="mr-1 h-3 w-3" />
              <span>Accept</span>
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Click to view details
          </p>
        </div>
      </CardContent>

      <LeadDetailDialog
        lead={allLeads.find((l) => l.id === currentLeadId) || lead}
        open={isDialogOpen}
        onOpenChange={handleCloseDialog}
        initialTab={dialogInitialTab}
        allLeads={allLeads}
        onServiceClick={handleServiceClick}
      />

      {/* Accept Confirmation Dialog */}
      <ConfirmationDialog
        open={isAcceptDialogOpen}
        onOpenChange={(open) => {
          setIsAcceptDialogOpen(open);
          if (!open) {
            handleConfirmationClose();
          }
        }}
        onConfirm={() => {
          onAccept();
          setIsAcceptDialogOpen(false);
          handleConfirmationClose();
        }}
        title="Accept Lead?"
        description={`Are you sure you want to accept this lead for "${lead.eventTitle}"? This will move the lead to the "won" status.`}
        confirmText="Accept Lead"
        variant="success"
      />

      {/* Reject Confirmation Dialog */}
      <ConfirmationDialog
        open={isRejectDialogOpen}
        onOpenChange={(open) => {
          setIsRejectDialogOpen(open);
          if (!open) {
            handleConfirmationClose();
          }
        }}
        onConfirm={() => {
          onReject();
          setIsRejectDialogOpen(false);
          handleConfirmationClose();
        }}
        title="Reject Lead?"
        description={`Are you sure you want to reject this lead for "${lead.eventTitle}"? This will move the lead to the "lost" status.`}
        confirmText="Reject Lead"
        variant="destructive"
      />
    </Card>
  );
}

