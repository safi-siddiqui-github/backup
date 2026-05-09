import { DocumentType, DocumentStatus, UploadedBy } from "../client-hub/mockClients";

export interface VendorDocument {
  id: string;
  name: string;
  type: DocumentType;
  fileType: string; // PDF, JPG, DOCX, etc.
  size: number; // in bytes
  uploadedBy: UploadedBy;
  uploadedDate: string;
  description: string;
  relatedTo: string; // project-id, invoice-id, client-name, etc.
  status: DocumentStatus;
}

export const mockVendorDocuments: VendorDocument[] = [
  {
    id: "doc-1",
    name: "Q4 Financial Report 2024",
    type: "report",
    fileType: "PDF",
    size: 2456789,
    uploadedBy: "vendor",
    uploadedDate: "15/01/2024",
    description: "Quarterly financial report covering all revenue and expenses",
    relatedTo: "General",
    status: "viewed",
  },
  {
    id: "doc-2",
    name: "Service Agreement Template",
    type: "contract",
    fileType: "DOCX",
    size: 125432,
    uploadedBy: "vendor",
    uploadedDate: "10/01/2024",
    description: "Standard service agreement template for new clients",
    relatedTo: "Templates",
    status: "viewed",
  },
  {
    id: "doc-3",
    name: "Event Photography Portfolio",
    type: "image",
    fileType: "JPG",
    size: 5678901,
    uploadedBy: "vendor",
    uploadedDate: "05/01/2024",
    description: "Collection of event photography samples",
    relatedTo: "Portfolio",
    status: "viewed",
  },
  {
    id: "doc-4",
    name: "Invoice Template 2024",
    type: "invoice",
    fileType: "PDF",
    size: 98765,
    uploadedBy: "vendor",
    uploadedDate: "01/01/2024",
    description: "Updated invoice template for 2024",
    relatedTo: "Templates",
    status: "viewed",
  },
  {
    id: "doc-5",
    name: "Client Proposal - Corporate Event",
    type: "proposal",
    fileType: "PDF",
    size: 2345678,
    uploadedBy: "vendor",
    uploadedDate: "20/12/2023",
    description: "Detailed proposal for corporate event planning services",
    relatedTo: "Proposal-001",
    status: "unopened",
  },
];

