import { useState, useEffect } from 'react';
import { VendorInvitation, BoothType } from '@/types/venue';

const simulatePaymentProcessing = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export function useVendorInvitations() {
  const [invitations, setInvitations] = useState<VendorInvitation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('vendor_invitations');
    if (stored) {
      setInvitations(JSON.parse(stored));
    }
  }, []);

  const saveInvitations = (invites: VendorInvitation[]) => {
    localStorage.setItem('vendor_invitations', JSON.stringify(invites));
    setInvitations(invites);
  };

  const sendInvitation = (invitation: Omit<VendorInvitation, 'id' | 'invitedAt' | 'status' | 'paymentStatus' | 'termsAccepted'>) => {
    const newInvitation: VendorInvitation = {
      ...invitation,
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      invitedAt: new Date().toISOString(),
      status: 'pending',
      paymentStatus: 'pending',
      termsAccepted: false,
    };
    
    saveInvitations([...invitations, newInvitation]);
    return newInvitation;
  };

  const getEventInvitations = (eventId: string) => {
    return invitations.filter(inv => inv.eventId === eventId);
  };

  const getInvitationsByStatus = (eventId: string, status: VendorInvitation['status']) => {
    return invitations.filter(inv => inv.eventId === eventId && inv.status === status);
  };

  const getVendorInvitations = (vendorEmail: string) => {
    return invitations.filter(inv => 
      inv.vendorEmail.toLowerCase() === vendorEmail.toLowerCase()
    );
  };

  const acceptInvitation = async (
    invitationId: string,
    selectedBooths: Array<{ boothTypeId: string; quantity: number; subtotal: number }>,
    paymentMethod: string,
    termsAccepted: boolean
  ) => {
    setLoading(true);
    
    await simulatePaymentProcessing(2000);
    
    const totalAmount = selectedBooths.reduce((sum, booth) => sum + booth.subtotal, 0);
    const paymentSuccess = Math.random() > 0.1;
    
    if (!paymentSuccess) {
      setLoading(false);
      throw new Error('Payment failed. Please try again.');
    }
    
    const updatedInvitations = invitations.map(inv => {
      if (inv.id === invitationId) {
        return {
          ...inv,
          status: 'accepted' as const,
          respondedAt: new Date().toISOString(),
          selectedBooths,
          totalAmount,
          currency: inv.availableBooths[0]?.currency || 'USD',
          paymentStatus: 'paid' as const,
          paymentMethod,
          paymentTransactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          paidAt: new Date().toISOString(),
          termsAccepted,
          termsAcceptedAt: termsAccepted ? new Date().toISOString() : undefined,
        };
      }
      return inv;
    });
    
    saveInvitations(updatedInvitations);
    setLoading(false);
    
    return updatedInvitations.find(inv => inv.id === invitationId);
  };

  const declineInvitation = (invitationId: string, reason?: string) => {
    const updatedInvitations = invitations.map(inv => {
      if (inv.id === invitationId) {
        return {
          ...inv,
          status: 'declined' as const,
          respondedAt: new Date().toISOString(),
          declineReason: reason,
        };
      }
      return inv;
    });
    
    saveInvitations(updatedInvitations);
  };

  const updateBoothAssignments = (
    invitationId: string,
    assignments: VendorInvitation['boothAssignments']
  ) => {
    const updatedInvitations = invitations.map(inv => {
      if (inv.id === invitationId) {
        return { ...inv, boothAssignments: assignments };
      }
      return inv;
    });
    
    saveInvitations(updatedInvitations);
  };

  return {
    invitations,
    loading,
    sendInvitation,
    getEventInvitations,
    getInvitationsByStatus,
    getVendorInvitations,
    acceptInvitation,
    declineInvitation,
    updateBoothAssignments,
  };
}
