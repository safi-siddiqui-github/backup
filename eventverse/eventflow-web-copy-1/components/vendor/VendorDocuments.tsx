"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
  Download,
  Edit,
  Eye,
  FileText,
  Plus,
  Save,
  Search,
  Trash2,
  Upload,
  Wand2,
} from "lucide-react";
import { useState } from "react";

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

  // Mock templates
  const [templates] = useState<DocumentTemplate[]>([
    {
      id: "1",
      name: "Standard Service Agreement",
      type: "contract",
      description: "Basic service agreement template for catering services",
      content:
        "SERVICE AGREEMENT\n\nThis agreement is between {vendorName} and {clientName}...",
      variables: ["vendorName", "clientName", "serviceDate", "totalAmount"],
      createdDate: "2024-01-01",
      lastModified: "2024-01-15",
      isDefault: true,
    },
    {
      id: "2",
      name: "Wedding Catering Proposal",
      type: "proposal",
      description: "Detailed proposal template for wedding catering services",
      content:
        "WEDDING CATERING PROPOSAL\n\nDear {clientName},\n\nThank you for considering {vendorName}...",
      variables: [
        "clientName",
        "vendorName",
        "weddingDate",
        "guestCount",
        "menuOptions",
      ],
      createdDate: "2024-01-05",
      lastModified: "2024-01-20",
      isDefault: true,
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
      isDefault: true,
    },
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
      createdDate: "2024-01-20",
    },
    {
      id: "2",
      name: "Elite Events Proposal",
      templateId: "2",
      clientName: "Elite Events Inc",
      content: "Generated proposal content...",
      status: "sent",
      createdDate: "2024-01-18",
    },
  ]);

  const handleGenerateDocument = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(
        `# ${aiPrompt}\n\nThis is a generated document based on your request:\n\n${aiPrompt}\n\n## Document Content\n\nBased on your requirements, here's a professional document template that includes:\n\n- Clear terms and conditions\n- Payment schedules\n- Delivery timelines\n- Cancellation policies\n\n[Generated content would appear here...]`,
      );
      setIsGenerating(false);
    }, 2000);
  };

  const getTypeColor = (type: DocumentTemplate["type"]) => {
    switch (type) {
      case "contract":
        return "bg-blue-100 text-blue-800";
      case "proposal":
        return "bg-green-100 text-green-800";
      case "nda":
        return "bg-purple-100 text-purple-800";
      case "agreement":
        return "bg-orange-100 text-orange-800";
      case "invoice":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: GeneratedDocument["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "finalized":
        return "bg-green-100 text-green-800";
      case "sent":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      documentType === "all" || template.type === documentType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Document Management</h2>
          <p className="text-gray-600">
            Generate, manage, and customize your business documents
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Template
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generator">AI Generator</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
        </TabsList>

        <TabsContent
          value="generator"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* AI Generator Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  AI Document Generator
                </CardTitle>
                <CardDescription>
                  Describe the document you need and let AI generate it for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Document Type
                  </label>
                  <Select defaultValue="contract">
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Service Contract</SelectItem>
                      <SelectItem value="proposal">Project Proposal</SelectItem>
                      <SelectItem value="nda">
                        Non-Disclosure Agreement
                      </SelectItem>
                      <SelectItem value="agreement">
                        General Agreement
                      </SelectItem>
                      <SelectItem value="invoice">Invoice Template</SelectItem>
                      <SelectItem value="custom">Custom Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Client Information
                  </label>
                  <Input placeholder="Client name (optional)" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    AI Prompt
                  </label>
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
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
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
                    <div className="min-h-[300px] rounded-lg border bg-gray-50 p-4">
                      <pre className="text-sm whitespace-pre-wrap">
                        {generatedContent}
                      </pre>
                    </div>
                    <div className="flex gap-2">
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Save as Template
                      </Button>
                      <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-gray-500">
                    <FileText className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                    <p>Generate a document to see the preview here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="templates"
          className="space-y-4"
        >
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select
                  value={documentType}
                  onValueChange={setDocumentType}
                >
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
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
                      <p className="mb-2 text-sm font-medium">Variables:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="text-xs text-gray-500">
                      <p>
                        Created:{" "}
                        {new Date(template.createdDate).toLocaleDateString()}
                      </p>
                      <p>
                        Modified:{" "}
                        {new Date(template.lastModified).toLocaleDateString()}
                      </p>
                      {template.isDefault && (
                        <Badge
                          variant="secondary"
                          className="mt-1 text-xs"
                        >
                          Default
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        Use
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      {!template.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="documents"
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Generated Documents</CardTitle>
              <CardDescription>Manage your created documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{document.name}</p>
                        <p className="text-sm text-gray-600">
                          Client: {document.clientName} • Created:{" "}
                          {new Date(document.createdDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(document.status)}>
                        {document.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="library"
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Document Library</CardTitle>
              <CardDescription>
                Browse and import standard document templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-12 text-center text-gray-500">
                <FileText className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                <h3 className="mb-2 text-lg font-medium">Coming Soon</h3>
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
