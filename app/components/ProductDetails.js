'use client';
import { useCartContext } from '../lib/CartContext';
import { Tag, IndianRupee, Star, FileText, ShoppingCart, Plus } from 'lucide-react';
export default function ProductDetail({ product }) {
  const { addToCart } = useCartContext();

  return (
  <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-2 gap-12 bg-white/70 backdrop-blur-xl shadow-2xl mt-8 rounded-3xl border border-blue-100/50 hover:shadow-blue-200/20 transition-all duration-300">
      <div className="relative group">
        <div className="absolute h-fit  inset-0 bg-gradient-to-br from-blue-100/20 to-blue-200/20 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
        <img 
          src={product.image} 
          alt={product.title} 
          className="relative w-full h-96 object-cover rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-blue-100/30" 
        />
        <div className="absolute h-fit inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent leading-tight">
            {product.title}
          </h1>
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="w-5 h-5 text-blue-500" />
            <p className="text-gray-500 font-medium bg-blue-50 px-3 py-1 rounded-full text-sm">
              {product.category}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 rounded-2xl border border-blue-200/30">
          <div className="flex items-center space-x-2">
            <IndianRupee className="w-6 h-6 text-blue-600" />
            <p className="text-3xl font-bold text-blue-600">{product.price}</p>
          </div>
          <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded-xl border border-yellow-200/50">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="text-lg font-bold text-yellow-600">{product.rating}/5</span>
          </div>
        </div>

        <div className="bg-gray-50/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50">
          <div className="flex items-center space-x-2 mb-3">
            <FileText className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Description</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl hover:shadow-blue-200/40 font-bold text-lg flex items-center justify-center space-x-3 group"
        >
          <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
          <span>Add to Cart</span>
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}
