'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaUsers, FaSearch, FaFilter, FaChartBar, FaSignOutAlt, FaStar, FaUserPlus } from 'react-icons/fa'
import { 
  users, 
  User, 
  searchUsers, 
  filterUsersByStatus, 
  filterUsersByTier, 
  getUserById 
} from '../data/users'
import UserTable from '../components/UserTable'
import UserDetail from '../components/UserDetail'
import ErrorBoundary from '../components/ErrorBoundary'
import { useSession, signOut } from 'next-auth/react'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive' | 'all'>('all')
  const [tierFilter, setTierFilter] = useState<'bronze' | 'silver' | 'gold' | 'platinum' | 'all'>('all')
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalVisits: 0,
    totalStars: 0,
    bronzeUsers: 0,
    silverUsers: 0,
    goldUsers: 0,
    platinumUsers: 0
  })
  const router = useRouter()

  // Check if user is admin
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }
    
    if (status === 'authenticated' && !session?.user?.isAdmin) {
      router.push('/dashboard')
    }
  }, [status, session, router])

  // Calculate stats
  useEffect(() => {
    const activeUsers = users.filter(user => user.status === 'active')
    const totalVisits = users.reduce((sum, user) => sum + user.totalVisits, 0)
    const totalStars = users.reduce((sum, user) => sum + user.totalStars, 0)
    const bronzeUsers = users.filter(user => user.tier === 'bronze').length
    const silverUsers = users.filter(user => user.tier === 'silver').length
    const goldUsers = users.filter(user => user.tier === 'gold').length
    const platinumUsers = users.filter(user => user.tier === 'platinum').length

    setStats({
      totalUsers: users.length,
      activeUsers: activeUsers.length,
      totalVisits,
      totalStars,
      bronzeUsers,
      silverUsers,
      goldUsers,
      platinumUsers
    })
  }, [])

  // Filter users when search or filters change
  useEffect(() => {
    let result = users

    // Apply search
    if (searchTerm) {
      result = searchUsers(searchTerm)
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter)
    }

    // Apply tier filter
    if (tierFilter !== 'all') {
      result = result.filter(user => user.tier === tierFilter)
    }

    setFilteredUsers(result)
  }, [searchTerm, statusFilter, tierFilter])

  const handleViewUser = (userId: string) => {
    const user = getUserById(userId)
    if (user) {
      setSelectedUser(user)
    }
  }

  const handleCloseUserDetail = () => {
    setSelectedUser(null)
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  const handleAddUser = () => {
    router.push('/admin/add-user')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <FaUsers className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                <FaStar className="h-5 w-5" />
                <span className="sr-only">Client View</span>
              </button>
              <button
                onClick={handleAddUser}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <FaUserPlus className="mr-2" />
                Add User
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                <FaSignOutAlt className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                  <FaUsers className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Active Users</span>
                  <span className="text-sm font-medium text-green-600">{stats.activeUsers}</span>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-secondary-100 text-secondary-600">
                  <FaChartBar className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Visits</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalVisits}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Stars</span>
                  <span className="text-sm font-medium text-secondary-600">{stats.totalStars}</span>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <FaUsers className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Bronze/Silver Users</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.bronzeUsers + stats.silverUsers}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Bronze</span>
                  <span className="text-sm font-medium text-yellow-600">{stats.bronzeUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Silver</span>
                  <span className="text-sm font-medium text-gray-600">{stats.silverUsers}</span>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <FaUsers className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Gold/Platinum Users</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.goldUsers + stats.platinumUsers}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Gold</span>
                  <span className="text-sm font-medium text-yellow-600">{stats.goldUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Platinum</span>
                  <span className="text-sm font-medium text-purple-600">{stats.platinumUsers}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input-field pl-10"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaFilter className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="input-field pl-10 pr-8 appearance-none"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'active' | 'inactive' | 'all')}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaFilter className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="input-field pl-10 pr-8 appearance-none"
                    value={tierFilter}
                    onChange={(e) => setTierFilter(e.target.value as 'bronze' | 'silver' | 'gold' | 'platinum' | 'all')}
                  >
                    <option value="all">All Tiers</option>
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
              <p className="text-sm text-gray-600">
                {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
              </p>
            </div>
            <UserTable users={filteredUsers} onViewUser={handleViewUser} />
          </div>
        </main>

        {/* User Detail Modal */}
        {selectedUser && (
          <UserDetail user={selectedUser} onClose={handleCloseUserDetail} />
        )}
      </div>
    </ErrorBoundary>
  )
} 