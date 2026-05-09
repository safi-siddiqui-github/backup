import IntelligentBreadcrumb from "@/components/general/breadcrumb/IntelligentBreadcrumb";
import WebHeaderComponent from "@/components/general/header/WebHeaderComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EventVerse",
  description: "Event Mangement App",
};

export default function WebGuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col">
      <WebHeaderComponent />
      <IntelligentBreadcrumb />
      {children}
    </div>
  );
}
