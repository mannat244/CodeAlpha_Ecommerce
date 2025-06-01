import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../../lib/session';
import connectDB from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await connectDB();
const session = await getIronSession(await cookies(), sessionOptions);

  const { email, password } = await req.json();
  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password required' }), { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  }

  session.user = { _id: user._id.toString(), name: user.name, email: user.email };
  await session.save();

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
