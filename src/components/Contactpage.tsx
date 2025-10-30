"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function Contactpage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "+917722893524";
    const message =
      `*New Contact Request from Vaishi Website*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Message:* ${formData.message}`;
    window.open(
      `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setFormData({ name: "", email: "", phone: "", message: "" });
    alert("Your enquiry has been sent successfully!");
  };

  const faqs = [
    {
      question: "How can I place an order?",
      answer:
        "Simply visit our shop section, choose your favorite Vaishi product, and click on 'Buy Now'. Fill in your details — and your order will be on its way!",
    },
    {
      question: "Do you offer customization?",
      answer:
        "Yes! We love creating custom macramé designs. Message us with your idea, and we’ll make something special for you.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery usually takes 5–7 business days depending on your location. We’ll share tracking details once your order ships.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept UPI, bank transfer, and COD (Cash on Delivery) on selected products.",
    },
  ];

  return (
    <section className="bg-pink-50 py-16 px-6 text-gray-900">
      {/* Top Heading */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-pink-600">
          Get In <span className="text-pink-400">Touch</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          Ready to collaborate? Let’s discuss how{" "}
          <span className="text-pink-500 font-semibold">Vaishi</span> can help
          make your shopping experience magical 🌸
        </p>
      </motion.div>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-0 md:space-y-3 text-center lg:text-left mt-0 sm:-mt-10 lg:-mt-24 xl:-mt-32"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Connect <span className="text-pink-600">With</span>
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-pink-500">
            Vaishi
          </h3>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto lg:mx-0">
            Love something from Vaishi? Have a question? Drop us a message — we’d
            love to help you shop happily! 💕🌸
          </p>
        </motion.div>

        {/* Right Section (Form) */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-5 border border-pink-100"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Type your message..."
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none resize-none text-sm"
              required
            ></textarea>
          </div>

          <div className="flex mt-6">
            <button
              type="submit"
              className="px-8 py-2 bg-pink-500 text-white font-medium rounded-full 
                shadow-md hover:bg-pink-600 
                hover:shadow-[0_0_18px_rgba(236,72,153,0.8)] 
                hover:scale-105 active:scale-95
                transition-all duration-300 ease-in-out text-sm w-full sm:w-auto"
            >
              Send 💌
            </button>
          </div>
        </motion.form>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto mt-20"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">
          💬 Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-pink-200 bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full flex justify-between items-center text-left px-5 py-4 text-gray-800 font-medium focus:outline-none"
              >
                <span>{faq.question}</span>
                <span className="text-pink-500 text-xl">
                  {openFAQ === index ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-4 text-gray-600 text-sm"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
  
