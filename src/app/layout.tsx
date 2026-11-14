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
  title: "Open House Studio — Social posts for agents, done in 30 seconds",
  description:
    "Thirty editable templates for listings, open houses and just-sold posts. Every one comes with the caption already written. Your price drops every month you stay.",
  openGraph: {
    title: "Open House Studio",
    description:
      "Editable social templates for real estate agents, with captions included. $25 a month, less every month you stay.",
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
