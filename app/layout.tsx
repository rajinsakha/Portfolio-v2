import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
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

export const metadata: Metadata = {
  title: {
    default: "Rajin Sakha | Front-end Developer",
    template: "%s | Rajin Sakha",
  },
  description:
    "Front-end Developer specializing in React.js and Next.js, creating responsive and user-friendly web applications with a focus on exceptional user experiences.",
  keywords: [
    "Front-end Developer",
    "React.js",
    "Next.js",
    "Web Development",
    "UI/UX",
    "JavaScript",
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
  metadataBase: new URL("https://rajinsakha.com.np"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rajin Sakha | Front-end Developer",
    description:
      "Front-end Developer specializing in React.js and Next.js, creating responsive and user-friendly web applications.",
    url: "https://rajinsakha.com", // Replace with your actual domain
    siteName: "Rajin Sakha Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Create this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "Rajin Sakha - Front-end Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajin Sakha | Front-end Developer",
    description:
      "Front-end Developer specializing in React.js and Next.js, creating responsive and user-friendly web applications.",
    images: ["/twitter-image.jpg"], // Create this image (1200x600px recommended)
    creator: "@rajinsakha", // Replace with your Twitter handle
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
  verification: {
    google: "your-google-verification-code", // Replace with your verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
