export type VendorInvoiceStatus = "paid" | "sent" | "overdue" | "draft";

export interface VendorInvoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  project: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: VendorInvoiceStatus;
}

export const mockVendorInvoices: VendorInvoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "INV-001",
    clientName: "Sarah Johnson",
    project: "Wedding Catering Services",
    amount: 7500,
    dueDate: "15/08/2024",
    status: "sent",
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-002",
    clientName: "Elite Events Inc",
    project: "Corporate Gala Catering",
    amount: 12000,
    dueDate: "20/09/2024",
    status: "draft",
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-003",
    clientName: "Maria Rodriguez",
    project: "Birthday Party Catering",
    amount: 3500,
    dueDate: "15/01/2024",
    paidDate: "10/01/2024",
    status: "paid",
  },
  {
    id: "inv-4",
    invoiceNumber: "INV-004",
    clientName: "Robert Chen",
    project: "Anniversary Celebration",
    amount: 5000,
    dueDate: "01/01/2024",
    status: "overdue",
  },
];

export type PaymentMethod = "Credit Card" | "Bank Transfer" | "PayPal" | "Check" | "Cash";
export type PaymentStatus = "completed" | "pending" | "failed";

export interface Payment {
  id: string;
  paymentId: string;
  clientName: string;
  amount: number;
  date: string;
  method: PaymentMethod;
  status: PaymentStatus;
}

export const mockPayments: Payment[] = [
  {
    id: "pay-1",
    paymentId: "PAY-001",
    clientName: "Maria Rodriguez",
    amount: 3500,
    date: "12/01/2024",
    method: "Credit Card",
    status: "completed",
  },
  {
    id: "pay-2",
    paymentId: "PAY-002",
    clientName: "Previous Client",
    amount: 2800,
    date: "10/01/2024",
    method: "Bank Transfer",
    status: "completed",
  },
];

export const getBillingStats = (invoices: VendorInvoice[]) => {
  const totalRevenue = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pending = invoices
    .filter((inv) => inv.status === "sent")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const overdue = invoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const draft = invoices
    .filter((inv) => inv.status === "draft")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const paidCount = invoices.filter((inv) => inv.status === "paid").length;
  const pendingCount = invoices.filter((inv) => inv.status === "sent").length;
  const overdueCount = invoices.filter((inv) => inv.status === "overdue").length;
  const draftCount = invoices.filter((inv) => inv.status === "draft").length;

  return {
    totalRevenue: {
      amount: totalRevenue,
      count: paidCount,
    },
    pending: {
      amount: pending,
      count: pendingCount,
    },
    overdue: {
      amount: overdue,
      count: overdueCount,
    },
    draft: {
      amount: draft,
      count: draftCount,
    },
  };
};

