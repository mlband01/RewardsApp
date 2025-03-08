'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaStar, FaSignOutAlt, FaSearch, FaFilter } from 'react-icons/fa'
import RestaurantCard from '../components/RestaurantCard'
import { restaurants } from '../data/restaurants'
import ErrorBoundary from '../components/ErrorBoundary'
import { useSession, signOut } from 'next-auth/react'

interface User {
  name: string
  email: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  // Get unique categories for filter
  const categories = ['All', ...Array.from(new Set(restaurants.map(r => r.category)))]

  // Filter restaurants based on search term and category
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'All' || restaurant.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <FaStar className="h-8 w-8 text-secondary-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Restaurant Rewards</h1>
          </div>
          <div className="flex items-center">
            {session?.user?.isAdmin && (
              <button
                onClick={() => router.push('/admin')}
                className="mr-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Admin Dashboard
              </button>
            )}
            <div className="flex items-center">
              <span className="mr-4 text-sm font-medium text-gray-700">
                Welcome, {session?.user?.name || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="relative mb-4 md:mb-0 md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <FaFilter className="h-5 w-5 text-gray-400 mr-2" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Restaurant Grid */}
        <ErrorBoundary>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </ErrorBoundary>
        
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No restaurants found matching your search criteria.</p>
          </div>
        )}
      </main>
    </div>
  )
} 