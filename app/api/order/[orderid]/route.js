import connectDB from '../../../lib/db'; // Adjust path if needed
import Order from '../../../models/Order';

export async function GET(req, { params }) {
  await connectDB();
  const { orderid } = await params;

  try {
    const order = await Order.findById(orderid).lean();
    if (!order) {
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ order }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
