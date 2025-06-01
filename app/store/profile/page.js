'use client';
import { 
  Zap,
  User,
  ArrowLeft,
  Mail,
  Package,
  ShoppingBag,
  Receipt,
  Calendar,
  ChevronRight,
  IndianRupee,
  CreditCard
} from "lucide-react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/profile');
        if (!res.ok) throw new Error('Failed to fetch profile data');
        const data = await res.json();
        setOrders(data.orders || []);
        setUser(data.user || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading your profile...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30 p-6">
      {/* ✅ NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-blue-100/50 p-4 mb-8 flex justify-between items-center rounded-2xl">
        <Link href="/store" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all duration-200 flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span>GadgetInSpot</span>
        </Link>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-gray-700">
            <User className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Profile</span>
          </div>
          <button
            onClick={() => router.push('/store')}
            className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200 flex items-center space-x-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span>Home</span>
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        {/* ✅ USER INFO */}
        {user && (
          <div className="mb-8 bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-blue-100/50">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h1>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ ORDER LIST */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-100/50 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Your Orders</h2>
          </div>
          
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">No orders yet</h3>
              <p className="text-gray-500 mb-6">You haven't placed any orders. Start shopping to see your orders here!</p>
              <Link href="/store" className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium group">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Start Shopping</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div
                  key={order._id}
                  className="bg-white/50 backdrop-blur-sm border border-blue-100/30 rounded-xl p-5 cursor-pointer hover:bg-blue-50/50 hover:border-blue-200/50 transition-all duration-200 group"
                  onClick={() => router.push(`/store/order/${order._id}`)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                        <Receipt className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                          Order #{order._id.slice(-6)}
                        </span>
                        <div className="flex items-center space-x-1 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        order.status === 'delivered' ? 'bg-green-500' :
                        order.status === 'shipped' ? 'bg-blue-500' :
                        order.status === 'processing' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}></div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <span className="capitalize font-semibold text-gray-800">{order.status}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IndianRupee className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-700">Total:</span>
                      <span className="font-bold text-blue-600">₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-700">Payment:</span>
                      <span className="font-semibold text-gray-800">{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
