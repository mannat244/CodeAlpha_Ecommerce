'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartContext } from '../lib/CartContext';
import {  ArrowRight, Gift, 
  Smartphone, Headphones, Laptop, Watch,
  ShoppingBag, TrendingUp, Award, Heart
} from "lucide-react"
import { Zap, ShoppingCart, User, LogOut, Search, Package, AlertCircle, Sparkles, Tag, Star } from 'lucide-react';

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { totalItems } = useCartContext();
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  // Filter products as user types (simple client-side filter)
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFiltered([]);
      setShowDropdown(false);
      return;
    }
    const filteredProducts = products.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(filteredProducts);
    setShowDropdown(filteredProducts.length > 0);
  }, [searchTerm, products]);

  // On selecting dropdown item, navigate and close dropdown
  const handleSelect = (id) => {
    setSearchTerm('');
    setShowDropdown(false);
    router.push(`/store/${id}`);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/store/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-100/30">
      {/* Navbar */}
     <nav className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-blue-100/50 p-4 mb-6 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span>GadgetInSpot</span>
          </h1>
          <div className="flex items-center space-x-6">
            <Link href="/store/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2 rounded-xl hover:bg-blue-50 group">
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold shadow-lg animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/store/profile" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2 rounded-xl hover:bg-blue-50 group" title="Profile">
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
        </div>
      </nav>

   {/* Search Bar */}
<div className="container mx-auto px-4 mb-5 relative max-w-[95vw]">
 {/* Background Effects matching hero */}


 <div className="relative z-10 py-6">
   <div className="relative">
     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
     <input
       type="text"
       placeholder="Search products..."
       value={searchTerm}
       onChange={e => setSearchTerm(e.target.value)}
       className="w-full pl-12 pr-20 py-4 border border-blue-200/50 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 bg-white/70 backdrop-blur-xl hover:shadow-xl hover:bg-white/80 text-gray-800 placeholder-gray-500 shadow-lg"
       onKeyDown={e => {
         if (e.key === 'Enter') handleSearch();
       }}
       onFocus={() => {
         if (filtered.length) setShowDropdown(true);
       }}
       onBlur={() => {
         // Delay hiding dropdown so onClick fires first
         setTimeout(() => setShowDropdown(false), 100);
       }}
     />
     <button
       onClick={handleSearch}
       className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl hover:shadow-blue-200/40 flex items-center group"
     >
       <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
     </button>
   </div>

   {/* Dropdown */}
   {showDropdown && (
     <div className="absolute bg-white/70 backdrop-blur-xl border border-blue-100/50 rounded-2xl mt-3 w-full max-h-60 overflow-auto z-20 shadow-2xl">
       {filtered.map(product => (
         <div
           key={product._id}
           className="p-4 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-purple-50/80 transition-all duration-200 border-b border-gray-100/50 last:border-b-0 flex items-center space-x-3 group"
           onClick={() => handleSelect(product._id)}
         >
           <Package className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform duration-200" />
           <span className="text-gray-700 font-medium group-hover:text-blue-700 transition-colors duration-200">{product.title}</span>
         </div>
       ))}
       {filtered.length === 0 && (
         <div className="p-6 text-gray-500 text-center flex items-center justify-center space-x-3">
           <AlertCircle className="w-5 h-5 text-gray-400" />
           <span className="font-medium">No results found</span>
         </div>
       )}
     </div>
   )}
 </div>
</div>
      {/* Hero Section */}
   

<section className="relative overflow-hidden py-20 mb-12 mx-4 rounded-3xl">
  {/* Animated Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-600/5"></div>
    {/* Floating Elements */}
    <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/20 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
    <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
  </div>

  <div className="relative max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Content */}
      <div className="text-center lg:text-left space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full border border-blue-200/50 shadow-lg">
          <Award className="w-4 h-4 text-blue-600 mr-2" />
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            #1 Tech Store in India
          </span>
          <Sparkles className="w-4 h-4 text-purple-500 ml-2 animate-pulse" />
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl lg:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Gadgets
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              That Inspire
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
            Discover cutting-edge technology and premium gadgets that transform your lifestyle. 
            <span className="font-semibold text-blue-600"> Quality guaranteed!</span>
          </p>
        </div>

        {/* Offer Tags */}
        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
          <div className="bg-gradient-to-r from-green-100 to-green-200 px-4 py-2 rounded-full border border-green-300/50 shadow-md">
            <div className="flex items-center space-x-2">
              <Gift className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">Free Shipping</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-100 to-orange-200 px-4 py-2 rounded-full border border-orange-300/50 shadow-md">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-bold text-orange-700">Up to 50% Off</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-100 to-purple-200 px-4 py-2 rounded-full border border-purple-300/50 shadow-md">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-bold text-purple-700">1 Year Warranty</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
 <button 
   onClick={() => document.getElementById('prd')?.scrollIntoView({ behavior: 'smooth' })}
   className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl hover:shadow-blue-200/40 font-bold text-lg flex items-center justify-center space-x-3 group"
 >
   <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
   <span>Shop Now</span>
   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
 </button>
 <button 
   onClick={() => document.getElementById('prd')?.scrollIntoView({ behavior: 'smooth' })}
   className="bg-white/80 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-2xl hover:bg-white hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 border border-gray-200/50 font-bold text-lg flex items-center justify-center space-x-3 group"
 >
   <Star className="w-6 h-6 text-yellow-500 group-hover:scale-110 transition-transform duration-200" />
   <span>View Deals</span>
 </button>
</div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200/50">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">50K+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">1000+</div>
            <div className="text-sm text-gray-600">Products</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">4.9★</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
        </div>
      </div>

      {/* Right Content - Product Showcase */}
      <div className="relative">
        {/* Main Product Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Featured Product */}
          <div className="col-span-2 bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-blue-100/50 hover:shadow-blue-200/20 transition-all duration-300 group">
            <div className="relative overflow-hidden rounded-2xl mb-4">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <img 
    src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311078890" 
    alt="MacBook Pro M3" 
    className="w-full h-full object-cover rounded-2xl"
  />
              </div>
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                50% OFF
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              MacBook Pro M3
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">₹89,999</span>
                <span className="text-sm text-gray-500 line-through">₹1,79,999</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold">4.9</span>
              </div>
            </div>
          </div>


          
          {/* Product Cards */}
          
          <div className="bg-white/60 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-blue-100/50 hover:shadow-blue-200/20 transition-all duration-300 group">
            <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-3">
           <img 
    src="https://www.designinfo.in/wp-content/uploads/2023/12/Apple-iPhone-15-Pro-Max-256GB-Natural-Titanium-1.webp" 
    alt="iPhone 15 Pro" 
    className="w-full h-full object-cover"
  />
            </div>
            <h4 className="font-semibold text-sm mb-1">iPhone 15 Pro</h4>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-600">₹1,34,999</span>
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                In Stock
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-blue-100/50 hover:shadow-blue-200/20 transition-all duration-300 group">
            <div className="aspect-square bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center mb-3">
              <img 
    src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1660803972361" 
    alt="Airpods Pro" 
    className="w-full h-full object-cover"
  />
            </div>
            <h4 className="font-semibold text-sm mb-1">AirPods Pro</h4>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-600">₹24,999</span>
              <div className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold">
                25% Off
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-blue-100/50 hover:shadow-blue-200/20 transition-all duration-300 group">
            <div className="aspect-square bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center mb-3">
          <img 
    src="https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/apple-watch-series-9.png" 
    alt="Apple Watch" 
    className="w-full h-full object-cover"
  />
            </div>
            <h4 className="font-semibold text-sm mb-1">Apple Watch</h4>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-600">₹45,999</span>
              <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                New
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-blue-100/50 hover:shadow-blue-200/20 transition-all duration-300 group">
            <div className="aspect-square bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl flex items-center justify-center mb-3">
            <img 
    src="https://i0.wp.com/www.rigvedapc.com/wp-content/uploads/2023/03/budget_4K_gaming_pc_1.jpg?fit=1000%2C1000&ssl=1" 
    alt="Gaming PC" 
    className="w-full h-full object-cover"
  />
            </div>
            <h4 className="font-semibold text-sm mb-1">Gaming Setup</h4>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-600">₹89,999</span>
              <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">
                Hot Deal
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce delay-300"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce delay-700"></div>
      </div>
    </div>
  </div>

  {/* Bottom Wave */}
  <div className="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12">
      <path d="M0 120L50 105C100 90 200 60 300 45C400 30 500 30 600 37.5C700 45 800 60 900 67.5C1000 75 1100 75 1150 75L1200 75V120H1150C1100 120 1000 120 900 120C800 120 700 120 600 120C500 120 400 120 300 120C200 120 100 120 50 120H0Z" fill="url(#gradient)" fillOpacity="0.1"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6"/>
          <stop offset="50%" stopColor="#8B5CF6"/>
          <stop offset="100%" stopColor="#3B82F6"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
</section>
    <div id='prd' className="relative py-16 mx-4">
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-2xl">
            <div className="absolute top-8 left-8 w-16 h-16 bg-blue-200/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-8 right-8 w-20 h-20 bg-purple-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative text-center max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    Our Latest
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Products
                </span>
            </h2>
        </div>
    </div>
      {/* Products Section */}
      <div  className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 pb-12">
        {products.map(product => (
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
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">{product.title}</h3>
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="w-4 h-4 text-blue-500" />
                <p className="text-sm text-gray-500 font-medium">{product.category}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-blue-600">₹{product.price}</p>
                <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-yellow-600">{product.rating}/5</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <footer className="bg-gray-900 text-white py-8 mt-16">
 <div className="container mx-auto px-4 text-center">
   <p className="text-gray-300">
     © 2025 • Made with 💖 by Mannat
   </p>
 </div>
</footer>
    </div>
  );
}
