import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taylor Mohney | Software Engineer & Researcher",
  description: "Professional portfolio showcasing software engineering expertise and research contributions in quantization theory and machine learning optimization",
  keywords: ["software engineer", "researcher", "machine learning", "quantization", "portfolio", "Taylor Mohney"],
  authors: [{ name: "Taylor Mohney" }],
  creator: "Taylor Mohney",
  publisher: "Taylor Mohney",
  openGraph: {
    title: "Taylor Mohney | Professional Portfolio",
    description: "Software Engineer & Researcher specializing in machine learning optimization",
    url: "https://youngmohney.com",
    siteName: "Taylor Mohney Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taylor Mohney | Software Engineer & Researcher",
    description: "Professional portfolio showcasing software engineering expertise and research contributions",
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
