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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  DollarSign,
  Eye,
  File,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import ContractDialog from "./dialogs/ContractDialog";
import MessageDialog from "./dialogs/MessageDialog";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface VendorClientsProps {
  vendor: VendorUser;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  totalSpent: number;
  activeContracts: number;
  completedProjects: number;
  rating: number;
  lastContact: string;
  status: "active" | "inactive" | "prospect";
  projects: {
    id: string;
    name: string;
    date: string;
    value: number;
    status: "completed" | "ongoing" | "upcoming";
  }[];
}

const VendorClients = ({ vendor }: VendorClientsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const { toast } = useToast();

  // Mock clients data
  const [clients] = useState<Client[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "+1-555-0123",
      totalSpent: 15000,
      activeContracts: 1,
      completedProjects: 2,
      rating: 5,
      lastContact: "2024-01-15",
      status: "active",
      projects: [
        {
          id: "p1",
          name: "Wedding Catering",
          date: "2024-08-15",
          value: 7500,
          status: "upcoming",
        },
        {
          id: "p2",
          name: "Engagement Party",
          date: "2023-12-10",
          value: 3500,
          status: "completed",
        },
        {
          id: "p3",
          name: "Bridal Shower",
          date: "2023-10-20",
          value: 4000,
          status: "completed",
        },
      ],
    },
    {
      id: "2",
      name: "Elite Events Inc",
      email: "contact@eliteevents.com",
      phone: "+1-555-0456",
      company: "Elite Events Inc",
      totalSpent: 45000,
      activeContracts: 2,
      completedProjects: 8,
      rating: 4.8,
      lastContact: "2024-01-12",
      status: "active",
      projects: [
        {
          id: "p4",
          name: "Corporate Gala",
          date: "2024-09-20",
          value: 12000,
          status: "upcoming",
        },
        {
          id: "p5",
          name: "Holiday Party",
          date: "2023-12-15",
          value: 8000,
          status: "completed",
        },
      ],
    },
    {
      id: "3",
      name: "Maria Rodriguez",
      email: "maria@email.com",
      phone: "+1-555-0789",
      totalSpent: 3500,
      activeContracts: 0,
      completedProjects: 1,
      rating: 4.5,
      lastContact: "2024-01-10",
      status: "inactive",
      projects: [
        {
          id: "p6",
          name: "Birthday Party",
          date: "2023-07-30",
          value: 3500,
          status: "completed",
        },
      ],
    },
    {
      id: "4",
      name: "Robert Chen",
      email: "robert@email.com",
      phone: "+1-555-0321",
      totalSpent: 0,
      activeContracts: 0,
      completedProjects: 0,
      rating: 0,
      lastContact: "2024-01-08",
      status: "prospect",
      projects: [],
    },
  ]);

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Client["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "prospect":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTotalValue = () => {
    return clients.reduce((sum, client) => sum + client.totalSpent, 0);
  };

  const getActiveClients = () => {
    return clients.filter((client) => client.status === "active").length;
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding new client:", newClient);
    toast({
      title: "Client added",
      description: `${newClient.name} has been added to your client list.`,
    });
    setShowAddClient(false);
    setNewClient({ name: "", email: "", phone: "", company: "" });
  };

  const ClientDetailDialog = ({ client }: { client: Client }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{client.name}</DialogTitle>
          <DialogDescription>
            Complete client profile and project history
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="mb-2 font-semibold">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  {client.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  {client.phone}
                </div>
                {client.company && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    {client.company}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Business Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="rounded bg-green-50 p-3">
                  <p className="text-lg font-bold text-green-600">
                    ${client.totalSpent.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">Total Spent</p>
                </div>
                <div className="rounded bg-blue-50 p-3">
                  <p className="text-lg font-bold text-blue-600">
                    {client.completedProjects}
                  </p>
                  <p className="text-xs text-gray-500">Projects</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project History */}
          <div>
            <h3 className="mb-2 font-semibold">Project History</h3>
            <div className="space-y-2">
              {client.projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between rounded bg-gray-50 p-3"
                >
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(project.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${project.value.toLocaleString()}
                    </p>
                    <Badge
                      variant={
                        project.status === "completed" ? "default" : "secondary"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <MessageDialog clientId={client.id}>
              <Button
                variant="outline"
                className="flex-1"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </MessageDialog>
            <ContractDialog clientId={client.id}>
              <Button className="flex-1">
                <File className="mr-2 h-4 w-4" />
                Create Contract
              </Button>
            </ContractDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Clients
                </p>
                <p className="text-2xl font-bold">{clients.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Clients
                </p>
                <p className="text-2xl font-bold">{getActiveClients()}</p>
              </div>
              <Star className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">
                  ${getTotalValue().toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Client Dialog */}
      <Dialog
        open={showAddClient}
        onOpenChange={setShowAddClient}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Add a new client to your database
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleAddClient}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="clientName">Full Name</Label>
              <Input
                id="clientName"
                value={newClient.name}
                onChange={(e) =>
                  setNewClient((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="John Smith"
                required
              />
            </div>
            <div>
              <Label htmlFor="clientEmail">Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={newClient.email}
                onChange={(e) =>
                  setNewClient((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="clientPhone">Phone</Label>
              <Input
                id="clientPhone"
                value={newClient.phone}
                onChange={(e) =>
                  setNewClient((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="+1-555-0123"
                required
              />
            </div>
            <div>
              <Label htmlFor="clientCompany">Company (Optional)</Label>
              <Input
                id="clientCompany"
                value={newClient.company}
                onChange={(e) =>
                  setNewClient((prev) => ({ ...prev, company: e.target.value }))
                }
                placeholder="Company Name"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddClient(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
              >
                Add Client
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search clients..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={() => setShowAddClient(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Clients List */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredClients.map((client) => (
          <Card
            key={client.id}
            className="transition-shadow hover:shadow-md"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  {client.company && (
                    <CardDescription>{client.company}</CardDescription>
                  )}
                </div>
                <Badge className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    {client.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    {client.phone}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-green-600">
                      ${client.totalSpent.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Total Spent</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-600">
                      {client.activeContracts}
                    </p>
                    <p className="text-xs text-gray-500">Active</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-purple-600">
                      {client.completedProjects}
                    </p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>

                {/* Rating */}
                {client.rating > 0 && (
                  <div className="flex items-center justify-center gap-1">
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

                {/* Recent Projects */}
                {client.projects.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium">
                      Recent Projects
                    </h4>
                    <div className="space-y-1">
                      {client.projects.slice(0, 2).map((project) => (
                        <div
                          key={project.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-600">{project.name}</span>
                          <span className="font-medium">
                            ${project.value.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <ClientDetailDialog client={client} />

                  <MessageDialog clientId={client.id}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </MessageDialog>

                  <ContractDialog clientId={client.id}>
                    <Button
                      size="sm"
                      className="flex-1"
                    >
                      <File className="mr-2 h-4 w-4" />
                      Contract
                    </Button>
                  </ContractDialog>
                </div>

                <div className="pt-2 text-center text-xs text-gray-500">
                  Last contact:{" "}
                  {new Date(client.lastContact).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No clients found
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your filters to see more clients."
                : "Your clients will appear here once you start working with them."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VendorClients;
