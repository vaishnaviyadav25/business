import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://vaishi.vercel.app/",
      lastModified: now,
    },
    {
      url: "https://vaishi.vercel.app/product",
      lastModified: now,
    },
    {
      url: "https://vaishi.vercel.app/contact",
      lastModified: now,
    },
    {
      url: "https://vaishi.vercel.app/cart",
      lastModified: now,
    },
    {
      url: "https://vaishi.vercel.app/login",
      lastModified: now,
    },
    {
      url: "https://vaishi.vercel.app/order",
      lastModified: now,
    },
    {
      url: "https://vaishi.vercel.app/privacy-policy",
      lastModified: now,
    },
    {
      url: "https://vaishi.vercel.app/terms-and-conditions",
      lastModified: now,
    },
    {
      url: "https://vaishi.vercel.app/return-policy",
      lastModified: now,
    },
  ];
}
