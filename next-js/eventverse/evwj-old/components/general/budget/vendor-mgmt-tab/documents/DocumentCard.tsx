"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Trash2 } from "lucide-react";
import { Document } from "../VendorDocumentsTab";
import {
	formatFileSize,
	getDocumentIcon,
	getStatusBadge,
	getTypeBadge,
} from "./DocumentHelpers";

interface DocumentCardProps {
	document: Document;
	viewMode: "grid" | "list";
	vendorName: string;
	onView?: () => void;
}

export default function DocumentCard({
	document,
	viewMode,
	vendorName,
	onView,
}: DocumentCardProps) {
	const isUploadedByMe = document.uploadedBy === "me";

	if (viewMode === "grid") {
		return (
			<div className="rounded-lg border !bg-white dark:!bg-[#020617] p-3 sm:p-4 hover:border-primary/50 transition-colors [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
				<div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
					<div className="shrink-0">{getDocumentIcon(document.type)}</div>
					<div className="flex-1 min-w-0">
						<h4 className="font-semibold text-xs sm:text-sm truncate mb-1">
							{document.name}
						</h4>
						<p className="text-xs text-muted-foreground">
							{document.fileType} • {formatFileSize(document.size)}
						</p>
					</div>
				</div>

				<p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
					{document.description}
				</p>

				<div className="text-xs text-muted-foreground mb-2 sm:mb-3">
					Related to: {document.relatedTo}
				</div>

				<div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
					<Badge
						className={
							isUploadedByMe
								? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs max-w-[calc(100%-0.5rem)]"
								: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-xs max-w-[calc(100%-0.5rem)]"
						}
					>
						<span className="truncate inline-block max-w-full">
							{isUploadedByMe ? (
								"Uploaded by You"
							) : (
								<>
									<span className="hidden sm:inline">Uploaded by </span>
									<span className="truncate inline-block">{vendorName}</span>
								</>
							)}
						</span>
					</Badge>
					{getTypeBadge(document.type)}
					{getStatusBadge(document.status)}
				</div>

				<div className="flex items-center justify-between pt-2 sm:pt-3 border-t">
					<span className="text-xs text-muted-foreground">
						{document.uploadedDate}
					</span>
					<div className="flex gap-1 sm:gap-2">
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7 sm:h-8 sm:w-8"
							onClick={onView}
						>
							<Eye className="h-3 w-3 sm:h-4 sm:w-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7 sm:h-8 sm:w-8"
						>
							<Download className="h-3 w-3 sm:h-4 sm:w-4" />
						</Button>
						{isUploadedByMe && (
							<Button
								variant="ghost"
								size="icon"
								className="h-7 w-7 sm:h-8 sm:w-8 text-red-600 hover:text-red-700"
							>
								<Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
							</Button>
						)}
					</div>
				</div>
			</div>
		);
	}

	// List view
	return (
		<div className="rounded-lg border !bg-white dark:!bg-[#020617] p-3 sm:p-4 hover:border-primary/50 transition-colors [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
			<div className="flex items-start gap-3 sm:gap-4">
				<div className="shrink-0">{getDocumentIcon(document.type)}</div>

				<div className="flex-1 min-w-0">
					<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-2">
						<div className="flex-1 min-w-0">
							<h4 className="font-semibold text-sm sm:text-base mb-1 truncate">
								{document.name}
							</h4>
							<p className="text-xs sm:text-sm text-muted-foreground mb-2">
								{document.fileType} • {formatFileSize(document.size)} •{" "}
								{isUploadedByMe
									? "Uploaded by You"
									: `Uploaded by ${vendorName}`}{" "}
								• {document.uploadedDate}
							</p>
							<p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
								{document.description}
							</p>
							<p className="text-xs text-muted-foreground mb-2">
								Related to: {document.relatedTo}
							</p>
						</div>

						<div className="flex gap-2 shrink-0">
							<Button 
								variant="ghost" 
								size="icon" 
								className="h-8 w-8"
								onClick={onView}
							>
								<Eye className="h-4 w-4" />
							</Button>
							<Button variant="ghost" size="icon" className="h-8 w-8">
								<Download className="h-4 w-4" />
							</Button>
							{isUploadedByMe && (
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 text-red-600 hover:text-red-700"
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							)}
						</div>
					</div>

					<div className="flex flex-wrap gap-1 sm:gap-2">
						<Badge
							className={
								isUploadedByMe
									? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs max-w-[calc(100%-0.5rem)] sm:max-w-none"
									: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-xs max-w-[calc(100%-0.5rem)] sm:max-w-none"
							}
						>
							<span className="truncate inline-block max-w-full">
								{isUploadedByMe ? (
									"Uploaded by You"
								) : (
									<>
										<span className="hidden sm:inline">Uploaded by </span>
										<span className="truncate inline-block">{vendorName}</span>
									</>
								)}
							</span>
						</Badge>
						{getTypeBadge(document.type)}
						{getStatusBadge(document.status)}
					</div>
				</div>
			</div>
		</div>
	);
}
