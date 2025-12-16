import type { Metadata } from "next";
import Homepage from "@/components/Homepage";
import Footerpage from "@/components/Footerpage";

export const metadata: Metadata = {
  title: "Vaishi Handmade Creations – Phone Charms, Crochet Bags & Hair Accessories",

  description:
    "Shop handmade phone charms, mobile phone charms, crochet bags, hair accessories, macrame keychains and fridge magnets at Vaishi Handmade Creations.",

  keywords: [
    "Vaishi Handmade Creations",
    "phone charms",
    "phone charm",
    "mobile phone charm",
    "hair accessory",
    "flower hair clips for hair",
    "crochet bags",
    "macrame keychain",
    "fridge magnet",
    "handmade accessories",
  ],

  alternates: {
    canonical: "https://vaishi.vercel.app/",
  },
};

export default function Home() {
  return (
    <main>
      <Homepage />
      <Footerpage />
    </main>
  );
}
