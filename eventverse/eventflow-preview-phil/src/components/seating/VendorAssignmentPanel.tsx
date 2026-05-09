import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, Tent, Mail, Phone, DollarSign, Search, MapPin, CheckCircle } from 'lucide-react';
import { VendorInvitation, VenueObject } from '@/types/venue';
import { ScrollArea } from '@/components/ui/scroll-area';

interface VendorAssignmentPanelProps {
  eventId: string;
  arrangementId: string;
  acceptedVendors: VendorInvitation[];
  venueObjects: VenueObject[];
  onAssignVendor: (venueObjectId: number, invitation: VendorInvitation, boothTypeId: string) => void;
  onUnassignVendor: (venueObjectId: number) => void;
}

export function VendorAssignmentPanel({
  eventId,
  arrangementId,
  acceptedVendors,
  venueObjects,
  onAssignVendor,
  onUnassignVendor,
}: VendorAssignmentPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedVendor, setDraggedVendor] = useState<VendorInvitation | null>(null);

  // Filter vendors based on assignment status
  const unassignedVendors = acceptedVendors.filter(
    inv => !inv.boothAssignments || inv.boothAssignments.length === 0
  );

  const assignedVendors = acceptedVendors.filter(
    inv => inv.boothAssignments && inv.boothAssignments.length > 0
  );

  const awaitingPaymentVendors = acceptedVendors.filter(
    inv => inv.paymentStatus !== 'paid'
  );

  // Search filter
  const filteredUnassigned = unassignedVendors.filter(vendor =>
    vendor.vendorBusinessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.vendorEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragStart = (e: React.DragEvent, vendor: VendorInvitation) => {
    setDraggedVendor(vendor);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify(vendor));
  };

  const handleDragEnd = () => {
    setDraggedVendor(null);
  };

  const getBoothTypeName = (boothTypeId: string, vendor: VendorInvitation) => {
    return vendor.availableBooths.find(b => b.id === boothTypeId)?.name || 'Unknown';
  };

  const getAssignedBooth = (vendor: VendorInvitation) => {
    if (!vendor.boothAssignments || vendor.boothAssignments.length === 0) return null;
    const assignment = vendor.boothAssignments[0];
    const venueObject = venueObjects.find(obj => obj.id === assignment.venueObjectId);
    return venueObject;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Store className="w-5 h-5 text-orange-600" />
          Vendor Booth Assignment
        </CardTitle>
        <CardDescription>
          Drag vendors to tent/booth objects on the canvas to assign their spaces
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ready" className="h-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ready">
              Ready ({unassignedVendors.length})
            </TabsTrigger>
            <TabsTrigger value="assigned">
              Assigned ({assignedVendors.length})
            </TabsTrigger>
            <TabsTrigger value="awaiting">
              Awaiting ({awaitingPaymentVendors.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ready" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {filteredUnassigned.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Store className="w-12 h-12 mx-auto mb-2 opacity-40" />
                    <p>No vendors ready for assignment</p>
                  </div>
                ) : (
                  filteredUnassigned.map((vendor) => (
                    <div
                      key={vendor.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, vendor)}
                      onDragEnd={handleDragEnd}
                      className="p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-orange-400 hover:bg-orange-50 cursor-grab active:cursor-grabbing transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">
                            {vendor.vendorBusinessName || vendor.vendorName}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Mail className="w-3 h-3" />
                            {vendor.vendorEmail}
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Paid
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        {vendor.selectedBooths?.map((booth, idx) => {
                          const boothType = vendor.availableBooths.find(b => b.id === booth.boothTypeId);
                          return (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1">
                                {boothType?.icon === 'tent' ? (
                                  <Tent className="w-3 h-3 text-orange-600" />
                                ) : (
                                  <Store className="w-3 h-3 text-orange-600" />
                                )}
                                <span>{boothType?.name}</span>
                                {booth.quantity > 1 && (
                                  <span className="text-muted-foreground">× {booth.quantity}</span>
                                )}
                              </div>
                              <span className="font-medium">${booth.subtotal}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-2 pt-2 border-t text-xs font-semibold flex items-center justify-between">
                        <span>Total Paid:</span>
                        <span className="text-green-600">${vendor.totalAmount?.toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="assigned" className="space-y-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {assignedVendors.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-40" />
                    <p>No vendors assigned yet</p>
                  </div>
                ) : (
                  assignedVendors.map((vendor) => {
                    const booth = getAssignedBooth(vendor);
                    return (
                      <div key={vendor.id} className="p-4 rounded-lg border bg-green-50 border-green-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">
                              {vendor.vendorBusinessName || vendor.vendorName}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <Mail className="w-3 h-3" />
                              {vendor.vendorEmail}
                            </div>
                          </div>
                          <Badge className="bg-green-600 text-white">
                            Assigned
                          </Badge>
                        </div>

                        {booth && (
                          <div className="mt-2 p-2 bg-white rounded border flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-orange-600" />
                              <span className="text-sm font-medium">{booth.name}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onUnassignVendor(booth.id)}
                              className="h-7 text-xs"
                            >
                              Unassign
                            </Button>
                          </div>
                        )}

                        <div className="mt-2 text-xs text-muted-foreground">
                          {vendor.selectedBooths?.map((booth, idx) => {
                            const boothType = vendor.availableBooths.find(b => b.id === booth.boothTypeId);
                            return (
                              <div key={idx}>
                                {boothType?.name} {booth.quantity > 1 && `× ${booth.quantity}`}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="awaiting" className="space-y-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {awaitingPaymentVendors.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <DollarSign className="w-12 h-12 mx-auto mb-2 opacity-40" />
                    <p>All vendors have completed payment</p>
                    <p className="text-xs mt-1">Payment is required before booth assignment</p>
                  </div>
                ) : (
                  awaitingPaymentVendors.map((vendor) => (
                    <div key={vendor.id} className="p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">
                            {vendor.vendorBusinessName || vendor.vendorName}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Mail className="w-3 h-3" />
                            {vendor.vendorEmail}
                          </div>
                        </div>
                        <Badge variant="secondary">
                          Payment Pending
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Cannot assign booth until payment is completed
                      </p>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
