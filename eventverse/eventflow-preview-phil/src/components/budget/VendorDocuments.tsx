import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import DocumentPreviewDialog from "./DocumentPreviewDialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  FileText,
  FileCheck,
  Receipt,
  Image,
  FileBarChart,
  File,
  Search,
  Download,
  Eye,
  Trash2,
  Upload,
  Grid,
  List,
  Filter,
  User
} from "lucide-react";
import type { VendorProfile } from "@/types/budget";
import type { VendorDocument } from "./VendorManagementHub";

interface VendorDocumentsProps {
  vendor: VendorProfile;
  documents: VendorDocument[];
}

const VendorDocuments = ({ vendor, documents }: VendorDocumentsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [uploaderFilter, setUploaderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [previewDocument, setPreviewDocument] = useState<VendorDocument | null>(null);

  // Mark document as viewed
  const handleViewDocument = (doc: VendorDocument) => {
    setPreviewDocument(doc);
    // In a real app, this would update the viewed status in the backend
    console.log("Marking document as viewed:", doc.name);
  };

  // Get document type icon
  const getDocumentIcon = (type: string, fileType: string) => {
    switch (type) {
      case 'contract':
        return <FileText className="w-6 h-6 text-blue-600" />;
      case 'proposal':
        return <FileCheck className="w-6 h-6 text-purple-600" />;
      case 'invoice':
      case 'receipt':
        return <Receipt className="w-6 h-6 text-green-600" />;
      case 'image':
        return <Image className="w-6 h-6 text-pink-600" />;
      case 'report':
        return <FileBarChart className="w-6 h-6 text-orange-600" />;
      default:
        return <File className="w-6 h-6 text-gray-600" />;
    }
  };

  // Get document type badge color
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'contract': return 'default';
      case 'proposal': return 'secondary';
      case 'invoice': return 'default';
      case 'receipt': return 'secondary';
      case 'image': return 'outline';
      case 'report': return 'outline';
      default: return 'outline';
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status?: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending_review': return 'secondary';
      case 'draft': return 'outline';
      case 'final': return 'default';
      default: return 'outline';
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Filter and sort documents
  let filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesUploader = uploaderFilter === 'all' || doc.uploadedBy === uploaderFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'unread' && !doc.viewedBy?.includes('host')) ||
      (statusFilter === 'read' && doc.viewedBy?.includes('host'));
    
    return matchesSearch && matchesType && matchesUploader && matchesStatus;
  });

  // Sort documents
  filteredDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return b.uploadedDate.getTime() - a.uploadedDate.getTime();
      case 'date-asc':
        return a.uploadedDate.getTime() - b.uploadedDate.getTime();
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'size-desc':
        return b.size - a.size;
      case 'size-asc':
        return a.size - b.size;
      default:
        return 0;
    }
  });

  // Calculate stats
  const totalDocuments = documents.length;
  const contractCount = documents.filter(d => d.type === 'contract').length;
  const unopenedCount = documents.filter(d => !d.viewedBy?.includes('host')).length;
  const recentUploads = documents.filter(d => 
    d.uploadedDate >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;
  const totalSize = documents.reduce((sum, doc) => sum + doc.size, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <File className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold">{totalDocuments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Contracts</p>
                <p className="text-2xl font-bold">{contractCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Unopened</p>
                <p className="text-2xl font-bold">{unopenedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileBarChart className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Total Storage</p>
                <p className="text-2xl font-bold">{formatFileSize(totalSize)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Documents Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Documents & Files</CardTitle>
              <CardDescription>All documents exchanged with {vendor.name}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="contract">Contracts</SelectItem>
                <SelectItem value="proposal">Proposals</SelectItem>
                <SelectItem value="invoice">Invoices</SelectItem>
                <SelectItem value="receipt">Receipts</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="report">Reports</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={uploaderFilter} onValueChange={setUploaderFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Uploaded by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="host">Uploaded by me</SelectItem>
                <SelectItem value="vendor">Uploaded by vendor</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unopened</SelectItem>
                <SelectItem value="read">Viewed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest first</SelectItem>
                <SelectItem value="date-asc">Oldest first</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="size-desc">Largest first</SelectItem>
                <SelectItem value="size-asc">Smallest first</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Documents Display */}
          {viewMode === "list" ? (
            <div className="space-y-2">
              {filteredDocuments.map((doc) => {
                const isUnopened = !doc.viewedBy?.includes('host');
                const uploadedByHost = doc.uploadedBy === 'host';
                
                return (
                  <div
                    key={doc.id}
                    className={`flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors ${
                      isUnopened ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`flex-shrink-0 ${isUnopened ? 'opacity-100' : 'opacity-70'}`}>
                        {getDocumentIcon(doc.type, doc.fileType)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <p className="font-medium truncate">{doc.name}</p>
                          
                          {isUnopened && (
                            <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                              <Eye className="w-3 h-3 mr-1" />
                              Unopened
                            </Badge>
                          )}
                          
                          <Badge variant="outline" className={
                            uploadedByHost 
                              ? "bg-green-50 text-green-700 border-green-300" 
                              : "bg-purple-50 text-purple-700 border-purple-300"
                          }>
                            <User className="w-3 h-3 mr-1" />
                            {uploadedByHost ? "Uploaded by You" : `Uploaded by ${vendor.name}`}
                          </Badge>
                          
                          <Badge variant={getTypeBadgeColor(doc.type)}>
                            {doc.type}
                          </Badge>
                          {doc.status && (
                            <Badge variant={getStatusBadgeColor(doc.status)}>
                              {doc.status.replace('_', ' ')}
                            </Badge>
                          )}
                        </div>
                      
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{doc.fileType.toUpperCase()}</span>
                        <span>•</span>
                        <span>{formatFileSize(doc.size)}</span>
                        <span>•</span>
                        <span>Uploaded by {doc.uploadedBy === 'host' ? 'You' : vendor.name}</span>
                        <span>•</span>
                        <span>{doc.uploadedDate.toLocaleDateString()}</span>
                      </div>
                      
                      {doc.description && (
                        <p className="text-sm text-muted-foreground mt-1 truncate">
                          {doc.description}
                        </p>
                      )}
                      
                      {doc.relatedTo && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Related to: {doc.relatedTo}
                        </p>
                      )}
                    </div>
                  </div>
                  
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDocument(doc)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => window.open(doc.url, '_blank')}>
                          <Download className="w-4 h-4" />
                        </Button>
                        {uploadedByHost && (
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      {getDocumentIcon(doc.type, doc.fileType)}
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setPreviewDocument(doc)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => window.open(doc.url, '_blank')}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-2 truncate">{doc.name}</h4>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant={getTypeBadgeColor(doc.type)} className="text-xs">
                        {doc.type}
                      </Badge>
                      {doc.status && (
                        <Badge variant={getStatusBadgeColor(doc.status)} className="text-xs">
                          {doc.status.replace('_', ' ')}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>{doc.fileType.toUpperCase()} • {formatFileSize(doc.size)}</p>
                      <p>By {doc.uploadedBy === 'host' ? 'You' : vendor.name}</p>
                      <p>{doc.uploadedDate.toLocaleDateString()}</p>
                    </div>
                    
                    {doc.description && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {doc.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <File className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No documents found</h3>
              <p className="text-gray-500">
                {documents.length === 0 
                  ? "No documents have been uploaded yet" 
                  : "Try adjusting your filters"
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Preview Dialog */}
      <DocumentPreviewDialog
        document={previewDocument}
        onClose={() => setPreviewDocument(null)}
        vendorName={vendor.name}
      />
    </div>
  );
};

export default VendorDocuments;
