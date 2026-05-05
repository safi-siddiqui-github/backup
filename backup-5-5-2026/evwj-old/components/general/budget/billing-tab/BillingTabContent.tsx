"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, FileText } from "lucide-react";
import PaymentsTabContent from "../payments-tab/PaymentsTabContent";
import BillingInfoTab from "./BillingInfoTab";

export default function BillingTabContent() {
	const [activeSubTab, setActiveSubTab] = useState("payments");

	return (
		<Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
			<TabsList className="*:data-[slot=tabs-trigger]:hover:bg-background h-full w-[300px] justify-start gap-2 overflow-x-auto *:data-[slot=tabs-trigger]:cursor-pointer !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] mb-6">
				<TabsTrigger
					value="payments"
					className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
				>
					<CreditCard className="h-4 w-4" />
					Payments
				</TabsTrigger>
				<TabsTrigger
					value="billing-info"
					className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
				>
					<FileText className="h-4 w-4" />
					Billing Info
				</TabsTrigger>
			</TabsList>

			<TabsContent value="payments">
				<PaymentsTabContent />
			</TabsContent>

			<TabsContent value="billing-info">
				<BillingInfoTab />
			</TabsContent>
		</Tabs>
	);
}

