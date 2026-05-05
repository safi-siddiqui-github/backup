export type ClientStatus = "active" | "archive";
export type ClientStage =
  | "prospect"
  | "contacted"
  | "proposal sent"
  | "negotiation"
  | "contract signed"
  | "active"
  | "completed";

export type ProjectCategory = 
  | "Catering"
  | "Photography"
  | "Videography"
  | "Venue"
  | "Decoration"
  | "Entertainment"
  | "Music/DJ"
  | "Florist"
  | "Transportation"
  | "Other";

export interface ClientProject {
  id: string;
  name: string;
  category: ProjectCategory;
  amount: number;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface ClientEvent {
  id: string;
  name: string;
  date: string;
  totalBudget: number;
  projects: ClientProject[];
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  description?: string;
}

export interface ClientMessage {
  id: string;
  text: string;
  sender: "vendor" | "client";
  timestamp: string;
  isRead?: boolean;
  projectId?: string; // Link message to specific project
  eventId?: string; // Link message to specific event
}

export type InvoiceStatus = "paid" | "pending" | "overdue" | "draft";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  dueDate: string;
  paidDate?: string;
  amount: number;
  status: InvoiceStatus;
  subtotal: number;
  tax: number;
  taxRate: number;
  items: InvoiceItem[];
  paymentTerms: string;
  notes?: string;
  createdAt: string;
  projectId?: string; // Link invoice to specific project
  eventId?: string; // Link invoice to specific event
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export type DocumentType = "invoice" | "report" | "contract" | "proposal" | "image" | "other";
export type DocumentStatus = "viewed" | "unopened";
export type UploadedBy = "vendor" | "client";

export interface ClientDocument {
  id: string;
  name: string;
  type: DocumentType;
  fileType: string; // PDF, JPG, DOCX, etc.
  size: number; // in bytes
  uploadedBy: UploadedBy;
  uploadedDate: string;
  description: string;
  relatedTo: string; // project-id, invoice-id, etc.
  status: DocumentStatus;
}

export type TaskPriority = "high" | "medium" | "low";
export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";

export interface ClientTask {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  clientId: string;
  createdAt: string;
  projectId?: string; // Link task to specific project
  eventId?: string; // Link task to specific event
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: ClientStatus;
  stage: ClientStage;
  progress: number; // 0-100
  totalSpent: number;
  activeEvents: number; // Changed from activeProjects
  completed: number;
  pendingInvoices: number;
  rating: number; // 0-5
  reviewCount?: number;
  lastContact: string;
  events?: ClientEvent[]; // Changed from projects
  messages?: ClientMessage[];
  invoices?: Invoice[];
  documents?: ClientDocument[];
  tasks?: ClientTask[];
  avatar?: string;
  source?: "direct" | "marketplace"; // Source of the client
}

export const mockClients: Client[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "+1-555-0123",
    status: "active",
    stage: "active",
    progress: 86,
    totalSpent: 15000,
    activeEvents: 1,
    completed: 2,
    pendingInvoices: 1,
    rating: 5,
    reviewCount: 5,
    lastContact: "15/01/2024",
    events: [
      {
        id: "e1",
        name: "Sarah's Wedding",
        date: "15/08/2024",
        totalBudget: 25000,
        status: "ongoing",
        description: "Beautiful summer wedding celebration",
        projects: [
          {
            id: "p1-1",
            name: "Wedding Catering",
            category: "Catering",
            amount: 7500,
            status: "in_progress",
            startDate: "15/08/2024",
            description: "Full catering service for 100 guests",
          },
          {
            id: "p1-2",
            name: "Wedding Photography",
            category: "Photography",
            amount: 3500,
            status: "in_progress",
            startDate: "15/08/2024",
            description: "Professional photography coverage",
          },
          {
            id: "p1-3",
            name: "Venue Decoration",
            category: "Decoration",
            amount: 4000,
            status: "pending",
            startDate: "14/08/2024",
            description: "Floral and venue decoration setup",
          },
        ],
      },
    ],
    messages: [
      // General messages
      {
        id: "m1",
        text: "Hi! I'm interested in your catering services for my wedding. Could you provide more details?",
        sender: "client",
        timestamp: "10:30 AM",
        isRead: true,
      },
      {
        id: "m2",
        text: "Hello Sarah! Thank you for reaching out. I'd be happy to help with your wedding catering. Let me send you our menu options.",
        sender: "vendor",
        timestamp: "10:45 AM",
        isRead: true,
      },
      // Project-specific: Wedding Catering (p1-1)
      {
        id: "m3",
        text: "That sounds great! I'm particularly interested in the vegetarian options for the catering.",
        sender: "client",
        timestamp: "11:00 AM",
        isRead: true,
        projectId: "p1-1",
        eventId: "e1",
      },
      {
        id: "m4",
        text: "Perfect! We have excellent vegetarian options. Would you like to schedule a tasting session?",
        sender: "vendor",
        timestamp: "11:15 AM",
        isRead: true,
        projectId: "p1-1",
        eventId: "e1",
      },
      {
        id: "m5",
        text: "Yes, I'd love to schedule a tasting. How about next Friday?",
        sender: "client",
        timestamp: "11:30 AM",
        isRead: true,
        projectId: "p1-1",
        eventId: "e1",
      },
      // Project-specific: Wedding Photography (p1-2)
      {
        id: "m6",
        text: "Hi! I wanted to discuss the photography package. Can we include drone footage?",
        sender: "client",
        timestamp: "2:00 PM",
        isRead: true,
        projectId: "p1-2",
        eventId: "e1",
      },
      {
        id: "m7",
        text: "Absolutely! We can add drone footage to your package. I'll send you an updated quote.",
        sender: "vendor",
        timestamp: "2:15 PM",
        isRead: true,
        projectId: "p1-2",
        eventId: "e1",
      },
      // Project-specific: Venue Decoration (p1-3)
      {
        id: "m8",
        text: "For the decoration, I'd like to use a color scheme of blush pink and gold. Is that possible?",
        sender: "client",
        timestamp: "3:00 PM",
        isRead: true,
        projectId: "p1-3",
        eventId: "e1",
      },
      {
        id: "m9",
        text: "Yes, that's a beautiful color scheme! I'll prepare some decoration mockups for you to review.",
        sender: "vendor",
        timestamp: "3:20 PM",
        isRead: true,
        projectId: "p1-3",
        eventId: "e1",
      },
    ],
    invoices: [
      // Project-specific: Wedding Catering (p1-1)
      {
        id: "inv-1",
        invoiceNumber: "INV-001234",
        clientId: "1",
        dueDate: "15/07/2024",
        paidDate: "10/07/2024",
        amount: 3750,
        status: "paid",
        subtotal: 3452.07,
        tax: 297.93,
        taxRate: 8.5,
        items: [
          {
            id: "item-1",
            description: "Wedding Catering Service - Deposit (50%)",
            quantity: 1,
            rate: 3452.07,
            amount: 3452.07,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "01/07/2024",
        projectId: "p1-1",
        eventId: "e1",
      },
      {
        id: "inv-2",
        invoiceNumber: "INV-001235",
        clientId: "1",
        dueDate: "20/08/2024",
        amount: 3750,
        status: "pending",
        subtotal: 3452.07,
        tax: 297.93,
        taxRate: 8.5,
        items: [
          {
            id: "item-2",
            description: "Wedding Catering Service - Final Payment (50%)",
            quantity: 1,
            rate: 3452.07,
            amount: 3452.07,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "21/07/2024",
        projectId: "p1-1",
        eventId: "e1",
      },
      // Project-specific: Wedding Photography (p1-2)
      {
        id: "inv-3",
        invoiceNumber: "INV-001236",
        clientId: "1",
        dueDate: "10/08/2024",
        amount: 1750,
        status: "pending",
        subtotal: 1612.90,
        tax: 137.10,
        taxRate: 8.5,
        items: [
          {
            id: "item-3",
            description: "Wedding Photography Package - Deposit",
            quantity: 1,
            rate: 1612.90,
            amount: 1612.90,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "05/08/2024",
        projectId: "p1-2",
        eventId: "e1",
      },
      {
        id: "inv-4",
        invoiceNumber: "INV-001237",
        clientId: "1",
        dueDate: "25/08/2024",
        amount: 1750,
        status: "pending",
        subtotal: 1612.90,
        tax: 137.10,
        taxRate: 8.5,
        items: [
          {
            id: "item-4",
            description: "Wedding Photography Package - Final Payment",
            quantity: 1,
            rate: 1612.90,
            amount: 1612.90,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "15/08/2024",
        projectId: "p1-2",
        eventId: "e1",
      },
      // Project-specific: Venue Decoration (p1-3)
      {
        id: "inv-5",
        invoiceNumber: "INV-001238",
        clientId: "1",
        dueDate: "05/08/2024",
        amount: 2000,
        status: "pending",
        subtotal: 1843.32,
        tax: 156.68,
        taxRate: 8.5,
        items: [
          {
            id: "item-5",
            description: "Venue Decoration Setup - Deposit",
            quantity: 1,
            rate: 1843.32,
            amount: 1843.32,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "01/08/2024",
        projectId: "p1-3",
        eventId: "e1",
      },
    ],
    documents: [
      // Project-specific: Wedding Catering (p1-1)
      {
        id: "doc-1",
        name: "Service_Contract_Wedding_Catering.pdf",
        type: "contract",
        fileType: "PDF",
        size: 2400000, // 2.4 MB
        uploadedBy: "client",
        uploadedDate: "01/07/2024",
        description: "Signed service contract for wedding catering",
        relatedTo: "p1-1",
        status: "viewed",
      },
      {
        id: "doc-2",
        name: "Invoice_INV-001234.pdf",
        type: "invoice",
        fileType: "PDF",
        size: 439500, // 439.5 KB
        uploadedBy: "vendor",
        uploadedDate: "01/07/2024",
        description: "Initial deposit invoice for catering",
        relatedTo: "inv-1",
        status: "viewed",
      },
      {
        id: "doc-3",
        name: "Wedding_Menu_Proposal.pdf",
        type: "proposal",
        fileType: "PDF",
        size: 1800000, // 1.8 MB
        uploadedBy: "vendor",
        uploadedDate: "20/06/2024",
        description: "Detailed menu proposal with pricing options",
        relatedTo: "p1-1",
        status: "viewed",
      },
      {
        id: "doc-4",
        name: "Catering_Setup_Photo.jpg",
        type: "image",
        fileType: "JPG",
        size: 3100000, // 3.1 MB
        uploadedBy: "vendor",
        uploadedDate: "10/07/2024",
        description: "Preview of proposed catering setup",
        relatedTo: "p1-1",
        status: "viewed",
      },
      // Project-specific: Wedding Photography (p1-2)
      {
        id: "doc-5",
        name: "Photography_Service_Contract.pdf",
        type: "contract",
        fileType: "PDF",
        size: 2100000, // 2.1 MB
        uploadedBy: "client",
        uploadedDate: "05/08/2024",
        description: "Signed photography service contract",
        relatedTo: "p1-2",
        status: "viewed",
      },
      {
        id: "doc-6",
        name: "Photography_Package_Details.pdf",
        type: "proposal",
        fileType: "PDF",
        size: 1200000, // 1.2 MB
        uploadedBy: "vendor",
        uploadedDate: "01/08/2024",
        description: "Photography package details and pricing",
        relatedTo: "p1-2",
        status: "viewed",
      },
      {
        id: "doc-7",
        name: "Sample_Wedding_Photos.jpg",
        type: "image",
        fileType: "JPG",
        size: 4500000, // 4.5 MB
        uploadedBy: "vendor",
        uploadedDate: "08/08/2024",
        description: "Sample wedding photography portfolio",
        relatedTo: "p1-2",
        status: "viewed",
      },
      // Project-specific: Venue Decoration (p1-3)
      {
        id: "doc-8",
        name: "Decoration_Proposal.pdf",
        type: "proposal",
        fileType: "PDF",
        size: 1500000, // 1.5 MB
        uploadedBy: "vendor",
        uploadedDate: "01/08/2024",
        description: "Venue decoration proposal with color schemes",
        relatedTo: "p1-3",
        status: "unopened",
      },
      {
        id: "doc-9",
        name: "Decoration_Mockup_Images.jpg",
        type: "image",
        fileType: "JPG",
        size: 5200000, // 5.2 MB
        uploadedBy: "vendor",
        uploadedDate: "05/08/2024",
        description: "Visual mockups of decoration setup",
        relatedTo: "p1-3",
        status: "viewed",
      },
    ],
    tasks: [
      // Project-specific: Wedding Catering (p1-1)
      {
        id: "task-1",
        title: "Send final menu options",
        description: "Prepare and send final menu options to client for approval",
        dueDate: "25/01/2024",
        priority: "high",
        status: "pending",
        clientId: "1",
        createdAt: "10/01/2024",
        projectId: "p1-1",
        eventId: "e1",
      },
      {
        id: "task-2",
        title: "Confirm headcount for catering",
        description: "Confirm final headcount for the wedding event catering",
        dueDate: "01/02/2024",
        priority: "medium",
        status: "pending",
        clientId: "1",
        createdAt: "12/01/2024",
        projectId: "p1-1",
        eventId: "e1",
      },
      {
        id: "task-3",
        title: "Schedule menu tasting session",
        description: "Coordinate with client for menu tasting appointment",
        dueDate: "15/02/2024",
        priority: "high",
        status: "in_progress",
        clientId: "1",
        createdAt: "14/01/2024",
        projectId: "p1-1",
        eventId: "e1",
      },
      // Project-specific: Wedding Photography (p1-2)
      {
        id: "task-4",
        title: "Finalize photography shot list",
        description: "Create and share detailed shot list with client",
        dueDate: "20/02/2024",
        priority: "high",
        status: "pending",
        clientId: "1",
        createdAt: "15/01/2024",
        projectId: "p1-2",
        eventId: "e1",
      },
      {
        id: "task-5",
        title: "Confirm drone photography availability",
        description: "Verify drone equipment and permissions for wedding day",
        dueDate: "10/02/2024",
        priority: "medium",
        status: "in_progress",
        clientId: "1",
        createdAt: "16/01/2024",
        projectId: "p1-2",
        eventId: "e1",
      },
      // Project-specific: Venue Decoration (p1-3)
      {
        id: "task-6",
        title: "Approve decoration color scheme",
        description: "Get client approval on blush pink and gold color scheme",
        dueDate: "05/02/2024",
        priority: "high",
        status: "pending",
        clientId: "1",
        createdAt: "17/01/2024",
        projectId: "p1-3",
        eventId: "e1",
      },
      {
        id: "task-7",
        title: "Order floral arrangements",
        description: "Place order for floral decorations based on approved mockups",
        dueDate: "28/02/2024",
        priority: "medium",
        status: "pending",
        clientId: "1",
        createdAt: "18/01/2024",
        projectId: "p1-3",
        eventId: "e1",
      },
    ],
  },
  {
    id: "2",
    name: "Elite Events Inc",
    email: "contact@eliteevents.com",
    phone: "+1-555-0234",
    status: "active",
    stage: "contract signed",
    progress: 71,
    totalSpent: 45000,
    activeEvents: 2,
    completed: 3,
    pendingInvoices: 2,
    rating: 4.8,
    reviewCount: 4,
    lastContact: "12/01/2024",
    events: [
      {
        id: "e2",
        name: "Corporate Gala 2024",
        date: "20/09/2024",
        totalBudget: 35000,
        status: "ongoing",
        description: "Annual corporate gala event",
        projects: [
          {
            id: "p2-1",
            name: "Gala Catering",
            category: "Catering",
            amount: 12000,
            status: "in_progress",
            startDate: "20/09/2024",
          },
          {
            id: "p2-2",
            name: "Event Photography",
            category: "Photography",
            amount: 5000,
            status: "in_progress",
            startDate: "20/09/2024",
          },
        ],
      },
      {
        id: "e3",
        name: "Holiday Party 2024",
        date: "15/12/2024",
        totalBudget: 28000,
        status: "upcoming",
        description: "Company holiday celebration",
        projects: [
          {
            id: "p3-1",
            name: "Holiday Catering",
            category: "Catering",
            amount: 18000,
            status: "pending",
            startDate: "15/12/2024",
          },
        ],
      },
    ],
    messages: [
      // General messages
      {
        id: "m1",
        text: "Hello, we're planning our annual corporate gala and would like to discuss catering options.",
        sender: "client",
        timestamp: "9:00 AM",
        isRead: true,
      },
      {
        id: "m2",
        text: "Great! I'd be happy to help with your corporate event. What type of cuisine are you interested in?",
        sender: "vendor",
        timestamp: "9:15 AM",
        isRead: true,
      },
      // Project-specific: Corporate Gala - Gala Catering (p2-1)
      {
        id: "m3",
        text: "We need catering for 200 guests. Can you provide a buffet-style service?",
        sender: "client",
        timestamp: "9:30 AM",
        isRead: true,
        projectId: "p2-1",
        eventId: "e2",
      },
      {
        id: "m4",
        text: "Yes, we specialize in buffet-style corporate events. I'll send you our corporate menu options.",
        sender: "vendor",
        timestamp: "9:45 AM",
        isRead: true,
        projectId: "p2-1",
        eventId: "e2",
      },
      // Project-specific: Corporate Gala - Event Photography (p2-2)
      {
        id: "m5",
        text: "We also need professional photography for the gala. Can you cover the entire event?",
        sender: "client",
        timestamp: "10:00 AM",
        isRead: true,
        projectId: "p2-2",
        eventId: "e2",
      },
      {
        id: "m6",
        text: "Absolutely! We can provide full event coverage including candid shots and group photos.",
        sender: "vendor",
        timestamp: "10:15 AM",
        isRead: true,
        projectId: "p2-2",
        eventId: "e2",
      },
      // Project-specific: Holiday Party - Holiday Catering (p3-1)
      {
        id: "m7",
        text: "For the holiday party, we're thinking of a festive menu. What do you recommend?",
        sender: "client",
        timestamp: "11:00 AM",
        isRead: true,
        projectId: "p3-1",
        eventId: "e3",
      },
      {
        id: "m8",
        text: "I'd recommend a mix of traditional holiday dishes and some modern twists. Let me send you our holiday menu.",
        sender: "vendor",
        timestamp: "11:20 AM",
        isRead: true,
        projectId: "p3-1",
        eventId: "e3",
      },
    ],
    invoices: [
      // Project-specific: Corporate Gala - Gala Catering (p2-1)
      {
        id: "inv-6",
        invoiceNumber: "INV-001239",
        clientId: "2",
        dueDate: "15/09/2024",
        amount: 6000,
        status: "pending",
        subtotal: 5529.95,
        tax: 470.05,
        taxRate: 8.5,
        items: [
          {
            id: "item-6",
            description: "Corporate Gala Catering - Deposit (50%)",
            quantity: 1,
            rate: 5529.95,
            amount: 5529.95,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "26/07/2024",
        projectId: "p2-1",
        eventId: "e2",
      },
      {
        id: "inv-7",
        invoiceNumber: "INV-001240",
        clientId: "2",
        dueDate: "25/09/2024",
        amount: 6000,
        status: "pending",
        subtotal: 5529.95,
        tax: 470.05,
        taxRate: 8.5,
        items: [
          {
            id: "item-7",
            description: "Corporate Gala Catering - Final Payment (50%)",
            quantity: 1,
            rate: 5529.95,
            amount: 5529.95,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "20/09/2024",
        projectId: "p2-1",
        eventId: "e2",
      },
      // Project-specific: Corporate Gala - Event Photography (p2-2)
      {
        id: "inv-8",
        invoiceNumber: "INV-001241",
        clientId: "2",
        dueDate: "10/09/2024",
        amount: 2500,
        status: "pending",
        subtotal: 2304.15,
        tax: 195.85,
        taxRate: 8.5,
        items: [
          {
            id: "item-8",
            description: "Corporate Gala Photography - Deposit",
            quantity: 1,
            rate: 2304.15,
            amount: 2304.15,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "01/09/2024",
        projectId: "p2-2",
        eventId: "e2",
      },
      // Project-specific: Holiday Party - Holiday Catering (p3-1)
      {
        id: "inv-9",
        invoiceNumber: "INV-001242",
        clientId: "2",
        dueDate: "01/12/2024",
        amount: 9000,
        status: "pending",
        subtotal: 8294.93,
        tax: 705.07,
        taxRate: 8.5,
        items: [
          {
            id: "item-9",
            description: "Holiday Party Catering - Deposit (50%)",
            quantity: 1,
            rate: 8294.93,
            amount: 8294.93,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "15/11/2024",
        projectId: "p3-1",
        eventId: "e3",
      },
    ],
    documents: [
      // Project-specific: Corporate Gala - Gala Catering (p2-1)
      {
        id: "doc-10",
        name: "Corporate_Gala_Catering_Contract.pdf",
        type: "contract",
        fileType: "PDF",
        size: 2100000, // 2.1 MB
        uploadedBy: "client",
        uploadedDate: "15/07/2024",
        description: "Signed corporate gala catering service contract",
        relatedTo: "p2-1",
        status: "viewed",
      },
      {
        id: "doc-11",
        name: "Corporate_Menu_Proposal.pdf",
        type: "proposal",
        fileType: "PDF",
        size: 1200000, // 1.2 MB
        uploadedBy: "vendor",
        uploadedDate: "10/07/2024",
        description: "Corporate gala menu proposal with pricing",
        relatedTo: "p2-1",
        status: "viewed",
      },
      {
        id: "doc-12",
        name: "Invoice_INV-001239.pdf",
        type: "invoice",
        fileType: "PDF",
        size: 452000, // 452 KB
        uploadedBy: "vendor",
        uploadedDate: "26/07/2024",
        description: "Corporate gala catering deposit invoice",
        relatedTo: "inv-6",
        status: "unopened",
      },
      // Project-specific: Corporate Gala - Event Photography (p2-2)
      {
        id: "doc-13",
        name: "Photography_Service_Contract_Gala.pdf",
        type: "contract",
        fileType: "PDF",
        size: 1900000, // 1.9 MB
        uploadedBy: "client",
        uploadedDate: "01/09/2024",
        description: "Signed photography service contract for corporate gala",
        relatedTo: "p2-2",
        status: "viewed",
      },
      {
        id: "doc-14",
        name: "Photography_Package_Gala.pdf",
        type: "proposal",
        fileType: "PDF",
        size: 980000, // 980 KB
        uploadedBy: "vendor",
        uploadedDate: "25/08/2024",
        description: "Corporate gala photography package details",
        relatedTo: "p2-2",
        status: "viewed",
      },
      // Project-specific: Holiday Party - Holiday Catering (p3-1)
      {
        id: "doc-15",
        name: "Holiday_Party_Menu_Proposal.pdf",
        type: "proposal",
        fileType: "PDF",
        size: 1400000, // 1.4 MB
        uploadedBy: "vendor",
        uploadedDate: "10/11/2024",
        description: "Holiday party menu proposal with festive options",
        relatedTo: "p3-1",
        status: "unopened",
      },
    ],
    tasks: [
      // Project-specific: Corporate Gala - Gala Catering (p2-1)
      {
        id: "task-8",
        title: "Finalize corporate menu selection",
        description: "Get client approval on final menu items for corporate gala",
        dueDate: "05/09/2024",
        priority: "high",
        status: "pending",
        clientId: "2",
        createdAt: "20/08/2024",
        projectId: "p2-1",
        eventId: "e2",
      },
      {
        id: "task-9",
        title: "Confirm guest count for catering",
        description: "Verify final guest count for corporate gala catering service",
        dueDate: "10/09/2024",
        priority: "high",
        status: "in_progress",
        clientId: "2",
        createdAt: "22/08/2024",
        projectId: "p2-1",
        eventId: "e2",
      },
      // Project-specific: Corporate Gala - Event Photography (p2-2)
      {
        id: "task-10",
        title: "Create photography shot list",
        description: "Prepare detailed shot list for corporate gala photography",
        dueDate: "15/09/2024",
        priority: "medium",
        status: "pending",
        clientId: "2",
        createdAt: "25/08/2024",
        projectId: "p2-2",
        eventId: "e2",
      },
      // Project-specific: Holiday Party - Holiday Catering (p3-1)
      {
        id: "task-11",
        title: "Review holiday menu options",
        description: "Present and get approval on holiday party menu selections",
        dueDate: "20/11/2024",
        priority: "high",
        status: "pending",
        clientId: "2",
        createdAt: "12/11/2024",
        projectId: "p3-1",
        eventId: "e3",
      },
    ],
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    email: "maria@email.com",
    phone: "+1-555-0345",
    status: "archive",
    stage: "completed",
    progress: 100,
    totalSpent: 3500,
    activeEvents: 0,
    completed: 1,
    pendingInvoices: 0,
    rating: 4.5,
    reviewCount: 2,
    lastContact: "10/01/2024",
    events: [
      {
        id: "e4",
        name: "Baby's 1st Birthday",
        date: "25/12/2024",
        totalBudget: 5000,
        status: "completed",
        description: "First birthday celebration",
        projects: [
          {
            id: "p4-1",
            name: "Birthday Catering",
            category: "Catering",
            amount: 3500,
            status: "completed",
            startDate: "25/12/2024",
            endDate: "25/12/2024",
          },
        ],
      },
    ],
    messages: [
      // Project-specific: Baby's 1st Birthday - Birthday Catering (p4-1)
      {
        id: "m1",
        text: "Thank you so much for the excellent service! The birthday party catering was perfect.",
        sender: "client",
        timestamp: "2:30 PM",
        isRead: true,
        projectId: "p4-1",
        eventId: "e4",
      },
      {
        id: "m2",
        text: "Thank you Maria! We're so glad you were happy with everything. We'd love to work with you again in the future.",
        sender: "vendor",
        timestamp: "2:45 PM",
        isRead: true,
        projectId: "p4-1",
        eventId: "e4",
      },
      {
        id: "m3",
        text: "The kids loved the food, especially the birthday cake!",
        sender: "client",
        timestamp: "3:00 PM",
        isRead: true,
        projectId: "p4-1",
        eventId: "e4",
      },
    ],
    invoices: [
      // Project-specific: Baby's 1st Birthday - Birthday Catering (p4-1)
      {
        id: "inv-10",
        invoiceNumber: "INV-001243",
        clientId: "3",
        dueDate: "10/12/2024",
        paidDate: "05/12/2024",
        amount: 3500,
        status: "paid",
        subtotal: 3225.81,
        tax: 274.19,
        taxRate: 8.5,
        items: [
          {
            id: "item-10",
            description: "Baby's 1st Birthday Catering - Full Payment",
            quantity: 1,
            rate: 3225.81,
            amount: 3225.81,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "20/11/2024",
        projectId: "p4-1",
        eventId: "e4",
      },
    ],
    documents: [
      // Project-specific: Baby's 1st Birthday - Birthday Catering (p4-1)
      {
        id: "doc-16",
        name: "Birthday_Catering_Contract.pdf",
        type: "contract",
        fileType: "PDF",
        size: 1800000, // 1.8 MB
        uploadedBy: "client",
        uploadedDate: "15/11/2024",
        description: "Signed birthday catering service contract",
        relatedTo: "p4-1",
        status: "viewed",
      },
      {
        id: "doc-17",
        name: "Birthday_Menu_Proposal.pdf",
        type: "proposal",
        fileType: "PDF",
        size: 950000, // 950 KB
        uploadedBy: "vendor",
        uploadedDate: "10/11/2024",
        description: "Birthday party menu proposal",
        relatedTo: "p4-1",
        status: "viewed",
      },
    ],
  },
  {
    id: "4",
    name: "Robert Chen",
    email: "robert@email.com",
    phone: "+1-555-0456",
    status: "archive",
    stage: "prospect",
    progress: 20,
    totalSpent: 0,
    activeEvents: 0,
    completed: 0,
    pendingInvoices: 0,
    rating: 0,
    lastContact: "08/01/2024",
    events: [
      {
        id: "e5",
        name: "25th Anniversary Party",
        date: "10/02/2025",
        totalBudget: 8000,
        status: "upcoming",
        description: "Silver anniversary celebration",
        projects: [
          {
            id: "p5-1",
            name: "Anniversary Catering",
            category: "Catering",
            amount: 3000,
            status: "pending",
            startDate: "10/02/2025",
          },
        ],
      },
    ],
    messages: [],
  },
  {
    id: "5",
    name: "Jennifer Smith",
    email: "jennifer@email.com",
    phone: "+1-555-0567",
    status: "active",
    stage: "negotiation",
    progress: 50,
    totalSpent: 8500,
    activeEvents: 1,
    completed: 1,
    pendingInvoices: 1,
    rating: 4.2,
    reviewCount: 3,
    lastContact: "14/01/2024",
    events: [
      {
        id: "e6",
        name: "Graduation Party 2025",
        date: "05/03/2025",
        totalBudget: 12000,
        status: "upcoming",
        description: "High school graduation celebration",
        projects: [
          {
            id: "p6-1",
            name: "Graduation Catering",
            category: "Catering",
            amount: 6000,
            status: "in_progress",
            startDate: "05/03/2025",
          },
          {
            id: "p6-2",
            name: "Event Videography",
            category: "Videography",
            amount: 2500,
            status: "pending",
            startDate: "05/03/2025",
          },
        ],
      },
    ],
    messages: [
      // General messages
      {
        id: "m1",
        text: "Hi, I received the proposal. I have a few questions about the pricing.",
        sender: "client",
        timestamp: "3:00 PM",
        isRead: true,
      },
      {
        id: "m2",
        text: "Hi Jennifer! I'm happy to answer any questions. What would you like to know?",
        sender: "vendor",
        timestamp: "3:15 PM",
        isRead: true,
      },
      // Project-specific: Graduation Party - Graduation Catering (p6-1)
      {
        id: "m3",
        text: "For the graduation party, can we customize the menu?",
        sender: "client",
        timestamp: "3:30 PM",
        isRead: true,
        projectId: "p6-1",
        eventId: "e6",
      },
      {
        id: "m4",
        text: "Absolutely! We can customize the menu to your preferences. What would you like to include?",
        sender: "vendor",
        timestamp: "3:45 PM",
        isRead: true,
        projectId: "p6-1",
        eventId: "e6",
      },
      // Project-specific: Graduation Party - Event Videography (p6-2)
      {
        id: "m5",
        text: "I'm also interested in videography. Can you provide a highlight reel?",
        sender: "client",
        timestamp: "4:00 PM",
        isRead: true,
        projectId: "p6-2",
        eventId: "e6",
      },
      {
        id: "m6",
        text: "Yes! We can create a beautiful highlight reel. I'll send you our videography packages.",
        sender: "vendor",
        timestamp: "4:15 PM",
        isRead: true,
        projectId: "p6-2",
        eventId: "e6",
      },
    ],
    invoices: [
      // Project-specific: Graduation Party - Graduation Catering (p6-1)
      {
        id: "inv-11",
        invoiceNumber: "INV-001244",
        clientId: "5",
        dueDate: "20/02/2025",
        amount: 3000,
        status: "pending",
        subtotal: 2764.98,
        tax: 235.02,
        taxRate: 8.5,
        items: [
          {
            id: "item-11",
            description: "Graduation Party Catering - Deposit (50%)",
            quantity: 1,
            rate: 2764.98,
            amount: 2764.98,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "15/01/2025",
        projectId: "p6-1",
        eventId: "e6",
      },
      // Project-specific: Graduation Party - Event Videography (p6-2)
      {
        id: "inv-12",
        invoiceNumber: "INV-001245",
        clientId: "5",
        dueDate: "25/02/2025",
        amount: 1250,
        status: "pending",
        subtotal: 1152.07,
        tax: 97.93,
        taxRate: 8.5,
        items: [
          {
            id: "item-12",
            description: "Graduation Videography - Deposit",
            quantity: 1,
            rate: 1152.07,
            amount: 1152.07,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "18/01/2025",
        projectId: "p6-2",
        eventId: "e6",
      },
    ],
    documents: [
      // Project-specific: Graduation Party - Graduation Catering (p6-1)
      {
        id: "doc-18",
        name: "Graduation_Catering_Proposal.pdf",
        type: "proposal",
        fileType: "PDF",
        size: 1300000, // 1.3 MB
        uploadedBy: "vendor",
        uploadedDate: "10/01/2025",
        description: "Graduation party catering proposal",
        relatedTo: "p6-1",
        status: "unopened",
      },
      // Project-specific: Graduation Party - Event Videography (p6-2)
      {
        id: "doc-19",
        name: "Videography_Package_Details.pdf",
        type: "proposal",
        fileType: "PDF",
        size: 1100000, // 1.1 MB
        uploadedBy: "vendor",
        uploadedDate: "12/01/2025",
        description: "Graduation videography package details",
        relatedTo: "p6-2",
        status: "unopened",
      },
    ],
    tasks: [
      // Project-specific: Graduation Party - Graduation Catering (p6-1)
      {
        id: "task-12",
        title: "Finalize graduation menu",
        description: "Get client approval on graduation party menu",
        dueDate: "15/02/2025",
        priority: "high",
        status: "pending",
        clientId: "5",
        createdAt: "14/01/2025",
        projectId: "p6-1",
        eventId: "e6",
      },
      // Project-specific: Graduation Party - Event Videography (p6-2)
      {
        id: "task-13",
        title: "Discuss videography requirements",
        description: "Schedule meeting to discuss videography shot list and requirements",
        dueDate: "20/02/2025",
        priority: "medium",
        status: "pending",
        clientId: "5",
        createdAt: "15/01/2025",
        projectId: "p6-2",
        eventId: "e6",
      },
    ],
  },
  {
    id: "6",
    name: "Thompson Family",
    email: "thompson@email.com",
    phone: "+1-555-0678",
    status: "active",
    stage: "active",
    progress: 25,
    totalSpent: 2500,
    activeEvents: 1,
    completed: 0,
    pendingInvoices: 0,
    rating: 4.0,
    reviewCount: 1,
    lastContact: "10/12/2025",
    events: [
      {
        id: "e7",
        name: "Thompson Anniversary",
        date: "15/01/2026",
        totalBudget: 6000,
        status: "upcoming",
        description: "Family anniversary celebration",
        projects: [
          {
            id: "p7-1",
            name: "Anniversary Catering",
            category: "Catering",
            amount: 2500,
            status: "in_progress",
            startDate: "15/01/2026",
          },
        ],
      },
    ],
    messages: [
      // Project-specific: Thompson Anniversary - Anniversary Catering (p7-1)
      {
        id: "m1",
        text: "Hi! We're planning our 25th anniversary celebration and would love to work with you.",
        sender: "client",
        timestamp: "2:00 PM",
        isRead: true,
        projectId: "p7-1",
        eventId: "e7",
      },
      {
        id: "m2",
        text: "Hello! Congratulations on your 25th anniversary! I'd be delighted to help make it special. Let me send you some options.",
        sender: "vendor",
        timestamp: "2:15 PM",
        isRead: true,
        projectId: "p7-1",
        eventId: "e7",
      },
      {
        id: "m3",
        text: "We're expecting about 50 guests. Can you accommodate that?",
        sender: "client",
        timestamp: "2:30 PM",
        isRead: true,
        projectId: "p7-1",
        eventId: "e7",
      },
      {
        id: "m4",
        text: "Absolutely! 50 guests is perfect. I'll prepare a customized menu for your anniversary celebration.",
        sender: "vendor",
        timestamp: "2:45 PM",
        isRead: true,
        projectId: "p7-1",
        eventId: "e7",
      },
    ],
    invoices: [
      // Project-specific: Thompson Anniversary - Anniversary Catering (p7-1)
      {
        id: "inv-13",
        invoiceNumber: "INV-001246",
        clientId: "6",
        dueDate: "20/12/2025",
        amount: 1250,
        status: "pending",
        subtotal: 1152.07,
        tax: 97.93,
        taxRate: 8.5,
        items: [
          {
            id: "item-13",
            description: "Anniversary Catering - Deposit (50%)",
            quantity: 1,
            rate: 1152.07,
            amount: 1152.07,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "10/12/2025",
        projectId: "p7-1",
        eventId: "e7",
      },
    ],
    documents: [
      // Project-specific: Thompson Anniversary - Anniversary Catering (p7-1)
      {
        id: "doc-20",
        name: "Anniversary_Catering_Proposal.pdf",
        type: "proposal",
        fileType: "PDF",
        size: 1650000, // 1.65 MB
        uploadedBy: "vendor",
        uploadedDate: "05/12/2025",
        description: "Anniversary celebration catering proposal with menu options",
        relatedTo: "p7-1",
        status: "unopened",
      },
      {
        id: "doc-21",
        name: "Anniversary_Catering_Contract.pdf",
        type: "contract",
        fileType: "PDF",
        size: 2200000, // 2.2 MB
        uploadedBy: "client",
        uploadedDate: "10/12/2025",
        description: "Signed service contract for anniversary catering",
        relatedTo: "p7-1",
        status: "viewed",
      },
    ],
    tasks: [
      // Project-specific: Thompson Anniversary - Anniversary Catering (p7-1)
      {
        id: "task-14",
        title: "Get client approval on menu",
        description: "Get client approval on anniversary menu finalization",
        dueDate: "10/12/2025",
        priority: "high",
        status: "pending",
        clientId: "6",
        createdAt: "05/12/2025",
        projectId: "p7-1",
        eventId: "e7",
      },
      {
        id: "task-15",
        title: "Confirm final guest count",
        description: "Verify final guest count for anniversary celebration",
        dueDate: "05/01/2026",
        priority: "medium",
        status: "pending",
        clientId: "6",
        createdAt: "12/12/2025",
        projectId: "p7-1",
        eventId: "e7",
      },
    ],
  },
  {
    id: "7",
    name: "Marketplace Client",
    email: "marketplace@example.com",
    phone: "+1-555-0789",
    status: "active",
    stage: "proposal sent",
    progress: 35,
    totalSpent: 5000,
    activeEvents: 1,
    completed: 0,
    pendingInvoices: 1,
    rating: 4.5,
    reviewCount: 2,
    lastContact: "18/01/2024",
    source: "marketplace",
    events: [
      {
        id: "e8",
        name: "Corporate Event 2024",
        date: "20/03/2024",
        totalBudget: 15000,
        status: "upcoming",
        description: "Corporate networking event",
        projects: [
          {
            id: "p8-1",
            name: "Event Catering",
            category: "Catering",
            amount: 5000,
            status: "in_progress",
            startDate: "20/03/2024",
            description: "Catering for 150 guests",
          },
        ],
      },
    ],
    messages: [
      {
        id: "m1",
        text: "Hello! I found your services through the marketplace and I'm interested in catering for our corporate event.",
        sender: "client",
        timestamp: "10:00 AM",
        isRead: true,
      },
      {
        id: "m2",
        text: "Hello! Thank you for reaching out through the marketplace. I'd be happy to help with your corporate event. How many guests are you expecting?",
        sender: "vendor",
        timestamp: "10:15 AM",
        isRead: true,
      },
      {
        id: "m3",
        text: "We're expecting around 150 guests. Can you provide a quote for buffet-style catering?",
        sender: "client",
        timestamp: "10:30 AM",
        isRead: true,
        projectId: "p8-1",
        eventId: "e8",
      },
      {
        id: "m4",
        text: "Absolutely! I'll prepare a detailed quote for buffet-style catering for 150 guests. I'll send it over within the next hour.",
        sender: "vendor",
        timestamp: "10:45 AM",
        isRead: true,
        projectId: "p8-1",
        eventId: "e8",
      },
      {
        id: "m5",
        text: "That sounds great! I'm also interested in seeing your menu options.",
        sender: "client",
        timestamp: "11:00 AM",
        isRead: false,
        projectId: "p8-1",
        eventId: "e8",
      },
    ],
    invoices: [
      {
        id: "inv-14",
        invoiceNumber: "INV-001247",
        clientId: "7",
        dueDate: "15/03/2024",
        amount: 2500,
        status: "pending",
        subtotal: 2304.15,
        tax: 195.85,
        taxRate: 8.5,
        items: [
          {
            id: "item-14",
            description: "Corporate Event Catering - Deposit (50%)",
            quantity: 1,
            rate: 2304.15,
            amount: 2304.15,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "18/01/2024",
        projectId: "p8-1",
        eventId: "e8",
      },
    ],
    documents: [
      {
        id: "doc-22",
        name: "Corporate_Event_Catering_Proposal.pdf",
        type: "proposal",
        fileType: "PDF",
        size: 1400000, // 1.4 MB
        uploadedBy: "vendor",
        uploadedDate: "18/01/2024",
        description: "Corporate event catering proposal with menu options",
        relatedTo: "p8-1",
        status: "unopened",
      },
    ],
    tasks: [
      {
        id: "task-16",
        title: "Send catering menu options",
        description: "Prepare and send menu options for corporate event",
        dueDate: "25/01/2024",
        priority: "high",
        status: "pending",
        clientId: "7",
        createdAt: "18/01/2024",
        projectId: "p8-1",
        eventId: "e8",
      },
    ],
  },
  {
    id: "8",
    name: "Tech Startup Inc",
    email: "events@techstartup.com",
    phone: "+1-555-0890",
    status: "active",
    stage: "contacted",
    progress: 20,
    totalSpent: 0,
    activeEvents: 1,
    completed: 0,
    pendingInvoices: 0,
    rating: 0,
    lastContact: "19/01/2024",
    source: "marketplace",
    events: [
      {
        id: "e9",
        name: "Product Launch Party",
        date: "05/04/2024",
        totalBudget: 12000,
        status: "upcoming",
        description: "Tech product launch celebration",
        projects: [
          {
            id: "p9-1",
            name: "Launch Event Catering",
            category: "Catering",
            amount: 8000,
            status: "pending",
            startDate: "05/04/2024",
            description: "Catering for product launch event",
          },
        ],
      },
    ],
    messages: [
      {
        id: "m1",
        text: "Hi! We're looking for catering services for our product launch. Found you on the marketplace!",
        sender: "client",
        timestamp: "2:00 PM",
        isRead: true,
      },
      {
        id: "m2",
        text: "Hello! Congratulations on your product launch! I'd be delighted to help. What's the expected guest count?",
        sender: "vendor",
        timestamp: "2:20 PM",
        isRead: true,
      },
      {
        id: "m3",
        text: "We're expecting about 200 people. Do you offer finger foods and appetizers?",
        sender: "client",
        timestamp: "2:45 PM",
        isRead: false,
        projectId: "p9-1",
        eventId: "e9",
      },
    ],
  },
  {
    id: "9",
    name: "Wedding Planners LLC",
    email: "contact@weddingplanners.com",
    phone: "+1-555-0901",
    status: "active",
    stage: "negotiation",
    progress: 60,
    totalSpent: 12000,
    activeEvents: 2,
    completed: 1,
    pendingInvoices: 1,
    rating: 4.8,
    reviewCount: 5,
    lastContact: "20/01/2024",
    source: "marketplace",
    events: [
      {
        id: "e10",
        name: "Summer Wedding Series",
        date: "15/06/2024",
        totalBudget: 45000,
        status: "upcoming",
        description: "Multiple wedding events",
        projects: [
          {
            id: "p10-1",
            name: "Wedding Reception Catering",
            category: "Catering",
            amount: 25000,
            status: "in_progress",
            startDate: "15/06/2024",
            description: "Full catering service for wedding reception",
          },
          {
            id: "p10-2",
            name: "Wedding Photography",
            category: "Photography",
            amount: 8000,
            status: "pending",
            startDate: "15/06/2024",
            description: "Professional wedding photography",
          },
        ],
      },
    ],
    messages: [
      {
        id: "m1",
        text: "Hello! We're a wedding planning company and we found your profile on the marketplace. We have multiple clients who need catering services.",
        sender: "client",
        timestamp: "9:00 AM",
        isRead: true,
      },
      {
        id: "m2",
        text: "Hello! That's wonderful. We'd love to work with you and your clients. Can you tell me more about the types of events you're planning?",
        sender: "vendor",
        timestamp: "9:30 AM",
        isRead: true,
      },
      {
        id: "m3",
        text: "We specialize in weddings, typically 100-300 guests. We're looking for a reliable catering partner for our summer wedding series.",
        sender: "client",
        timestamp: "10:00 AM",
        isRead: true,
        projectId: "p10-1",
        eventId: "e10",
      },
      {
        id: "m4",
        text: "Perfect! We have extensive experience with weddings of that size. I'll send you our wedding catering packages and we can discuss a partnership arrangement.",
        sender: "vendor",
        timestamp: "10:30 AM",
        isRead: true,
        projectId: "p10-1",
        eventId: "e10",
      },
      {
        id: "m5",
        text: "That sounds great! We also need photography services. Do you offer that or can you recommend someone?",
        sender: "client",
        timestamp: "11:00 AM",
        isRead: false,
        projectId: "p10-2",
        eventId: "e10",
      },
    ],
    invoices: [
      {
        id: "inv-15",
        invoiceNumber: "INV-001248",
        clientId: "9",
        dueDate: "01/06/2024",
        amount: 12500,
        status: "pending",
        subtotal: 11520.74,
        tax: 979.26,
        taxRate: 8.5,
        items: [
          {
            id: "item-15",
            description: "Wedding Reception Catering - Deposit (50%)",
            quantity: 1,
            rate: 11520.74,
            amount: 11520.74,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "20/01/2024",
        projectId: "p10-1",
        eventId: "e10",
      },
    ],
  },
  {
    id: "10",
    name: "Community Center",
    email: "events@communitycenter.org",
    phone: "+1-555-0912",
    status: "active",
    stage: "contract signed",
    progress: 80,
    totalSpent: 15000,
    activeEvents: 1,
    completed: 2,
    pendingInvoices: 0,
    rating: 5.0,
    reviewCount: 3,
    lastContact: "21/01/2024",
    source: "marketplace",
    events: [
      {
        id: "e11",
        name: "Annual Fundraiser Gala",
        date: "10/05/2024",
        totalBudget: 20000,
        status: "upcoming",
        description: "Annual fundraising event",
        projects: [
          {
            id: "p11-1",
            name: "Gala Catering Service",
            category: "Catering",
            amount: 15000,
            status: "in_progress",
            startDate: "10/05/2024",
            description: "Full catering for 300 guests",
          },
        ],
      },
    ],
    messages: [
      {
        id: "m1",
        text: "Good morning! We're organizing our annual fundraiser and found your catering services on the marketplace. We've worked with you before and would love to book again!",
        sender: "client",
        timestamp: "8:00 AM",
        isRead: true,
      },
      {
        id: "m2",
        text: "Good morning! It's wonderful to hear from you again. We'd be honored to cater your annual fundraiser. How many guests are you expecting this year?",
        sender: "vendor",
        timestamp: "8:30 AM",
        isRead: true,
      },
      {
        id: "m3",
        text: "We're expecting around 300 guests this year. Can we use the same menu as last year? It was a huge hit!",
        sender: "client",
        timestamp: "9:00 AM",
        isRead: true,
        projectId: "p11-1",
        eventId: "e11",
      },
      {
        id: "m4",
        text: "Absolutely! I'll prepare a quote based on last year's menu for 300 guests. I'll have it ready by this afternoon.",
        sender: "vendor",
        timestamp: "9:30 AM",
        isRead: true,
        projectId: "p11-1",
        eventId: "e11",
      },
    ],
    invoices: [
      {
        id: "inv-16",
        invoiceNumber: "INV-001249",
        clientId: "10",
        dueDate: "01/05/2024",
        amount: 7500,
        status: "pending",
        subtotal: 6912.44,
        tax: 587.56,
        taxRate: 8.5,
        items: [
          {
            id: "item-16",
            description: "Annual Fundraiser Gala Catering - Deposit (50%)",
            quantity: 1,
            rate: 6912.44,
            amount: 6912.44,
          },
        ],
        paymentTerms: "Net 30",
        createdAt: "21/01/2024",
        projectId: "p11-1",
        eventId: "e11",
      },
    ],
  },
];

export const getClientStatistics = (clients: Client[]) => {
  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.status === "active").length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.totalSpent, 0);
  const inPipeline = clients.filter(
    (c) =>
      c.stage === "prospect" ||
      c.stage === "contacted" ||
      c.stage === "proposal sent" ||
      c.stage === "negotiation"
  ).length;

  return {
    totalClients,
    activeClients,
    totalRevenue,
    inPipeline,
  };
};

