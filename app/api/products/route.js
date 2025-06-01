import { NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import Product from '../../models/Products';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
