import React, { createContext, useState, useContext, useEffect } from 'react'

interface Profile {
  name: string
  email: string
  apiKey: string
}

interface ProfileContextType {
  profile: Profile
  updateProfile: (newProfile: Profile) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    apiKey: '',
  })

  useEffect(() => {
    const savedProfile = localStorage.getItem('profile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile))
  }, [profile])

  const updateProfile = (newProfile: Profile) => {
    setProfile(newProfile)
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}