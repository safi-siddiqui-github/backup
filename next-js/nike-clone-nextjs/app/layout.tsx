import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainHeaderComponent from "@/components/MainHeaderComponent";
import PreferenceCookieDialogComponent from "@/components/PreferenceCookieDialogComponent";
import SearchBarModalComponent from "@/components/SearchBarModalComponent";
import MainFooterComponent from "@/components/MainFooterComponent";
import MenuSidebarComponent from "@/components/MenuSidebarComponent";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Nike Clone Next JS",
  description: "Developed by Safi Siddiqui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased text-sm scrollbar`}
        className="antialiased text-sm scrollbar"
      >

        <main className="2xl:container 2xl:mx-auto relative">

          <PreferenceCookieDialogComponent />

          <SearchBarModalComponent />

          <MenuSidebarComponent />

          <MainHeaderComponent />

          {children}

          <MainFooterComponent />

        </main>
      </body>
    </html>
  );
}
