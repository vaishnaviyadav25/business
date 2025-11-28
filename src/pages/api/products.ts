import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("business");

  if (req.method === "GET") {
    try {
      const { userId } = req.query;
      // Show old products (without userId) to everyone, and user's products if logged in
      const query = userId ? { $or: [{ userId }, { userId: { $exists: false } }] } : { userId: { $exists: false } };
      const products = await db.collection("products").find(query).toArray();
      const formattedProducts = products.map((p) => ({
        id: p._id.toString(),
        category: p.category,
        name: p.name,
        price: p.price,
        images: p.images,
        desc: p.desc,
        material: p.material,
        size: p.size,
        care: p.care,
      }));
      res.status(200).json(formattedProducts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
    }
  } else if (req.method === "POST") {
    try {
      const { category, name, price, images, desc, material, size, care, userId } = req.body;
      const result = await db.collection("products").insertOne({
        category,
        name,
        price: Number(price),
        images,
        desc,
        material,
        size,
        care,
        ...(userId && { userId }), // Only add userId if provided
        createdAt: new Date(),
      });
      res.status(201).json({ message: "Product added", id: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: "Error adding product", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
