import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vaishi.vercel.app/",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://vaishi.vercel.app/product",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://vaishi.vercel.app/contact",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://vaishi.vercel.app/cart",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://vaishi.vercel.app/login",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://vaishi.vercel.app/order",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://vaishi.vercel.app/privacy-policy",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://vaishi.vercel.app/terms-and-conditions",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://vaishi.vercel.app/return-policy",
      lastModified: new Date().toISOString(),
    },
  ];
}
