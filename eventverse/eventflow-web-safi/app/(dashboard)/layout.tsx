import HeaderDashboard from "@/components/general/header/HeaderDashboard";
import HeaderDashboardPrefix from "@/components/general/header/HeaderDashboardPrefix";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Event Mangement App",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <HeaderDashboard />
      <HeaderDashboardPrefix />

      <div className="flex flex-col 2xl:items-center">
        <div className="flex flex-col 2xl:container">{children}</div>
      </div>
    </div>
  );
}
