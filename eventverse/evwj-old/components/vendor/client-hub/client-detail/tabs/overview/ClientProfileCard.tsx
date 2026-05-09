"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare, PhoneCall, User } from "lucide-react";
import { Client } from "../../../mockClients";
import { renderStars } from "../../../utils/renderStars";

interface ClientProfileCardProps {
  client: Client;
}

export default function ClientProfileCard({ client }: ClientProfileCardProps) {

  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-6">
          <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Client Profile
          </h2>
        </div>

        {/* Client Name */}
        <div className="mb-6">
          <p className="text-base font-medium text-gray-900 dark:text-white">
            {client.name}
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <Mail className="h-4 w-4 text-gray-500" />
            <span>{client.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{client.phone}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 mt-auto">
          <Button variant="outline" className="w-full justify-start">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <PhoneCall className="h-4 w-4 mr-2" />
            Schedule Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

