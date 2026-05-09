import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventFlow",
  description: "Event Mangement App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html
        lang="en"
        className="scroll-smooth"
        data-scroll-behavior="smooth"
      >
        <body
          className="bg-slate-50 font-sans antialiased"
          suppressHydrationWarning={true}
        >
          {children}
        </body>
      </html>
    </>
  );
}
