// This is the /dashboard layout file
import IntelligentBreadcrumb from "@/components/general/breadcrumb/IntelligentBreadcrumb";

export default function WebAuthDashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen flex-col bg-white dark:bg-black">
			{/*  */}
			<IntelligentBreadcrumb />
			{/*  */}
			{children}
			{/*  */}
		</div>
	);
}
