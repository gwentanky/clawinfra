import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const clashDisplay = localFont({
  src: [
    {
      path: "../public/font/ClashDisplay-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/font/ClashDisplay-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/ClashDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/ClashDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/ClashDisplay-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/font/ClashDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
});


export const metadata: Metadata = {
  title: "ClawInfra - Performance-Optimized Infrastructure for OpenClaw AI Agents",
  description: "Production-grade infrastructure layer for OpenClaw agents. Reduce operational costs by 30-50%, achieve sub-100ms latency, and scale to 100,000+ agents with intelligent caching, distributed architecture, and enterprise reliability.",
  keywords: [
    "ClawInfra",
    "OpenClaw infrastructure",
    "AI agent infrastructure",
    "OpenClaw optimization",
    "AI agent caching",
    "distributed AI agents",
    "agent scalability",
    "production AI infrastructure",
    "OpenClaw performance",
    "AI agent platform",
    "enterprise AI infrastructure",
    "agent cost optimization",
    "Kubernetes AI agents",
    "multi-agent systems",
    "AI infrastructure as a service",
    "OpenClaw middleware",
    "agent deployment platform",
    "AI observability",
    "agent auto-scaling"
  ],
  authors: [{ name: "ClawInfra Team" }],
  creator: "ClawInfra",
  publisher: "ClawInfra",
  applicationName: "ClawInfra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://clawinfra.dev",
    title: "ClawInfra - Performance-Optimized Infrastructure for OpenClaw AI Agents",
    description: "Production-grade infrastructure that reduces costs by 30-50%, delivers sub-100ms latency, and scales to 100,000+ OpenClaw agents. Intelligent caching, distributed architecture, and enterprise-grade reliability.",
    siteName: "ClawInfra",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawInfra - Infrastructure for OpenClaw AI Agents",
    description: "Production-grade infrastructure for OpenClaw agents. 30-50% cost reduction, sub-100ms latency, enterprise scalability. Purpose-built for performance at scale.",
    creator: "@clawinfra",
    site: "@clawinfra",
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/site.webmanifest'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${clashDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
