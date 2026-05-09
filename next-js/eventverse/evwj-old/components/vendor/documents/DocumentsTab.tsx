"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    Upload,
    Grid3x3,
    List,
    FileText,
    FileCheck,
    Eye,
    File,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatFileSize } from "./DocumentHelpers";
import DocumentCard from "./DocumentCard";
import DocumentStatCard from "./DocumentStatCard";
import SearchAndFilters from "./SearchAndFilters";
import EmptyState from "../client-hub/components/EmptyState";
import { mockVendorDocuments, VendorDocument } from "./mockDocuments";
import { DocumentType } from "../client-hub/mockClients";
import DocumentViewModal from "./DocumentViewModal";

export default function DocumentsTab() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [uploadedByFilter, setUploadedByFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Upload modal state
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [documentType, setDocumentType] = useState<DocumentType | "">("");
    const [description, setDescription] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // View modal state
    const [viewingDocument, setViewingDocument] = useState<VendorDocument | null>(null);

    // Use vendor documents
    const documents: VendorDocument[] = mockVendorDocuments;

    // Calculate statistics
    const stats = {
        totalDocuments: documents.length,
        contracts: documents.filter((d) => d.type === "contract").length,
        unopened: documents.filter((d) => d.status === "unopened").length,
        totalStorage: documents.reduce((sum, doc) => sum + doc.size, 0),
    };

    // Filter documents
    const filteredDocuments = useMemo(() => {
        let filtered = documents;

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(
                (d) =>
                    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    d.description.toLowerCase().includes(searchQuery.toLowerCase())
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
    }, [documents, searchQuery, typeFilter, uploadedByFilter, statusFilter, sortOrder]);

    // Paginated documents
    const paginatedDocuments = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredDocuments.slice(startIndex, endIndex);
    }, [filteredDocuments, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, typeFilter, uploadedByFilter, statusFilter, sortOrder]);

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
        });

        // Reset form and close modal
        setSelectedFile(null);
        setDocumentType("");
        setDescription("");
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
            {/* Statistics Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                <DocumentStatCard
                    label="Total Documents"
                    value={stats.totalDocuments}
                    icon={FileText}
                    iconBgColor="bg-blue-100 dark:bg-blue-900/30"
                    iconColor="text-blue-600"
                />

                <DocumentStatCard
                    label="Contracts"
                    value={stats.contracts}
                    icon={FileCheck}
                    iconBgColor="bg-purple-100 dark:bg-purple-900/30"
                    iconColor="text-purple-600"
                />

                <DocumentStatCard
                    label="Unopened"
                    value={stats.unopened}
                    icon={Eye}
                    iconBgColor="bg-orange-100 dark:bg-orange-900/30"
                    iconColor="text-orange-600"
                />

                <DocumentStatCard
                    label="Total Storage"
                    value={<span className="truncate">{formatFileSize(stats.totalStorage)}</span>}
                    icon={File}
                    iconBgColor="bg-green-100 dark:bg-green-900/30"
                    iconColor="text-green-600"
                />
            </div>

            {/* Bar #1 - Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">Documents & Files</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        All your business documents and files
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
            <SearchAndFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                typeFilter={typeFilter}
                onTypeFilterChange={setTypeFilter}
                uploadedByFilter={uploadedByFilter}
                onUploadedByFilterChange={setUploadedByFilter}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                sortOrder={sortOrder}
                onSortOrderChange={setSortOrder}
            />

            {/* Document Cards */}
            <div
                className={cn(
                    viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        : "space-y-3"
                )}
            >
                {filteredDocuments.length === 0 ? (
                    <div className="col-span-full">
                        <EmptyState
                            title="No documents found"
                            description={
                                searchQuery || typeFilter !== "all" || uploadedByFilter !== "all" || statusFilter !== "all"
                                    ? "Try adjusting your search or filters"
                                    : "Upload your first document to get started"
                            }
                            className="min-h-[300px]"
                        />
                    </div>
                ) : (
                    paginatedDocuments.map((doc) => (
                        <DocumentCard
                            key={doc.id}
                            document={doc}
                            viewMode={viewMode}
                            onView={() => setViewingDocument(doc)}
                        />
                    ))
                )}
            </div>

            {/* Pagination */}
            {filteredDocuments.length > 0 && (
                <Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
                    <CardContent className="p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 dark:text-slate-400">
                                    Items per page:
                                </span>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="dark:bg-background rounded-md border px-3 py-1.5 text-sm !bg-white dark:!bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                    <option value={40}>40</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 dark:text-slate-400">
                                    Showing {startIndex + 1} -{" "}
                                    {Math.min(endIndex, filteredDocuments.length)} of{" "}
                                    {filteredDocuments.length}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setCurrentPage((prev) => Math.max(1, prev - 1))
                                        }
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <span className="px-2 text-sm text-gray-600 dark:text-slate-400">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.min(totalPages, prev + 1),
                                            )
                                        }
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Upload Document Modal */}
            <Dialog open={isUploadModalOpen} onOpenChange={handleModalClose}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Upload Document</DialogTitle>
                        <DialogDescription>
                            Select a document type and upload a file
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {/* Document Type Selector */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Document Type <span className="text-red-500">*</span>
                            </label>
                            <Select value={documentType || undefined} onValueChange={(value) => setDocumentType(value as DocumentType)}>
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
                                        : "border-gray-300 dark:border-slate-600 bg-muted/30 hover:border-blue-400 dark:hover:border-blue-500"
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
                        <Button
                            variant="outline"
                            onClick={() => handleModalClose(false)}
                        >
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

