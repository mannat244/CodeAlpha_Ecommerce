'use client';

import { useState, useEffect } from 'react';

const statuses = ['pending', 'in delivery', 'out for delivery', 'completed'];

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
    description: '',
    rating: '',
  });
  const [addProductError, setAddProductError] = useState('');
  const [addProductSuccess, setAddProductSuccess] = useState('');

  // Check session on mount
  useEffect(() => {
    async function checkSession() {
      // Call orders endpoint to check auth
      try {
        const res = await fetch('/api/admin/orders');
        if (res.ok) {
          setLoggedIn(true);
          const data = await res.json();
          setOrders(data.orders);
        } else {
          setLoggedIn(false);
        }
      } catch {
        setLoggedIn(false);
      }
    }
    checkSession();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const errorData = await res.json();
        setLoginError(errorData.error || 'Login failed');
        setLoading(false);
        return;
      }
      setLoggedIn(true);
      setLoading(false);
      // Fetch orders
      const ordersRes = await fetch('/api/admin/orders');
      const ordersData = await ordersRes.json();
      setOrders(ordersData.orders);
    } catch {
      setLoginError('Network error');
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout');
    setLoggedIn(false);
    setOrders([]);
  }

  async function updateStatus(orderId, newStatus) {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        body: JSON.stringify({ orderId, status: newStatus }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to update status');
      const data = await res.json();
      // Update local order status
      setOrders((orders) =>
        orders.map((o) => (o._id === orderId ? { ...o, status: data.order.status } : o))
      );
    } catch (e) {
      alert('Error updating status');
    }
  }

  async function handleAddProduct(e) {
    e.preventDefault();
    setAddProductError('');
    setAddProductSuccess('');

    const { title, price, category, image, description, rating } = formData;
    if (!title || !price || !category) {
      setAddProductError('Title, price and category are required');
      return;
    }

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        body: JSON.stringify({
          title,
          price: parseFloat(price),
          category,
          image,
          description,
          rating: rating ? parseFloat(rating) : 0,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const error = await res.json();
        setAddProductError(error.error || 'Failed to add product');
        return;
      }
      setAddProductSuccess('Product added successfully!');
      setFormData({
        title: '',
        price: '',
        category: '',
        image: '',
        description: '',
        rating: '',
      });
    } catch {
      setAddProductError('Network error');
    }
  }

  if (!loggedIn) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
        <h1 className="text-2xl mb-4 font-semibold">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 border rounded"
            required
            autoComplete="username"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            required
            autoComplete="current-password"
          />
          {loginError && <p className="text-red-600">{loginError}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hi Admin</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Order ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Created At</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Update Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders && orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-2 text-sm">{order._id.slice(-6)}</td>
                  <td className="px-4 py-2 text-sm">{order.userId}</td>
                  <td className="px-4 py-2 text-sm capitalize">{order.status}</td>
                  <td className="px-4 py-2 text-sm">₹{order.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-2 text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="border rounded p-1"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border rounded p-6 max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full p-2 border rounded"
            required
            step="0.01"
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded"
            rows={3}
          />
          <input
            type="number"
            placeholder="Rating"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            className="w-full p-2 border rounded"
            step="0.1"
            min="0"
            max="5"
          />
          {addProductError && <p className="text-red-600">{addProductError}</p>}
          {addProductSuccess && <p className="text-green-600">{addProductSuccess}</p>}
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Product
          </button>
        </form>
      </section>
    </div>
  );
}
