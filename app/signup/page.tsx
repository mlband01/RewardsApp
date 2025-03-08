'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the register page
    router.replace('/register')
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Redirecting to registration page...</h2>
        <p className="mt-2 text-gray-600">Please wait a moment.</p>
      </div>
    </div>
  )
} 