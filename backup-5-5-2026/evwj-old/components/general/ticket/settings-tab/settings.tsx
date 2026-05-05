"use client";

import { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast } from "sonner";
import {
	AccessSettings,
	GeneralSettings,
	PaymentSettings,
	Policies,
	SettingsState,
} from "../types";

import { CogIcon, CreditCardIcon, UserIcon, DocumentIcon } from "./icons";
import GeneralPanel from "./GeneralPanel";
import PaymentPanel from "./PaymentPanel";
import AccessPanel from "./AccessPanel";
import PoliciesPanel from "./PoliciesPanel";

export default function SettingsTabs() {
	const [activeIndex, setActiveIndex] = useState(3);

	const [settings, setSettings] = useState<SettingsState>({
		general: {
			enableTicketing: true,
			allowRefunds: true,
			allowTransfers: true,
			maxTicketsPerOrder: 10,
		},
		payment: {
			currency: "USD",
			taxRate: 0,
			processingFee: 3,
			cardEnabled: true,
			paypalEnabled: false,
			bankEnabled: false,
			applePayEnabled: false,
			googlePayEnabled: false,
		},
		access: {
			requirePhone: false,
			requireAddress: false,
			allowGuest: true,
		},
		policies: {
			terms: "",
			refundPolicy: "",
			privacyPolicy: "",
		},
	});

	/* ---------- Handlers ---------- */

	const handleGeneralChange = (partial: Partial<GeneralSettings>) =>
		setSettings((s) => ({ ...s, general: { ...s.general, ...partial } }));

	const handlePaymentChange = (partial: Partial<PaymentSettings>) =>
		setSettings((s) => ({ ...s, payment: { ...s.payment, ...partial } }));

	const handleAccessChange = (partial: Partial<AccessSettings>) =>
		setSettings((s) => ({ ...s, access: { ...s.access, ...partial } }));

	const handlePoliciesChange = (partial: Partial<Policies>) =>
		setSettings((s) => ({ ...s, policies: { ...s.policies, ...partial } }));

	const handleSaveAll = async () => {
		// Simulated save - replace with actual API call.
		try {
			// show immediate feedback
			toast.loading("Saving settings...");
			await new Promise((r) => setTimeout(r, 700));
			toast.success("Settings saved successfully!");
		} catch {
			toast.error("Failed to save settings.");
		}
	};

	// Per-panel save/reset handlers
	const handleSaveGeneral = () => {
		toast.success("General settings saved");
	};

	const handleResetGeneral = () => {
		setSettings((s) => ({
			...s,
			general: { ...s.general, maxTicketsPerOrder: 10 },
		}));
		toast("Reset General to default");
	};

	const handleSavePayment = () => {
		toast.success("Payment settings saved");
	};

	const handleResetPayment = () => {
		setSettings((s) => ({
			...s,
			payment: {
				...s.payment,
				cardEnabled: true,
				paypalEnabled: false,
				bankEnabled: false,
			},
		}));
		toast("Payment methods reset");
	};

	const handleSaveAccess = () => {
		toast.success("Access settings saved");
	};

	const handleResetAccess = () => {
		setSettings((s) => ({
			...s,
			access: { requirePhone: false, requireAddress: false, allowGuest: true },
		}));
		toast("Access settings reset");
	};

	const handleSavePolicies = () => {
		toast.success("Policies saved");
	};

	const handleClearPolicies = () => {
		setSettings((s) => ({
			...s,
			policies: { terms: "", refundPolicy: "", privacyPolicy: "" },
		}));
		toast("Policies cleared");
	};

	const handleResetDefaults = () => {
		setSettings({
			general: {
				enableTicketing: true,
				allowRefunds: true,
				allowTransfers: true,
				maxTicketsPerOrder: 10,
			},
			payment: {
				currency: "USD",
				taxRate: 0,
				processingFee: 3,
				cardEnabled: true,
				paypalEnabled: false,
				bankEnabled: false,
				applePayEnabled: false,
				googlePayEnabled: false,
			},
			access: {
				requirePhone: false,
				requireAddress: false,
				allowGuest: true,
			},
			policies: {
				terms: "",
				refundPolicy: "",
				privacyPolicy: "",
			},
		});
		toast(`Defaults restored`);
	};

	return (
		<div>
			{/* Main container */}
			<div className="p-4 md:p-8">
				<div className="mx-auto">
					{/* Header */}
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
						<div>
							<h1 className="text-lg font-semibold text-gray-900 dark:text-slate-200">
								Configure your event ticketing preferences
							</h1>
							<p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
								Manage ticketing, payments, access, and policies — all in one
								place.
							</p>
						</div>

						<div className="flex items-center gap-3">
							<button
								onClick={handleSaveAll}
								className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
							>
								Save All Settings
							</button>
							<button
								onClick={handleResetDefaults}
								className="hidden sm:inline-flex items-center gap-2 !bg-white dark:!bg-slate-700/50 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-600 py-2 px-3 rounded-lg shadow-sm hover:shadow-md transition [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								Reset Defaults
							</button>
						</div>
					</div>

					{/* Tabs */}
					<div className="!bg-white dark:!bg-[#020617] backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-slate-600 p-3 md:p-4 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
						<Tabs
							selectedIndex={activeIndex}
							onSelect={(idx) => setActiveIndex(idx)}
						>
							<TabList className="flex w-full gap-2 !bg-white dark:!bg-slate-700/50 p-1 rounded-lg overflow-x-auto border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
								<Tab
									className="react-tabs__tab flex-1 min-w-[120px] py-2 px-4 rounded-lg text-sm text-gray-700 dark:text-slate-300 hover:!bg-white dark:hover:!bg-slate-700/50 cursor-pointer [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									selectedClassName="!bg-white dark:!bg-slate-700/50 shadow-sm text-indigo-600 dark:text-indigo-400 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								>
									<div className="flex items-center justify-center gap-2">
										<CogIcon />
										<span>General</span>
									</div>
								</Tab>

								<Tab
									className="react-tabs__tab flex-1 min-w-[120px] py-2 px-4 rounded-lg text-sm text-gray-700 dark:text-slate-300 hover:!bg-white dark:hover:!bg-slate-700/50 cursor-pointer [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									selectedClassName="!bg-white dark:!bg-slate-700/50 shadow-sm text-indigo-600 dark:text-indigo-400 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								>
									<div className="flex items-center justify-center gap-2">
										<CreditCardIcon />
										<span>Payment</span>
									</div>
								</Tab>

								<Tab
									className="react-tabs__tab flex-1 min-w-[120px] py-2 px-4 rounded-lg text-sm text-gray-700 dark:text-slate-300 hover:!bg-white dark:hover:!bg-slate-700/50 cursor-pointer [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									selectedClassName="!bg-white dark:!bg-slate-700/50 shadow-sm text-indigo-600 dark:text-indigo-400 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								>
									<div className="flex items-center justify-center gap-2">
										<UserIcon />
										<span>Access</span>
									</div>
								</Tab>

								<Tab
									className="react-tabs__tab flex-1 min-w-[120px] py-2 px-4 rounded-lg text-sm text-gray-700 dark:text-slate-300 hover:!bg-white dark:hover:!bg-slate-700/50 cursor-pointer [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									selectedClassName="!bg-white dark:!bg-slate-700/50 shadow-sm text-indigo-600 dark:text-indigo-400 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								>
									<div className="flex items-center justify-center gap-2">
										<DocumentIcon />
										<span>Policies</span>
									</div>
								</Tab>
							</TabList>

							{/* Panels */}
							<div className="mt-4">
								<TabPanel>
									<GeneralPanel
										general={settings.general}
										onChange={handleGeneralChange}
										onSave={handleSaveGeneral}
										onReset={handleResetGeneral}
									/>
								</TabPanel>

								<TabPanel>
									<PaymentPanel
										payment={settings.payment}
										onChange={handlePaymentChange}
										onSave={handleSavePayment}
										onReset={handleResetPayment}
									/>
								</TabPanel>

								<TabPanel>
									<AccessPanel
										access={settings.access}
										onChange={handleAccessChange}
										onSave={handleSaveAccess}
										onReset={handleResetAccess}
									/>
								</TabPanel>

								<TabPanel>
									<PoliciesPanel
										policies={settings.policies}
										onChange={handlePoliciesChange}
										onSave={handleSavePolicies}
										onClear={handleClearPolicies}
									/>
								</TabPanel>
							</div>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	);
}
