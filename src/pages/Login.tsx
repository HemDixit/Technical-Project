import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email, password });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-[#111111]/90 backdrop-blur-xl p-8 rounded-2xl border border-[#222222] shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#22c55e] rounded-2xl mx-auto mb-4 flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <LogIn size={32} className="text-black" />
            </div>
            <h2 className="text-3xl font-bold neon-text">Welcome Back</h2>
            <p className="text-gray-400 mt-2">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg py-3 px-10 text-gray-200 focus:outline-none focus:border-[#22c55e] transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg py-3 px-10 text-gray-200 focus:outline-none focus:border-[#22c55e] transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox bg-[#1a1a1a] border-[#333333] text-[#22c55e] rounded" />
                <span className="ml-2 text-gray-300">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-[#22c55e] hover:text-[#16a34a] transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#22c55e] text-black py-3 px-4 rounded-lg font-medium hover:bg-[#16a34a] transition-colors duration-300 flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#22c55e] hover:text-[#16a34a] transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;