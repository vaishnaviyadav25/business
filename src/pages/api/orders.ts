import { NextApiRequest, NextApiResponse } from 'next';
import Order from '../../lib/models/Order';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Ensure mongoose is connected to the business database
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI!, {
        dbName: 'business'
      });
    }

    const {
      orderId,
      customer,
      products,
      payment,
      message,
    } = req.body;

    // Create new order
    const order = new Order({
      orderId,
      customer,
      products,
      payment,
      message,
      orderStatus: 'pending',
    });

    await order.save();

    // Twilio integration
    const twilio = await import('twilio');
    const client = twilio.default(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    // Send WhatsApp notification to admin
    try {
      const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER || 'your_admin_number_here';
      const whatsappMessage = `🆕 New Order Received!

Order ID: ${orderId}
Customer: ${customer.name}
Phone: ${customer.phone}
Email: ${customer.email}
Address: ${customer.address}
Payment: ${payment.method} - ₹${payment.amount}
Products: ${products.map((p: any) => `${p.name} x${p.quantity}`).join(', ')}

Total: ₹${payment.amount}`;

      await client.messages.create({
        body: whatsappMessage,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${adminPhone}`,
      });

      console.log('WhatsApp notification sent successfully');

    } catch (whatsappError) {
      console.error('WhatsApp notification failed:', whatsappError);
      // Don't fail the order creation if WhatsApp fails
    }

    // Send SMS notification to admin
    try {
      const adminPhone = '7722893524';
      const smsMessage = `🆕 New Order Alert!

Order ID: ${orderId}
Customer: ${customer.name}
Phone: ${customer.phone}
Products: ${products.map((p: any) => `${p.name} x${p.quantity}`).join(', ')}

Total: ₹${payment.amount}
Please prepare the order!`;

      await client.messages.create({
        body: smsMessage,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+91${adminPhone}`,
      });

      console.log('SMS notification sent to admin successfully');

    } catch (smsError) {
      console.error('SMS notification to admin failed:', smsError);
      // Don't fail the order creation if SMS fails
    }

    res.status(201).json({
      success: true,
      orderId: order.orderId,
      message: 'Order created successfully',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
}
