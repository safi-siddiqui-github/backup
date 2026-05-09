import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useVendorInvitations } from "@/hooks/useVendorInvitations";
import VendorInvitationResponseDialog from "./VendorInvitationResponseDialog";
import { VendorInvitation } from "@/types/venue";
import { Mail, Calendar, MapPin, Store, DollarSign, CheckCircle } from "lucide-react";
import { format } from "date-fns";

interface VendorEventInvitationsProps {
  vendorEmail: string;
}

const VendorEventInvitations = ({ vendorEmail }: VendorEventInvitationsProps) => {
  const { getVendorInvitations } = useVendorInvitations();
  const invitations = getVendorInvitations(vendorEmail);
  const [selectedInvitation, setSelectedInvitation] = useState<VendorInvitation | null>(null);

  const pendingInvitations = invitations.filter(inv => inv.status === 'pending');
  const acceptedInvitations = invitations.filter(inv => inv.status === 'accepted');

  return (
    <div className="space-y-6">
      {pendingInvitations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Pending Invitations</h3>
          <div className="grid gap-4">
            {pendingInvitations.map((invitation) => (
              <Card key={invitation.id} className="border-2 border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{invitation.eventName}</span>
                    <Badge>New Invitation</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{invitation.eventDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{invitation.eventLocation}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Available Booth Options:</p>
                    {invitation.availableBooths.map((booth) => (
                      <div key={booth.id} className="flex items-center justify-between p-2 bg-accent/50 rounded">
                        <span className="text-sm">{booth.name}</span>
                        <Badge variant="secondary">
                          <DollarSign className="w-3 h-3" />
                          {booth.price} {booth.currency}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {invitation.message && (
                    <div className="p-3 bg-accent/30 rounded text-sm">
                      <p className="font-medium mb-1">Message from host:</p>
                      <p className="text-muted-foreground">{invitation.message}</p>
                    </div>
                  )}

                  <Button onClick={() => setSelectedInvitation(invitation)} className="w-full">
                    View Details & Respond
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {acceptedInvitations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Accepted Events</h3>
          <div className="grid gap-4">
            {acceptedInvitations.map((invitation) => (
              <Card key={invitation.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{invitation.eventName}</h4>
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Accepted
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {invitation.eventDate}
                        </div>
                        <div className="flex items-center gap-2">
                          <Store className="w-4 h-4" />
                          {invitation.selectedBooths?.map((booth, idx) => {
                            const boothType = invitation.availableBooths.find(b => b.id === booth.boothTypeId);
                            return (
                              <span key={idx}>
                                {boothType?.name} × {booth.quantity}
                              </span>
                            );
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Paid: {invitation.totalAmount} {invitation.currency}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {invitations.length === 0 && (
        <div className="text-center py-12">
          <Mail className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No event invitations yet</p>
        </div>
      )}

      {selectedInvitation && (
        <VendorInvitationResponseDialog
          open={!!selectedInvitation}
          onClose={() => setSelectedInvitation(null)}
          invitation={selectedInvitation}
        />
      )}
    </div>
  );
};

export default VendorEventInvitations;
