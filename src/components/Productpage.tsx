"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MotionImage = motion(Image as any); // ✅ TypeScript fix

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
    name: "Macramé Bag",
    price: 199,
    images: [
      "https://baromarket.in/cdn/shop/products/IMG_20210831_105822.jpg?v=1643105635",
      "https://baromarket.in/cdn/shop/products/IMG_20210920_122059_2.jpg?v=1643105636",
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
    price: 199,
    images: [
      "https://i.ytimg.com/vi/4APYwRUvJXQ/maxresdefault.jpg",
      "https://i.ytimg.com/vi/4APYwRUvJXQ/maxresdefault.jpg",
    ],
    desc: "A cute handcrafted butterfly keychain made with love — perfect for bags, keys, or gifting 💖",
    material: "Premium cotton macramé thread",
    size: "10 cm x 6 cm",
    care: "Wipe gently with a dry cloth. Avoid moisture.",
  },
  {
    id: 3,
    category: "Resin",
    name: "Resin Rose Preserved",
    price: 499,
    images: [
      "https://www.artsty.com/cdn/shop/files/e6bf0c12-0c6a-4c08-b030-a16a89961aec.jpg?v=1735103110",
    ],
    desc: "Beautiful resin coasters with ocean theme — perfect for gifting and home décor.",
    material: "High-quality epoxy resin",
    size: "10 cm diameter",
    care: "Wipe with soft dry cloth.",
  },
  {
    id: 4,
    category: "Resin",
    name: "Resin Preserved Pendant",
    price: 499,
    images: [
      "https://mybageecha.com/cdn/shop/files/Ocean_Crest_Necklace_1.jpg?v=1704964893",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk6CVt2H2_TcnGJJdOOqSAkj6rdZLCE7KPQA&s",
    ],
    desc: "Beautiful resin coasters with ocean theme — perfect for gifting and home décor.",
    material: "High-quality epoxy resin",
    size: "10 cm diameter",
    care: "Wipe with soft dry cloth.",
  },
  {
    id: 5,
    category: "Silk Art",
    name: "Silk Hair Clips",
    price: 699,
    images: [
      "https://m.media-amazon.com/images/I/81AEWV7bQxL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81dHQ1htg6L._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71qp5fyjU2L._SL1500_.jpg",
    ],
    desc: "Hand-painted silk scarf with floral design — lightweight and elegant.",
    material: "Pure silk",
    size: "150 cm x 40 cm",
    care: "Dry clean only.",
  },
  {
    id: 6,
    category: "Silk Art",
    name: "Silk Bangles",
    price: 699,
    images: [
      "https://asthetika.in/cdn/shop/files/ABG24-002-S14_1500x.jpg?v=1718715346",
    ],
    desc: "Hand-painted silk scarf with floral design — lightweight and elegant.",
    material: "Pure silk",
    size: "150 cm x 40 cm",
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

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
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
                      className="group bg-white rounded-2xl p-5 flex flex-col items-center shadow-lg cursor-pointer relative overflow-hidden hover:shadow-pink-200 transition-all duration-500"
                      whileHover={{ scale: 1.03, rotateY: 3 }}
                    >
                      <div className="relative w-full h-56 overflow-hidden rounded-xl">
                        <MotionImage
                          src={product.images[0]}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-90"
                        />
                        <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/50 to-transparent">
                          <button className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-5 py-2 mb-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                            View Details
                          </button>
                        </div>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800 text-center mt-4">
                        {product.name}
                      </h2>
                      <p className="text-gray-600 mt-1 mb-3">₹{product.price}</p>
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
              className="relative bg-white/70 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl max-w-5xl w-full p-8 mx-4 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 120 }}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-5 text-gray-500 hover:text-pink-600 text-3xl font-bold"
              >
                ×
              </button>

              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1">
                  <motion.div
                    key={selectedProduct.images[activeImage]}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative rounded-2xl overflow-hidden shadow-lg"
                  >
                    <Image
                      src={selectedProduct.images[activeImage]}
                      alt={selectedProduct.name}
                      width={500}
                      height={500}
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </motion.div>

                  <div className="flex justify-center mt-4 gap-3">
                    {selectedProduct.images.map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        alt="thumb"
                        width={100}
                        height={100}
                        onClick={() => setActiveImage(i)}
                        className={`w-16 h-16 object-cover rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                          activeImage === i
                            ? "border-pink-500 scale-110 shadow-md"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-3">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-gray-600 mb-4 text-lg">
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

                  <div className="flex gap-4 mt-6">
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
