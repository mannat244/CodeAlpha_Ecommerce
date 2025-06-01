'use client';

import React, { useState } from 'react';
import { useCartContext } from '@/app/lib/CartContext';
import { 
  User, MapPin, Building, Map, Navigation, Hash, 
  Tag, CreditCard, Package, IndianRupee, Gift,
  ShoppingBag, Truck, CheckCircle, AlertCircle, Copy
} from "lucide-react"

export default function CheckoutPage() {
  const { cart } = useCartContext();

  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod = Cash on Delivery
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
const finalAmount = totalAmount - discount;

// Fixed availableCoupons with proper type property
const availableCoupons = [
  { code: "WELCOME10", discount: 10, type: "percentage", description: "10% off on first order", minOrder: 500 },
  { code: "GADGET20", discount: 20, type: "fixed", description: "₹20 off on electronics", minOrder: 1000 },
  { code: "SAVE50", discount: 50, type: "fixed", description: "₹50 off on orders above ₹2000", minOrder: 2000 },
  { code: "FESTIVE15", discount: 15, type: "percentage", description: "15% off festive special", minOrder: 800 },
  { code: "NEWUSER25", discount: 25, type: "fixed", description: "₹25 off for new users", minOrder: 600 }
];

// The handleApplyCoupon function is correct as-is
const handleApplyCoupon = () => {
  const couponCode = coupon.trim().toUpperCase();
  const foundCoupon = availableCoupons.find(c => c.code === couponCode);
  
  if (foundCoupon) {
    if (totalAmount < foundCoupon.minOrder) {
      setDiscount(0);
      setMessage(`Minimum order of ₹${foundCoupon.minOrder} required for this coupon`);
      return;
    }
    
    let discountAmount;
    if (foundCoupon.type === "percentage") {
      discountAmount = (totalAmount * foundCoupon.discount) / 100;
    } else {
      discountAmount = foundCoupon.discount;
    }
    
    setDiscount(discountAmount);
    setMessage(`Coupon applied: ${foundCoupon.type === "percentage" ? foundCoupon.discount + "%" : "₹" + foundCoupon.discount} discount!`);
  } else {
    setDiscount(0);
    setMessage('Invalid coupon code');
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim() || !street.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
      setMessage('Please fill in all address fields.');
      return;
    }
    if (cart.length === 0) {
      setMessage('Your cart is empty.');
      return;
    }

    setLoading(true);
    setMessage('');

    const address = `${fullName}, ${street}, ${city}, ${state}, ${pincode}`;

    const orderData = {
      address,
      cart,
      coupon,
      discount,
      paymentMethod,
      totalAmount: finalAmount,
    };

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setMessage(`Order placed successfully! Order ID: ${data.orderId}`);
        if (data.ok) {
        window.location.href = `/store/order/${data.orderId}`;
} else {
  setMessage(data.error || 'Something went wrong');
}

      } else {
        setMessage(data.error || 'Failed to place order.');
      }
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
        Checkout
      </h1>
      <p className="text-gray-500">Complete your purchase at GadgetInSpot</p>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Shipping Address */}
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-blue-100/50 hover:shadow-blue-200/20 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Shipping Address
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center mb-2 text-sm font-semibold text-gray-700">
                  <User className="w-4 h-4 mr-2 text-blue-500" />
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:shadow-sm"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="flex items-center mb-2 text-sm font-semibold text-gray-700">
                  <Hash className="w-4 h-4 mr-2 text-blue-500" />
                  Pincode / ZIP Code
                </label>
                <input
                  id="pincode"
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:shadow-sm"
                  placeholder="Postal code"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center mb-2 text-sm font-semibold text-gray-700">
                  <Building className="w-4 h-4 mr-2 text-blue-500" />
                  Street Address
                </label>
                <input
                  id="street"
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:shadow-sm"
                  placeholder="Street, building, apartment"
                  required
                />
              </div>

              <div>
                <label className="flex items-center mb-2 text-sm font-semibold text-gray-700">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  City / Town
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:shadow-sm"
                  placeholder="City or town"
                  required
                />
              </div>

              <div>
                <label className="flex items-center mb-2 text-sm font-semibold text-gray-700">
                  <Map className="w-4 h-4 mr-2 text-blue-500" />
                  State / Province
                </label>
                <input
                  id="state"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:shadow-sm"
                  placeholder="State or province"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-blue-100/50 hover:shadow-blue-200/20 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Payment Method
              </h2>
            </div>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:shadow-sm"
            >
              <option value="cod">💵 Cash on Delivery</option>
              <option value="prepaid">💳 Prepaid (Mock Payment)</option>
            </select>
          </div>

          {/* Error Message */}
          {message && (
            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl animate-pulse">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-600 font-medium">{message}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-2xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl hover:shadow-blue-200/40 font-bold text-lg flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            <span>{loading ? 'Processing...' : 'Place Order'}</span>
            <CheckCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
          </button>
        </form>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Available Coupons */}
        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-blue-100/50 hover:shadow-blue-200/20 transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Available Coupons
            </h3>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {availableCoupons.map((couponItem, index) => (
              <div key={index} className="bg-gradient-to-r from-green-50 to-green-100/50 p-3 rounded-xl border border-green-200/50 group hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <code className="bg-green-200 px-2 py-1 rounded-lg text-green-800 font-bold text-sm">
                    {couponItem.code}
                  </code>
                  <button
                    type="button"
                    onClick={() => setCoupon(couponItem.code)}
                    className="text-green-600 hover:text-green-700 p-1 rounded hover:bg-green-200/50 transition-colors duration-200"
                    title="Copy coupon code"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-green-700 mb-1">{couponItem.description}</p>
                <p className="text-xs text-green-600">Min order: ₹{couponItem.minOrder}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coupon Application */}
        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-blue-100/50 hover:shadow-blue-200/20 transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-3">
              <Tag className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              Apply Coupon
            </h3>
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-grow border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:shadow-sm"
              placeholder="Enter coupon code"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-orange-200/40 font-semibold"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-blue-100/50 hover:shadow-blue-200/20 transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Order Summary
            </h3>
          </div>
          
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl border border-gray-200/50">
                <div>
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <IndianRupee className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="font-bold text-blue-600">
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal:</span>
                <div className="flex items-center">
                  <IndianRupee className="w-4 h-4 text-gray-600 mr-1" />
                  <span className="font-semibold">{totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-green-600">
                <span>Discount:</span>
                <div className="flex items-center">
                  <span className="mr-1">-</span>
                  <IndianRupee className="w-4 h-4 mr-1" />
                  <span className="font-semibold">{discount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Total:</span>
                <div className="flex items-center">
                  <IndianRupee className="w-5 h-5 text-blue-600 mr-1" />
                  <span className="text-xl font-bold text-blue-600">
                    {finalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
