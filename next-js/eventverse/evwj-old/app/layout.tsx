import { ThemeProviderComponent } from "@/components/ui-extends/ThemeProviderComponent";
import { Toaster } from "@/components/ui/sonner";
import { ConfigureAmplifyClientSide } from "@/lib/aws-amplify/client-side";
import ScrollToTop from "@/components/general/ScrollToTop";
import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";
import "./globals.css";

// Configure Montserrat font with multiple weights
// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700", "800", "900"],
//   variable: "--font-montserrat",
//   display: "swap",
// });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://eventverse-app.com",
  ),
  title: {
    default: "EventVerse - Event Management Made Easy",
    template: "%s | EventVerse",
  },
  description:
    "Create, manage, and host amazing events with EventVerse. The all-in-one event management platform for seamless planning, RSVPs, ticketing, and more.",
  keywords: [
    "event management",
    "event planning",
    "RSVP",
    "ticketing",
    "event hosting",
  ],
  authors: [{ name: "EventVerse" }],
  creator: "EventVerse",
  publisher: "EventVerse",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "EventVerse",
    title: "EventVerse - Event Management Made Easy",
    description:
      "Create, manage, and host amazing events with EventVerse. The all-in-one event management platform for seamless planning, RSVPs, ticketing, and more.",
    images: [
      {
        url: "/images/landing-page.png",
        width: 1200,
        height: 630,
        alt: "EventVerse - Event Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EventVerse - Event Management Made Easy",
    description:
      "Create, manage, and host amazing events with EventVerse. The all-in-one event management platform for seamless planning, RSVPs, ticketing, and more.",
    images: ["/images/landing-page.png"],
    creator: "@eventverse",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
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
        // className={`scroll-smooth ${montserrat.variable}`}
        className={`scroll-smooth`}
        data-scroll-behavior="smooth"
        suppressHydrationWarning
      >
        <body
          // className={`bg-secondary antialiased ${montserrat.className}`}
          className={`antialiased`}
          suppressHydrationWarning={true}
        >
          <ConfigureAmplifyClientSide />
          <ThemeProviderComponent
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ScrollToTop />
            {children}

            <Toaster />
          </ThemeProviderComponent>
        </body>
      </html>
    </>
  );
}
