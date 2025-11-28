import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('business');

    // Fetch general reviews
    const generalReviewsCollection = db.collection('general_reviews');
    const generalReviews = await generalReviewsCollection
      .find({})
      .sort({ date: -1 })
      .limit(10)
      .toArray();

    // Fetch order reviews
    const ordersCollection = db.collection('orders');
    const orderReviews = await ordersCollection
      .find({ review: { $exists: true } })
      .sort({ 'review.date': -1 })
      .limit(10)
      .project({
        customer: { name: 1 },
        review: 1,
        orderId: 1
      })
      .toArray();

    // Transform general reviews
    const formattedGeneralReviews = generalReviews.map(review => ({
      text: review.comment || 'Great experience!',
      name: 'Anonymous Customer',
      rating: review.rating,
      date: review.date
    }));

    // Transform order reviews
    const formattedOrderReviews = orderReviews.map(review => ({
      text: review.review.comment || 'Great product!',
      name: review.customer.name,
      rating: review.review.rating,
      date: review.review.date
    }));

    // Combine and sort by date
    const allReviews = [...formattedGeneralReviews, ...formattedOrderReviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    res.status(200).json({ reviews: allReviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
