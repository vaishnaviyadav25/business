"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const metadata = {
  title: "Handmade Jewelry & Macramé Bags | Vaishnavi Creations",
  description:
    "Shop handcrafted macramé bags, resin preserved jewelry, and silk thread accessories. Every design is made with love and creativity.",
  keywords: [
    "handmade jewelry",
    "macramé bags",
    "resin art jewelry",
    "silk thread bangles",
    "handcrafted accessories",
  ],
  openGraph: {
    title: "Vaishnavi Creations | Handmade Jewelry & Bags",
    description: "Discover beautifully handcrafted designs made with love.",
    url: "https://yourwebsite.vercel.app/",
    images: [
      {
        url: "https://yourwebsite.vercel.app/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Vaishnavi Creations handmade jewelry",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <main className="bg-gradient-to-b from-pink-50 to-white text-gray-800">

      {/* 🎁 Offer Banner (Sliding Row) */}
    <div className="bg-pink-500 text-white py-3 overflow-hidden mt-9 relative">
  <motion.div
    className="whitespace-nowrap text-center text-lg font-medium tracking-wide flex"
    animate={{ x: ["0%", "-50%"] }}
    transition={{
      duration: 10, // slightly slower for smoothness
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <span className="mr-[400px]">
        🎁 Special Offer: Get a FREE GIFT on your FIRST order above ₹250 💖

    </span>

    {/* Large Spacer for clear distance */}
    <span className="w-[400px] inline-block"></span>

    <span className="mr-[400px]">
       🎁 Special Offer: Get a FREE GIFT on your FIRST order above ₹250 💖
    </span>
  </motion.div>
</div>



      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-28 bg-[url('/hero-bg.jpg')] bg-cover bg-center">
        <div className="bg-white/70 backdrop-blur-sm py-16 px-6 md:px-12 rounded-3xl mx-4 md:mx-20 shadow-xl">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            "Every Piece Tells a Story — Crafted with Love 💖"
          </motion.h1>
          <p className="text-lg md:text-xl mb-8">
            Macramé Bags & Butterflies • Resin Preserved Jewelry • Silk Thread Designs
          </p>
          <Link
            href="/product"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="text-center py-16 px-6 md:px-20 bg-pink-50 rounded-2xl shadow-sm">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          About Me
        </h2>
        <div className="w-20 h-1 bg-pink-400 mx-auto mb-6 rounded-full"></div>

        <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-gray-600">
          Hi, I’m <span className="font-semibold text-pink-500">Vaishnavi</span> — a passionate
          artist who finds beauty in handmade creations.  
          From intricate <span className="text-pink-500">macramé bags</span> and dreamy  
          <span className="text-pink-500"> resin preserved jewelry</span> to vibrant  
          <span className="text-pink-500"> silk thread accessories</span>, every piece I create
          carries a touch of warmth, patience, and love.  
          My goal is to turn simple materials into meaningful treasures that bring joy
          and elegance to your everyday life ✨
        </p>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Best Sellers ✨
        </h2>

        <div className="flex flex-col space-y-24">
          {[
            {
              name: "Macramé Sling Bag",
              img: "https://m.media-amazon.com/images/I/6174ohKS-KL._AC_UY1000_.jpg",
              price: "₹500",
              icon: "🌸",
            },
            {
              name: "Resin Preserved Pendant",
              img: "https://mybageecha.com/cdn/shop/files/Ocean_Crest_Necklace_1.jpg?v=1704964893",
              price: "₹299",
              icon: "🌼",
            },
            {
              name: "Silk Thread Bangles",
              img: "https://5.imimg.com/data5/SELLER/Default/2020/8/FP/IV/AT/48921090/desiner-bangle-500x500.jpeg",
              price: "₹399",
              icon: "🦋",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center justify-between gap-10 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* Product Card */}
              <motion.div
                whileHover={{
                  rotateY: index % 2 === 0 ? 10 : -10,
                  rotateX: 5,
                  scale: 1.05,
                  boxShadow: "0 20px 60px rgba(236, 72, 153, 0.4)",
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative bg-white rounded-3xl shadow-2xl p-6 md:w-1/2 border border-pink-100 flex flex-col items-center justify-center overflow-hidden group"
              >
                <motion.div
                  className="absolute top-5 right-6 text-3xl text-pink-300"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✨
                </motion.div>

                <div className="w-full h-72 bg-gradient-to-br from-pink-100 to-white rounded-2xl overflow-hidden flex items-center justify-center mb-5 shadow-inner">
                  <motion.img
                    src={item.img}
                    alt={item.name}
                    className="max-h-[260px] w-auto object-contain drop-shadow-md"
                    whileHover={{ scale: 1.1, rotateZ: 2 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-pink-600 font-semibold text-lg">{item.price}</p>

                <Link
                  href="/product"
                  className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition"
                >
                  View
                </Link>

                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-300 via-pink-500 to-pink-300 opacity-70"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </motion.div>

              {/* Floating Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="block w-full md:w-1/2 text-center relative mt-10 md:mt-0"
              >
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-7xl md:text-9xl select-none drop-shadow-[0_10px_25px_rgba(236,72,153,0.5)]"
                >
                  {item.icon}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/product"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
          >
            Explore More →
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 text-center px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-10">Customer Love ❤️</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              text: "The macramé sling bag is stunning — perfect for daily use!",
              name: "Varsha",
            },
            {
              text: "The resin pendant I ordered is unique and so pretty!",
              name: "Gaytri",
            },
            {
              text: "Loved the silk thread earrings — super elegant!",
              name: "Riya",
            },
          ].map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="italic text-gray-700 mb-4">“{review.text}”</p>
              <h4 className="font-semibold text-pink-500">– {review.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / WhatsApp Join */}
      <section className="text-center py-16 px-6 md:px-20 bg-pink-50">
        <h2 className="text-3xl font-bold mb-6">Stay Connected 💌</h2>
        <p className="text-gray-600 mb-6">
          Be the first to know about new arrivals, discounts, and exclusive designs!
        </p>
        <Link
          href="/contact"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
        >
          Contact Us on WhatsApp
        </Link>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50 text-center relative overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Why Choose Us 💕
        </h2>
        <div className="w-20 h-1 bg-pink-400 mx-auto mb-12 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20">
          {[
            {
              title: "Made Just for You",
              desc: "Every product is crafted with personal attention — made in small batches to bring you something truly special 🎁",
              icon: "🪡",
            },
            {
              title: "Trendy & Timeless",
              desc: "Our designs blend the latest trends with a touch of elegance, so they never go out of style ✨",
              icon: "🌷",
            },
            {
              title: "Packed with Care",
              desc: "Each order is wrapped with love and attention — because unboxing should feel as special as the product itself 🎀",
              icon: "📦",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-lg p-8 relative border border-pink-100 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-5xl mb-4"
              >
                {item.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold text-pink-600 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
