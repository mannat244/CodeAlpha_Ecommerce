'use client';
import Link from 'next/link';
import { useCartContext } from '../lib/CartContext';
import { Zap, ShoppingCart, User, LogOut } from 'lucide-react';
export default function Navbar() {
  const { totalItems } = useCartContext();

  return (
  <nav className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-blue-100/50 p-4 flex justify-between sticky top-0 z-50 transition-all duration-300">
      <Link href="/store" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all duration-200 flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span>GadgetInSpot</span>
      </Link>
      <div className="flex items-center space-x-6">
        <Link href="/store/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2 rounded-xl hover:bg-blue-50 group">
          <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold shadow-lg animate-pulse">
              {totalItems}
            </span>
          )}
        </Link>
        <Link href="/profile" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2 rounded-xl hover:bg-blue-50 group" title="Profile">
          <User className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
        </Link>

         <button
  onClick={async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  }}
  className="text-sm cursor-pointer text-red-500 hover:text-red-600 font-medium px-3 py-2 rounded-xl hover:bg-red-50 transition-all duration-200 flex items-center space-x-1 group"
>
  <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
  <span>Logout</span>
</button>
      </div>
    </nav>
  );
}
