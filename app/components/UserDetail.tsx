'use client'

import { User } from '../data/users'
import { FaTimes, FaStar, FaCalendarAlt, FaPhoneAlt, FaEnvelope, FaStore, FaUserCircle } from 'react-icons/fa'

interface UserDetailProps {
  user: User
  onClose: () => void
}

export default function UserDetail({ user, onClose }: UserDetailProps) {
  // Calculate percentage to next tier
  const getTierProgress = () => {
    let currentTierMin = 0
    let nextTierMin = 0
    
    switch (user.tier) {
      case 'bronze':
        currentTierMin = 0
        nextTierMin = 10
        break
      case 'silver':
        currentTierMin = 10
        nextTierMin = 25
        break
      case 'gold':
        currentTierMin = 25
        nextTierMin = 50
        break
      case 'platinum':
        currentTierMin = 50
        nextTierMin = 100 // Max tier
        break
    }
    
    const progress = user.tier === 'platinum' 
      ? 100 
      : Math.min(100, ((user.totalStars - currentTierMin) / (nextTierMin - currentTierMin)) * 100)
    
    const starsToNextTier = user.tier === 'platinum' 
      ? 0 
      : nextTierMin - user.totalStars
    
    return { progress, starsToNextTier, nextTier: getNextTier(user.tier) }
  }
  
  // Get next tier
  const getNextTier = (currentTier: string) => {
    switch (currentTier) {
      case 'bronze': return 'Silver'
      case 'silver': return 'Gold'
      case 'gold': return 'Platinum'
      default: return 'Max Tier'
    }
  }
  
  const { progress, starsToNextTier, nextTier } = getTierProgress()
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center mb-6">
            <div className="bg-primary-100 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
              <FaUserCircle className="h-16 w-16 text-primary-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <div className="flex items-center mt-1">
                <FaEnvelope className="text-gray-500 mr-2" />
                <span className="text-gray-600">{user.email}</span>
              </div>
              <div className="flex items-center mt-1">
                <FaPhoneAlt className="text-gray-500 mr-2" />
                <span className="text-gray-600">{user.phone}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaStar className="text-secondary-500 mr-2" />
                <h4 className="text-lg font-semibold">Rewards Status</h4>
              </div>
              <div className="mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.tier === 'bronze' ? 'bg-yellow-100 text-yellow-800' :
                  user.tier === 'silver' ? 'bg-gray-200 text-gray-800' :
                  user.tier === 'gold' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-purple-200 text-purple-800'
                }`}>
                  {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)} Tier
                </span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress to {nextTier}</span>
                <span>{user.totalStars} stars</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div 
                  className="bg-secondary-500 h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              {user.tier !== 'platinum' && (
                <p className="text-xs text-gray-500">
                  {starsToNextTier} more stars needed for {nextTier} tier
                </p>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="text-primary-500 mr-2" />
                <h4 className="text-lg font-semibold">Visit History</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Visits:</span>
                  <span className="font-semibold">{user.totalVisits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Stars:</span>
                  <span className="font-semibold">{user.totalStars}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Join Date:</span>
                  <span className="font-semibold">{user.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Visit:</span>
                  <span className="font-semibold">{user.lastVisit}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <FaStore className="text-primary-500 mr-2" />
              <h4 className="text-lg font-semibold">Favorite Restaurant</h4>
            </div>
            <p className="text-gray-700">{user.favoriteRestaurant}</p>
          </div>
          
          <div className="flex justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">
                Edit User
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                View Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 