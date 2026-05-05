import { LayoutFileType } from "@/type/type-layout";
import type { Metadata } from "next";
import GlobalLayoutComponents from "./_private/GlobalLayoutComponents";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventVerse",
  description: "Organize And Join Events",
};

export default function Layout({ children }: LayoutFileType) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex flex-col antialiased">
        {children}
        <GlobalLayoutComponents />
      </body>
    </html>
  );
}
