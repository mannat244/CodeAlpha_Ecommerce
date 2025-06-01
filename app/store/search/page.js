import React from 'react';
import connectDB from '../../lib/db';
import Product from '../../models/Products';
import Link from 'next/link';
import { 
  Zap,
  Store,
  Search,
  SearchX,
  Tag,
  IndianRupee,
  Star
} from "lucide-react";

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams;
  const query = await sp.query || '';

  await connectDB();
  const results = await Product.find({
    title: { $regex: query, $options: 'i' },
  }).lean();

  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30 px-4 py-6">
      <nav className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-blue-100/50 p-4 mb-8 rounded-2xl">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/store" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all duration-200 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span>GadgetInSpot</span>
          </Link>
          <Link href="/store" className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200 flex items-center space-x-2 group">
            <Store className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span>Store</span>
          </Link>
        </div>
      </nav>

      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Search className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Search results for: <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">&quot;{query}&quot;</span>
          </h2>
        </div>
        <p className="text-gray-600 ml-13">Found {results.length} matching products</p>
      </div>

      {results.length === 0 ? (
        <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-blue-100/50">
          <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <SearchX className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">No products found</h3>
          <p className="text-gray-500 mb-6">We couldn&apos;t find any products matching your search for &quot;{query}&quot;</p>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Try:</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Using different keywords</li>
              <li>• Checking your spelling</li>
              <li>• Using more general terms</li>
            </ul>
          </div>
          <Link href="/store" className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium group mt-6">
            <Store className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span>Browse All Products</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {results.map(product => (
            <Link key={product._id} href={`/store/${product._id}`}>
              <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-blue-100/50 hover:border-blue-200/50 group hover:scale-[1.02]">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {product.title}
                </h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <Tag className="w-4 h-4 text-blue-500" />
                  <p className="text-sm text-gray-500 font-medium bg-blue-50 px-3 py-1 rounded-full">
                    {product.category}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <IndianRupee className="w-5 h-5 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-600">{product.price}</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200/50">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-yellow-600">{product.rating}/5</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
