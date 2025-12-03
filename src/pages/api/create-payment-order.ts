import { NextApiRequest, NextApiResponse } from 'next';

// Razorpay integration removed
// This endpoint is no longer used for payment processing

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Return a message indicating Razorpay is removed
  res.status(200).json({
    message: 'Razorpay integration has been removed. Payment is now handled via WhatsApp QR.',
  });
}
