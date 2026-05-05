"use client";

import { useState, useRef, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Search,
	Upload,
	Grid3x3,
	List,
	FileText,
	FileCheck,
	Eye,
	File,
	X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatFileSize } from "./documents/DocumentHelpers";
import DocumentCard from "./documents/DocumentCard";
import DocumentViewModal from "@/components/vendor/documents/DocumentViewModal";

// Types
export type DocumentType =
	| "invoice"
	| "report"
	| "contract"
	| "proposal"
	| "image"
	| "other";
export type DocumentStatus = "viewed" | "unopened";
export type UploadedBy = "me" | "vendor";

export interface Document {
	id: string;
	name: string;
	type: DocumentType;
	fileType: string; // PDF, JPG, DOCX, etc.
	size: number; // in bytes
	uploadedBy: UploadedBy;
	uploadedDate: string;
	description: string;
	relatedTo: string; // project-id, event-id, etc.
	status: DocumentStatus;
	projectId?: string; // Link document to specific project
	eventId?: string; // Link document to specific event
}

// Mock Documents - Project-specific
const mockDocuments: Document[] = [
	// Project-specific: Wedding Catering (vp1-1)
	{
		id: "1",
		name: "Invoice_Wedding_Catering_Initial.pdf",
		type: "invoice",
		fileType: "PDF",
		size: 439500, // 439.5 KB
		uploadedBy: "vendor",
		uploadedDate: "06/11/2025",
		description: "Initial deposit invoice for wedding catering",
		relatedTo: "vp1-1",
		status: "unopened",
		projectId: "vp1-1",
		eventId: "ve1",
	},
	{
		id: "2",
		name: "Progress_Report_Wedding_Catering.pdf",
		type: "report",
		fileType: "PDF",
		size: 830100, // 830.1 KB
		uploadedBy: "vendor",
		uploadedDate: "05/11/2025",
		description: "Weekly progress report and updates for catering",
		relatedTo: "vp1-1",
		status: "unopened",
		projectId: "vp1-1",
		eventId: "ve1",
	},
	{
		id: "3",
		name: "Menu_Proposal_Wedding.pdf",
		type: "proposal",
		fileType: "PDF",
		size: 1800000, // 1.8 MB
		uploadedBy: "vendor",
		uploadedDate: "25/10/2025",
		description: "Wedding menu proposal with pricing and deliverables",
		relatedTo: "vp1-1",
		status: "viewed",
		projectId: "vp1-1",
		eventId: "ve1",
	},
	{
		id: "4",
		name: "Service_Contract_Wedding_Catering.pdf",
		type: "contract",
		fileType: "PDF",
		size: 2400000, // 2.4 MB
		uploadedBy: "me",
		uploadedDate: "01/11/2025",
		description: "Final signed service contract for wedding catering",
		relatedTo: "vp1-1",
		status: "viewed",
		projectId: "vp1-1",
		eventId: "ve1",
	},
	{
		id: "5",
		name: "Setup_Preview_Wedding.jpg",
		type: "image",
		fileType: "JPG",
		size: 3100000, // 3.1 MB
		uploadedBy: "vendor",
		uploadedDate: "04/11/2025",
		description: "Preview of proposed catering setup and layout",
		relatedTo: "vp1-1",
		status: "unopened",
		projectId: "vp1-1",
		eventId: "ve1",
	},
	// Project-specific: Wedding Decoration (vp1-2)
	{
		id: "6",
		name: "Decoration_Proposal_Wedding.pdf",
		type: "proposal",
		fileType: "PDF",
		size: 1500000, // 1.5 MB
		uploadedBy: "vendor",
		uploadedDate: "28/10/2025",
		description: "Wedding decoration proposal with theme options",
		relatedTo: "vp1-2",
		status: "viewed",
		projectId: "vp1-2",
		eventId: "ve1",
	},
	{
		id: "7",
		name: "Invoice_Decoration_Deposit.pdf",
		type: "invoice",
		fileType: "PDF",
		size: 439500, // 439.5 KB
		uploadedBy: "vendor",
		uploadedDate: "05/11/2025",
		description: "Decoration service deposit invoice",
		relatedTo: "vp1-2",
		status: "unopened",
		projectId: "vp1-2",
		eventId: "ve1",
	},
	{
		id: "8",
		name: "Floral_Arrangement_Mockup.jpg",
		type: "image",
		fileType: "JPG",
		size: 2800000, // 2.8 MB
		uploadedBy: "vendor",
		uploadedDate: "08/11/2025",
		description: "Preview of floral arrangement designs",
		relatedTo: "vp1-2",
		status: "viewed",
		projectId: "vp1-2",
		eventId: "ve1",
	},
	// Project-specific: Venue Rental (vp2-1)
	{
		id: "9",
		name: "Venue_Contract_Sarah_Wedding.pdf",
		type: "contract",
		fileType: "PDF",
		size: 2100000, // 2.1 MB
		uploadedBy: "me",
		uploadedDate: "10/11/2025",
		description: "Signed venue rental contract",
		relatedTo: "vp2-1",
		status: "viewed",
		projectId: "vp2-1",
		eventId: "ve2",
	},
	{
		id: "10",
		name: "Invoice_Venue_Deposit.pdf",
		type: "invoice",
		fileType: "PDF",
		size: 452000, // 452 KB
		uploadedBy: "vendor",
		uploadedDate: "10/11/2025",
		description: "Venue booking deposit invoice",
		relatedTo: "vp2-1",
		status: "unopened",
		projectId: "vp2-1",
		eventId: "ve2",
	},
];

interface VendorDocumentsTabProps {
	vendorName: string;
	selectedEventId?: string | null;
	selectedProjectId?: string | null;
}

export default function VendorDocumentsTab({
	vendorName,
	selectedEventId,
	selectedProjectId,
}: VendorDocumentsTabProps) {
	const [viewMode, setViewMode] = useState<"grid" | "list">("list");
	const [searchQuery, setSearchQuery] = useState("");
	const [typeFilter, setTypeFilter] = useState<string>("all");
	const [uploadedByFilter, setUploadedByFilter] = useState<string>("all");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

	// Upload modal state
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [documentType, setDocumentType] = useState<DocumentType | "">("");
	const [description, setDescription] = useState("");
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// View modal state
	const [viewingDocument, setViewingDocument] = useState<Document | null>(null);

	// Use mock documents
	const allDocuments = mockDocuments;

	// Filter documents by event/project
	const filteredDocumentsByEventProject = useMemo(() => {
		if (!selectedEventId && !selectedProjectId) {
			return allDocuments; // Show all documents
		}

		// Filter by specific project
		if (selectedProjectId) {
			return allDocuments.filter(
				(doc) => doc.projectId === selectedProjectId || doc.relatedTo === selectedProjectId
			);
		}

		// Filter by event (show all documents for projects in that event)
		if (selectedEventId) {
			return allDocuments.filter(
				(doc) => doc.eventId === selectedEventId || doc.relatedTo === selectedEventId
			);
		}

		return allDocuments;
	}, [allDocuments, selectedEventId, selectedProjectId]);

	// Calculate statistics based on filtered documents
	const stats = useMemo(() => {
		return {
			totalDocuments: filteredDocumentsByEventProject.length,
			contracts: filteredDocumentsByEventProject.filter((d) => d.type === "contract").length,
			unopened: filteredDocumentsByEventProject.filter((d) => d.status === "unopened").length,
			totalStorage: filteredDocumentsByEventProject.reduce((sum, doc) => sum + doc.size, 0),
	};
	}, [filteredDocumentsByEventProject]);

	// Filter documents
	const getFilteredDocuments = () => {
		let filtered = filteredDocumentsByEventProject;

		// Search filter
		if (searchQuery) {
			filtered = filtered.filter(
				(d) =>
					d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					d.description.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}

		// Type filter
		if (typeFilter !== "all") {
			filtered = filtered.filter((d) => d.type === typeFilter);
		}

		// Uploaded by filter
		if (uploadedByFilter !== "all") {
			filtered = filtered.filter((d) => d.uploadedBy === uploadedByFilter);
		}

		// Status filter
		if (statusFilter !== "all") {
			if (statusFilter === "viewed") {
				filtered = filtered.filter((d) => d.status !== "unopened");
			} else if (statusFilter === "unopened") {
				filtered = filtered.filter((d) => d.status === "unopened");
			} else {
				filtered = filtered.filter((d) => d.status === statusFilter);
			}
		}

		// Sort
		filtered = [...filtered].sort((a, b) => {
			const dateA = new Date(a.uploadedDate.split("/").reverse().join("-"));
			const dateB = new Date(b.uploadedDate.split("/").reverse().join("-"));
			return sortOrder === "newest"
				? dateB.getTime() - dateA.getTime()
				: dateA.getTime() - dateB.getTime();
		});

		return filtered;
	};

	const filteredDocuments = getFilteredDocuments();

	// Handle file selection
	const handleFileSelect = (file: File) => {
		setSelectedFile(file);
	};

	// Handle drag and drop
	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const files = e.dataTransfer.files;
		if (files && files.length > 0) {
			handleFileSelect(files[0]);
		}
	};

	// Handle file input change
	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			handleFileSelect(files[0]);
		}
	};

	// Handle submit
	const handleSubmit = () => {
		if (!selectedFile || !documentType) {
			return;
		}

		// TODO: Implement actual upload logic here
		console.log("Uploading file:", {
			file: selectedFile,
			type: documentType,
			description: description,
			vendorName,
		});

		// Reset form and close modal
		setSelectedFile(null);
		setDocumentType("");
		setIsUploadModalOpen(false);
	};

	// Reset form when modal closes
	const handleModalClose = (open: boolean) => {
		setIsUploadModalOpen(open);
		if (!open) {
			setSelectedFile(null);
			setDocumentType("");
			setDescription("");
			setIsDragging(false);
		}
	};

	return (
		<div className="space-y-6">
			{/* Analysis Section */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
				<div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-lg bg-muted/30">
					<div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-1.5 sm:p-2 shrink-0">
						<FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
					</div>
					<div className="min-w-0">
						<div className="text-xs sm:text-sm text-muted-foreground">
							Total Documents
						</div>
						<div className="text-sm sm:text-lg font-semibold">
							{stats.totalDocuments}
						</div>
					</div>
				</div>

				<div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-lg bg-muted/30">
					<div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-1.5 sm:p-2 shrink-0">
						<FileCheck className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
					</div>
					<div className="min-w-0">
						<div className="text-xs sm:text-sm text-muted-foreground">
							Contracts
						</div>
						<div className="text-sm sm:text-lg font-semibold">
							{stats.contracts}
						</div>
					</div>
				</div>

				<div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-lg bg-muted/30">
					<div className="rounded-lg bg-orange-100 dark:bg-orange-900/30 p-1.5 sm:p-2 shrink-0">
						<Eye className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
					</div>
					<div className="min-w-0">
						<div className="text-xs sm:text-sm text-muted-foreground">
							Unopened
						</div>
						<div className="text-sm sm:text-lg font-semibold">
							{stats.unopened}
						</div>
					</div>
				</div>

				<div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-lg bg-muted/30">
					<div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-1.5 sm:p-2 shrink-0">
						<File className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
					</div>
					<div className="min-w-0">
						<div className="text-xs sm:text-sm text-muted-foreground">
							Total Storage
						</div>
						<div className="text-sm sm:text-lg font-semibold truncate">
							{formatFileSize(stats.totalStorage)}
						</div>
					</div>
				</div>
			</div>

			{/* Bar #1 - Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
				<div>
					<h3 className="text-lg sm:text-xl font-semibold mb-1">
						Documents & Files
					</h3>
					<p className="text-xs sm:text-sm text-muted-foreground">
						All documents exchanged with {vendorName}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button
						onClick={() => setIsUploadModalOpen(true)}
						className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
					>
						<Upload className="mr-2 h-4 w-4" />
						<span className="hidden sm:inline">Upload Document</span>
						<span className="sm:hidden">Upload</span>
					</Button>
					<div className="flex rounded-md border">
						<Button
							variant={viewMode === "grid" ? "default" : "ghost"}
							size="icon"
							onClick={() => setViewMode("grid")}
							className={
								viewMode === "grid"
									? "rounded-r-none bg-blue-600 hover:bg-blue-700"
									: "rounded-r-none"
							}
						>
							<Grid3x3 className="h-4 w-4" />
						</Button>
						<Button
							variant={viewMode === "list" ? "default" : "ghost"}
							size="icon"
							onClick={() => setViewMode("list")}
							className={
								viewMode === "list"
									? "rounded-l-none bg-blue-600 hover:bg-blue-700"
									: "rounded-l-none"
							}
						>
							<List className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* Bar #2 - Search and Filters */}
			<div className="flex flex-col gap-4 md:flex-row md:items-center">
				{/* Search Bar */}
				<div className="relative flex-1 max-w-md rounded-lg border pl-2 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="Search documents..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-8 pr-2 py-2 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
					/>
				</div>

				{/* Filters */}
				<div className="flex gap-2 flex-wrap">
					<Select value={typeFilter} onValueChange={setTypeFilter}>
						<SelectTrigger className="w-full sm:w-[140px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Types</SelectItem>
							<SelectItem value="invoice">Invoice</SelectItem>
							<SelectItem value="report">Report</SelectItem>
							<SelectItem value="contract">Contract</SelectItem>
							<SelectItem value="proposal">Proposal</SelectItem>
							<SelectItem value="image">Image</SelectItem>
							<SelectItem value="other">Other</SelectItem>
						</SelectContent>
					</Select>

					<Select value={uploadedByFilter} onValueChange={setUploadedByFilter}>
						<SelectTrigger className="w-full sm:w-[120px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="me">By Me</SelectItem>
							<SelectItem value="vendor">By Vendor</SelectItem>
						</SelectContent>
					</Select>

					<Select value={statusFilter} onValueChange={setStatusFilter}>
						<SelectTrigger className="w-full sm:w-[140px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="viewed">Viewed</SelectItem>
							<SelectItem value="unopened">Unopened</SelectItem>
							<SelectItem value="pending_review">Pending Review</SelectItem>
							<SelectItem value="approved">Approved</SelectItem>
							<SelectItem value="draft">Draft</SelectItem>
							<SelectItem value="final">Final</SelectItem>
						</SelectContent>
					</Select>

					<Select
						value={sortOrder}
						onValueChange={(v) => setSortOrder(v as "newest" | "oldest")}
					>
						<SelectTrigger className="w-full sm:w-[150px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="newest">Newest first</SelectItem>
							<SelectItem value="oldest">Oldest first</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Document Cards */}
			<div
				className={cn(
					viewMode === "grid"
						? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
						: "space-y-3",
				)}
			>
				{filteredDocuments.length === 0 ? (
					<div className="col-span-full flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
						<div className="text-center">
							<p className="text-lg font-semibold text-muted-foreground">
								No documents found
							</p>
							<p className="text-sm text-muted-foreground">
								{searchQuery ||
								typeFilter !== "all" ||
								uploadedByFilter !== "all" ||
								statusFilter !== "all"
									? "Try adjusting your search or filters"
									: "Upload your first document to get started"}
							</p>
						</div>
					</div>
				) : (
					filteredDocuments.map((doc) => (
						<DocumentCard
							key={doc.id}
							document={doc}
							viewMode={viewMode}
							vendorName={vendorName}
							onView={() => setViewingDocument(doc)}
						/>
					))
				)}
			</div>

			{/* Upload Document Modal */}
			<Dialog open={isUploadModalOpen} onOpenChange={handleModalClose}>
				<DialogContent className="sm:max-w-[500px] !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.98)] dark:[background-color:#020617]">
					<DialogHeader>
						<DialogTitle>Upload Document</DialogTitle>
						<DialogDescription>
							Select a document type and upload a file to share with{" "}
							{vendorName}
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4 py-4">
						{/* Document Type Selector */}
						<div className="space-y-2">
							<label className="text-sm font-medium">
								Document Type <span className="text-red-500">*</span>
							</label>
							<Select
								value={documentType}
								onValueChange={(value) =>
									setDocumentType(value as DocumentType)
								}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select document type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="invoice">Invoice</SelectItem>
									<SelectItem value="report">Report</SelectItem>
									<SelectItem value="contract">Contract</SelectItem>
									<SelectItem value="proposal">Proposal</SelectItem>
									<SelectItem value="image">Image</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Description Field */}
						<div className="space-y-2">
							<label className="text-sm font-medium">
								Description
							</label>
							<Textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Enter a description for this document (optional)"
								className="min-h-[100px] resize-none"
							/>
						</div>

						{/* Drag and Drop Area */}
						<div className="space-y-2">
							<label className="text-sm font-medium">
								Document File <span className="text-red-500">*</span>
							</label>
							<div
								onDragEnter={handleDragEnter}
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}
								className={cn(
									"relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
									isDragging
										? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
										: "border-gray-300 dark:border-slate-600 bg-muted/30 hover:border-blue-400 dark:hover:border-blue-500",
								)}
								onClick={() => fileInputRef.current?.click()}
							>
								<input
									ref={fileInputRef}
									type="file"
									className="hidden"
									onChange={handleFileInputChange}
									accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
								/>

								{selectedFile ? (
									<div className="space-y-2">
										<FileText className="h-12 w-12 mx-auto text-blue-600" />
										<div>
											<p className="text-sm font-medium text-gray-900 dark:text-slate-200">
												{selectedFile.name}
											</p>
											<p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
												{formatFileSize(selectedFile.size)}
											</p>
										</div>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={(e) => {
												e.stopPropagation();
												setSelectedFile(null);
												if (fileInputRef.current) {
													fileInputRef.current.value = "";
												}
											}}
											className="mt-2"
										>
											<X className="h-4 w-4 mr-1" />
											Remove
										</Button>
									</div>
								) : (
									<div className="space-y-2">
										<Upload className="h-12 w-12 mx-auto text-gray-400 dark:text-slate-500" />
										<div>
											<p className="text-sm font-medium text-gray-700 dark:text-slate-200">
												Drag and drop your file here
											</p>
											<p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
												or click to browse
											</p>
											<p className="text-xs text-gray-400 dark:text-slate-500 mt-2">
												PDF, DOC, DOCX, JPG, PNG, XLS, XLSX
											</p>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					<DialogFooter>
						<Button variant="outline" onClick={() => handleModalClose(false)}>
							Cancel
						</Button>
						<Button
							onClick={handleSubmit}
							disabled={!selectedFile || !documentType}
							className="bg-blue-600 hover:bg-blue-700"
						>
							Upload Document
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Document View Modal */}
			<DocumentViewModal
				open={!!viewingDocument}
				onOpenChange={(open) => !open && setViewingDocument(null)}
				document={viewingDocument}
			/>
		</div>
	);
}
