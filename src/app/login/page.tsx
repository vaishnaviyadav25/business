import Login from "@/components/Login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Vaishi Handmade Creations",
  description: "Sign in to your Vaishi Handmade Creations account to access exclusive features and manage your orders.",
};

export default function LoginPage() {
  return <Login />;
}
