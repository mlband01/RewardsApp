'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaStar, FaArrowLeft, FaCheck, FaLock } from 'react-icons/fa'
import { getRestaurantById, rewardTiers } from '../../data/restaurants'
import { motion } from 'framer-motion'
import ImageWithFallback from '../../components/ImageWithFallback'

interface PageProps {
  params: {
    id: string
  }
}

export default function RestaurantPage({ params }: PageProps) {
  const [userStars, setUserStars] = useState(0)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  const restaurant = getRestaurantById(params.id)
  
  useEffect(() => {
    // In a real app, you would fetch the user's stars for this specific restaurant
    // For now, we'll use the restaurant's stars from our mock data
    if (restaurant) {
      setUserStars(restaurant.stars)
      setLoading(false)
    } else {
      // Restaurant not found, redirect to dashboard
      router.push('/dashboard')
    }
  }, [restaurant, router])
  
  const handleAddVisit = () => {
    if (!restaurant) return
    
    // In a real app, you would update this in a database
    // For now, we'll just update the local state
    setUserStars(prev => prev + 1)
  }
  
  if (loading || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Restaurant Image */}
      <div className="relative h-64 md:h-80">
        <ImageWithFallback
          src={restaurant.image}
          alt={restaurant.name}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <button 
            onClick={() => router.push('/dashboard')}
            className="absolute top-4 left-4 bg-white bg-opacity-80 p-2 rounded-full"
          >
            <FaArrowLeft className="text-gray-800" />
          </button>
          <div className="text-white">
            <span className="text-xs font-medium bg-secondary-500 px-2 py-1 rounded-full">
              {restaurant.category}
            </span>
            <h1 className="text-3xl font-bold mt-2">{restaurant.name}</h1>
            <p className="mt-2 text-gray-200">{restaurant.description}</p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stars Summary */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-secondary-100 p-3 rounded-full">
                <FaStar className="h-8 w-8 text-secondary-500" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">Your Stars</h2>
                <p className="text-3xl font-bold text-gray-900">{userStars} <span className="text-sm text-gray-500">/ 50</span></p>
              </div>
            </div>
            <button 
              onClick={handleAddVisit}
              className="btn-primary"
            >
              Record Visit (+1 Star)
            </button>
          </div>
        </div>
        
        {/* Rewards Tiers */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Rewards Tiers</h2>
          
          <div className="space-y-8">
            {rewardTiers.map((tier, index) => {
              const isUnlocked = userStars >= tier.stars
              const progress = Math.min(100, (userStars / tier.stars) * 100)
              
              return (
                <motion.div 
                  key={index}
                  className={`p-4 rounded-lg border ${isUnlocked ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full ${isUnlocked ? 'bg-green-100' : 'bg-gray-100'} mr-4`}>
                      {isUnlocked ? (
                        <FaCheck className="h-5 w-5 text-green-600" />
                      ) : (
                        <FaLock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">{tier.reward}</h3>
                        <span className="text-sm font-medium bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full">
                          {tier.stars} stars
                        </span>
                      </div>
                      <p className="mt-1 text-gray-600">{tier.description}</p>
                      
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${isUnlocked ? 'bg-green-500' : 'bg-secondary-500'}`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            {isUnlocked ? 'Unlocked!' : `${userStars}/${tier.stars} stars`}
                          </span>
                          {isUnlocked && (
                            <span className="text-xs text-green-600 font-medium">Ready to use</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Visit {restaurant.name} to earn more stars and unlock rewards!
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 