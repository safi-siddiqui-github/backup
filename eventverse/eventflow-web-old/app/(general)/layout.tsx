import HeaderGeneral from "@/components/general/header/HeaderGeneral";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EventFlow",
  description: "Event Mangement App",
};

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <HeaderGeneral />
      {children}
    </div>
  );
}
