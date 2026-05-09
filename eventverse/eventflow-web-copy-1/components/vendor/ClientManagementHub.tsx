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
  ArrowRight,
  DollarSign,
  Grid,
  List,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import ClientDashboard from "./ClientDashboard";
import ClientListView from "./ClientListView";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface ClientManagementHubProps {
  vendor: VendorUser;
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
  stage:
    | "prospect"
    | "contacted"
    | "proposal_sent"
    | "negotiating"
    | "contract_signed"
    | "active"
    | "completed";
  nextEvent?: {
    name: string;
    date: string;
    value: number;
  };
}

const ClientManagementHub = ({ vendor }: ClientManagementHubProps) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Enhanced mock clients data with stages
  const clients: Client[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "+1-555-0123",
      totalSpent: 15000,
      activeProjects: 1,
      completedProjects: 2,
      rating: 5,
      lastContact: "2024-01-15",
      status: "active",
      stage: "active",
      nextEvent: {
        name: "Wedding Catering",
        date: "2024-08-15",
        value: 7500,
      },
    },
    {
      id: "2",
      name: "Elite Events Inc",
      email: "contact@eliteevents.com",
      phone: "+1-555-0456",
      company: "Elite Events Inc",
      totalSpent: 45000,
      activeProjects: 2,
      completedProjects: 8,
      rating: 4.8,
      lastContact: "2024-01-12",
      status: "active",
      stage: "contract_signed",
      nextEvent: {
        name: "Corporate Gala",
        date: "2024-09-20",
        value: 12000,
      },
    },
    {
      id: "3",
      name: "Maria Rodriguez",
      email: "maria@email.com",
      phone: "+1-555-0789",
      totalSpent: 3500,
      activeProjects: 0,
      completedProjects: 1,
      rating: 4.5,
      lastContact: "2024-01-10",
      status: "inactive",
      stage: "completed",
    },
    {
      id: "4",
      name: "Robert Chen",
      email: "robert@email.com",
      phone: "+1-555-0321",
      totalSpent: 0,
      activeProjects: 0,
      completedProjects: 0,
      rating: 0,
      lastContact: "2024-01-08",
      status: "prospect",
      stage: "prospect",
    },
    {
      id: "5",
      name: "Jennifer Smith",
      email: "jennifer@email.com",
      phone: "+1-555-0654",
      totalSpent: 8500,
      activeProjects: 1,
      completedProjects: 1,
      rating: 4.2,
      lastContact: "2024-01-14",
      status: "active",
      stage: "negotiating",
    },
  ];

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.company &&
        client.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      statusFilter === "all" || client.status === statusFilter;
    const matchesStage = stageFilter === "all" || client.stage === stageFilter;

    return matchesSearch && matchesStatus && matchesStage;
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

  const getStageColor = (stage: Client["stage"]) => {
    switch (stage) {
      case "prospect":
        return "bg-gray-100 text-gray-800";
      case "contacted":
        return "bg-blue-100 text-blue-800";
      case "proposal_sent":
        return "bg-yellow-100 text-yellow-800";
      case "negotiating":
        return "bg-orange-100 text-orange-800";
      case "contract_signed":
        return "bg-purple-100 text-purple-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-green-200 text-green-900";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Stage distribution for analytics
  const getStageDistribution = () => {
    const stages: Client["stage"][] = [
      "prospect",
      "contacted",
      "proposal_sent",
      "negotiating",
      "contract_signed",
      "active",
      "completed",
    ];
    return stages.map((stage) => ({
      stage,
      count: clients.filter((c) => c.stage === stage).length,
      value: clients
        .filter((c) => c.stage === stage)
        .reduce((sum, c) => sum + c.totalSpent, 0),
    }));
  };

  // If a client is selected, show the client dashboard
  if (selectedClient) {
    return (
      <ClientDashboard
        client={selectedClient}
        vendor={vendor}
        onBack={() => setSelectedClient(null)}
      />
    );
  }

  // Show client management interface
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Client Management</h2>
          <p className="text-gray-600">
            Manage your client relationships and track their journey
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="px-3 py-1 text-lg"
          >
            {filteredClients.length} Clients
          </Badge>
          <div className="flex rounded-lg bg-gray-100 p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="px-3"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
                <p className="text-2xl font-bold">
                  {clients.filter((c) => c.status === "active").length}
                </p>
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
                  $
                  {clients
                    .reduce((sum, c) => sum + c.totalSpent, 0)
                    .toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Pipeline</p>
                <p className="text-2xl font-bold">
                  {
                    clients.filter((c) =>
                      [
                        "prospect",
                        "contacted",
                        "proposal_sent",
                        "negotiating",
                      ].includes(c.stage),
                    ).length
                  }
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stage Pipeline Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Client Pipeline</CardTitle>
          <CardDescription>
            Track clients through your sales process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {getStageDistribution().map(({ stage, count, value }) => (
              <div
                key={stage}
                className="text-center"
              >
                <div className={`rounded-lg p-4 ${getStageColor(stage)} mb-2`}>
                  <p className="text-sm font-medium capitalize">
                    {stage.replace("_", " ")}
                  </p>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-xs">${value.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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

            <Select
              value={stageFilter}
              onValueChange={setStageFilter}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                <SelectItem value="negotiating">Negotiating</SelectItem>
                <SelectItem value="contract_signed">Contract Signed</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Client Views */}
      {viewMode === "list" ? (
        <ClientListView
          clients={filteredClients}
          onClientSelect={setSelectedClient}
        />
      ) : (
        // Enhanced Grid View
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredClients.map((client) => (
            <Card
              key={client.id}
              className="group cursor-pointer transition-shadow hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    {client.company && (
                      <CardDescription className="mt-1 flex items-center gap-1">
                        {client.company}
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                    <Badge className={getStageColor(client.stage)}>
                      {client.stage.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Stage Progress */}
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="text-gray-500">
                        {Math.round(
                          (([
                            "prospect",
                            "contacted",
                            "proposal_sent",
                            "negotiating",
                            "contract_signed",
                            "active",
                            "completed",
                          ].indexOf(client.stage) +
                            1) /
                            7) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                        style={{
                          width: `${((["prospect", "contacted", "proposal_sent", "negotiating", "contract_signed", "active", "completed"].indexOf(client.stage) + 1) / 7) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="rounded bg-green-50 p-3">
                      <p className="text-lg font-bold text-green-600">
                        ${client.totalSpent.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Total Spent</p>
                    </div>
                    <div className="rounded bg-blue-50 p-3">
                      <p className="text-lg font-bold text-blue-600">
                        {client.activeProjects}
                      </p>
                      <p className="text-xs text-gray-500">Active Projects</p>
                    </div>
                  </div>

                  {/* Next Event */}
                  {client.nextEvent && (
                    <div className="rounded bg-purple-50 p-3">
                      <p className="font-medium text-purple-800">
                        {client.nextEvent.name}
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-sm text-purple-600">
                          {new Date(client.nextEvent.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm font-medium text-purple-800">
                          ${client.nextEvent.value.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}

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

                  {/* Last Contact */}
                  <div className="text-center text-xs text-gray-500">
                    Last contact:{" "}
                    {new Date(client.lastContact).toLocaleDateString()}
                  </div>

                  {/* Action Button */}
                  <Button
                    className="group-hover:bg-primary group-hover:text-primary-foreground w-full transition-colors"
                    variant="outline"
                    onClick={() => setSelectedClient(client)}
                  >
                    Manage Client
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No clients found
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "all" || stageFilter !== "all"
                ? "Try adjusting your filters to see more clients."
                : "Your clients will appear here once you start working with them."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientManagementHub;
