import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/layout/Navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// ✅ Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ GLOBAL SEO METADATA
export const metadata: Metadata = {
  metadataBase: new URL("https://vaishi.vercel.app"),

  title: {
    default:
      "Vaishi Handmade Creations – Phone Charms, Crochet Bags & Hair Accessories",
    template: "%s | Vaishi Handmade Creations",
  },

  description:
    "Vaishi Handmade Creations offers handcrafted phone charms, crochet bags, hair accessories, macrame keychains and fridge magnets made with love & care.",

  keywords: [
    "Vaishi Handmade Creations",
    "handmade phone charms",
    "crochet bags",
    "hair accessories",
    "macrame keychains",
    "handmade gifts",
    "beaded accessories",
  ],

  authors: [{ name: "Vaishi" }],
  creator: "Vaishi Handmade Creations",
  publisher: "Vaishi Handmade Creations",

  // ✅ CORRECT favicon reference
  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "Vaishi Handmade Creations – Handcrafted with Love",
    description:
      "Discover handcrafted phone charms, crochet bags, hair accessories and more at Vaishi Handmade Creations.",
    url: "https://vaishi.vercel.app",
    siteName: "Vaishi Handmade Creations",
    images: [
      {
        url: "/Mylogo.png",
        width: 600,
        height: 600,
        alt: "Vaishi Handmade Creations Logo",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vaishi Handmade Creations",
    description:
      "Explore handmade phone charms, crochet bags & hair accessories by Vaishi Handmade Creations.",
    images: ["/Mylogo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

// ✅ ROOT LAYOUT
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 🔹 Domain Verifications */}
        <meta
          name="google-site-verification"
          content="DH-TpGgm-OrhsRnnst8fBWHcDsdEr8tp4Rf_C0Bqz9E"
        />
        <meta
          name="p:domain_verify"
          content="48a48a0bc656c4618998b020e156f197"
        />

        {/* 🔹 Theme Color */}
        <meta name="theme-color" content="#fdd835" />

        {/* 🔹 Structured Data (Brand Schema) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vaishi Handmade Creations",
              url: "https://vaishi.vercel.app",
              logo: "https://vaishi.vercel.app/Mylogo.png",
              sameAs: [
                "https://www.instagram.com/vaishi2059/",
                "https://www.pinterest.com/vaishiart",
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Navigation />
        <main className="pt-20">{children}</main>

        {/* ✅ Vercel Analytics */}
        <Analytics />

        {/* ✅ Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  );
}
