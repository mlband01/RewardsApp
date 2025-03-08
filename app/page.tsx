'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaStar } from 'react-icons/fa'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in (this would be replaced with actual auth check)
    try {
      const isLoggedIn = localStorage.getItem('user')
      
      if (!isLoggedIn) {
        router.push('/login')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error checking authentication:', error)
      router.push('/login')
    }
  }, [router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <FaStar className="h-16 w-16 text-secondary-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Restaurant Rewards</h1>
        <div className="flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="h-3 w-3 bg-secondary-500 rounded-full"></div>
            <div className="h-3 w-3 bg-secondary-500 rounded-full"></div>
            <div className="h-3 w-3 bg-secondary-500 rounded-full"></div>
          </div>
          <p className="text-2xl ml-4">Loading...</p>
        </div>
      </div>
    </main>
  )
} 