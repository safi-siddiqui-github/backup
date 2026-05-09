import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, CheckCircle2, Eye, MousePointerClick, XCircle, Clock } from "lucide-react";
import { AnnouncementRecipient } from "@/hooks/useAnnouncementStorage";
import { format } from "date-fns";

interface RecipientTableProps {
  recipients: AnnouncementRecipient[];
}

const RecipientTable = ({ recipients }: RecipientTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusIcon = (status: AnnouncementRecipient['status']) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'opened':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'clicked':
        return <MousePointerClick className="w-4 h-4 text-purple-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: AnnouncementRecipient['status']) => {
    const variants = {
      delivered: 'bg-green-100 text-green-700 border-green-200',
      opened: 'bg-blue-100 text-blue-700 border-blue-200',
      clicked: 'bg-purple-100 text-purple-700 border-purple-200',
      failed: 'bg-red-100 text-red-700 border-red-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    };
    
    return (
      <Badge variant="outline" className={`${variants[status]} capitalize flex items-center gap-1 w-fit`}>
        {getStatusIcon(status)}
        {status}
      </Badge>
    );
  };

  const filteredRecipients = recipients.filter(recipient => {
    const matchesSearch = 
      recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.sourceName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || recipient.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by name, email, or group..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="opened">Opened</SelectItem>
            <SelectItem value="clicked">Clicked</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Delivered</TableHead>
              <TableHead>Opened</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecipients.length > 0 ? (
              filteredRecipients.map((recipient) => (
                <TableRow key={recipient.id}>
                  <TableCell className="font-medium">{recipient.name}</TableCell>
                  <TableCell className="text-muted-foreground">{recipient.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {recipient.sourceName || recipient.source}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(recipient.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {recipient.deliveredAt ? format(recipient.deliveredAt, 'MMM d, h:mm a') : '-'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {recipient.openedAt ? format(recipient.openedAt, 'MMM d, h:mm a') : '-'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No recipients found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredRecipients.length} of {recipients.length} recipients
      </div>
    </div>
  );
};

export default RecipientTable;
