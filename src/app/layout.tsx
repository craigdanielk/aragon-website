import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
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
  title: {
    default: "A.R.A.G.O.N. — Autonomous AI Agent System",
    template: "%s | A.R.A.G.O.N.",
  },
  description:
    "Practitioner-led AI development content. Build logs, patterns, cost breakdowns, and tool autopsies from real projects. 15 coordinated AI agents powering content pipelines, demand intelligence, and build automation.",
  metadataBase: new URL("https://aragon-website-livid.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "A.R.A.G.O.N.",
    title: "A.R.A.G.O.N. — Autonomous AI Agent System",
    description:
      "15 coordinated AI agents that turn intent into shipped output. Content pipelines, demand intelligence, skill acquisition, and build automation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "A.R.A.G.O.N. — Autonomous AI Agent System",
    description:
      "Practitioner-led AI development. Build logs, patterns, and cost breakdowns from real projects.",
  },
  keywords: [
    "AI agents",
    "autonomous agents",
    "AI orchestration",
    "content automation",
    "build automation",
    "RAG",
    "retrieval augmented generation",
    "AI development",
    "multi-agent system",
    "BRIEF protocol",
  ],
  authors: [{ name: "Craig", url: "https://github.com/craigdanielk" }],
  creator: "Craig",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-neutral-300 min-h-screen flex flex-col`}
      >
        <Providers>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
