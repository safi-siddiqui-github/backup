import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import MainHeader from "@/components/store/header/mainHeader";
import CouponBanner from "@/components/store/header/couponBanner";

export const metadata: Metadata = {
  title: "Store",
  description: "Ecommerce Store - Next JS 15",
};

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <div className="2xl:bg-slate-50">
        <div className="2xl:container mx-auto bg-white">
          <CouponBanner />
          <MainHeader />
          {children}
        </div>
      </div>
    </ClerkProvider>
  );
}
