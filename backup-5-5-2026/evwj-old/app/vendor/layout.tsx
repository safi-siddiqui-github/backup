import VendorPortalHeader from "@/components/vendor/VendorPortalHeader";

export default function VendorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col min-h-screen">
      <VendorPortalHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

