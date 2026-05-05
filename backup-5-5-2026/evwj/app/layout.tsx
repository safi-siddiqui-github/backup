import { LayoutFileType } from "@/type/type-layout";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import GlobalLayoutComponents from "./_private/(global)/GlobalLayoutComponents";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventVerse",
  description: "Organize And Join Events",
};

// const geist = Bebas_Neue({
//   weight: "400",
//   subsets: ["latin"],
// });
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutFileType) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={`flex flex-col antialiased ${roboto.className}`}>
        {children}
        <GlobalLayoutComponents />
      </body>
    </html>
  );
}
