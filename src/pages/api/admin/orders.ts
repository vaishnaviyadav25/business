import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import Order from '../../../lib/models/Order';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Ensure mongoose is connected to the business database
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI!, {
        dbName: 'business'
      });
    }

    // Get all orders, sorted by newest first
    const orders = await Order.find({})
      .sort({ orderDate: -1 })
      .lean();

    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
}
