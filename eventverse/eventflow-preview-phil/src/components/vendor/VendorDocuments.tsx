
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Plus, 
  Download, 
  Edit, 
  Copy, 
  Trash2, 
  Wand2, 
  Save,
  Upload,
  Eye,
  Search,
  Filter,
  User
} from "lucide-react";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface DocumentTemplate {
  id: string;
  name: string;
  type: "contract" | "proposal" | "nda" | "agreement" | "invoice" | "custom";
  description: string;
  content: string;
  variables: string[];
  createdDate: string;
  lastModified: string;
  isDefault: boolean;
}

interface GeneratedDocument {
  id: string;
  name: string;
  templateId: string;
  clientName: string;
  content: string;
  status: "draft" | "finalized" | "sent";
  createdDate: string;
}

interface SharedDocument {
  id: string;
  name: string;
  type: "contract" | "invoice" | "proposal" | "photo" | "floorplan" | "menu" | "timeline" | "other";
  uploadedBy: "vendor" | "host";
  uploaderName: string;
  uploadDate: string;
  fileSize: number;
  fileUrl: string;
  viewedBy: Array<"vendor" | "host">;
  lastViewed?: {
    vendor?: string;
    host?: string;
  };
  clientId: string;
}

interface VendorDocumentsProps {
  vendor: VendorUser;
}

const VendorDocuments = ({ vendor }: VendorDocumentsProps) => {
  const [activeTab, setActiveTab] = useState("generator");
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [documentType, setDocumentType] = useState("all");
  const [uploaderFilter, setUploaderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock templates
  const [templates] = useState<DocumentTemplate[]>([
    {
      id: "1",
      name: "Standard Service Agreement",
      type: "contract",
      description: "Basic service agreement template for catering services",
      content: "SERVICE AGREEMENT\n\nThis agreement is between {vendorName} and {clientName}...",
      variables: ["vendorName", "clientName", "serviceDate", "totalAmount"],
      createdDate: "2024-01-01",
      lastModified: "2024-01-15",
      isDefault: true
    },
    {
      id: "2",
      name: "Wedding Catering Proposal",
      type: "proposal",
      description: "Detailed proposal template for wedding catering services",
      content: "WEDDING CATERING PROPOSAL\n\nDear {clientName},\n\nThank you for considering {vendorName}...",
      variables: ["clientName", "vendorName", "weddingDate", "guestCount", "menuOptions"],
      createdDate: "2024-01-05",
      lastModified: "2024-01-20",
      isDefault: true
    },
    {
      id: "3",
      name: "Non-Disclosure Agreement",
      type: "nda",
      description: "Standard NDA for protecting confidential information",
      content: "NON-DISCLOSURE AGREEMENT\n\nThis Non-Disclosure Agreement...",
      variables: ["clientName", "vendorName", "effectiveDate"],
      createdDate: "2024-01-03",
      lastModified: "2024-01-10",
      isDefault: true
    }
  ]);

  // Mock generated documents
  const [documents] = useState<GeneratedDocument[]>([
    {
      id: "1",
      name: "Sarah Johnson Wedding Contract",
      templateId: "1",
      clientName: "Sarah Johnson",
      content: "Generated contract content...",
      status: "finalized",
      createdDate: "2024-01-20"
    },
    {
      id: "2",
      name: "Elite Events Proposal",
      templateId: "2",
      clientName: "Elite Events Inc",
      content: "Generated proposal content...",
      status: "sent",
      createdDate: "2024-01-18"
    }
  ]);

  // Mock shared documents
  const [sharedDocuments] = useState<SharedDocument[]>([
    {
      id: "sd1",
      name: "Wedding Contract - Signed.pdf",
      type: "contract",
      uploadedBy: "vendor",
      uploaderName: "Your Catering Business",
      uploadDate: "2024-01-20T14:30:00",
      fileSize: 2457600,
      fileUrl: "/documents/contract-001.pdf",
      viewedBy: ["vendor", "host"],
      lastViewed: {
        vendor: "2024-01-20T14:30:00",
        host: "2024-01-21T09:15:00"
      },
      clientId: "1"
    },
    {
      id: "sd2",
      name: "Venue Floor Plan.jpg",
      type: "floorplan",
      uploadedBy: "host",
      uploaderName: "Sarah Johnson",
      uploadDate: "2024-01-22T10:00:00",
      fileSize: 1536000,
      fileUrl: "/documents/floorplan-001.jpg",
      viewedBy: ["host"],
      lastViewed: {
        host: "2024-01-22T10:00:00"
      },
      clientId: "1"
    },
    {
      id: "sd3",
      name: "Final Guest Count.xlsx",
      type: "other",
      uploadedBy: "host",
      uploaderName: "Elite Events Inc",
      uploadDate: "2024-01-23T16:45:00",
      fileSize: 512000,
      fileUrl: "/documents/guest-count.xlsx",
      viewedBy: ["host"],
      clientId: "2"
    },
    {
      id: "sd4",
      name: "Invoice #001234.pdf",
      type: "invoice",
      uploadedBy: "vendor",
      uploaderName: "Your Catering Business",
      uploadDate: "2024-01-15T11:00:00",
      fileSize: 358400,
      fileUrl: "/documents/invoice-001234.pdf",
      viewedBy: ["vendor", "host"],
      lastViewed: {
        vendor: "2024-01-15T11:00:00",
        host: "2024-01-16T08:30:00"
      },
      clientId: "1"
    }
  ]);

  const handleGenerateDocument = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(`# ${aiPrompt}\n\nThis is a generated document based on your request:\n\n${aiPrompt}\n\n## Document Content\n\nBased on your requirements, here's a professional document template that includes:\n\n- Clear terms and conditions\n- Payment schedules\n- Delivery timelines\n- Cancellation policies\n\n[Generated content would appear here...]`);
      setIsGenerating(false);
    }, 2000);
  };

  const getTypeColor = (type: DocumentTemplate["type"]) => {
    switch (type) {
      case "contract": return "bg-blue-100 text-blue-800";
      case "proposal": return "bg-green-100 text-green-800";
      case "nda": return "bg-purple-100 text-purple-800";
      case "agreement": return "bg-orange-100 text-orange-800";
      case "invoice": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: GeneratedDocument["status"]) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800";
      case "finalized": return "bg-green-100 text-green-800";
      case "sent": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = documentType === "all" || template.type === documentType;
    return matchesSearch && matchesType;
  });

  const filteredSharedDocuments = sharedDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUploader = uploaderFilter === "all" || doc.uploadedBy === uploaderFilter;
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "unread" && !doc.viewedBy.includes("vendor")) ||
      (statusFilter === "read" && doc.viewedBy.includes("vendor"));
    return matchesSearch && matchesUploader && matchesStatus;
  });

  const handleViewDocument = (document: SharedDocument) => {
    // Mark as viewed
    console.log("Viewing document:", document.name);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Document Management</h2>
          <p className="text-gray-600">Generate, manage, and customize your business documents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Template
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="generator">AI Generator</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="shared">
            Shared Docs
            {sharedDocuments.filter(d => !d.viewedBy.includes('vendor')).length > 0 && (
              <Badge className="ml-2 bg-orange-500 text-white h-5 min-w-[20px] px-1.5 rounded-full">
                {sharedDocuments.filter(d => !d.viewedBy.includes('vendor')).length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Generator Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  AI Document Generator
                </CardTitle>
                <CardDescription>
                  Describe the document you need and let AI generate it for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Document Type</label>
                  <Select defaultValue="contract">
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Service Contract</SelectItem>
                      <SelectItem value="proposal">Project Proposal</SelectItem>
                      <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                      <SelectItem value="agreement">General Agreement</SelectItem>
                      <SelectItem value="invoice">Invoice Template</SelectItem>
                      <SelectItem value="custom">Custom Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Client Information</label>
                  <Input placeholder="Client name (optional)" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">AI Prompt</label>
                  <Textarea
                    placeholder="Describe the document you need... e.g., 'Create a catering service contract for a wedding with 100 guests, including setup, service, and cleanup. Payment terms should be 50% upfront and 50% on completion.'"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={6}
                  />
                </div>

                <Button 
                  onClick={handleGenerateDocument} 
                  disabled={!aiPrompt.trim() || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Document
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Content Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Document Preview</CardTitle>
                <CardDescription>
                  Preview and edit your AI-generated document
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-gray-50 min-h-[300px]">
                      <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
                    </div>
                    <div className="flex gap-2">
                      <Button>
                        <Save className="w-4 h-4 mr-2" />
                        Save as Template
                      </Button>
                      <Button variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>Generate a document to see the preview here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="contract">Contracts</SelectItem>
                    <SelectItem value="proposal">Proposals</SelectItem>
                    <SelectItem value="nda">NDAs</SelectItem>
                    <SelectItem value="agreement">Agreements</SelectItem>
                    <SelectItem value="invoice">Invoices</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                    <Badge className={getTypeColor(template.type)}>
                      {template.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Variables */}
                    <div>
                      <p className="text-sm font-medium mb-2">Variables:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="text-xs text-gray-500">
                      <p>Created: {new Date(template.createdDate).toLocaleDateString()}</p>
                      <p>Modified: {new Date(template.lastModified).toLocaleDateString()}</p>
                      {template.isDefault && (
                        <Badge variant="secondary" className="text-xs mt-1">Default</Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Use
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      {!template.isDefault && (
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Documents</CardTitle>
              <CardDescription>Manage your created documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{document.name}</p>
                        <p className="text-sm text-gray-600">
                          Client: {document.clientName} • Created: {new Date(document.createdDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(document.status)}>
                        {document.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          {/* Filters and Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={uploaderFilter} onValueChange={setUploaderFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Uploaded by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Documents</SelectItem>
                    <SelectItem value="vendor">Uploaded by Me</SelectItem>
                    <SelectItem value="host">Uploaded by Client</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="unread">Unopened</SelectItem>
                    <SelectItem value="read">Viewed</SelectItem>
                  </SelectContent>
                </Select>

                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Document Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{sharedDocuments.length}</p>
                  <p className="text-sm text-gray-600">Total Documents</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {sharedDocuments.filter(d => !d.viewedBy.includes('vendor')).length}
                  </p>
                  <p className="text-sm text-gray-600">Unopened by You</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {sharedDocuments.filter(d => d.uploadedBy === 'vendor').length}
                  </p>
                  <p className="text-sm text-gray-600">Uploaded by You</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {sharedDocuments.filter(d => d.uploadedBy === 'host').length}
                  </p>
                  <p className="text-sm text-gray-600">From Clients</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents List */}
          <Card>
            <CardHeader>
              <CardTitle>Shared Documents</CardTitle>
              <CardDescription>Documents shared between you and your clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredSharedDocuments.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>No documents found</p>
                  </div>
                ) : (
                  filteredSharedDocuments.map((document) => {
                    const isUnopened = !document.viewedBy.includes('vendor');
                    const uploadedByVendor = document.uploadedBy === 'vendor';
                    
                    return (
                      <div 
                        key={document.id} 
                        className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                          isUnopened ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {/* File Icon */}
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            isUnopened ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            <FileText className={`w-6 h-6 ${isUnopened ? 'text-blue-600' : 'text-gray-600'}`} />
                          </div>

                          {/* Document Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-medium">{document.name}</p>
                              
                              {/* Unopened Badge */}
                              {isUnopened && (
                                <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Unopened
                                </Badge>
                              )}
                              
                              {/* Uploader Badge */}
                              <Badge variant="outline" className={
                                uploadedByVendor 
                                  ? "bg-green-50 text-green-700 border-green-300" 
                                  : "bg-purple-50 text-purple-700 border-purple-300"
                              }>
                                <User className="w-3 h-3 mr-1" />
                                {uploadedByVendor ? "Uploaded by You" : `Uploaded by ${document.uploaderName}`}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 flex-wrap">
                              <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>{(document.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                              {document.lastViewed?.vendor && (
                                <>
                                  <span>•</span>
                                  <span className="text-green-600">
                                    Last viewed: {new Date(document.lastViewed.vendor).toLocaleDateString()}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDocument(document)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              {isUnopened ? "Open" : "View"}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            {uploadedByVendor && (
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Library</CardTitle>
              <CardDescription>Browse and import standard document templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                <p>Access to a library of professional document templates</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorDocuments;
