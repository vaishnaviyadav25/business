import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/layout/Navigation";
import { Analytics } from "@vercel/analytics/react";

// ✅ Google fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "Vaishi – Handcrafted with Love",
  description:
    "Vaishi offers handcrafted products made with creativity and care. Explore our exclusive collection and bring art into your everyday life.",
  keywords: [
    "Vaishi",
    "Vaishi handmade products",
    "Vaishi macrame bags",
    "Vaishi craft store",
    "handcrafted gifts online",
    "handmade home decor",
    "macrame wall hangings",
    "artistic handmade accessories",
    "eco-friendly crafts",
    "unique handmade designs",
    "boho decor items",
    "aesthetic home decor",
    "handmade fashion bags",
    "creative gift ideas",
    "custom handcrafted products",
    "sustainable handmade art",
    "Indian handmade crafts",
    "macrame keychains and bags",
    "handmade jewelry and accessories",
    "decorative handmade product",
  ],
  authors: [{ name: "Vaishi" }],
  creator: "Vaishi",
  publisher: "Vaishi",
  icons: {
    icon: "/Smalllogo.png", // ✅ your favicon in /public
  },
  openGraph: {
    title: "Vaishi – Handcrafted with Love",
    description:
      "Discover Vaishi, where creativity meets craftsmanship. Explore our unique handmade creations.",
    url: "https://vaishi.vercel.app", // ✅ updated URL
    siteName: "Vaishi",
    images: [
      {
        url: "https://vaishi.vercel.app/Smalllogo.png", // ✅ absolute URL for social cards
        width: 600,
        height: 600,
        alt: "Vaishi Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaishi – Handcrafted with Love",
    description:
      "Discover Vaishi’s beautiful handmade products crafted with creativity and passion.",
    images: ["https://vaishi.vercel.app/Smalllogo.png"], // ✅ updated URL
  },
};

// ✅ Layout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
          <meta name="google-site-verification" content="DH-TpGgm-OrhsRnnst8fBWHcDsdEr8tp4Rf_C0Bqz9E" />
        {/* 🔹 JSON-LD Structured Data for Logo (Google uses this for brand info) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vaishi",
              url: "https://vaishi.vercel.app", // ✅ updated domain
              logo: "https://vaishi.vercel.app/Smalllogo.png", // ✅ updated absolute logo path
              sameAs: [], // add your Instagram, etc., later
            }),
          }}
        />
        
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Navigation />
        <main className="pt-20">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}

