import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Starter Kit",
  description: "Developed by Safi Siddiqui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-smooth">
      <body className="antialiased text-sm">

        {/* Place children where you want to render a page or nested layout */}
        {children}
      </body>
    </html>
  );
}
