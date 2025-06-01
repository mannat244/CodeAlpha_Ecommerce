import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../../lib/session';
import connectDB from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await connectDB();
const session = await getIronSession(await cookies(), sessionOptions);

  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  session.user = { _id: user._id.toString(), name, email };
  await session.save();

  return new Response(JSON.stringify({ ok: true }), { status: 201 });
}
