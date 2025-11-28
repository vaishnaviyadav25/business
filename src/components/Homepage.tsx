"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewModal from "./ReviewModal";

export default function HomePage() {
  const [reviews, setReviews] = useState<Array<{ text: string; name: string; rating: number; date: string }>>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews');
        setReviews((response.data as any).reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Fallback to default reviews if API fails
        setReviews([
          { text: "The macramé sling bag is stunning — perfect for daily use!", name: "Varsha", rating: 5, date: "" },
          { text: "The resin pendant I ordered is unique and so pretty!", name: "Gaytri", rating: 5, date: "" },
          { text: "Loved the silk thread earrings — super elegant!", name: "Riya", rating: 5, date: "" },
          { text: "Amazing packaging and fast delivery! Definitely ordering again 💕", name: "Sneha", rating: 5, date: "" },
          { text: "The wall hanging added such warmth to my living room ✨", name: "Prachi", rating: 5, date: "" },
          { text: "Beautiful craftsmanship — every detail is perfect ❤️", name: "Ananya", rating: 5, date: "" },
        ]);
      }
    };

    fetchReviews();
  }, []);

  const products = [
    {
      name: "Macramé Sling Bag",
      img: "/Bag.jpeg",
      price: "₹450",
      icon: "🌸",
    },
    {
      name: " Keychain",
      img: "/Keychain.jpeg",
      price: "₹159",
      icon: "🌼",
    },

    {
      name: "Hair clip set",
      img: "https://5.imimg.com/data5/SELLER/Default/2023/10/356882773/RM/JT/RC/394432/whatsapp-image-2023-10-29-at-9-30-33-am-1000x1000.jpeg",
      price: "₹99",
      icon: "🌻",
    },
    {
      name: "Macramé Wall Hanging",
      img: "https://imagedelivery.net/0ObHXyjKhN5YJrtuYFSvjQ/i-b45fda22-f060-4271-a636-f09a53dfae66-Macrame-Heart-Wall-Hanging-Heart-Wall-Art-Valentine-Gift-Eco-Friendly-Natural-Craft-Studio/display",
      price: "₹399",
      icon: "🌾",
    },
  ];

  // Promotional posters for the scrolling banner - Professional with product focus
  const handleSubmitReview = async (rating: number, comment: string) => {
    try {
      await axios.post('/api/review', {
        rating,
        comment,
        type: 'general'
      });
      // Refresh reviews after submission
      const response = await axios.get('/api/reviews');
      setReviews((response.data as any).reviews);
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  };

  const promotionalPosters = [
    {
      title: "Macramé Sling Bag",
      subtitle: "₹450",
      description: "Stylish & Handcrafted",
      image: "/Bag.jpeg",
      gradient: "from-pink-300 via-rose-300 to-pink-300",
      link: "/product",
      badge: "Best Seller",
    },
    {
      title: "Beaded Keychain",
      subtitle: "₹159",
      description: " Keychain pack of 1 ",
      image: "/Keychain.jpeg",
      gradient: "from-purple-300 via-pink-300 to-purple-300",
      link: "/product",
      badge: "New",
    },
    {
      title: "Hair Clip Set",
      subtitle: "₹99",
      description: "Elegant Accessories",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/10/356882773/RM/JT/RC/394432/whatsapp-image-2023-10-29-at-9-30-33-am-1000x1000.jpeg",
      gradient: "from-rose-300 via-pink-300 to-rose-300",
      link: "/product",
      badge: "Trending",
    },
    {
      title: "Macramé Wall Hanging",
      subtitle: "₹399",
      description: "Transform Your Space",
      image: "https://imagedelivery.net/0ObHXyjKhN5YJrtuYFSvjQ/i-b45fda22-f060-4271-a636-f09a53dfae66-Macrame-Heart-Wall-Hanging-Heart-Wall-Art-Valentine-Gift-Eco-Friendly-Natural-Craft-Studio/display",
      gradient: "from-pink-300 via-rose-300 to-pink-00",
      link: "/product",
      badge: "Popular",
    },
  ];

  return (
    <main className="bg-gradient-to-b from-pink-50 to-white text-gray-800">
      {/* 🎨 Scrolling Promotional Banner */}
  <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
  <Swiper
    modules={[Autoplay, Pagination]}
    autoplay={{
      delay: 600,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }}
    speed={1000}
    loop={true}
    pagination={{
      clickable: true,
      dynamicBullets: true,
    }}
    className="h-full w-full mt-10"
  >
    {promotionalPosters.map((poster, index) => (
      <SwiperSlide key={index}>
        <div
          className={`relative h-full w-full bg-gradient-to-br ${poster.gradient} flex items-center justify-center overflow-hidden`}
        >
          {/* Ambient glow layers */}
          <motion.div
            className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/20 blur-[90px]"
            animate={{ opacity: [0.25, 0.4, 0.25], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-rose-200/30 blur-[110px]"
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.12, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          {/* Main Square Container */}
          <div className="relative w-[90%] h-[80%] max-w-4xl max-h-[450px] flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            
            {/* Left Side - Product Image with Motion */}
            <div className="relative w-full md:w-1/2 h-full flex items-center justify-center p-6 md:p-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, rotate: -6 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 120 }}
                whileHover={{ scale: 1.04, rotate: 2 }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                {/* Square framed product with animated shine */}
                <div className="relative w-full h-full max-w-xs max-h-80 p-2 rounded-xl bg-gradient-to-br from-white/70 via-white/30 to-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                  <div className="relative w-full h-full bg-white/20 backdrop-blur-md rounded-lg border border-white/30 overflow-hidden">
                    <motion.div
                      className="absolute -top-10 -left-10 w-40 h-40 rotate-45 bg-white/20"
                      animate={{ x: [0, 220, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.35, duration: 0.6 }}
                      whileHover={{ y: -8 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <div className="relative w-full h-full flex items-center justify-center p-4">
                        <Image
                          src={poster.image}
                          alt={poster.title}
                          width={400}
                          height={300}
                          className="w-full h-full max-h-64 object-contain drop-shadow-2xl"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                className="absolute top-4 left-4 bg-white text-pink-600 font-bold px-3 py-1 rounded-lg text-sm shadow-[0_10px_30px_rgba(255,255,255,0.4)] border border-white/70"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                {poster.badge}
              </motion.div>
            </div>

            {/* Right Side - Content (Hidden on mobile) */}
            <div className="absolute md:relative w-full md:w-1/2 h-full flex items-center justify-center p-6 md:p-8 bg-gradient-to-l md:bg-gradient-to-r from-black/40 md:from-transparent to-transparent">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center md:text-left z-20 w-full max-w-md"
              >
                {/* All text content hidden on mobile */}
                <div className="hidden md:block">
                  <motion.h2
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 drop-shadow-2xl leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {poster.title}
                  </motion.h2>
                  <motion.p
                    className="text-xl md:text-2xl text-white/95 mb-2 font-extrabold drop-shadow-lg tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {poster.subtitle}
                  </motion.p>
                  {/* Rating */}
                  <motion.div
                    className="flex items-center justify-center md:justify-start gap-2 text-white/90 mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                  >
                    <span className="text-yellow-300">★★★★★</span>
                    <span className="text-xs">4.9/5 • 120+ reviews</span>
                  </motion.div>
                  <motion.p
                    className="text-sm md:text-base text-white/90 mb-6 drop-shadow-md leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {poster.description}
                  </motion.p>
                  <motion.div
                    className="flex items-center justify-center md:justify-start gap-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Link
                      href={poster.link}
                      className="inline-block bg-white text-pink-600 font-bold py-2 px-5 rounded-lg shadow-2xl hover:bg-pink-50 hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 text-sm"
                    >
                      Shop Now →
                    </Link>
                    <Link
                      href={poster.link}
                      className="inline-block bg-white/15 text-white font-semibold py-2 px-5 rounded-lg border border-white/40 hover:bg-white/25 transition-all duration-300 text-sm"
                    >
                      View Details
                    </Link>
                  </motion.div>

                  {/* Small preview chips */}
                  <motion.div
                    className="mt-4 hidden md:flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    {[products[0]?.img, products[1]?.img, products[2]?.img]
                      .filter(Boolean)
                      .map((thumb, i) => (
                        <div key={`thumb-${i}`} className="w-8 h-8 relative rounded-lg overflow-hidden ring-2 ring-white/70 shadow">
                          <Image
                            src={thumb as string}
                            alt="thumb"
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    <span className="text-white/90 text-xs">More colors &amp; styles</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-white rounded-lg blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </SwiperSlide>
    ))}
        </Swiper>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6 text-lg">Loved our products? Share your experience!</p>
          <button
            onClick={() => setShowReviewModal(true)}
            className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Write a Review ⭐
          </button>
        </div>
      </section>
      {/* 🎁 Offer Banner */}
      <div className="bg-pink-500 text-white py-3 overflow-hidden relative">
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
      <section className="relative text-center py-16 md:py-24 bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Every Piece Tells a Story — Crafted with Love 💖
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Macramé Bags &amp; Butterflies • Resin Preserved Jewelry • Silk Thread Designs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/product"
                className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Shop Now
              </Link>
              <button
                onClick={() => setShowReviewModal(true)}
                className="inline-block bg-white text-pink-600 border-2 border-pink-600 hover:bg-pink-50 font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm"
              >
                Write a Review ⭐
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🌿 About Section */}
      <section className="text-center py-20 px-6 md:px-20 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto mb-8 rounded-full"></div>
            <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-gray-700">
              Hi, I&apos;m <span className="font-semibold text-pink-600">Vaishnavi</span> — a passionate
              artist who finds beauty in handmade creations. From intricate{" "}
              <span className="font-medium text-pink-600">macramé bags</span> and dreamy{" "}
              <span className="font-medium text-pink-600">resin preserved jewelry</span> to vibrant{" "}
              <span className="font-medium text-pink-600">silk thread accessories</span>, every piece I create
              carries a touch of warmth, patience, and love. My goal is to turn simple materials
              into meaningful treasures that bring joy and elegance to your everyday life ✨
            </p>
          </motion.div>
        </div>
      </section>

      {/* 🛍️ Featured Products — Auto Slide */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-white to-pink-50 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Best Sellers ✨
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full"></div>
        </motion.div>

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
                <div className="absolute top-5 right-6 text-3xl text-pink-300 animate-bounce">✨</div>

                <div className="w-full h-64 bg-gradient-to-br from-pink-100 to-white rounded-2xl overflow-hidden flex items-center justify-center mb-5 shadow-inner">
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} className="max-h-[240px] w-auto">
                    <div className="relative max-h-[240px] w-auto">
                      <Image
                        src={item.img}
                        alt={item.name}
                        width={400}
                        height={400}
                        className="max-h-[240px] w-auto object-contain drop-shadow-md"
                      />
                    </div>
                  </motion.div>
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
      {/* 💬 Testimonials – Auto Scrolling Carousel */}
      <section className="py-20 text-center px-6 md:px-20 bg-gradient-to-b from-pink-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Customer Love ❤️
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full"></div>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-6xl mx-auto"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-pink-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 mx-4"
              >
                <div className="text-4xl mb-4">💕</div>
                <p className="italic text-gray-700 mb-6 text-lg leading-relaxed">
                  &quot;{review.text}&quot;
                </p>
                <h4 className="font-semibold text-pink-600 text-lg">– {review.name}</h4>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 💌 Contact / WhatsApp */}
      <section className="text-center py-20 px-6 md:px-20 bg-gradient-to-br from-green-50 via-pink-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-pink-600 bg-clip-text text-transparent">
            Stay Connected 💌
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-green-400 to-pink-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-700 mb-10 text-lg md:text-xl leading-relaxed">
            Be the first to know about new arrivals, discounts, and exclusive designs!
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Contact Us on WhatsApp
          </Link>
        </motion.div>
      </section>

      {/* 💕 Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Why Choose Us 💕
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full"></div>
        </motion.div>

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
              <h3 className="text-2xl font-semibold text-pink-600 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💬 Floating WhatsApp Button - Small Round */}
      <motion.a
        href="https://wa.me/917722893524?text=Hi!%20I%27m%20interested%20in%20your%20handmade%20products%20%E2%9C%A8"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-all duration-300"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.a>

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmitReview={handleSubmitReview}
      />
    </main>
  );
}
