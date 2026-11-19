import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openhousestudio.online"),
  title: "Open House Studio — Social posts & captions for real estate agents",
  description:
    "Send your listing link or photos, get finished social posts and captions back in 48 hours. One active request at a time, one monthly price that drops every month you stay.",
  openGraph: {
    title: "Open House Studio",
    description:
      "Social posts for real estate agents, captions included, delivered in 48 hours. One monthly price that drops the longer you stay.",
    url: "https://openhousestudio.online",
    siteName: "Open House Studio",
    type: "website",
  },
  icons: {
    icon: "/brand/favicon.svg",
    apple: "/brand/icon-180.png",
  },
  other: {
    "page-type": "service",
    "site-kind": "other",
    "page-kind": "service",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
