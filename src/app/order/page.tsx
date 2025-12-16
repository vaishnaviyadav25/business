"use client";

import Head from "next/head";
import { Suspense } from "react";
import Orderpage from "@/components/Orderpage";
import Footerpage from "@/components/Footerpage";

export default function Order() {
  return (
    <>
      {/* 🚫 Prevent Google indexing */}
      <Head>
        <title>Your Order – Vaishi Handmade Creations</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://vaishi.vercel.app/order" />
      </Head>

      <main>
        <Suspense
          fallback={<div className="text-center py-20">Loading order...</div>}
        >
          <Orderpage />
        </Suspense>

        <Footerpage />
      </main>
    </>
  );
}
