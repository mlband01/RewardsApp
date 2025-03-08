'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ImageWithFallback from './ImageWithFallback'

export interface Restaurant {
  id: string
  name: string
  description: string
  image: string
  stars: number
  totalStars: number
  category: string
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const router = useRouter()
  
  // Calculate progress percentage
  const progress = (restaurant.stars / 50) * 100
  
  return (
    <motion.div 
      className="card cursor-pointer overflow-hidden"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => router.push(`/restaurant/${restaurant.id}`)}
    >
      <div className="relative h-40 w-full">
        <ImageWithFallback 
          src={restaurant.image} 
          alt={restaurant.name}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <span className="text-xs font-medium text-white bg-secondary-500 px-2 py-1 rounded-full">
            {restaurant.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{restaurant.description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">
              {restaurant.stars} stars earned
            </span>
            <span className="text-xs text-gray-500">
              {restaurant.totalStars} total visits
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-secondary-500 h-2 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 