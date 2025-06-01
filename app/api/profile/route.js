// app/api/profile/route.js
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import connectDB from '../../lib/db';
import Order from '../../models/Order';
import { sessionOptions } from '../../lib/session';

export async function GET() {
  await connectDB();
  const session = await getIronSession(await cookies(), sessionOptions);

  if (!session?.user?._id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const orders = await Order.find({ userId: session.user._id })
      .sort({ createdAt: -1 })
      .lean();

    return new Response(
      JSON.stringify({
        user: {
          name: session.user.name,
          email: session.user.email,
        },
        orders,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
