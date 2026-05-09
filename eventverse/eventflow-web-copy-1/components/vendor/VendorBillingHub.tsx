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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  FileText,
  Search,
  Send,
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

interface VendorBillingHubProps {
  vendor: VendorUser;
}

const VendorBillingHub = ({ vendor }: VendorBillingHubProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock data
  const invoices: Invoice[] = [
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
  ];

  const payments: Payment[] = [
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
  ];

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
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTotalRevenue = () =>
    invoices
      .filter((inv) => inv.status === "paid")
      .reduce((sum, inv) => sum + inv.amount, 0);
  const getPendingAmount = () =>
    invoices
      .filter((inv) => inv.status === "sent")
      .reduce((sum, inv) => sum + inv.amount, 0);
  const getOverdueAmount = () =>
    invoices
      .filter((inv) => inv.status === "overdue")
      .reduce((sum, inv) => sum + inv.amount, 0);
  const getDraftAmount = () =>
    invoices
      .filter((inv) => inv.status === "draft")
      .reduce((sum, inv) => sum + inv.amount, 0);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
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
            <p className="mt-2 text-xs text-gray-500">
              From {invoices.filter((inv) => inv.status === "paid").length} paid
              invoices
            </p>
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
            <p className="mt-2 text-xs text-gray-500">
              From {invoices.filter((inv) => inv.status === "sent").length} sent
              invoices
            </p>
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
            <p className="mt-2 text-xs text-gray-500">
              From {invoices.filter((inv) => inv.status === "overdue").length}{" "}
              overdue invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${getDraftAmount().toLocaleString()}
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              From {invoices.filter((inv) => inv.status === "draft").length}{" "}
              draft invoices
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs
        defaultValue="invoices"
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="invoices">All Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent
          value="invoices"
          className="space-y-4"
        >
          {/* Filters */}
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
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.clientName}</TableCell>
                      <TableCell>{invoice.projectName}</TableCell>
                      <TableCell className="font-semibold">
                        ${invoice.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>
                          {getStatusIcon(invoice.status)}
                          <span className="ml-1">{invoice.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            View
                          </Button>
                          {invoice.status === "draft" && (
                            <Button size="sm">
                              <Send className="mr-1 h-4 w-4" />
                              Send
                            </Button>
                          )}
                          {invoice.status === "overdue" && (
                            <Button
                              size="sm"
                              variant="destructive"
                            >
                              <AlertTriangle className="mr-1 h-4 w-4" />
                              Remind
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="payments"
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Track all received payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.id}
                      </TableCell>
                      <TableCell>{payment.clientName}</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        ${payment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(payment.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            payment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="analytics"
          className="space-y-4"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over time</CardDescription>
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
                <CardDescription>
                  Distribution of payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Bank Transfer</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded bg-gray-200">
                        <div className="h-2 w-3/5 rounded bg-blue-500"></div>
                      </div>
                      <span className="font-bold">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Credit Card</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded bg-gray-200">
                        <div className="h-2 w-2/5 rounded bg-green-500"></div>
                      </div>
                      <span className="font-bold">35%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Check</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded bg-gray-200">
                        <div className="h-2 w-1/5 rounded bg-purple-500"></div>
                      </div>
                      <span className="font-bold">20%</span>
                    </div>
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

export default VendorBillingHub;
