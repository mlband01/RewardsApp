'use client'

import { useState, useEffect, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaUser, FaLock, FaUserShield } from 'react-icons/fa'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loginAttempted, setLoginAttempted] = useState(false)

  useEffect(() => {
    // Check for error in URL
    const errorParam = searchParams?.get('error')
    if (errorParam) {
      if (errorParam === 'CredentialsSignin') {
        setError('Invalid email or password. Please try again.')
      } else if (errorParam === 'AccessDenied') {
        setError('Access denied. You do not have permission to access this resource.')
      } else {
        setError(`Authentication error: ${errorParam}`)
      }
    }
  }, [searchParams])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }
    
    try {
      setError('')
      setIsLoading(true)
      setLoginAttempted(true)
      
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        isAdmin: isAdmin.toString(),
      })
      
      if (result?.error) {
        setError(result.error === 'CredentialsSignin' 
          ? 'Invalid email or password. Please try again.' 
          : result.error)
        setIsLoading(false)
      } else if (result?.ok) {
        // Successful login
        router.push(isAdmin ? '/admin' : '/dashboard')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <div className="flex justify-center">
            <span className="text-yellow-500 text-5xl">★</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Restaurant Rewards
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to track your visits and earn rewards
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex items-center border border-gray-300 rounded-t-md">
              <span className="pl-3 pr-2 text-gray-500">
                <FaUser />
              </span>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-b-md">
              <span className="pl-3 pr-2 text-gray-500">
                <FaLock />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="admin-login"
              name="admin-login"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              disabled={isLoading}
            />
            <label htmlFor="admin-login" className="ml-2 block text-sm text-gray-900 flex items-center">
              <FaUserShield className="mr-1" /> Admin Login
            </label>
            <div className="ml-auto">
              <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={isLoading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isAdmin ? <FaUserShield /> : <FaUser />}
              </span>
              {isLoading ? 'Signing in...' : isAdmin ? 'Sign in as Admin' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account? <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link>
          </p>
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Demo credentials:</h3>
          <div className="mt-2 text-xs text-gray-500">
            <p>User - Email: user@example.com, Password: password123</p>
            <p>Admin - Email: admin@example.com, Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
} 