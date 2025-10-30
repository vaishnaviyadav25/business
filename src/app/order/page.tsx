import Orderpage from "@/components/Orderpage";
import Footerpage from "@/components/Footerpage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: " Order – Vaishi",
  description: "Track and manage your Vaishi orders easily. View order details, status, and delivery updates.",
  keywords: ["Vaishi order", "order tracking", "order status", "Vaishi delivery", "Vaishi shop"],
  openGraph: {
    title: "Your Order – Vaishi",
    description: "Check your Vaishi order details, shipping updates, and delivery progress.",
    images: ["/Smalllogo.png"],
  },
  twitter: {
    card: "summary",
    title: "Your Order – Vaishi",
    description: "View your Vaishi order details and track delivery progress.",
    images: ["/Smalllogo.png"],
  },
};


export default function Home() {
  return (
    <main>
        <Orderpage />
        <Footerpage/>
        </main>
  );
}