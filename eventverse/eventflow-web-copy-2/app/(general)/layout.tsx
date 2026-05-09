import FooterComponent from "@/components/general/footer/FooterComponent";
import HeaderComponent from "@/components/general/header/HeaderComponent";
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
    <div className="flex flex-col">
      <HeaderComponent />
      {/*  */}
      {children}
      {/*  */}
      <FooterComponent />
    </div>
  );
}
