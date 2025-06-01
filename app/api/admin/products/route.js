import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions } from '../../../lib/session';
import connectDB from '../../../lib/db';
import Product from '../../../models/Products';

export async function POST(req) {
  await connectDB();
  const session = await getIronSession(await cookies(), sessionOptions);

  if (!session.admin?.loggedIn) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { title, price, category, image, description, rating } = await req.json();

  if (!title || !price || !category) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  try {
    const newProduct = new Product({
      title,
      price,
      category,
      image: image || '',
      description: description || '',
      rating: rating || 0,
    });

    await newProduct.save();

    return new Response(JSON.stringify({ message: 'Product added', product: newProduct }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
