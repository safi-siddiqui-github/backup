"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Client } from "../mockClients";
import { cn } from "@/lib/utils";
import ClientDetailPanel from "../ClientDetailPanel";
import { formatCurrency } from "../utils/formatCurrency";
import StatusBadge from "./StatusBadge";
import { getStageColor } from "../utils/statusColors";

interface ClientsTableProps {
  clients: Client[];
  selectedClientId: string | null;
  onClientSelect: (client: Client) => void;
  onManageClient?: (client: Client) => void;
}

export default function ClientsTable({
  clients,
  selectedClientId,
  onClientSelect,
  onManageClient,
}: ClientsTableProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const selectedClient = clients.find((c) => c.id === selectedClientId) || null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Table Section */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="px-6 pt-6 pb-4">
            <CardTitle className="text-lg font-semibold">
              Clients ({clients.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <p className="text-muted-foreground">No clients found.</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => (
                    <TableRow
                      key={client.id}
                      className={cn(
                        "cursor-pointer",
                        selectedClientId === client.id &&
                          "bg-blue-50 dark:bg-blue-900/10"
                      )}
                      onClick={() => onClientSelect(client)}
                    >
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-blue-600 text-white">
                              {getInitials(client.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{client.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <Progress value={client.progress} className="h-1.5 w-24 bg-gray-200 dark:bg-gray-700 [&>div]:bg-blue-600" />
                      </TableCell>
                      <TableCell className="font-medium py-3 text-green-600 dark:text-green-400">
                        {formatCurrency(client.totalSpent)}
                      </TableCell>
                      <TableCell className="text-muted-foreground py-3">
                        {client.lastContact}
                      </TableCell>
                      <TableCell className="py-3">
                        <StatusBadge status={client.status} type="client" />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Detail Panel */}
      <div className="lg:col-span-1">
        <ClientDetailPanel 
          client={selectedClient} 
          onManageClient={selectedClient ? () => onManageClient?.(selectedClient) : undefined}
        />
      </div>
    </div>
  );
}

