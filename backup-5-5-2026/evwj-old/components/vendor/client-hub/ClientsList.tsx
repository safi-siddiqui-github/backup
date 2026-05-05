"use client";

import ClientCard from "./components/ClientCard";
import { Client } from "./mockClients";

interface ClientsListProps {
  clients: Client[];
  onClientClick?: (client: Client) => void;
}

export default function ClientsList({
  clients,
  onClientClick,
}: ClientsListProps) {
  if (clients.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 text-gray-500 dark:text-gray-400">
        <p className="text-sm sm:text-base">No clients found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          onClick={() => onClientClick?.(client)}
        />
      ))}
    </div>
  );
}

