import "./globals.css";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/store/sanity/disableDraftMode";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className='antialiased'>
        {children}

        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}

      </body>
    </html>
  );
}
