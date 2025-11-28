import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import Order from '../../../lib/models/Order';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Ensure mongoose is connected to the business database
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI!, {
        dbName: 'business'
      });
    }

    const { isAdmin, email } = req.query;

    // Check if user is admin
    if (isAdmin !== 'true' && email !== 'vaishnaviyadav25march@gmail.com') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    const { orderId, newStatus, newPaymentStatus } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: 'Missing orderId' });
    }

    const updateData: any = {};
    if (newStatus) {
      updateData.orderStatus = newStatus;
    }
    if (newPaymentStatus) {
      updateData['payment.status'] = newPaymentStatus;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No status to update' });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      updateData,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Send SMS notification to customer for status updates
    if (newStatus && (newStatus === 'shipped' || newStatus === 'delivered')) {
      try {
        const twilio = require('twilio');
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        let smsMessage = '';
        if (newStatus === 'shipped') {
          smsMessage = `🎉 Great news! Your order #${updatedOrder.orderId} has been shipped and is on its way to you. Track your package for updates. Thank you for shopping with us! 💖`;
        } else if (newStatus === 'delivered') {
          smsMessage = `✅ Your order #${updatedOrder.orderId} has been successfully delivered! We hope you love your new items. Please share your experience with a review. Thank you! 🌸`;
        }

        if (smsMessage) {
          await client.messages.create({
            body: smsMessage,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${updatedOrder.customer.phone}`,
          });
          console.log(`SMS notification sent for ${newStatus} status`);
        }
      } catch (smsError) {
        console.error('SMS notification failed:', smsError);
        // Don't fail the status update if SMS fails
      }
    }

    res.status(200).json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
}
