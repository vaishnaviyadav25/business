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
  "decorative handmade product"


  ],
  authors: [{ name: "Vaishi" }],
  creator: "Vaishi",
  publisher: "Vaishi",
  icons: {
    icon: "/Smalllogo.png", // favicon
  },
  openGraph: {
    title: "Vaishi – Handcrafted with Love",
    description:
      "Discover Vaishi, where creativity meets craftsmanship. Explore our unique handmade creations.",
    url: "https://your-domain.com", // 🔹 Replace when site goes live
    siteName: "Vaishi",
    images: [
      {
        url: "/Smalllogo.png", // SEO & social sharing logo
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
    images: ["/Smalllogo.png"],
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
        {/* 🔹 JSON-LD Structured Data for Logo (helps Google show brand logo) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vaishi",
              url: "https://your-domain.com", // replace later
              logo: "https://your-domain.com/Smalllogo.png", // replace later
              sameAs: [], // add social links here when ready
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
