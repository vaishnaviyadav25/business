import type { Metadata } from "next";
import { Contactpage } from "@/components/Contactpage";
import Footerpage from "@/components/Footerpage";

export const metadata: Metadata = {
  title: "Contact Us – Vaishi Handmade Creations",

  description:
    "Contact Vaishi Handmade Creations for product queries, custom orders, collaborations or support. We’re happy to help you.",

  keywords: [
    "Vaishi contact",
    "Vaishi Handmade Creations contact",
    "customer support",
    "handmade product inquiry",
    "custom order support",
  ],

  alternates: {
    canonical: "https://vaishi.vercel.app/contact",
  },

  openGraph: {
    title: "Contact Us – Vaishi Handmade Creations",
    description:
      "Get in touch with Vaishi Handmade Creations for support, queries or collaborations.",
    images: ["/Smalllogo.png"],
  },

  twitter: {
    card: "summary",
    title: "Contact Vaishi Handmade Creations",
    description:
      "Reach out for handmade product inquiries, custom orders or feedback.",
    images: ["/Smalllogo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Contact() {
  return (
    <div className="bg-pink-50">
      <Contactpage />
      <Footerpage />
    </div>
  );
}
