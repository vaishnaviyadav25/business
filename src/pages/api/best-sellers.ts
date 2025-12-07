import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("business");

  if (req.method === "GET") {
    try {
      // Fetch only visible best seller products
      const bestSellerProducts = await db.collection("best-sellers").find({ visible: { $ne: false } }).toArray();
      const formattedProducts = bestSellerProducts.map((p) => ({
        id: p._id.toString(),
        title: p.title,
        subtitle: p.subtitle,
        description: p.description,
        image: p.image,
        gradient: p.gradient,
        link: p.link,
        badge: p.badge,
        visible: p.visible,
      }));
      res.status(200).json(formattedProducts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching best seller products", error });
    }
  } else if (req.method === "POST") {
    try {
      const { title, subtitle, description, image, gradient, link, badge, visible = true } = req.body;

      // Check if product already exists
      const existingProduct = await db.collection("best-sellers").findOne({ title });
      if (existingProduct) {
        return res.status(400).json({ message: "Product already exists in best sellers" });
      }

      const result = await db.collection("best-sellers").insertOne({
        title,
        subtitle,
        description,
        image,
        gradient,
        link,
        badge,
        visible,
        createdAt: new Date(),
      });
      res.status(201).json({ message: "Best seller product added", id: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: "Error adding best seller product", error });
    }
  } else if (req.method === "DELETE") {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ message: "Title is required for deletion" });
      }

      const result = await db.collection("best-sellers").deleteOne({ title });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Product not found in best sellers" });
      }

      res.status(200).json({ message: "Product removed from best sellers" });
    } catch (error) {
      res.status(500).json({ message: "Error removing best seller product", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
