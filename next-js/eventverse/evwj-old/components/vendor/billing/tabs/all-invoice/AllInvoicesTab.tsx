"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { VendorInvoice } from "../../mockInvoices";
import InvoicesTable from "./components/InvoicesTable";
import SearchAndFilterBar from "../../components/SearchAndFilterBar";
import ViewVendorInvoiceModal from "./ViewVendorInvoiceModal";
import CreateInvoiceModal from "../../../client-hub/client-detail/tabs/billing/CreateInvoiceModal";
import { mockClients, Invoice } from "../../../client-hub/mockClients";

interface AllInvoicesTabProps {
  invoices: VendorInvoice[];
  onInvoiceCreate?: (invoice: VendorInvoice) => void;
}

export default function AllInvoicesTab({ invoices, onInvoiceCreate }: AllInvoicesTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<VendorInvoice | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.project.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || invoice.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchQuery, statusFilter]);

  // Paginated invoices
  const paginatedInvoices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredInvoices.slice(startIndex, endIndex);
  }, [filteredInvoices, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export invoices");
  };

  const handleView = (invoice: VendorInvoice) => {
    setSelectedInvoice(invoice);
    setIsViewModalOpen(true);
  };

  const handleSend = (invoice: VendorInvoice) => {
    // TODO: Implement send invoice functionality
    console.log("Send invoice", invoice);
  };

  const handleRemind = (invoice: VendorInvoice) => {
    // TODO: Implement remind client functionality
    console.log("Remind client", invoice);
  };

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "paid", label: "Paid" },
    { value: "sent", label: "Sent" },
    { value: "overdue", label: "Overdue" },
    { value: "draft", label: "Draft" },
  ];

  const handleNewInvoice = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateInvoice = (invoice: Invoice) => {
    // Convert Invoice (from client-hub) to VendorInvoice (for billing)
    const vendorInvoice: VendorInvoice = {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      clientName: mockClients.find(c => c.id === invoice.clientId)?.name || "Unknown Client",
      project: "General Services", // You might want to get this from invoice.projectId
      amount: invoice.amount,
      dueDate: invoice.dueDate,
      status: invoice.status === "draft" ? "draft" : invoice.status === "paid" ? "paid" : invoice.status === "overdue" ? "overdue" : "sent",
      paidDate: invoice.paidDate,
    };

    if (onInvoiceCreate) {
      onInvoiceCreate(vendorInvoice);
    }
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button
          onClick={handleNewInvoice}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>

      <SearchAndFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search invoices..."
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        statusOptions={statusOptions}
        onExport={handleExport}
        showExport={true}
      />

      <Card className="bg-linear-to-r from-background/80 to-muted/20 border shadow-md transition-all duration-300 hover:shadow-lg hover:from-primary/5 hover:to-secondary/5 hover:border-primary/20">
        <InvoicesTable
          invoices={paginatedInvoices}
          onView={handleView}
          onSend={handleSend}
          onRemind={handleRemind}
        />
      </Card>

      {/* Pagination */}
      {filteredInvoices.length > 0 && (
        <Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-slate-400">
                  Items per page:
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="dark:bg-background rounded-md border px-3 py-1.5 text-sm !bg-white dark:!bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-slate-400">
                  Showing {startIndex + 1} -{" "}
                  {Math.min(endIndex, filteredInvoices.length)} of{" "}
                  {filteredInvoices.length}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="px-2 text-sm text-gray-600 dark:text-slate-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(totalPages, prev + 1),
                      )
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Invoice Modal */}
      <ViewVendorInvoiceModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        invoice={selectedInvoice}
      />

      {/* Create Invoice Modal */}
      <CreateInvoiceModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        client={null}
        onSuccess={handleCreateInvoice}
      />
    </div>
  );
}

