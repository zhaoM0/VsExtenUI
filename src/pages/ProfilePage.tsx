import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useProfile } from '../contexts/ProfileContext'

const ProfilePage: React.FC = () => {
  const { theme } = useTheme()
  const { profile, updateProfile } = useProfile()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateProfile({ ...profile, [name]: value })
  }

  return (
    <div className={`h-full p-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apiKey" className="block mb-2">API Key</label>
          <input
            type="password"
            id="apiKey"
            name="apiKey"
            value={profile.apiKey}
            onChange={handleInputChange}
            className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage