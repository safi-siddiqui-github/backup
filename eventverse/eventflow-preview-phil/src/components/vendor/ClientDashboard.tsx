
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  User,
  MessageSquare,
  Calendar,
  FileText,
  DollarSign,
  CheckSquare,
  Phone,
  Mail,
  Building,
  Star,
  Plus,
  Send,
  Download,
  Eye
} from "lucide-react";
import MessageDialog from "./dialogs/MessageDialog";
import ContractDialog from "./dialogs/ContractDialog";
import InvoiceDialog from "./dialogs/InvoiceDialog";
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
      progress: 75
    },
    {
      id: "p2",
      name: "Engagement Party",
      date: "2023-12-10",
      status: "completed",
      value: 3500,
      progress: 100
    }
  ];

  const mockContracts = [
    {
      id: "c1",
      name: "Wedding Catering Contract",
      status: "signed",
      value: 7500,
      date: "2024-08-15",
      signedDate: "2024-01-20"
    },
    {
      id: "c2",
      name: "Engagement Party Contract",
      status: "completed",
      value: 3500,
      date: "2023-12-10",
      signedDate: "2023-11-15"
    }
  ];

  const mockInvoices = [
    {
      id: "inv1",
      number: "INV-001234",
      amount: 3750,
      status: "paid",
      dueDate: "2024-07-15",
      paidDate: "2024-07-10"
    },
    {
      id: "inv2",
      number: "INV-001235",
      amount: 3750,
      status: "pending",
      dueDate: "2024-08-20"
    }
  ];

  const mockMessages = [
    {
      id: "m1",
      type: "email",
      subject: "Wedding Menu Confirmation",
      date: "2024-01-20",
      status: "sent"
    },
    {
      id: "m2",
      type: "phone",
      subject: "Venue walkthrough discussion",
      date: "2024-01-18",
      status: "completed"
    }
  ];

  const mockTasks = [
    {
      id: "t1",
      title: "Send final menu options",
      dueDate: "2024-01-25",
      status: "pending",
      priority: "high"
    },
    {
      id: "t2",
      title: "Confirm headcount",
      dueDate: "2024-02-01",
      status: "pending",
      priority: "medium"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Clients
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{client.name}</h2>
          <p className="text-gray-600">Complete client management dashboard</p>
        </div>
        <Badge className={
          client.status === "active" ? "bg-green-100 text-green-800" :
          client.status === "inactive" ? "bg-gray-100 text-gray-800" :
          "bg-blue-100 text-blue-800"
        }>
          {client.status}
        </Badge>
      </div>

      {/* Client Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Client Profile */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Client Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">{client.name}</h3>
                  {client.company && (
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {client.company}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {client.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    {client.phone}
                  </div>
                </div>

                {client.rating > 0 && (
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-4 h-4 ${star <= client.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({client.rating})</span>
                  </div>
                )}

                <div className="flex flex-col gap-2 pt-4">
                  <MessageDialog clientId={client.id}>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </MessageDialog>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center bg-green-50 p-4 rounded">
                    <p className="text-2xl font-bold text-green-600">${client.totalSpent.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                  <div className="text-center bg-blue-50 p-4 rounded">
                    <p className="text-2xl font-bold text-blue-600">{client.activeProjects}</p>
                    <p className="text-sm text-gray-600">Active Projects</p>
                  </div>
                  <div className="text-center bg-purple-50 p-4 rounded">
                    <p className="text-2xl font-bold text-purple-600">{client.completedProjects}</p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                  <div className="text-center bg-orange-50 p-4 rounded">
                    <p className="text-2xl font-bold text-orange-600">{mockInvoices.filter(i => i.status === "pending").length}</p>
                    <p className="text-sm text-gray-600">Pending Invoices</p>
                  </div>
                </div>

                {/* Next Event */}
                {client.nextEvent && (
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Upcoming Event</h4>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{client.nextEvent.name}</p>
                        <p className="text-sm text-gray-600">{new Date(client.nextEvent.date).toLocaleDateString()}</p>
                      </div>
                      <p className="text-lg font-bold text-purple-600">${client.nextEvent.value.toLocaleString()}</p>
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ContractDialog clientId={client.id}>
                  <Button className="h-20 flex-col gap-2">
                    <FileText className="w-6 h-6" />
                    New Contract
                  </Button>
                </ContractDialog>
                
                <InvoiceDialog clientId={client.id}>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <DollarSign className="w-6 h-6" />
                    Create Invoice
                  </Button>
                </InvoiceDialog>
                
                <TaskDialog>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <CheckSquare className="w-6 h-6" />
                    Add Task
                  </Button>
                </TaskDialog>
                
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Calendar className="w-6 h-6" />
                  Schedule Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communications Tab */}
        <TabsContent value="communications" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Communication History</h3>
            <MessageDialog clientId={client.id}>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Message
              </Button>
            </MessageDialog>
          </div>
          
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <Card key={message.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{message.subject}</h4>
                      <p className="text-sm text-gray-600 capitalize">{message.type} - {message.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{new Date(message.date).toLocaleDateString()}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Eye className="w-4 h-4 mr-2" />
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
        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project History</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-gray-600">{new Date(project.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${project.value.toLocaleString()}</p>
                      <Badge variant={project.status === "completed" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{project.progress}% complete</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Contracts</h3>
            <ContractDialog clientId={client.id}>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Contract
              </Button>
            </ContractDialog>
          </div>
          
          <div className="space-y-4">
            {mockContracts.map((contract) => (
              <Card key={contract.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{contract.name}</h4>
                      <p className="text-sm text-gray-600">Event: {new Date(contract.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">Signed: {new Date(contract.signedDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${contract.value.toLocaleString()}</p>
                      <Badge variant={contract.status === "signed" ? "default" : "secondary"}>
                        {contract.status}
                      </Badge>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
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
        <TabsContent value="billing" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Invoices & Payments</h3>
            <InvoiceDialog clientId={client.id}>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Invoice
              </Button>
            </InvoiceDialog>
          </div>
          
          <div className="space-y-4">
            {mockInvoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{invoice.number}</h4>
                      <p className="text-sm text-gray-600">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                      {invoice.paidDate && (
                        <p className="text-sm text-green-600">Paid: {new Date(invoice.paidDate).toLocaleDateString()}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${invoice.amount.toLocaleString()}</p>
                      <Badge variant={invoice.status === "paid" ? "default" : "destructive"}>
                        {invoice.status}
                      </Badge>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        {invoice.status === "pending" && (
                          <Button size="sm">
                            <Send className="w-4 h-4 mr-2" />
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

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Shared Documents</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600 text-center py-8">
                Document sharing feature for {client.name}. Upload and view shared documents here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Client Tasks</h3>
            <TaskDialog>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </TaskDialog>
          </div>
          
          <div className="space-y-4">
            {mockTasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>
                        {task.priority}
                      </Badge>
                      <Badge variant={task.status === "pending" ? "secondary" : "default"} className="ml-2">
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
