'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaUserShield, FaStar, FaExchangeAlt } from 'react-icons/fa'
import { useSession } from 'next-auth/react'

export default function AdminNavBar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  
  // Don't show on login or register pages
  if (pathname === '/login' || pathname === '/register') return null
  
  // Only show if user is admin
  if (!session?.user?.isAdmin) return null
  
  const isAdminPage = pathname?.startsWith('/admin')
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
        <Link 
          href={isAdminPage ? '/dashboard' : '/admin'}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
        >
          <FaExchangeAlt className="mr-2" />
          <span>Switch to {isAdminPage ? 'Client View' : 'Admin View'}</span>
        </Link>
      </div>
    </div>
  )
} 