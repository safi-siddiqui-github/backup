"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Clock, AlertTriangle, FileText } from "lucide-react";
import BillingStatCard from "./BillingStatCard";
import { mockVendorInvoices, getBillingStats, mockPayments } from "./mockInvoices";
import AllInvoicesTab from "./tabs/all-invoice/AllInvoicesTab";
import PaymentHistoryTab from "./tabs/payment-history/PaymentHistoryTab";
import AnalyticsTab from "./tabs/analytics/AnalyticsTab";

export default function BillingContent() {
  const [invoices, setInvoices] = useState(mockVendorInvoices);
  const [payments] = useState(mockPayments);
  const [activeSubTab, setActiveSubTab] = useState("all-invoices");
  const [isValueVisible, setIsValueVisible] = useState(true);

  const stats = useMemo(() => getBillingStats(invoices), [invoices]);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BillingStatCard
          label="Total Revenue"
          value={stats.totalRevenue.amount}
          subtitle={`From ${stats.totalRevenue.count} paid invoice${stats.totalRevenue.count !== 1 ? "s" : ""}`}
          icon={DollarSign}
          iconColor="text-green-600 dark:text-green-400"
          valueColor="text-green-600 dark:text-green-400"
          isVisible={isValueVisible}
          onToggleVisibility={() => setIsValueVisible(!isValueVisible)}
        />
        <BillingStatCard
          label="Pending"
          value={stats.pending.amount}
          subtitle={`From ${stats.pending.count} sent invoice${stats.pending.count !== 1 ? "s" : ""}`}
          icon={Clock}
          iconColor="text-blue-600 dark:text-blue-400"
          valueColor="text-blue-600 dark:text-blue-400"
          isVisible={isValueVisible}
          onToggleVisibility={() => setIsValueVisible(!isValueVisible)}
        />
        <BillingStatCard
          label="Overdue"
          value={stats.overdue.amount}
          subtitle={`From ${stats.overdue.count} overdue invoice${stats.overdue.count !== 1 ? "s" : ""}`}
          icon={AlertTriangle}
          iconColor="text-red-600 dark:text-red-400"
          valueColor="text-red-600 dark:text-red-400"
          isVisible={isValueVisible}
          onToggleVisibility={() => setIsValueVisible(!isValueVisible)}
        />
        <BillingStatCard
          label="Draft"
          value={stats.draft.amount}
          subtitle={`From ${stats.draft.count} draft invoice${stats.draft.count !== 1 ? "s" : ""}`}
          icon={FileText}
          iconColor="text-purple-600 dark:text-purple-400"
          valueColor="text-purple-600 dark:text-purple-400"
          isVisible={isValueVisible}
          onToggleVisibility={() => setIsValueVisible(!isValueVisible)}
        />
      </div>

      {/* Sub Tabs */}
      <Tabs
        value={activeSubTab}
        onValueChange={setActiveSubTab}
        className="w-full"
      >
        <TabsList className="*:data-[slot=tabs-trigger]:hover:bg-background h-full w-full justify-start gap-2 overflow-x-auto *:data-[slot=tabs-trigger]:cursor-pointer bg-linear-to-r from-background/80 to-muted/20 border shadow-md transition-all duration-300 hover:shadow-lg hover:from-primary/5 hover:to-secondary/5 hover:border-primary/20 rounded-xl p-[3px]">
          <TabsTrigger
            value="all-invoices"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            <span>All Invoices</span>
          </TabsTrigger>
          <TabsTrigger
            value="payment-history"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            <span>Payment History</span>
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-invoices" className="mt-6">
          <AllInvoicesTab 
            invoices={invoices} 
            onInvoiceCreate={(invoice) => setInvoices((prev) => [invoice, ...prev])}
          />
        </TabsContent>

        <TabsContent value="payment-history" className="mt-6">
          <PaymentHistoryTab payments={payments} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

