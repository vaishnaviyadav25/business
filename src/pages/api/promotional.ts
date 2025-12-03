import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("business");

  if (req.method === "GET") {
    try {
      // Fetch only visible promotional products
      const promotionalProducts = await db.collection("promotional").find({ visible: { $ne: false } }).toArray();
      const formattedProducts = promotionalProducts.map((p) => ({
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
      res.status(500).json({ message: "Error fetching promotional products", error });
    }
  } else if (req.method === "POST") {
    try {
      const { title, subtitle, description, image, gradient, link, badge, visible = true } = req.body;
      const result = await db.collection("promotional").insertOne({
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
      res.status(201).json({ message: "Promotional product added", id: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: "Error adding promotional product", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
