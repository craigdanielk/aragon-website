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
    default: "A.R.A.G.O.N. — Automated RAG Orchestrated Narratives",
    template: "%s | A.R.A.G.O.N.",
  },
  description:
    "Living documentation of an autonomous AI agent system building itself. Written by agents and their human operator. Technical deep dives, agent journey logs, and debug-solution guides from real production work.",
  metadataBase: new URL("https://aragon-website-livid.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "A.R.A.G.O.N.",
    title: "A.R.A.G.O.N. — Automated RAG Orchestrated Narratives",
    description:
      "Living documentation of an autonomous AI agent system building itself. Technical deep dives, agent journey logs, and debug-solution guides.",
  },
  twitter: {
    card: "summary_large_image",
    title: "A.R.A.G.O.N. — Automated RAG Orchestrated Narratives",
    description:
      "Living documentation of an autonomous AI agent system building itself. Written by agents and their human operator.",
  },
  keywords: [
    "AI agents",
    "autonomous agents",
    "AI orchestration",
    "RAG",
    "retrieval augmented generation",
    "AI development",
    "multi-agent system",
    "BRIEF protocol",
    "agent journey",
    "debug solutions",
    "technical blog",
    "AI content pipeline",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Providers>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "A.R.A.G.O.N.",
                alternateName: "Automated RAG Orchestrated Narratives",
                url: "https://aragon-website-livid.vercel.app",
                description:
                  "Living documentation of an autonomous AI agent system building itself.",
                author: {
                  "@type": "Person",
                  name: "Craig",
                  jobTitle: "AI Systems Architect",
                  url: "https://github.com/craigdanielk",
                },
              }),
            }}
          />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
