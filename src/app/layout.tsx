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
  title: "Open House Studio — Unlimited social posts for agents",
  description:
    "Send your listing photos, get finished posts and captions back every Monday. Unlimited requests, one monthly price that falls every month you stay.",
  openGraph: {
    title: "Open House Studio",
    description:
      "Unlimited social posts for real estate agents, captions included, delivered every Monday. One monthly price that drops the longer you stay.",
    url: "https://openhousestudio.online",
    siteName: "Open House Studio",
    type: "website",
  },
  icons: {
    icon: "/brand/favicon.svg",
    apple: "/brand/icon-180.png",
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
