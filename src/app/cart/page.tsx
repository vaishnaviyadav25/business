import Mycartpage from "@/components/Mycartpage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart – Vaishi Handmade Creations",

  description:
    "Review your selected handmade products and proceed securely to checkout at Vaishi Handmade Creations.",

  // 🚫 Do NOT index cart pages
  robots: {
    index: false,
    follow: false,
  },

  // ✅ Optional but safe
  alternates: {
    canonical: "https://vaishi.vercel.app/cart",
  },

  openGraph: {
    title: "Your Cart – Vaishi Handmade Creations",
    description:
      "Review and manage your selected handmade items before checkout.",
    images: ["/Smalllogo.png"],
  },

  twitter: {
    card: "summary",
    title: "Your Cart – Vaishi Handmade Creations",
    description:
      "Check your selected handmade items and proceed to checkout securely.",
    images: ["/Smalllogo.png"],
  },
};

export default function CartPage() {
  return <Mycartpage />;
}
