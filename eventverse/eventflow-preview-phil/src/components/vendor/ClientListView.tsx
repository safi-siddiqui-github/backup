
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Building, 
  Mail, 
  Phone, 
  DollarSign, 
  Calendar,
  MessageSquare,
  FileText,
  Eye,
  TrendingUp,
  Clock,
  Star
} from "lucide-react";

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
  stage: "prospect" | "contacted" | "proposal_sent" | "negotiating" | "contract_signed" | "active" | "completed";
  nextEvent?: {
    name: string;
    date: string;
    value: number;
  };
}

interface ClientListViewProps {
  clients: Client[];
  onClientSelect: (client: Client) => void;
}

const ClientListView = ({ clients, onClientSelect }: ClientListViewProps) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(clients[0] || null);

  const getStageColor = (stage: Client["stage"]) => {
    switch (stage) {
      case "prospect": return "bg-gray-100 text-gray-800";
      case "contacted": return "bg-blue-100 text-blue-800";
      case "proposal_sent": return "bg-yellow-100 text-yellow-800";
      case "negotiating": return "bg-orange-100 text-orange-800";
      case "contract_signed": return "bg-purple-100 text-purple-800";
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-green-200 text-green-900";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStageProgress = (stage: Client["stage"]) => {
    const stages = ["prospect", "contacted", "proposal_sent", "negotiating", "contract_signed", "active", "completed"];
    return ((stages.indexOf(stage) + 1) / stages.length) * 100;
  };

  const handleRowClick = (client: Client) => {
    setSelectedClient(client);
  };

  return (
    <div className="flex gap-6 h-[800px]">
      {/* Client List - 60% */}
      <div className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Clients ({clients.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto max-h-[700px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow 
                      key={client.id}
                      className={`cursor-pointer hover:bg-gray-50 ${selectedClient?.id === client.id ? 'bg-blue-50' : ''}`}
                      onClick={() => handleRowClick(client)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            {client.company && (
                              <p className="text-sm text-gray-500">{client.company}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={getStageColor(client.stage)}>
                            {client.stage.replace('_', ' ')}
                          </Badge>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${getStageProgress(client.stage)}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-600">
                          ${client.totalSpent.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {new Date(client.lastContact).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={client.status === "active" ? "default" : "secondary"}>
                          {client.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Preview - 40% */}
      <div className="w-2/5">
        {selectedClient ? (
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-lg">{selectedClient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{selectedClient.name}</CardTitle>
                    {selectedClient.company && (
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {selectedClient.company}
                      </p>
                    )}
                  </div>
                </div>
                <Button onClick={() => onClientSelect(selectedClient)}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Full
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stage Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Current Stage</span>
                  <Badge className={getStageColor(selectedClient.stage)}>
                    {selectedClient.stage.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${getStageProgress(selectedClient.stage)}%` }}
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <h4 className="font-medium">Contact Information</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    {selectedClient.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    {selectedClient.phone}
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">Total Spent</span>
                  </div>
                  <p className="text-lg font-bold text-green-700">
                    ${selectedClient.totalSpent.toLocaleString()}
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-600">Active Projects</span>
                  </div>
                  <p className="text-lg font-bold text-blue-700">
                    {selectedClient.activeProjects}
                  </p>
                </div>
              </div>

              {/* Next Event */}
              {selectedClient.nextEvent && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Upcoming Event</h4>
                  <p className="font-medium">{selectedClient.nextEvent.name}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-purple-600 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedClient.nextEvent.date).toLocaleDateString()}
                    </span>
                    <span className="font-bold text-purple-800">
                      ${selectedClient.nextEvent.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Rating */}
              {selectedClient.rating > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Client Rating</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-4 h-4 ${star <= selectedClient.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({selectedClient.rating})</span>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="space-y-2">
                <h4 className="font-medium">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Invoice
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>

              {/* Last Contact */}
              <div className="text-xs text-gray-500 text-center pt-4 border-t">
                <Clock className="w-4 h-4 inline mr-1" />
                Last contact: {new Date(selectedClient.lastContact).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent>
              <p className="text-gray-500">Select a client to view details</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ClientListView;
