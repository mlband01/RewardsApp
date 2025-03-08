'use client'

import { useState } from 'react'
import { User } from '../data/users'
import { FaSort, FaSortUp, FaSortDown, FaEye } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface UserTableProps {
  users: User[]
  onViewUser: (userId: string) => void
}

export default function UserTable({ users, onViewUser }: UserTableProps) {
  const [sortField, setSortField] = useState<keyof User>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10
  
  // Sort users
  const sortedUsers = [...users].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1
    } else {
      return a[sortField] < b[sortField] ? 1 : -1
    }
  })
  
  // Paginate users
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(users.length / usersPerPage)
  
  // Handle sort
  const handleSort = (field: keyof User) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  // Get sort icon
  const getSortIcon = (field: keyof User) => {
    if (field !== sortField) return <FaSort className="ml-1 text-gray-400" />
    return sortDirection === 'asc' ? 
      <FaSortUp className="ml-1 text-primary-600" /> : 
      <FaSortDown className="ml-1 text-primary-600" />
  }
  
  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  
  // Generate pagination buttons
  const paginationButtons = []
  for (let i = 1; i <= totalPages; i++) {
    // Only show 5 pages at a time with ellipsis
    if (
      i === 1 || 
      i === totalPages || 
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i 
              ? 'bg-primary-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      )
    } else if (
      (i === currentPage - 3 && currentPage > 3) || 
      (i === currentPage + 3 && currentPage < totalPages - 2)
    ) {
      paginationButtons.push(
        <span key={i} className="px-3 py-1 mx-1">...</span>
      )
    }
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th 
              className="py-3 px-4 text-left cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                Name {getSortIcon('name')}
              </div>
            </th>
            <th 
              className="py-3 px-4 text-left cursor-pointer"
              onClick={() => handleSort('email')}
            >
              <div className="flex items-center">
                Email {getSortIcon('email')}
              </div>
            </th>
            <th 
              className="py-3 px-4 text-left cursor-pointer"
              onClick={() => handleSort('totalVisits')}
            >
              <div className="flex items-center">
                Visits {getSortIcon('totalVisits')}
              </div>
            </th>
            <th 
              className="py-3 px-4 text-left cursor-pointer"
              onClick={() => handleSort('totalStars')}
            >
              <div className="flex items-center">
                Stars {getSortIcon('totalStars')}
              </div>
            </th>
            <th 
              className="py-3 px-4 text-left cursor-pointer"
              onClick={() => handleSort('tier')}
            >
              <div className="flex items-center">
                Tier {getSortIcon('tier')}
              </div>
            </th>
            <th 
              className="py-3 px-4 text-left cursor-pointer"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center">
                Status {getSortIcon('status')}
              </div>
            </th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.totalVisits}</td>
              <td className="py-3 px-4">{user.totalStars}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.tier === 'bronze' ? 'bg-yellow-100 text-yellow-800' :
                  user.tier === 'silver' ? 'bg-gray-200 text-gray-800' :
                  user.tier === 'gold' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-purple-200 text-purple-800'
                }`}>
                  {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </td>
              <td className="py-3 px-4">
                <button 
                  onClick={() => onViewUser(user.id)}
                  className="text-primary-600 hover:text-primary-800"
                  title="View User Details"
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-4">
        <div className="text-sm text-gray-700">
          Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, users.length)} of {users.length} users
        </div>
        <div className="flex">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>
          {paginationButtons}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
} 