import { HeaderGetNextThemeCookieAction } from "@/lib/next-themes/actions";
import { cn } from "@/lib/utils";
import { Geist, Geist_Mono } from "next/font/google";
import { ComponentProps } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootHTMLComponent({
  children,
  className,
  ...props
}: ComponentProps<"html">) {
  const themeCookie = await HeaderGetNextThemeCookieAction();
  const themeValue = themeCookie?.value;

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      // className={cn(`${themeValue}`, className)}
      className={cn(
        `${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased ${themeValue}`,
        className,
      )}
      style={{
        colorScheme: themeValue,
      }}
      {...props}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
