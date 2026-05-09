import NikeMainFooterComponent from "@/components/nike/footers/NikeMainFooterComponent";
import NikeMainHeaderComponent from "@/components/nike/headers/NikeMainHeaderComponent";
import NikeCookieDialogComponent from "@/components/nike/modals/NikeCookieDialogComponent";
import NikeMenuSidebarComponent from "@/components/nike/modals/NikeMenuSidebarComponent";
import NikeSearchBarModalComponent from "@/components/nike/modals/NikeSearchBarModalComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nike",
  description: "Clone by Safi Siddiqui",
};

export default function NikeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="2xl:container 2xl:mx-auto relative">

      {/* Header */}
      <NikeMainHeaderComponent />

      {/* Cookie Consent Dialog */}
      <NikeCookieDialogComponent />

      {/* Nike Search Bar Modal */}
      <NikeSearchBarModalComponent />

      {/* Nike Side Bar Modal */}
      <NikeMenuSidebarComponent />

      {/* Place children where you want to render a page or nested layout */}
      {children}

      {/* Footer  */}
      <NikeMainFooterComponent />
    </main>
  );
}
