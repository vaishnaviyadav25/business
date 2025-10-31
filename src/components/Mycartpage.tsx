"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images: string[];
}

const Mycartpage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 🧠 Load cart data only after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(storedCart);
      setIsLoaded(true);
    }
  }, []);

  // 💾 Save cart back to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // 🗑️ Remove item
  const removeItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
  };

  // 🧹 Clear cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // ➕ Update quantity
  const updateQuantity = (id: number, change: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  // 🛒 Handle checkout click (✅ Now only redirects, doesn't clear cart)
  const handleCheckout = () => {
    const productNames = cart.map((item) => item.name).join(", ");
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // ✅ Redirect to order page, but keep cart in localStorage
    window.location.href = `/order?product=${encodeURIComponent(
      productNames
    )}&price=${encodeURIComponent(totalPrice)}`;
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🕓 Wait for client-side render
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen text-pink-500 font-semibold text-xl">
        Loading your cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-pink-600 mb-10"
      >
        My Cart 🛍️
      </motion.h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Your cart is empty 😔
          </h2>
          <p className="text-gray-500">Add something to your cart!</p>
          <Link
            href="/"
            className="mt-4 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-6 sm:p-10">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl shadow-sm"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-500">₹{item.price}</p>

                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-1 text-lg font-bold text-pink-600"
                      >
                        −
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, +1)}
                        className="px-3 py-1 text-lg font-bold text-pink-600"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-pink-600 font-semibold mt-1">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600 mt-4 sm:mt-0 flex items-center gap-1"
                >
                  <Trash2 size={18} /> Remove
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex justify-between items-center mt-8 text-lg font-semibold text-gray-800">
            <span>Total:</span>
            <span className="text-pink-600">₹{total}</span>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={clearCart}
              className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Clear Cart
            </button>

            {/* ✅ Checkout button now only redirects */}
            <button
              onClick={handleCheckout}
              className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mycartpage;
