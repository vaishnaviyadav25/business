import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("business"); // replace with your DB name
    const { uid, email, displayName } = req.body;

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ uid });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    // Insert user
    const result = await db.collection("users").insertOne({ uid, email, displayName, createdAt: new Date() });
    res.status(201).json({ message: "User stored", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error storing user", error });
  }
}
