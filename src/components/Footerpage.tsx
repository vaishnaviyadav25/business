"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-pink-50 text-gray-800 py-16 md:py-20 overflow-hidden">

      {/* 🌸 Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-300 via-pink-500 to-pink-300 animate-pulse"></div>

      {/* 🌈 Floating pastel blobs */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-pink-200/40 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-pink-300/30 rounded-full blur-3xl"
        animate={{ y: [0, 25, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🌷 Footer Content */}
      <div className="relative container mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">

          {/* 🌼 Left - Logo & About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center md:items-start text-center md:text-left mb-4">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <Link href="/" className="flex items-center">
          <img
            src="/Mylogo.png"
            alt="Shop Logo"
            width={100}
            height={50}
            className="object-contain"
          />
        </Link>
                <div>
                  <h3 className="text-xl font-bold text-pink-600">Vaishi</h3>
                  <p className="text-sm text-gray-700 font-medium">by Vaishnavi Yadav</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-sm mx-auto md:mx-0">
                Handcrafted treasures made with love — bringing charm and creativity
                into your everyday life 💖
              </p>
            </div>
          </motion.div>

          {/* 🌷 Middle Left - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-3 md:ml-10 sm:ml-0"
          >
            <h3 className="text-lg font-semibold text-pink-600 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li><Link href="/" className="hover:text-pink-500 transition">Home</Link></li>
              <li><Link href="/product" className="hover:text-pink-500 transition">Product</Link></li>
              <li><Link href="/order" className="hover:text-pink-500 transition">Order</Link></li>
              <li><Link href="/contact" className="hover:text-pink-500 transition">Contact</Link></li>
            </ul>
          </motion.div>

          {/* 🌷 Middle Right - Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-pink-600 mb-3">Policies</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li><Link href="/privacy-policy" className="hover:text-pink-500 transition">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-pink-500 transition">Terms & Conditions</Link></li>
              <li><Link href="/return-policy" className="hover:text-pink-500 transition">Return Policy</Link></li>
            </ul>
          </motion.div>

          {/* 🌸 Right - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-pink-600 mb-3">Contact Us</h3>
            <p className="text-gray-600 text-sm md:text-base">
              📧 vaishnaviyadav25march@gmail.com
            </p>
            <div className="flex justify-center md:justify-start gap-6 text-pink-500 text-2xl mt-4">
              <motion.a
                href="https://www.instagram.com/"
                target="_blank"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Instagram />
              </motion.a>
              <motion.a
                href="mailto:vaishnaviyadav25march@gmail.com"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Mail />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* 🌺 Divider Line */}
        <div className="w-full h-[1px] bg-pink-300/50 my-10"></div>

        {/* Copyright */}
        <motion.p
          className="text-gray-500 text-center text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          © {new Date().getFullYear()} <span className="text-pink-600 font-semibold">Vaishi’s Creations</span> | All Rights Reserved 🌷
        </motion.p>
      </div>
    </footer>
  );
}
