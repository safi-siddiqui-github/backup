import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Mail, MapPin, Phone, Tent, Store } from 'lucide-react';
import { useVendorInvitations } from '@/hooks/useVendorInvitations';
import DraggableVenueObject from '../DraggableVenueObject';

export function VendorBoothLocationView() {
  const { invitationId } = useParams<{ invitationId: string }>();
  const navigate = useNavigate();
  const { invitations } = useVendorInvitations();
  const [invitation, setInvitation] = useState<any>(null);

  useEffect(() => {
    if (invitationId) {
      const found = invitations.find(inv => inv.id === invitationId);
      setInvitation(found);
    }
  }, [invitationId, invitations]);

  if (!invitation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="py-8 text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Invitation not found</p>
            <Button className="mt-4" onClick={() => navigate('/vendor')}>
              Back to Portal
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hasAssignment = invitation.boothAssignments && invitation.boothAssignments.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/vendor')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portal
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Booth Location</h1>
                <p className="text-sm text-gray-600">{invitation.eventName}</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700">
              <MapPin className="w-3 h-3 mr-1" />
              Booth Assigned
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event & Booth Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-orange-600" />
                  Your Booth Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Event Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{invitation.eventLocation}</span>
                    </div>
                    <div className="text-gray-600">{invitation.eventDate}</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Purchased Booths</h4>
                  <div className="space-y-2">
                    {invitation.selectedBooths?.map((booth: any, idx: number) => {
                      const boothType = invitation.availableBooths.find((b: any) => b.id === booth.boothTypeId);
                      return (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            {boothType?.icon === 'tent' ? (
                              <Tent className="w-4 h-4 text-orange-600" />
                            ) : (
                              <Store className="w-4 h-4 text-orange-600" />
                            )}
                            <span className="text-sm font-medium">{boothType?.name}</span>
                            {booth.quantity > 1 && (
                              <span className="text-xs text-gray-500">× {booth.quantity}</span>
                            )}
                          </div>
                          <span className="text-sm font-semibold">${booth.subtotal}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>Total Paid:</span>
                    <span className="text-green-600">${invitation.totalAmount?.toLocaleString()}</span>
                  </div>
                </div>

                {hasAssignment && (
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Booth Location</h4>
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <div className="flex items-center gap-2 text-green-700">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">Booth #{invitation.boothAssignments[0].venueObjectId}</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        See location highlighted on the map
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Host Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{invitation.hostName}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Mail className="w-3 h-3" />
                    {invitation.hostEmail}
                  </div>
                </div>
                <Button className="w-full" variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Host
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Venue Map
              </Button>
            </div>
          </div>

          {/* Venue Map - Read Only */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Venue Layout</CardTitle>
                <CardDescription>
                  {hasAssignment
                    ? 'Your booth is highlighted on the map'
                    : 'Booth assignment pending - check back later'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {hasAssignment ? (
                  <div className="relative w-full h-[600px] bg-gray-100 rounded-lg border-2 border-gray-200 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <MapPin className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                        <p className="text-lg font-medium text-gray-600">Your Booth Location</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Booth #{invitation.boothAssignments[0].venueObjectId}
                        </p>
                        <Badge className="mt-4 bg-orange-100 text-orange-700">
                          <Tent className="w-3 h-3 mr-1" />
                          Location Assigned
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-[600px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <MapPin className="w-16 h-16 mx-auto mb-4 opacity-40" />
                        <p className="text-lg font-medium text-gray-600">Booth Assignment Pending</p>
                        <p className="text-sm text-gray-500 mt-2 max-w-md">
                          The event host will assign your booth location soon. You'll be notified when it's ready.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                  <p className="text-blue-800">
                    <strong>Note:</strong> This is a read-only view of the venue layout. 
                    Contact the host if you have questions about your booth location.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
