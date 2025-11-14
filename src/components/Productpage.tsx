"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { ComponentType } from "react";
import type { MotionProps } from "framer-motion";
import type { ImageProps } from "next/image";

const MotionImage = motion(
  Image as unknown as ComponentType<ImageProps & MotionProps>
);

interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  images: string[];
  desc: string;
  material: string;
  size: string;
  care: string;
}

const products: Product[] = [
  {
    id: 1,
    category: "Macramé",
    name: "Macramé sling Bag",
    price: 429,
    images: [
      "/Bag.jpeg",
      "/bag1.jpeg",
    ],
    desc: "A cute handcrafted butterfly keychain made with love — perfect for bags, keys, or gifting 💖",
    material: "Premium cotton macramé thread",
    size: "10 cm x 6 cm",
    care: "Wipe gently with a dry cloth. Avoid moisture.",
  },
  {
    id: 2,
    category: "Macramé",
    name: "Macramé Butterfly",
    price: 299,
    images: [
      "/Butterflies.jpeg",
      "/Butterflies1.jpeg",
    ],
    desc: "A cute handcrafted butterfly keychain made with love — perfect for bags, keys, or gifting 💖 , Set of 3 ",
    material: "Premium cotton macramé thread",
    size: "10 cm x 6 cm",
    care: "Wipe gently with a dry cloth. Avoid moisture.",
  },
  {
    id: 3,
    category: "Beaded Art 🎨 ",
    name: "Colorful Beaded Keychain",
    price: 159,
    images: [
      "/Keychain.jpeg", // save your image in public folder as keychain.jpeg
    ],
    desc: "Vibrant handmade beaded keychain — a perfect accessory for bags, keys, or as a thoughtful gift.",
    material: "Durable high-quality beads and thread",
    size: "Free size",
    care: "Keep away from water and sharp objects to maintain its shine and shape.",
  },
  {
    id: 4,
    category: "Beaded Art 🎨 ",
    name: "Beaded Keychain",
    price: 159,
    images: [
      "/Key.jpeg", // make sure you save your image in public folder
    ],
    desc: "Handcrafted beaded keychain — colorful, durable, and perfect as a gift or accessory.",
    material: "High-quality beads and thread",
    size: "Free size",
    care: "Avoid water and handle gently to maintain durability.",
  },
  {
    id: 5,
    category: "Beaded Art 🎨 ",
    name: "Handmade Beaded Bracelet",
    price: 99,
    images: [
      "/bracelet.jpeg", // save your image in public folder as bracelet.jpeg
    ],
    desc: "Beautiful handmade beaded bracelet — perfect for daily wear or gifting to loved ones.",
    material: "High-quality beads with elastic thread",
    size: "Free size, stretches to fit most wrists",
    care: "Avoid water and harsh chemicals to keep beads bright and elastic intact.",
  },
  {
    id: 6,
    category: "Embriodery Art 🧶",
    name: " Hair Clips",
    price: 99,
    images: [
      "https://m.media-amazon.com/images/I/81AEWV7bQxL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81dHQ1htg6L._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71qp5fyjU2L._SL1500_.jpg",
    ],
    desc: "Red  and white  small rose — lightweight and elegant.(Pack of 2)",
    material: "cotton cloth",
    size: "Free size",
    care: "Dry clean only.",
  },
  {
    id: 7,
    category: "Embriodery Art 🧶",
    name: " Hair Clips",
    price: 99,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/10/356882773/RM/JT/RC/394432/whatsapp-image-2023-10-29-at-9-30-33-am-1000x1000.jpeg",

    ],
    desc: "Hand-made hair clip . Beautiful flowers and leaves -- lightweight  and elegant.(pack of 2)",
    material: "cotton cloth ",
    size: "Free size",
    care: "Dry clean only.",
  },

];

export default function Productpage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const addToCart = (product: Product) => {
    const cart: (Product & { quantity: number })[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setSelectedProduct(null);
    router.push("/cart");
  };

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 py-10 px-6 mt-10">
      <div className="relative min-h-screen py-16 px-6 mt-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-100 to-amber-50 animate-gradient-slow"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-400/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <motion.h1
            className="text-4xl font-extrabold text-center text-pink-700 mb-16 drop-shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Beautiful Creations That Inspire 🌸
          </motion.h1>

          {categories.map((cat, i) => (
            <motion.div
              key={cat}
              className="max-w-6xl mx-auto mb-20 bg-white/60 backdrop-blur-lg border border-white/40 shadow-2xl rounded-3xl p-8 hover:shadow-pink-200 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-pink-700 mb-8 tracking-wide text-center">
                {cat} Collection
              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products
                  .filter((p) => p.category === cat)
                  .map((product) => (
                    <motion.div
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product);
                        setActiveImage(0);
                        setQuantity(1);
                      }}
                      className="group relative rounded-3xl bg-gradient-to-br from-white via-pink-50 to-rose-50 
             border border-pink-100 shadow-[0_8px_30px_rgb(249,168,212,0.15)] 
             hover:shadow-[0_8px_40px_rgb(244,114,182,0.3)] transition-all duration-500 
             cursor-pointer overflow-hidden flex flex-col items-center p-5"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 1.01 }}
                    >
                      {/* Image Section */}
                      {/* Image Section (Shiny 3D Version) */}
                      <div
                        className="
    relative w-full h-52 overflow-hidden rounded-3xl
    flex items-center justify-center
    bg-gradient-to-br from-pink-50 via-rose-100 to-amber-50
    shadow-[0_8px_25px_rgba(0,0,0,0.15)]
    border border-pink-200/60
    group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]
    transition-all duration-500
  "
                      >
                        {/* Soft glow overlay */}
                        <div className="absolute inset-0 bg-white/30 pointer-events-none" />

                        {/* Corner Emojis */}
                        <div className="absolute top-1 left-1 text-lg">✨</div>
                        <div className="absolute top-1 right-1 text-lg">🌸</div>
                        <div className="absolute bottom-1 left-1 text-lg">💖</div>
                        <div className="absolute bottom-1 right-1 text-lg">⭐</div>

                        {/* Gradient borders */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-300 via-rose-400 to-amber-300 opacity-70"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-300 via-rose-400 to-pink-300 opacity-70"></div>
                        <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-pink-300 via-rose-400 to-amber-300 opacity-70"></div>
                        <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-amber-300 via-rose-400 to-pink-300 opacity-70"></div>

                        {/* Shine animation */}
                        <div
                          className="
      absolute -top-10 left-0 w-full h-16
      bg-white/40 blur-xl opacity-60 rounded-full
      animate-pulse
    "
                        />

                        {/* Product Image */}
                        <MotionImage
                          src={product.images[0]}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="
      w-full h-full object-contain
      transition-transform duration-700
      group-hover:scale-110
      drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)]
    "
                        />
                      </div>


                      {/* Product Details */}
                      <div className="w-full text-center mt-4 space-y-1">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-pink-700 transition-colors">
                          {product.name}
                        </h2>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-snug">
                          {product.desc}
                        </p>
                        <p className="text-xl font-bold text-pink-600 mt-2">₹{product.price}</p>
                      </div>

                      {/* Decorative glow */}
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-200/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    </motion.div>

                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl max-w-5xl w-full p-6 sm:p-8 mx-4 overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-4 z-50 text-gray-500 hover:text-pink-600 text-3xl sm:text-4xl font-bold bg-white/70 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all"
              >
                ×
              </button>

              <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                <div className="flex-1">
                  <motion.div
                    key={selectedProduct.images[activeImage]}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="
    relative
    rounded-3xl
    overflow-hidden
    w-full
    h-80
    flex
    items-center
    justify-center

    bg-gradient-to-br from-pink-50 via-rose-100 to-amber-50
    shadow-[0_12px_40px_rgba(0,0,0,0.18)]
    border border-pink-200/60

    hover:shadow-[0_20px_55px_rgba(0,0,0,0.28)]
    hover:scale-[1.02]
    transition-all duration-500
  "
                  >
                    {/* Soft inner glow ring */}
                    <div
                      className="
      absolute inset-0 pointer-events-none
      bg-gradient-to-br from-white/40 via-transparent to-transparent
    "
                    />

                    {/* Shiny emoji corner accents */}
                    <div className="absolute top-2 left-2 text-xl">✨</div>
                    <div className="absolute top-2 right-2 text-xl">🌸</div>
                    <div className="absolute bottom-2 left-2 text-xl">💖</div>
                    <div className="absolute bottom-2 right-2 text-xl">⭐</div>

                    {/* Decorative glowing lines */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-300 via-rose-400 to-amber-300 opacity-70"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-300 via-rose-400 to-pink-300 opacity-70"></div>
                    <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-pink-300 via-rose-400 to-amber-300 opacity-70"></div>
                    <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-amber-300 via-rose-400 to-pink-300 opacity-70"></div>

                    {/* Shine overlay */}
                    <div
                      className="
      absolute -top-10 left-0 w-full h-24
      bg-white/40
      blur-xl
      opacity-60
      rounded-full
      animate-pulse
    "
                    />

                    <Image
                      src={selectedProduct.images[activeImage]}
                      alt={selectedProduct.name}
                      width={500}
                      height={500}
                      className="object-contain max-h-full max-w-full
      drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)]
    "
                    />
                  </motion.div>



                  <div className="flex justify-center mt-4 gap-3 flex-wrap">
                    {selectedProduct.images.map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        alt="thumb"
                        width={100}
                        height={100}
                        onClick={() => setActiveImage(i)}
                        className={`w-16 h-16 object-cover rounded-xl cursor-pointer transition-all duration-300 border-2 ${activeImage === i
                          ? "border-pink-500 scale-110 shadow-md"
                          : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-gray-600 mb-4 text-base sm:text-lg">
                      {selectedProduct.desc}
                    </p>

                    <div className="bg-white/60 rounded-2xl p-4 border border-pink-100 mb-4">
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>
                          <strong>Material:</strong> {selectedProduct.material}
                        </li>
                        <li>
                          <strong>Size:</strong> {selectedProduct.size}
                        </li>
                        <li>
                          <strong>Care:</strong> {selectedProduct.care}
                        </li>
                      </ul>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-medium text-gray-700">
                        Quantity:
                      </span>
                      <div className="flex items-center border rounded-xl bg-white/80 backdrop-blur-sm">
                        <button
                          onClick={() =>
                            setQuantity((q) => (q > 1 ? q - 1 : 1))
                          }
                          className="px-3 py-1 text-lg font-bold text-pink-600"
                        >
                          −
                        </button>
                        <span className="px-4 font-medium">{quantity}</span>
                        <button
                          onClick={() => setQuantity((q) => q + 1)}
                          className="px-3 py-1 text-lg font-bold text-pink-600"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <p className="text-xl font-bold text-pink-700">
                      ₹{selectedProduct.price * quantity}
                    </p>
                  </div>

                  <div className="flex gap-4 mt-6 flex-col sm:flex-row">
                    <Link
                      href={`/order?product=${encodeURIComponent(
                        selectedProduct.name
                      )}&price=${selectedProduct.price}&qty=${quantity}&image=${encodeURIComponent(
                        selectedProduct.images[0]
                      )}`}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 text-center flex-1"
                    >
                      Buy Now
                    </Link>

                    <button
                      onClick={() => addToCart(selectedProduct)}
                      className="border-2 border-pink-400 text-pink-600 px-6 py-3 rounded-full hover:bg-pink-50 hover:scale-105 transition-all duration-300 flex-1 font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
