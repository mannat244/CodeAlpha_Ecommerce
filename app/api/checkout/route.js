// app/api/checkout/route.js
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '@/app/lib/session';
import connectDB from '@/app/lib/db';
import Order from '../../models/Order';

export async function POST(req) {
  const session = await getIronSession(await cookies(), sessionOptions);
  if (!session.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  await connectDB();
  const body = await req.json();
  const { address, cart, coupon, discount, paymentMethod, totalAmount } = body;

  const order = await Order.create({
    userId: session.user._id,
    items: cart.map((item) => ({
      productId: item._id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
    address,
    coupon,
    discount,
    paymentMethod,
    totalAmount,
    status: paymentMethod === 'cod' ? 'pending' : 'processing',
  });

  return new Response(JSON.stringify({ ok: true, orderId: order._id }), { status: 201 });
}
