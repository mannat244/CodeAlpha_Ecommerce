'use client';
import { useState } from 'react';
import { User, UserPlus, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.ok) {
      setMessage('Success!');
      // redirect to dashboard or reload
      window.location.href ='/store'
    } else {
      setMessage(data.error || 'Something went wrong');
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100/50 hover:shadow-blue-200/20 transition-all duration-300">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {isLogin ? 'Welcome Back' : 'Join GadgetInSpot'}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {isLogin ? 'Sign in to your account' : 'Create your account today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="transform transition-all duration-300 ease-in-out">
              <label className="flex items-center mb-2 text-sm font-semibold text-gray-700">
                <UserPlus className="w-4 h-4 mr-2 text-blue-500" />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:shadow-sm"
                required
              />
            </div>
          )}

          <div>
            <label className="flex items-center mb-2 text-sm font-semibold text-gray-700">
              <Mail className="w-4 h-4 mr-2 text-blue-500" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:shadow-sm"
              required
            />
          </div>

          <div>
            <label className="flex items-center mb-2 text-sm font-semibold text-gray-700">
              <Lock className="w-4 h-4 mr-2 text-blue-500" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:shadow-sm"
              required
            />
          </div>

          {message && (
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-xl animate-pulse">
              <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
              <p className="text-sm text-red-600">{message}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-blue-200/40 font-semibold flex items-center justify-center space-x-2"
          >
            {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>
          
          <div className="mt-6">
            {isLogin ? (
              <p className="text-gray-600">
                Don&apos;t have an account?{' '}
                <button 
                  onClick={() => setIsLogin(false)} 
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p className="text-gray-600">
                Already have an account?{' '}
                <button 
                  onClick={() => setIsLogin(true)} 
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
