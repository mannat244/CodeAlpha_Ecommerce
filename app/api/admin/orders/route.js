import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../../lib/session';
import connectDB from '../../../lib/db';
import Order from '../../../models/Order';

export async function GET() {
  await connectDB();
  const session = await getIronSession(await cookies(), sessionOptions);

  if (!session.admin?.loggedIn) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return new Response(JSON.stringify({ orders }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function PATCH(req) {
  await connectDB();
  const session = await getIronSession(await cookies(), sessionOptions);

  if (!session.admin?.loggedIn) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { orderId, status } = await req.json();
  if (!orderId || !status) {
    return new Response(JSON.stringify({ error: 'Missing orderId or status' }), { status: 400 });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
    }
    order.status = status;
    await order.save();

    return new Response(JSON.stringify({ order }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
