import RootHTMLComponent from "@/components/roots/root-html-component";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Safi Siddiqui",
  description: "Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootHTMLComponent>{children}</RootHTMLComponent>;
}
