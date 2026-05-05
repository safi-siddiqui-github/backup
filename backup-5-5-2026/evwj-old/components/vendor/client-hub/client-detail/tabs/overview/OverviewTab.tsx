"use client";

import { Client } from "../../../mockClients";
import BusinessSummaryCard from "./BusinessSummaryCard";
import ClientProfileCard from "./ClientProfileCard";

interface OverviewTabProps {
  client: Client;
}

export default function OverviewTab({ client }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel - Client Profile */}
      <div className="lg:col-span-1">
        <ClientProfileCard client={client} />
      </div>

      {/* Right Panel - Business Summary */}
      <div className="lg:col-span-2">
        <BusinessSummaryCard client={client} />
      </div>
    </div>
  );
}

