'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface AdminProtectedRouteProps {
  children: React.ReactNode
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated and is an admin
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }
    
    if (status === 'authenticated' && !session?.user?.isAdmin) {
      router.push('/dashboard')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    )
  }

  if (status === 'authenticated' && !session?.user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">You don't have permission to access this page. <button onClick={() => router.push('/login')} className="text-primary-600">Login as admin</button></p>
      </div>
    )
  }

  return <>{children}</>
} 