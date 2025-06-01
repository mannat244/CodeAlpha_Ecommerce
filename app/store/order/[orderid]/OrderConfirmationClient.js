'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderConfirmationClient({ orderId }) {
  const router = useRouter();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order/${orderId}`);
        if (!res.ok) throw new Error('Failed to fetch order');
        const data = await res.json();
        setOrder(data.order);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Immediately redirect after 3 seconds
  useEffect(() => {
    if (!loading && !error) {
      const timeout = setTimeout(() => {
        router.push('/store');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [loading, error, router]);

  if (loading) return <p className="p-6">Loading order details...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Order Successfully Placed!</h1>

      <div className="bg-white shadow rounded p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        <p><strong>Shipping Address:</strong> {order.address}</p>

        <h3 className="mt-4 font-semibold">Items:</h3>
        <ul>
          {order.items.map(item => (
            <li key={item.productId} className="border-b py-2 flex justify-between">
              <span>{item.title} x {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 font-bold text-right text-lg">Total Paid: ₹{order.totalAmount.toFixed(2)}</p>
      </div>

      <p className="mt-6 text-gray-700">
        Redirecting to store in 3 seconds...
      </p>
    </div>
  );
}
