import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { profile, siteUrl } from "@/content/profile";
import "./globals.css";

// Field Notes type: a characterful display face, a calm reading face,
// a hand for margin notes and a mono for labels.
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ variable: "--font-text", subsets: ["latin"], display: "swap" });
const hand = Caveat({ variable: "--font-hand", subsets: ["latin"], weight: ["500", "700"], display: "swap", preload: false });
const mono = JetBrains_Mono({ variable: "--font-label", subsets: ["latin"], weight: ["500"], display: "swap", preload: false });

const description = `${profile.name} is a full-stack developer with an edge in agentic AI, building end-to-end products with Next.js, Python, FastAPI and React Native.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.links.github?.href }],
  creator: profile.name,
  keywords: [
    "Agentic AI",
    "Full Stack Developer",
    "AI Engineer",
    "Voice Agents",
    "LLM",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "LangGraph",
    "OpenAI Agents SDK",
    "Islamabad",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f1ea",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${hand.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
