"use client";

import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Laptop, Store, Brush, TrendingUp } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Webservices = () => {
  const router = useRouter();

  // Elegant, Vaishi-style colors — warm, creative, handmade tone
  const primaryColor = "#5B3E2B"; // Deep earthy brown
  const accentColor = "#E3B783"; // Soft beige-gold highlight
  const backgroundColor = "#F9F5F0"; // Light handmade-paper tone

  const services = [
    {
      icon: <Laptop sx={{ fontSize: 40, color: primaryColor }} />,
      title: "Portfolio & Business Websites",
      description:
        "Launch your personal or business website that reflects your story, creativity, and goals — just like Vaishi.",
    },
    {
      icon: <Store sx={{ fontSize: 40, color: primaryColor }} />,
      title: "E-Commerce Store Setup",
      description:
        "Start selling online with Shopify, WooCommerce, or custom store solutions built for your brand.",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: primaryColor }} />,
      title: "SEO & Digital Presence",
      description:
        "Boost your reach on Google and social media with proper SEO setup, analytics, and digital strategy.",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor,
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 6 },
        textAlign: "center",
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: primaryColor,
            mb: 1,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Vaishi Web Studio
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "text.secondary",
            mb: 5,
            maxWidth: 600,
            mx: "auto",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          We don’t just craft handmade products — we also craft beautiful websites.
        </Typography>
      </motion.div>

      {/* Services section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                width: 280,
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0px 6px 16px rgba(0,0,0,0.15)",
                  transition: "0.3s",
                },
              }}
            >
              <CardContent>
                <Box sx={{ mb: 2 }}>{service.icon}</Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: primaryColor,
                    mb: 1,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

      {/* CTA Section */}
      <Box sx={{ mt: 6 }}>
        <Button
          variant="contained"
          onClick={() => router.push("/contact")}
          sx={{
            backgroundColor: primaryColor,
            color: "#fff",
            px: 4,
            py: 1.5,
            fontWeight: 600,
            borderRadius: "30px",
            fontFamily: "'Poppins', sans-serif",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: accentColor,
              color: "#2D1B10",
              boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
            },
          }}
        >
          Get Your Website Built by Vaishi
        </Button>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: "text.secondary",
            maxWidth: 500,
            mx: "auto",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Whether you’re a small business, artist, or entrepreneur — we’ll help you
          launch a digital presence that truly represents you.
        </Typography>
      </Box>
    </Box>
  );
};

export default Webservices;
