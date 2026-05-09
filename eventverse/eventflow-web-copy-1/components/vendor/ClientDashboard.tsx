"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Building,
  Calendar,
  CheckSquare,
  DollarSign,
  Download,
  Eye,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Send,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import ContractDialog from "./dialogs/ContractDialog";
import InvoiceDialog from "./dialogs/InvoiceDialog";
import MessageDialog from "./dialogs/MessageDialog";
import TaskDialog from "./dialogs/TaskDialog";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  totalSpent: number;
  activeProjects: number;
  completedProjects: number;
  rating: number;
  lastContact: string;
  status: "active" | "inactive" | "prospect";
  nextEvent?: {
    name: string;
    date: string;
    value: number;
  };
}

interface ClientDashboardProps {
  client: Client;
  vendor: VendorUser;
  onBack: () => void;
}

const ClientDashboard = ({ client, vendor, onBack }: ClientDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for client-specific information
  const mockProjects = [
    {
      id: "p1",
      name: "Wedding Catering Service",
      date: "2024-08-15",
      status: "upcoming",
      value: 7500,
      progress: 75,
    },
    {
      id: "p2",
      name: "Engagement Party",
      date: "2023-12-10",
      status: "completed",
      value: 3500,
      progress: 100,
    },
  ];

  const mockContracts = [
    {
      id: "c1",
      name: "Wedding Catering Contract",
      status: "signed",
      value: 7500,
      date: "2024-08-15",
      signedDate: "2024-01-20",
    },
    {
      id: "c2",
      name: "Engagement Party Contract",
      status: "completed",
      value: 3500,
      date: "2023-12-10",
      signedDate: "2023-11-15",
    },
  ];

  const mockInvoices = [
    {
      id: "inv1",
      number: "INV-001234",
      amount: 3750,
      status: "paid",
      dueDate: "2024-07-15",
      paidDate: "2024-07-10",
    },
    {
      id: "inv2",
      number: "INV-001235",
      amount: 3750,
      status: "pending",
      dueDate: "2024-08-20",
    },
  ];

  const mockMessages = [
    {
      id: "m1",
      type: "email",
      subject: "Wedding Menu Confirmation",
      date: "2024-01-20",
      status: "sent",
    },
    {
      id: "m2",
      type: "phone",
      subject: "Venue walkthrough discussion",
      date: "2024-01-18",
      status: "completed",
    },
  ];

  const mockTasks = [
    {
      id: "t1",
      title: "Send final menu options",
      dueDate: "2024-01-25",
      status: "pending",
      priority: "high",
    },
    {
      id: "t2",
      title: "Confirm headcount",
      dueDate: "2024-02-01",
      status: "pending",
      priority: "medium",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{client.name}</h2>
          <p className="text-gray-600">Complete client management dashboard</p>
        </div>
        <Badge
          className={
            client.status === "active"
              ? "bg-green-100 text-green-800"
              : client.status === "inactive"
                ? "bg-gray-100 text-gray-800"
                : "bg-blue-100 text-blue-800"
          }
        >
          {client.status}
        </Badge>
      </div>

      {/* Client Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent
          value="overview"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Client Profile */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Client Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">{client.name}</h3>
                  {client.company && (
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <Building className="h-4 w-4" />
                      {client.company}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    {client.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    {client.phone}
                  </div>
                </div>

                {client.rating > 0 && (
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= client.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">
                      ({client.rating})
                    </span>
                  </div>
                )}

                <div className="flex flex-col gap-2 pt-4">
                  <MessageDialog clientId={client.id}>
                    <Button
                      variant="outline"
                      className="w-full"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </MessageDialog>
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Schedule Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Business Summary */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Business Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="rounded bg-green-50 p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">
                      ${client.totalSpent.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                  <div className="rounded bg-blue-50 p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {client.activeProjects}
                    </p>
                    <p className="text-sm text-gray-600">Active Projects</p>
                  </div>
                  <div className="rounded bg-purple-50 p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {client.completedProjects}
                    </p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                  <div className="rounded bg-orange-50 p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600">
                      {
                        mockInvoices.filter((i) => i.status === "pending")
                          .length
                      }
                    </p>
                    <p className="text-sm text-gray-600">Pending Invoices</p>
                  </div>
                </div>

                {/* Next Event */}
                {client.nextEvent && (
                  <div className="rounded-lg bg-gradient-to-r from-purple-100 to-blue-100 p-4">
                    <h4 className="mb-2 font-semibold text-purple-800">
                      Upcoming Event
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{client.nextEvent.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(client.nextEvent.date).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-purple-600">
                        ${client.nextEvent.value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <ContractDialog clientId={client.id}>
                  <Button className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    New Contract
                  </Button>
                </ContractDialog>

                <InvoiceDialog clientId={client.id}>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2"
                  >
                    <DollarSign className="h-6 w-6" />
                    Create Invoice
                  </Button>
                </InvoiceDialog>

                <TaskDialog>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2"
                  >
                    <CheckSquare className="h-6 w-6" />
                    Add Task
                  </Button>
                </TaskDialog>

                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                >
                  <Calendar className="h-6 w-6" />
                  Schedule Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communications Tab */}
        <TabsContent
          value="communications"
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Communication History</h3>
            <MessageDialog clientId={client.id}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </MessageDialog>
          </div>

          <div className="space-y-4">
            {mockMessages.map((message) => (
              <Card key={message.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{message.subject}</h4>
                      <p className="text-sm text-gray-600 capitalize">
                        {message.type} - {message.status}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(message.date).toLocaleDateString()}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent
          value="projects"
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Project History</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          <div className="space-y-4">
            {mockProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(project.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${project.value.toLocaleString()}
                      </p>
                      <Badge
                        variant={
                          project.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {project.progress}% complete
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contracts Tab */}
        <TabsContent
          value="contracts"
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Contracts</h3>
            <ContractDialog clientId={client.id}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Contract
              </Button>
            </ContractDialog>
          </div>

          <div className="space-y-4">
            {mockContracts.map((contract) => (
              <Card key={contract.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{contract.name}</h4>
                      <p className="text-sm text-gray-600">
                        Event: {new Date(contract.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Signed:{" "}
                        {new Date(contract.signedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${contract.value.toLocaleString()}
                      </p>
                      <Badge
                        variant={
                          contract.status === "signed" ? "default" : "secondary"
                        }
                      >
                        {contract.status}
                      </Badge>
                      <div className="mt-2 flex gap-2">
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
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent
          value="billing"
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Invoices & Payments</h3>
            <InvoiceDialog clientId={client.id}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Invoice
              </Button>
            </InvoiceDialog>
          </div>

          <div className="space-y-4">
            {mockInvoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{invoice.number}</h4>
                      <p className="text-sm text-gray-600">
                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                      </p>
                      {invoice.paidDate && (
                        <p className="text-sm text-green-600">
                          Paid:{" "}
                          {new Date(invoice.paidDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${invoice.amount.toLocaleString()}
                      </p>
                      <Badge
                        variant={
                          invoice.status === "paid" ? "default" : "destructive"
                        }
                      >
                        {invoice.status}
                      </Badge>
                      <div className="mt-2 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        {invoice.status === "pending" && (
                          <Button size="sm">
                            <Send className="mr-2 h-4 w-4" />
                            Send Reminder
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent
          value="tasks"
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Client Tasks</h3>
            <TaskDialog>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </TaskDialog>
          </div>

          <div className="space-y-4">
            {mockTasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-600">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          task.priority === "high" ? "destructive" : "secondary"
                        }
                      >
                        {task.priority}
                      </Badge>
                      <Badge
                        variant={
                          task.status === "pending" ? "secondary" : "default"
                        }
                        className="ml-2"
                      >
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;
