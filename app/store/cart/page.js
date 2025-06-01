'use client';

import React from 'react';
import Link from 'next/link';
import { useCartContext } from '@/app/lib/CartContext';
import { 
  Zap,
  ArrowLeft,
  LogOut,
  ShoppingCart,
  Store,
  IndianRupee,
  Minus,
  Plus,
  Trash2,
  CreditCard,
  ArrowRight
} from "lucide-react";

export default function CartPage() {

const { cart, updateQuantity, removeFromCart } = useCartContext();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30 p-6">
      <nav className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-blue-100/50 p-4 mb-8 flex justify-between items-center rounded-2xl">
        <Link href="/store" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all duration-200 flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span>GadgetInSpot</span>
        </Link>
        <Link href="/store" className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200 flex items-center space-x-2 group">
          <ArrowLeft className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          <span>Continue Shopping</span>
        </Link>
      
      </nav>

      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <ShoppingCart className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Your Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-blue-100/50">
          <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
          <Link href="/store" className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium group">
            <Store className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span>Start Shopping</span>
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-blue-100/50">
          <div className="space-y-6">
            {cart.map(item => (
              <div key={item._id} className="flex items-center border-b border-blue-100/30 pb-6 last:border-b-0 last:pb-0 group">
                <div className="relative overflow-hidden rounded-xl mr-6">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="flex-1">
                  <h2 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">{item.title}</h2>
                  <div className="flex items-center space-x-1 mb-3">
                    <IndianRupee className="w-4 h-4 text-blue-600" />
                    <p className="text-blue-600 font-semibold text-lg">{item.price}</p>
                  </div>

                  <div className="flex items-center space-x-3 bg-gray-50/50 backdrop-blur-sm p-2 rounded-xl border border-gray-200/50 w-fit">
                    <button
                      onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                      className="bg-white/80 backdrop-blur-sm p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-sm border border-gray-200/50 group"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-200" />
                    </button>
                    <span className="font-semibold text-gray-800 min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="bg-white/80 backdrop-blur-sm p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-sm border border-gray-200/50 group"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-200" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-600 font-medium px-3 py-2 rounded-xl hover:bg-red-50 transition-all duration-200 flex items-center space-x-2 group ml-6"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Remove</span>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-blue-100/30">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-6 rounded-2xl border border-blue-200/30 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-700">Total Amount:</span>
                <div className="flex items-center space-x-1">
                  <IndianRupee className="w-6 h-6 text-blue-600" />
                  <span className="text-3xl font-bold text-blue-600">
                    {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => window.location.href="/store/checkout"}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl hover:shadow-blue-200/40 font-bold text-lg flex items-center justify-center space-x-3 group"
            >
              <CreditCard className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
