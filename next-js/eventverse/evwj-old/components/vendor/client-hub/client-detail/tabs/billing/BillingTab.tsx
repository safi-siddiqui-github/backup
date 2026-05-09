"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus } from "lucide-react";
import { Client, Invoice } from "../../../mockClients";
import CreateInvoiceModal from "./CreateInvoiceModal";
import ViewInvoiceModal from "./ViewInvoiceModal";
import InvoiceCard from "./InvoiceCard";
import TabHeader from "../../../components/TabHeader";
import EmptyState from "../../../components/EmptyState";

interface BillingTabProps {
  client: Client;
  selectedEventId?: string | null;
  selectedProjectId?: string | null;
}

export default function BillingTab({ client, selectedEventId, selectedProjectId }: BillingTabProps) {
  const allInvoices = client.invoices || [];
  
  // Filter invoices based on selected event/project
  const filteredInvoices = useMemo(() => {
    if (!selectedEventId && !selectedProjectId) {
      return allInvoices; // Show all invoices
    }
    
    // Filter by specific project
    if (selectedProjectId) {
      return allInvoices.filter(
        (invoice) => invoice.projectId === selectedProjectId
      );
    }
    
    // Filter by event (show all invoices for projects in that event)
    if (selectedEventId) {
      return allInvoices.filter(
        (invoice) => invoice.eventId === selectedEventId
      );
    }
    
    return allInvoices;
  }, [allInvoices, selectedEventId, selectedProjectId]);
  
  const [invoices, setInvoices] = useState<Invoice[]>(filteredInvoices);

  // Update invoices when filter changes
  useEffect(() => {
    setInvoices(filteredInvoices);
  }, [filteredInvoices]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleCreateInvoice = (invoice: Invoice) => {
    setInvoices((prev) => [invoice, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleSendReminder = (invoiceId: string) => {
    console.log("Send reminder for invoice:", invoiceId);
    // Handle send reminder logic
  };

  const handleViewInvoice = (invoiceId: string) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId);
    if (invoice) {
      setSelectedInvoice(invoice);
      setIsViewModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <TabHeader
        title="Invoices & Payments"
        actionLabel="New Invoice"
        actionIcon={Plus}
        onAction={() => setIsCreateModalOpen(true)}
      />

      {/* Invoice Cards */}
      <div className="space-y-4">
        {invoices.length === 0 ? (
          <EmptyState
            title="No invoices found"
            description="Create your first invoice to get started"
          />
        ) : (
          invoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onView={handleViewInvoice}
              onSendReminder={handleSendReminder}
            />
          ))
        )}
      </div>

      {/* Create Invoice Modal */}
      <CreateInvoiceModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        client={client}
        onSuccess={handleCreateInvoice}
      />

      {/* View Invoice Modal */}
      <ViewInvoiceModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        invoice={selectedInvoice}
        client={client}
      />
    </div>
  );
}

