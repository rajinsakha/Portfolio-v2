import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Rajin Sakha | Full-stack Developer",
    template: "%s | Rajin Sakha",
  },
  description:
    "Full-stack Developer building web and mobile products end to end \u2014 React, Next.js and React Native frontends on top of Nest.js APIs, PostgreSQL, Redis and background job queues.",
  keywords: [
    "Full-stack Developer",
    "React.js",
    "Next.js",
    "Nest.js",
    "Node.js",
    "React Native",
    "PostgreSQL",
    "Redis",
    "Web Development",
    "TypeScript",
    "Rajin Sakha",
  ],
  authors: [{ name: "Rajin Sakha" }],
  creator: "Rajin Sakha",
  publisher: "Rajin Sakha",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rajinsakha.com.np"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rajin Sakha | Full-stack Developer",
    description:
      "Full-stack Developer building web and mobile products end to end with React, Next.js, React Native, Nest.js, PostgreSQL and Redis.",
    url: "https://rajinsakha.com.np",
    siteName: "Rajin Sakha Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajin Sakha | Full-stack Developer",
    description:
      "Full-stack Developer building web and mobile products end to end with React, Next.js, React Native, Nest.js, PostgreSQL and Redis.",
    creator: "@rajinsakha",
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[200] focus-visible:rounded-md focus-visible:bg-primary-fill focus-visible:px-4 focus-visible:py-2 focus-visible:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
