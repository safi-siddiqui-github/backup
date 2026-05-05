"use client";

import { useState, useMemo, useEffect } from "react";
import { Grid3x3, List, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SummaryStats from "./SummaryStats";
import SearchAndFilter from "./SearchAndFilter";
import ClientsList from "./ClientsList";
import ClientsTable from "./components/ClientsTable";
import ClientDetailPage from "./client-detail/ClientDetailPage";
import { mockClients, getClientStatistics, Client, ClientStatus } from "./mockClients";
import { useActivityNavigationStore } from "@/lib/activity-navigation-store";

export default function ClientHubContent() {
  const [clients] = useState<Client[]>(mockClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClientStatus | "all">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(
    null
  );
  const [viewingClientId, setViewingClientId] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { navigationTarget, clearNavigation } = useActivityNavigationStore();

  // Handle client navigation from activity store
  const [clientInitialTab, setClientInitialTab] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    if (
      navigationTarget &&
      navigationTarget.type === "client" &&
      navigationTarget.clientId
    ) {
      const clientExists = clients.find((c) => c.id === navigationTarget.clientId);
      if (clientExists) {
        setViewingClientId(navigationTarget.clientId);
        setClientInitialTab(navigationTarget.initialTab);
        clearNavigation();
      }
    }
  }, [navigationTarget, clients, clearNavigation]);

  // Filter clients based on search and status
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      // Status filter
      if (statusFilter !== "all" && client.status !== statusFilter) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          client.name.toLowerCase().includes(query) ||
          client.email.toLowerCase().includes(query) ||
          client.phone.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [clients, searchQuery, statusFilter]);

  // Paginated clients
  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredClients.slice(startIndex, endIndex);
  }, [filteredClients, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  // Auto-select first client when filtering in list view
  useEffect(() => {
    if (
      viewMode === "list" &&
      filteredClients.length > 0 &&
      (!selectedClientId ||
        !filteredClients.find((c) => c.id === selectedClientId))
    ) {
      setSelectedClientId(filteredClients[0].id);
    }
  }, [filteredClients, viewMode, selectedClientId]);

  // Get statistics
  const stats = useMemo(() => {
    return getClientStatistics(clients);
  }, [clients]);

  // Handle client selection in table view
  const handleClientSelect = (client: Client) => {
    setSelectedClientId(client.id);
  };

  // Handle client click in grid view
  const handleClientClick = (client: Client) => {
    setViewingClientId(client.id);
  };

  // Handle back from detail page
  const handleBackFromDetail = () => {
    setViewingClientId(null);
    setClientInitialTab(undefined);
  };

  // Get the client being viewed
  const viewingClient = viewingClientId
    ? clients.find((c) => c.id === viewingClientId) || null
    : null;

  // Show detail page if viewing a client
  if (viewingClient) {
    return (
      <ClientDetailPage 
        client={viewingClient} 
        onBack={() => {
          setViewingClientId(null);
          setClientInitialTab(undefined);
        }} 
        initialTab={clientInitialTab}
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Client Management</h2>
          <p className="text-muted-foreground">
            Manage your client relationships and track their journey
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-lg font-semibold">
            {filteredClients.length} Client{filteredClients.length !== 1 ? "s" : ""}
          </div>
          <div className="flex items-center gap-1 border rounded-md p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-8 px-3",
                viewMode === "grid" && "bg-blue-600 hover:bg-blue-700"
              )}
              onClick={() => {
                setViewMode("grid");
                setSelectedClientId(null);
              }}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-8 px-3",
                viewMode === "list" && "bg-blue-600 hover:bg-blue-700"
              )}
              onClick={() => {
                setViewMode("list");
                // Auto-select first client when switching to list view
                if (filteredClients.length > 0 && !selectedClientId) {
                  setSelectedClientId(filteredClients[0].id);
                }
              }}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <SummaryStats
        totalClients={stats.totalClients}
        activeClients={stats.activeClients}
        totalRevenue={stats.totalRevenue}
        inPipeline={stats.inPipeline}
      />

      {/* Search and Filter Section */}
      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Clients Grid/List View */}
      {viewMode === "grid" ? (
        <ClientsList
          clients={paginatedClients}
          onClientClick={handleClientClick}
        />
      ) : (
        <ClientsTable
          clients={paginatedClients}
          selectedClientId={selectedClientId}
          onClientSelect={handleClientSelect}
          onManageClient={handleClientClick}
        />
      )}

      {/* Pagination */}
      {filteredClients.length > 0 && (
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
                  {Math.min(endIndex, filteredClients.length)} of{" "}
                  {filteredClients.length}
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
    </div>
  );
}

