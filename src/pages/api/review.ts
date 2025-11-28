import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { orderId, rating, comment, type } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Invalid rating provided' });
    }

    const client = await clientPromise;
    const db = client.db('business');

    if (type === 'general') {
      // Handle general reviews
      const reviewsCollection = db.collection('general_reviews');
      await reviewsCollection.insertOne({
        rating: parseInt(rating),
        comment: comment || '',
        date: new Date().toISOString(),
        type: 'general'
      });
    } else if (orderId) {
      // Handle order reviews
      const ordersCollection = db.collection('orders');
      const result = await ordersCollection.updateOne(
        { _id: new ObjectId(orderId) },
        {
          $set: {
            review: {
              rating: parseInt(rating),
              comment: comment || '',
              date: new Date().toISOString()
            }
          }
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Order not found' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

    res.status(200).json({ success: true, message: 'Review submitted successfully' });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
