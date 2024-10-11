import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const AgentPage: React.FC = () => {
  const { theme } = useTheme()

  return (
    <div className={`h-full flex items-center justify-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <h2 className="text-2xl font-semibold">Agent Page (Coming Soon)</h2>
    </div>
  )
}

export default AgentPage