import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../../lib/session';

export async function POST() {
  const session = await getIronSession(await cookies(), sessionOptions);
  session.admin = null;
  await session.save();
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
