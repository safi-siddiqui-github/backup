"use client";

import { Card } from "@/components/ui/card";
import { Payment } from "../../mockInvoices";
import TabHeader from "../../components/TabHeader";
import PaymentsTable from "./components/PaymentsTable";

interface PaymentHistoryTabProps {
  payments: Payment[];
}

export default function PaymentHistoryTab({ payments }: PaymentHistoryTabProps) {
  return (
    <div className="space-y-4">
      <Card className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
        <div className="p-6">
          <TabHeader
            title="Payment History"
            subtitle="Track all received payments"
          />
          <PaymentsTable payments={payments} />
        </div>
      </Card>
    </div>
  );
}

