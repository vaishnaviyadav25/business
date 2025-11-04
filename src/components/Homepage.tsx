"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

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
  const products = [
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
    {
      name: "Resin Floral Keychain",
      img: "https://m.media-amazon.com/images/I/71qQH6D1rBL._AC_UF894,1000_QL80_.jpg",
      price: "₹199",
      icon: "🌻",
    },
    {
      name: "Macramé Wall Hanging",
      img: "https://m.media-amazon.com/images/I/71YrxNnZq-L._AC_UF1000,1000_QL80_.jpg",
      price: "₹799",
      icon: "🌾",
    },
  ];

  return (
    <main className="bg-gradient-to-b from-pink-50 to-white text-gray-800">
      {/* 🎁 Offer Banner */}
      <div className="bg-pink-500 text-white py-3 overflow-hidden mt-9 relative">
        <motion.div
          className="whitespace-nowrap text-center text-lg font-medium tracking-wide flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="mr-[400px]">
            🎁 Special Offer: Get a FREE GIFT on your FIRST order above ₹250 💖
          </span>
          <span className="w-[400px] inline-block"></span>
          <span className="mr-[400px]">
            🎁 Special Offer: Get a FREE GIFT on your FIRST order above ₹250 💖
          </span>
        </motion.div>
      </div>

      {/* 🌸 Hero Section */}
      <section className="relative text-center py-20 md:py-28 bg-[url('/hero-bg.jpg')] bg-cover bg-center">
        <div className="bg-white/70 backdrop-blur-sm py-16 px-6 md:px-12 rounded-3xl mx-4 md:mx-20 shadow-xl">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Every Piece Tells a Story — Crafted with Love 💖
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

      {/* 🌿 About Section */}
      <section className="text-center py-16 px-6 md:px-20 bg-pink-50 rounded-2xl shadow-sm">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          About Me
        </h2>
        <div className="w-20 h-1 bg-pink-400 mx-auto mb-6 rounded-full"></div>
        <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-gray-600">
          Hi, I’m <span className="font-semibold text-pink-500">Vaishnavi</span> — a passionate
          artist who finds beauty in handmade creations. From intricate{" "}
          <span className="text-pink-500">macramé bags</span> and dreamy{" "}
          <span className="text-pink-500">resin preserved jewelry</span> to vibrant{" "}
          <span className="text-pink-500">silk thread accessories</span>, every piece I create
          carries a touch of warmth, patience, and love. My goal is to turn simple materials
          into meaningful treasures that bring joy and elegance to your everyday life ✨
        </p>
      </section>

      {/* 🛍️ Featured Products — Auto Slide */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Best Sellers ✨
        </h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                whileHover={{
                  rotateY: index % 2 === 0 ? 10 : -10,
                  scale: 1.05,
                  boxShadow: "0 20px 60px rgba(236, 72, 153, 0.4)",
                }}
                className="relative bg-white rounded-3xl shadow-2xl p-6 border border-pink-100 flex flex-col items-center justify-center overflow-hidden group"
              >
                <div className="absolute top-5 right-6 text-3xl text-pink-300 animate-bounce">
                  ✨
                </div>

                <div className="w-full h-64 bg-gradient-to-br from-pink-100 to-white rounded-2xl overflow-hidden flex items-center justify-center mb-5 shadow-inner">
                  <motion.img
                    src={item.img}
                    alt={item.name}
                    className="max-h-[240px] w-auto object-contain drop-shadow-md"
                    whileHover={{ scale: 1.1 }}
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
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-20">
          <Link
            href="/product"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
          >
            Explore More →
          </Link>
        </div>
      </section>

      {/* 💬 Testimonials */}
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

      {/* 💌 Contact / WhatsApp */}
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

      {/* 💕 Why Choose Us */}
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
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold text-pink-600 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
