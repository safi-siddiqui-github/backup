export interface DeliverableItem {
  id: string;
  name: string;
  status: "not-started" | "in-progress" | "on-hold" | "complete";
}

export interface ActionItem {
  id: string;
  text: string;
  assignee: string;
  completed: boolean;
}

export interface Payment {
  amount: number;
  required: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "blocked" | "pending";
  progress?: number;
  completedDate?: string;
  dueDate?: string;
  startDate?: string;
  estimatedStart?: string;
  daysRemaining?: number;
  payment?: Payment;
  requirements?: string[];
  deliverables?: DeliverableItem[];
  actionItems?: ActionItem[];
}

// Timeline for Project 1 (Corporate Gala)
export const mockMilestones: Milestone[] = [
  {
    id: "m1",
    title: "Initial Consultation & Planning",
    description: "Meet with client to discuss requirements and finalize event details",
    status: "completed",
    completedDate: "15/01/2024",
    deliverables: [
      {
        id: "d1-1",
        name: "Event requirements document",
        status: "complete",
      },
      {
        id: "d1-2",
        name: "Venue layout plan",
        status: "complete",
      },
      {
        id: "d1-3",
        name: "Menu selection finalized",
        status: "complete",
      },
    ],
    actionItems: [
      {
        id: "a1-1",
        text: "Schedule initial meeting",
        assignee: "Vendor",
        completed: true,
      },
      {
        id: "a1-2",
        text: "Provide event requirements",
        assignee: "Client",
        completed: true,
      },
    ],
  },
  {
    id: "m2",
    title: "Contract Signing & Deposit",
    description: "Sign service agreement and process initial deposit payment",
    status: "completed",
    completedDate: "20/01/2024",
    payment: {
      amount: 2500,
      required: false,
    },
    deliverables: [
      {
        id: "d2-1",
        name: "Signed service contract",
        status: "complete",
      },
      {
        id: "d2-2",
        name: "Payment receipt",
        status: "complete",
      },
    ],
    requirements: [
      "Valid ID for contract signing",
      "Initial deposit payment (30% of total)",
    ],
  },
  {
    id: "m3",
    title: "Menu Tasting & Finalization",
    description: "Conduct menu tasting session and finalize food selections",
    status: "in_progress",
    progress: 65,
    startDate: "25/01/2024",
    dueDate: "10/02/2024",
    daysRemaining: 5,
    deliverables: [
      {
        id: "d3-1",
        name: "Menu tasting completed",
        status: "complete",
      },
      {
        id: "d3-2",
        name: "Final menu approved",
        status: "in-progress",
      },
      {
        id: "d3-3",
        name: "Dietary restrictions documented",
        status: "in-progress",
      },
    ],
    actionItems: [
      {
        id: "a3-1",
        text: "Schedule tasting session",
        assignee: "Vendor",
        completed: true,
      },
      {
        id: "a3-2",
        text: "Approve final menu selections",
        assignee: "Client",
        completed: false,
      },
    ],
  },
  {
    id: "m4",
    title: "Equipment & Staffing Confirmation",
    description: "Confirm equipment needs and finalize staffing requirements",
    status: "pending",
    estimatedStart: "12/02/2024",
    dueDate: "20/02/2024",
    payment: {
      amount: 3000,
      required: true,
    },
    deliverables: [
      {
        id: "d4-1",
        name: "Equipment list finalized",
        status: "not-started",
      },
      {
        id: "d4-2",
        name: "Staff schedule confirmed",
        status: "not-started",
      },
      {
        id: "d4-3",
        name: "Rental agreements signed",
        status: "not-started",
      },
    ],
    requirements: [
      "Second payment installment (40% of total)",
      "Venue access confirmation",
      "Final headcount",
    ],
    actionItems: [
      {
        id: "a4-1",
        text: "Provide final guest count",
        assignee: "Client",
        completed: false,
      },
      {
        id: "a4-2",
        text: "Arrange equipment rentals",
        assignee: "Vendor",
        completed: false,
      },
    ],
  },
  {
    id: "m5",
    title: "Pre-Event Setup & Preparation",
    description: "Setup venue, prepare food, and conduct final walkthrough",
    status: "pending",
    estimatedStart: "14/08/2024",
    dueDate: "15/08/2024",
    deliverables: [
      {
        id: "d5-1",
        name: "Venue setup completed",
        status: "not-started",
      },
      {
        id: "d5-2",
        name: "Food preparation started",
        status: "not-started",
      },
      {
        id: "d5-3",
        name: "Final walkthrough with client",
        status: "not-started",
      },
    ],
    requirements: [
      "Venue access 24 hours before event",
      "All equipment delivered",
      "Staff confirmed and briefed",
    ],
  },
  {
    id: "m6",
    title: "Event Day Service",
    description: "Execute full catering service for the event",
    status: "pending",
    estimatedStart: "15/08/2024",
    deliverables: [
      {
        id: "d6-1",
        name: "Food service completed",
        status: "not-started",
      },
      {
        id: "d6-2",
        name: "Cleanup completed",
        status: "not-started",
      },
      {
        id: "d6-3",
        name: "Client satisfaction confirmed",
        status: "not-started",
      },
    ],
    actionItems: [
      {
        id: "a6-1",
        text: "Coordinate with venue staff",
        assignee: "Vendor",
        completed: false,
      },
      {
        id: "a6-2",
        text: "Manage food service timing",
        assignee: "Vendor",
        completed: false,
      },
    ],
  },
  {
    id: "m7",
    title: "Post-Event Follow-up & Final Payment",
    description: "Collect feedback, process final payment, and close project",
    status: "pending",
    estimatedStart: "16/08/2024",
    dueDate: "20/08/2024",
    payment: {
      amount: 2000,
      required: true,
    },
    deliverables: [
      {
        id: "d7-1",
        name: "Final invoice sent",
        status: "not-started",
      },
      {
        id: "d7-2",
        name: "Client feedback collected",
        status: "not-started",
      },
      {
        id: "d7-3",
        name: "Project documentation completed",
        status: "not-started",
      },
    ],
    requirements: [
      "Final payment (30% of total)",
      "Event photos and documentation",
    ],
    actionItems: [
      {
        id: "a7-1",
        text: "Send final invoice",
        assignee: "Vendor",
        completed: false,
      },
      {
        id: "a7-2",
        text: "Process final payment",
        assignee: "Client",
        completed: false,
      },
      {
        id: "a7-3",
        text: "Provide feedback and review",
        assignee: "Client",
        completed: false,
      },
    ],
  },
];

// Timeline for Project 2 (Holiday Party)
export const mockMilestonesHolidayParty: Milestone[] = [
  {
    id: "m1-hp",
    title: "Initial Planning & Budget Approval",
    description: "Discuss holiday party requirements and get budget approval from management",
    status: "completed",
    completedDate: "01/11/2024",
    deliverables: [
      {
        id: "d1-1-hp",
        name: "Event proposal document",
        status: "complete",
      },
      {
        id: "d1-2-hp",
        name: "Budget approval signed",
        status: "complete",
      },
      {
        id: "d1-3-hp",
        name: "Guest list finalized",
        status: "complete",
      },
    ],
  },
  {
    id: "m2-hp",
    title: "Menu Selection & Theme Design",
    description: "Choose holiday-themed menu and design event theme",
    status: "in_progress",
    progress: 40,
    startDate: "05/11/2024",
    dueDate: "25/11/2024",
    daysRemaining: 10,
    deliverables: [
      {
        id: "d2-1-hp",
        name: "Holiday menu selected",
        status: "complete",
      },
      {
        id: "d2-2-hp",
        name: "Theme design approved",
        status: "in-progress",
      },
      {
        id: "d2-3-hp",
        name: "Decorations plan finalized",
        status: "not-started",
      },
      {
        id: "d2-4-hp",
        name: "Entertainment booked",
        status: "not-started",
      },
    ],
  },
  {
    id: "m3-hp",
    title: "Deposit Payment & Contract",
    description: "Process initial deposit and sign service contract",
    status: "pending",
    estimatedStart: "20/11/2024",
    dueDate: "25/11/2024",
    payment: {
      amount: 5400,
      required: true,
    },
    deliverables: [
      {
        id: "d3-1-hp",
        name: "Service contract signed",
        status: "not-started",
      },
      {
        id: "d3-2-hp",
        name: "Deposit payment processed",
        status: "not-started",
      },
    ],
    requirements: [
      "Initial deposit payment (30% of total)",
      "Signed service agreement",
      "Event date confirmation",
    ],
  },
  {
    id: "m4-hp",
    title: "Vendor Coordination & Setup Planning",
    description: "Coordinate with all vendors and plan event setup",
    status: "pending",
    estimatedStart: "01/12/2024",
    dueDate: "10/12/2024",
    deliverables: [
      {
        id: "d4-1-hp",
        name: "All vendors confirmed",
        status: "not-started",
      },
      {
        id: "d4-2-hp",
        name: "Setup timeline created",
        status: "not-started",
      },
      {
        id: "d4-3-hp",
        name: "Equipment list finalized",
        status: "not-started",
      },
    ],
    requirements: [
      "Second payment installment (40% of total)",
      "Final guest count",
      "Venue access schedule",
    ],
  },
  {
    id: "m5-hp",
    title: "Pre-Event Preparation",
    description: "Final preparations, food prep, and venue setup",
    status: "pending",
    estimatedStart: "12/12/2024",
    dueDate: "14/12/2024",
    deliverables: [
      {
        id: "d5-1-hp",
        name: "Food preparation started",
        status: "not-started",
      },
      {
        id: "d5-2-hp",
        name: "Venue decorated",
        status: "not-started",
      },
      {
        id: "d5-3-hp",
        name: "Final walkthrough completed",
        status: "not-started",
      },
    ],
  },
  {
    id: "m6-hp",
    title: "Holiday Party Execution",
    description: "Execute full event service for the holiday party",
    status: "pending",
    estimatedStart: "15/12/2024",
    deliverables: [
      {
        id: "d6-1-hp",
        name: "Event service completed",
        status: "not-started",
      },
      {
        id: "d6-2-hp",
        name: "Guest satisfaction confirmed",
        status: "not-started",
      },
      {
        id: "d6-3-hp",
        name: "Post-event cleanup done",
        status: "not-started",
      },
    ],
  },
  {
    id: "m7-hp",
    title: "Final Payment & Project Closure",
    description: "Process final payment and close out the project",
    status: "pending",
    estimatedStart: "16/12/2024",
    dueDate: "20/12/2024",
    payment: {
      amount: 3600,
      required: true,
    },
    deliverables: [
      {
        id: "d7-1-hp",
        name: "Final invoice sent",
        status: "not-started",
      },
      {
        id: "d7-2-hp",
        name: "Event photos delivered",
        status: "not-started",
      },
      {
        id: "d7-3-hp",
        name: "Project documentation completed",
        status: "not-started",
      },
    ],
    requirements: [
      "Final payment (30% of total)",
      "Event feedback and testimonials",
    ],
  },
];

// Function to get timeline data based on project ID
export const getTimelineByProjectId = (projectId: string): Milestone[] => {
  switch (projectId) {
    case "p2":
      return mockMilestones;
    case "p2-2":
      return mockMilestonesHolidayParty;
    default:
      return mockMilestones;
  }
};

