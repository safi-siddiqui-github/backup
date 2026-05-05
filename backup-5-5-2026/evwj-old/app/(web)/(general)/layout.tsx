import IntelligentBreadcrumb from "@/components/general/breadcrumb/IntelligentBreadcrumb";
import WebFooterComponent from "@/components/general/footer/WebFooterComponent";
import WebHeaderComponent from "@/components/general/header/WebHeaderComponent";
import { Separator } from "@/components/ui/separator";

export default function WebGeneralLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex w-full flex-col">
			<WebHeaderComponent />
			{/*  */}
			<IntelligentBreadcrumb />
			{/*  */}
			{children}
			{/*  */}
			<Separator />
			{/*  */}
			<WebFooterComponent />
		</div>
	);
}
