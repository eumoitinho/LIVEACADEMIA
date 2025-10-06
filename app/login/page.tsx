import React from 'react';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/5 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-white/90">Login</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-white/70">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-white/70">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-sm font-semibold text-black bg-emerald-400 rounded-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-white/70">
          Ainda não treina com a gente?{' '}
          <Link href="/planos" className="text-emerald-400 hover:underline">
            Conheça nossos planos
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

export const dynamic = 'force-dynamic'
