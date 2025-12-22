'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
// import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Bento
            </h1>
          </Link>
          <p className="text-muted mt-2">Sign in to your account</p>
        </div>

        <div className="bg-secondary rounded-2xl p-8 space-y-4">
          <button
            // onClick={() => signIn('google', { callbackUrl: '/editor' })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-widget-bg rounded-xl font-medium hover:bg-opacity-80 transition-colors border border-border"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            // onClick={() => signIn('twitter', { callbackUrl: '/editor' })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-widget-bg rounded-xl font-medium hover:bg-opacity-80 transition-colors border border-border"
          >
            <span className="text-lg">𝕏</span>
            Continue with Twitter
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-secondary text-muted">or</span>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-widget-bg rounded-xl border border-border focus:border-primary outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Continue with Email
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            By signing in, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>

        <p className="text-center text-sm text-muted mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
