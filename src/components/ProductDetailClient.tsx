"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { auth } from "@/context/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import axios from "axios";

interface Product {
  id: number | string;
  category: string;
  name: string;
  price: number;
  images: string[];
  desc: string;
  material: string;
  size: string;
  care: string;
}

// Helper function to create SEO-friendly URLs from product names
const createProductSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

export default function ProductDetailClient() {
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!params?.slug) {
          router.push('/product');
          return;
        }
        
        const slug = params.slug as string;
        // Safe parsing of slug to extract product ID
        const slugParts = slug.split('-');
        const productId = slugParts[0];
        
        // Validate product ID exists
        if (!productId) {
          router.push('/product');
          return;
        }

        const response = await axios.get<Product[]>('/api/products');
        // Handle both string and numeric IDs
        const foundProduct = response.data.find(p => 
          String(p.id) === productId || p.id === Number(productId)
        );
        
        if (!foundProduct) {
          router.push('/product');
          return;
        }

        // Verify the slug matches the product name for SEO consistency
        const expectedSlug = `${foundProduct.id}-${createProductSlug(foundProduct.name)}`;
        if (slug !== expectedSlug) {
          // Redirect to correct canonical URL
          router.replace(`/product/${expectedSlug}`);
          return;
        }

        setProduct(foundProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
        router.push('/product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params, router]);

  const addToCart = (product: Product) => {
    const cart: (Product & { quantity: number })[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const existingIndex = cart.findIndex((item) => String(item.id) === String(product.id));

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-pink-700 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
          <Link 
            href="/product" 
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full hover:scale-105 transition-all duration-300"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-pink-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/product" className="hover:text-pink-600 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-pink-600 font-medium">{product.name}</span>
        </div>
      </nav>

      <motion.div
        className="bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl max-w-6xl mx-auto p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="flex-1">
            <motion.div
              key={product.images[activeImage]}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-3xl overflow-hidden w-full h-96 lg:h-[500px] flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-100 to-amber-50 shadow-xl border border-pink-200/60"
            >
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                width={600}
                height={600}
                className="object-contain max-h-full max-w-full drop-shadow-lg"
                priority
              />
            </motion.div>

            {/* Thumbnail Images */}
            <div className="flex justify-center mt-6 gap-3 flex-wrap">
              {product.images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  width={100}
                  height={100}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 object-cover rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                    activeImage === i
                      ? "border-pink-500 scale-110 shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <span className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-4">
                {product.name}
              </h1>

              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {product.desc}
              </p>

              {/* Product Specifications */}
              <div className="bg-white/60 rounded-2xl p-6 border border-pink-100 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Product Details</h3>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex justify-between">
                    <strong>Material:</strong> 
                    <span>{product.material}</span>
                  </li>
                  <li className="flex justify-between">
                    <strong>Size:</strong> 
                    <span>{product.size}</span>
                  </li>
                  <li className="flex justify-between">
                    <strong>Care:</strong> 
                    <span>{product.care}</span>
                  </li>
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border rounded-xl bg-white/80 backdrop-blur-sm">
                  <button
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                    className="px-4 py-2 text-lg font-bold text-pink-600 hover:bg-pink-50 rounded-l-xl transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-medium border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2 text-lg font-bold text-pink-600 hover:bg-pink-50 rounded-r-xl transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-pink-700">
                    ₹{product.price * quantity}
                  </span>
                  {quantity > 1 && (
                    <span className="text-gray-500">
                      (₹{product.price} each)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 flex-col sm:flex-row">
              <Link
                href={`/order?product=${encodeURIComponent(
                  product.name
                )}&price=${product.price}&qty=${quantity}&image=${encodeURIComponent(
                  product.images[0]
                )}&productUrl=${encodeURIComponent(`/product/${product.id}-${createProductSlug(product.name)}`)}`}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 text-center flex-1 font-medium text-lg"
              >
                Buy Now
              </Link>

              <button
                onClick={() => addToCart(product)}
                className="border-2 border-pink-400 text-pink-600 px-8 py-4 rounded-full hover:bg-pink-50 hover:scale-105 transition-all duration-300 flex-1 font-medium text-lg"
              >
                Add to Cart
              </button>
            </div>

            {/* Back to Products Link */}
            <div className="mt-6 text-center">
              <Link
                href="/product"
                className="text-pink-600 hover:text-pink-700 font-medium inline-flex items-center gap-2 transition-colors"
              >
                ← Back to All Products
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}