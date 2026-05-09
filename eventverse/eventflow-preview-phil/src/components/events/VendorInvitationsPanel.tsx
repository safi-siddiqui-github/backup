import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVendorInvitations } from "@/hooks/useVendorInvitations";
import { VendorInvitation } from "@/types/venue";
import { Mail, CheckCircle, XCircle, Clock, MapPin, DollarSign, Store } from "lucide-react";
import { format } from "date-fns";

interface VendorInvitationsPanelProps {
  eventId: string;
}

const VendorInvitationsPanel = ({ eventId }: VendorInvitationsPanelProps) => {
  const { getEventInvitations } = useVendorInvitations();
  const allInvitations = getEventInvitations(eventId);
  
  const pendingInvitations = allInvitations.filter(inv => inv.status === 'pending');
  const acceptedInvitations = allInvitations.filter(inv => inv.status === 'accepted');
  const declinedInvitations = allInvitations.filter(inv => inv.status === 'declined');

  const getStatusBadge = (invitation: VendorInvitation) => {
    switch (invitation.status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'accepted':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Accepted</Badge>;
      case 'declined':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Declined</Badge>;
      default:
        return <Badge variant="outline">{invitation.status}</Badge>;
    }
  };

  const getPaymentBadge = (invitation: VendorInvitation) => {
    if (invitation.status !== 'accepted') return null;
    
    switch (invitation.paymentStatus) {
      case 'paid':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>;
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Awaiting Payment</Badge>;
      case 'failed':
        return <Badge variant="destructive">Payment Failed</Badge>;
      default:
        return null;
    }
  };

  const getAssignmentBadge = (invitation: VendorInvitation) => {
    if (invitation.status !== 'accepted' || invitation.paymentStatus !== 'paid') return null;
    
    const hasAssignment = invitation.boothAssignments && invitation.boothAssignments.length > 0;
    
    if (hasAssignment) {
      return <Badge variant="default" className="bg-blue-500"><MapPin className="w-3 h-3 mr-1" />Assigned</Badge>;
    } else {
      return <Badge variant="outline"><MapPin className="w-3 h-3 mr-1" />Awaiting Assignment</Badge>;
    }
  };

  const renderInvitationCard = (invitation: VendorInvitation) => (
    <Card key={invitation.id} className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold">{invitation.vendorBusinessName || invitation.vendorName}</h4>
              {getStatusBadge(invitation)}
              {getPaymentBadge(invitation)}
              {getAssignmentBadge(invitation)}
            </div>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {invitation.vendorEmail}
              </div>
              
              {invitation.status === 'pending' && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Invited {format(new Date(invitation.invitedAt), 'MMM d, yyyy')}
                </div>
              )}
              
              {invitation.status === 'accepted' && invitation.selectedBooths && (
                <div className="flex items-center gap-2 mt-2">
                  <Store className="w-4 h-4" />
                  <div>
                    {invitation.selectedBooths.map((booth, idx) => {
                      const boothType = invitation.availableBooths.find(b => b.id === booth.boothTypeId);
                      return (
                        <span key={idx} className="text-sm">
                          {boothType?.name} × {booth.quantity}
                          {idx < invitation.selectedBooths!.length - 1 && ', '}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {invitation.status === 'accepted' && invitation.totalAmount && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Total: {invitation.totalAmount} {invitation.currency}
                </div>
              )}
              
              {invitation.status === 'declined' && invitation.declineReason && (
                <div className="text-xs italic mt-2">
                  Reason: {invitation.declineReason}
                </div>
              )}
            </div>
          </div>
          
          {invitation.status === 'accepted' && invitation.paymentStatus === 'paid' && (
            <Button size="sm" variant="outline">
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Vendor Invitations</span>
          <div className="flex gap-2">
            <Badge variant="secondary">{allInvitations.length} Total</Badge>
            <Badge variant="default" className="bg-green-500">{acceptedInvitations.length} Accepted</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All ({allInvitations.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingInvitations.length})
            </TabsTrigger>
            <TabsTrigger value="accepted">
              Accepted ({acceptedInvitations.length})
            </TabsTrigger>
            <TabsTrigger value="declined">
              Declined ({declinedInvitations.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {allInvitations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Mail className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No invitations sent yet</p>
              </div>
            ) : (
              <div>
                {allInvitations.map(renderInvitationCard)}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="mt-4">
            {pendingInvitations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No pending invitations</p>
              </div>
            ) : (
              <div>
                {pendingInvitations.map(renderInvitationCard)}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="accepted" className="mt-4">
            {acceptedInvitations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No accepted invitations yet</p>
              </div>
            ) : (
              <div>
                {acceptedInvitations.map(renderInvitationCard)}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="declined" className="mt-4">
            {declinedInvitations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No declined invitations</p>
              </div>
            ) : (
              <div>
                {declinedInvitations.map(renderInvitationCard)}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VendorInvitationsPanel;
