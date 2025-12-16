import { Suspense } from "react";
import type { Metadata } from "next";
import Productpage from "@/components/Productpage";
import Footerpage from "@/components/Footerpage";

export const metadata: Metadata = {
  title: "Handmade Products – Phone Charms, Crochet Bags & Accessories",

  description:
    "Explore Vaishi Handmade Creations' collection of phone charms, crochet bags, hair accessories, macrame keychains and fridge magnets crafted with love.",

  keywords: [
    "Vaishi Handmade Creations products",
    "phone charms",
    "mobile phone charm",
    "crochet bags",
    "hair accessories",
    "macrame keychain",
    "fridge magnet",
    "handmade accessories",
  ],

  alternates: {
    canonical: "https://vaishi.vercel.app/product",
  },

  openGraph: {
    title: "Handmade Products – Vaishi Handmade Creations",
    description:
      "Shop handmade phone charms, crochet bags and hair accessories by Vaishi Handmade Creations.",
    images: ["/Mylogo.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vaishi Handmade Creations – Handmade Products",
    description:
      "Discover handcrafted phone charms, crochet bags & accessories by Vaishi Handmade Creations.",
    images: ["/Mylogo.png"],
  },
};

export default function Product() {
  return (
    <div className="bg-pink-50">
      <Suspense fallback={<div>Loading...</div>}>
        <Productpage />
      </Suspense>
      <Footerpage />
    </div>
  );
}
