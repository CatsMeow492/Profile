import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { seoConfig } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata lives in ONE place: src/lib/seo.ts, consumed by src/app/(site)/layout.tsx.
// This file used to declare a second, competing metadata block with a different title, a different
// description and no metadataBase at all. Two sources of truth for the same tags is how the title
// and the OG title drifted apart.
//
// metadataBase stays here because routes OUTSIDE the (site) group (notably /_not-found) inherit
// only the root layout. Without it those routes resolve relative OG/Twitter image URLs against
// http://localhost:3000, which is what the build warned about. Every other tag is set downstream.
export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
