import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  BarChart3,
  FileText,
  FileCheck,
  Image as ImageIcon,
  Eye,
  File,
} from "lucide-react";
import { DocumentType, DocumentStatus } from "../client-hub/mockClients";

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

// Get document icon
export const getDocumentIcon = (type: DocumentType): React.ReactElement => {
  switch (type) {
    case "invoice":
      return <DollarSign className="h-5 w-5 text-green-600" />;
    case "report":
      return <BarChart3 className="h-5 w-5 text-orange-600" />;
    case "contract":
      return <FileText className="h-5 w-5 text-blue-600" />;
    case "proposal":
      return <FileCheck className="h-5 w-5 text-purple-600" />;
    case "image":
      return <ImageIcon className="h-5 w-5 text-pink-600" />;
    default:
      return <File className="h-5 w-5 text-gray-600" />;
  }
};

// Get status badge
export const getStatusBadge = (status: DocumentStatus): React.ReactElement | null => {
  switch (status) {
    case "unopened":
      return (
        <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-xs">
          <Eye className="h-3 w-3 mr-1" />
          Unopened
        </Badge>
      );
    case "viewed":
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
          Viewed
        </Badge>
      );
    default:
      return null;
  }
};

// Get type badge
export const getTypeBadge = (type: DocumentType): React.ReactElement => {
  const labels: Record<DocumentType, string> = {
    invoice: "invoice",
    report: "report",
    contract: "contract",
    proposal: "proposal",
    image: "image",
    other: "other",
  };

  const colors: Record<DocumentType, string> = {
    invoice: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    report: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    contract: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    proposal: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    image: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    other: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  };

  return (
    <Badge className={`${colors[type]} text-xs`}>
      {labels[type]}
    </Badge>
  );
};

