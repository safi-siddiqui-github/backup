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
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Eye,
  Plus,
  Receipt,
  Search,
  Send,
  TrendingUp,
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

interface VendorBillingProps {
  vendor: VendorUser;
}

interface Invoice {
  id: string;
  clientName: string;
  projectName: string;
  amount: number;
  dueDate: string;
  issueDate: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  paymentMethod?: string;
  paidDate?: string;
}

interface Payment {
  id: string;
  invoiceId: string;
  clientName: string;
  amount: number;
  date: string;
  method: string;
  status: "completed" | "pending" | "failed";
}

const VendorBilling = ({ vendor }: VendorBillingProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("invoices");

  // Mock invoices data
  const [invoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      clientName: "Sarah Johnson",
      projectName: "Wedding Catering Services",
      amount: 7500,
      dueDate: "2024-08-15",
      issueDate: "2024-07-15",
      status: "sent",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "INV-002",
      clientName: "Elite Events Inc",
      projectName: "Corporate Gala Catering",
      amount: 12000,
      dueDate: "2024-09-20",
      issueDate: "2024-08-20",
      status: "draft",
    },
    {
      id: "INV-003",
      clientName: "Maria Rodriguez",
      projectName: "Birthday Party Catering",
      amount: 3500,
      dueDate: "2024-01-15",
      issueDate: "2024-01-01",
      status: "paid",
      paymentMethod: "Credit Card",
      paidDate: "2024-01-12",
    },
    {
      id: "INV-004",
      clientName: "Robert Chen",
      projectName: "Anniversary Celebration",
      amount: 5000,
      dueDate: "2024-01-01",
      issueDate: "2023-12-01",
      status: "overdue",
    },
  ]);

  // Mock payments data
  const [payments] = useState<Payment[]>([
    {
      id: "PAY-001",
      invoiceId: "INV-003",
      clientName: "Maria Rodriguez",
      amount: 3500,
      date: "2024-01-12",
      method: "Credit Card",
      status: "completed",
    },
    {
      id: "PAY-002",
      invoiceId: "INV-005",
      clientName: "Previous Client",
      amount: 2800,
      date: "2024-01-10",
      method: "Bank Transfer",
      status: "completed",
    },
    {
      id: "PAY-003",
      invoiceId: "INV-006",
      clientName: "Another Client",
      amount: 4200,
      date: "2024-01-08",
      method: "Check",
      status: "pending",
    },
  ]);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "sent":
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <Receipt className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPaymentStatusColor = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTotalRevenue = () => {
    return invoices
      .filter((inv) => inv.status === "paid")
      .reduce((sum, inv) => sum + inv.amount, 0);
  };

  const getPendingAmount = () => {
    return invoices
      .filter((inv) => inv.status === "sent")
      .reduce((sum, inv) => sum + inv.amount, 0);
  };

  const getOverdueAmount = () => {
    return invoices
      .filter((inv) => inv.status === "overdue")
      .reduce((sum, inv) => sum + inv.amount, 0);
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${getTotalRevenue().toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${getPendingAmount().toLocaleString()}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">
                  ${getOverdueAmount().toLocaleString()}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-purple-600">$6,300</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent
          value="invoices"
          className="space-y-4"
        >
          {/* Filters & Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Invoice
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Invoices List */}
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <Card
                key={invoice.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          {invoice.projectName}
                        </h3>
                        <Badge className={getStatusColor(invoice.status)}>
                          {getStatusIcon(invoice.status)}
                          <span className="ml-1">{invoice.status}</span>
                        </Badge>
                      </div>
                      <p className="text-gray-600">
                        {invoice.clientName} • Invoice #{invoice.id}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        ${invoice.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-4 text-sm text-gray-600 md:grid-cols-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Issued: {new Date(invoice.issueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </div>
                    {invoice.paymentMethod && (
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        {invoice.paymentMethod}
                      </div>
                    )}
                    {invoice.paidDate && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Paid: {new Date(invoice.paidDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    {invoice.status === "draft" && (
                      <Button size="sm">
                        <Send className="mr-2 h-4 w-4" />
                        Send to Client
                      </Button>
                    )}
                    {invoice.status === "overdue" && (
                      <Button
                        size="sm"
                        variant="destructive"
                      >
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Send Reminder
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="payments"
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>Track all incoming payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.clientName}</p>
                        <p className="text-sm text-gray-600">
                          Invoice {payment.invoiceId}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        ${payment.amount.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={getPaymentStatusColor(payment.status)}
                        >
                          {payment.status}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {payment.method}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="reports"
          className="space-y-4"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Summary</CardTitle>
                <CardDescription>Monthly revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>January 2024</span>
                    <span className="font-bold">$8,500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>December 2023</span>
                    <span className="font-bold">$12,300</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>November 2023</span>
                    <span className="font-bold">$6,700</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Preferred payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Bank Transfer</span>
                    <span className="font-bold">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Credit Card</span>
                    <span className="font-bold">35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Check</span>
                    <span className="font-bold">20%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorBilling;
