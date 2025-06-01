import connectDB from '../../lib/db';
import Product from '../../models/Products';
import Link from 'next/link';
import ProductDetail from '../../components/ProductDetails';
import Navbar from '@/app/components/Navbar';
import { 
  Sparkles,
  Tag,
  IndianRupee,
  Star
} from "lucide-react";
import Image from 'next/image';

export default async function ProductPage({ params }) {
  const { id } = await params;

  await connectDB();
const rawProduct = await Product.findById(id).lean();
const product = {
  ...rawProduct,
  _id: rawProduct._id.toString(),
};
const rawSimilar = await Product.find({
  category: product.category,
  _id: { $ne: rawProduct._id }
})
  .limit(4)
  .lean();

const similar = rawSimilar.map(p => ({
  ...p,
  _id: p._id.toString(),
}));


  if (!product) {
    return <div className="p-10 text-center text-red-500">Product not found</div>;
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30">
      {/* Navbar */}
      <Navbar/>

      {/* Product Detail */}
      <ProductDetail product={product} />

      {/* Similar Products */}
      <div className="max-w-6xl mx-auto p-6 mt-12">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Similar Products
            </h2>
          </div>
          <p className="text-gray-600 ml-11">Discover more products you might love</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {similar.map(item => (
            <Link href={`/store/${item._id}`} key={item._id}>
              <div className="bg-white/70 backdrop-blur-xl p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-blue-100/50 hover:border-blue-200/50 group hover:scale-[1.02]">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300" 
                    width={500}
                    height={500}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-sm font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {item.title}
                </h3>
                
                <div className="flex items-center space-x-1 mb-2">
                  <Tag className="w-3 h-3 text-blue-500" />
                  <p className="text-xs text-gray-500 font-medium bg-blue-50 px-2 py-1 rounded-full">
                    {item.category}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <IndianRupee className="w-4 h-4 text-blue-600" />
                    <p className="text-lg font-bold text-blue-600">{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200/50">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-semibold text-yellow-600">{item.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
