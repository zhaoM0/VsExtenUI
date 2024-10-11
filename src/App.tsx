import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from 'react-router-dom'
import { MessageCircle, User, Settings, Sun, Moon, Plus } from 'lucide-react'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { ProfileProvider } from './contexts/ProfileContext'
import AskPage from './pages/AskPage'
import AgentPage from './pages/AgentPage'
import ProfilePage from './pages/ProfilePage'

function AppContent() {
  const { theme, toggleTheme } = useTheme()
  const [resetKey, setResetKey] = useState(0)
  const navigate = useNavigate()

  const resetAskPage = () => {
    setResetKey(prevKey => prevKey + 1)
    navigate('/')
  }

  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="mx-auto px-2 flex items-center justify-between h-10">
          <nav className="flex-1">
            <ul className="flex items-center h-full space-x-1">
              <li>
                <NavLink to="/" className={({ isActive }) => 
                  `flex items-center px-2 py-1 text-xs rounded-md ${isActive 
                    ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900') 
                    : (theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')}`
                }>
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Ask
                </NavLink>
              </li>
              <li>
                <NavLink to="/agent" className={({ isActive }) => 
                  `flex items-center px-2 py-1 text-xs rounded-md ${isActive 
                    ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900') 
                    : (theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')}`
                }>
                  <User className="w-3 h-3 mr-1" />
                  Agent
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={({ isActive }) => 
                  `flex items-center px-2 py-1 text-xs rounded-md ${isActive 
                    ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900') 
                    : (theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')}`
                }>
                  <Settings className="w-3 h-3 mr-1" />
                  Profile
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-1">
            <button
              onClick={resetAskPage}
              className={`p-1 rounded-md text-xs ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white`}
            >
              <Plus className="w-3 h-3" />
            </button>
            <button
              onClick={toggleTheme}
              className={`p-1 rounded-md text-xs ${theme === 'dark' ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
            >
              {theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <div className="h-full px-2">
          <Routes>
            <Route path="/" element={<AskPage key={resetKey} />} />
            <Route path="/agent" element={<AgentPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <Router>
          <AppContent />
        </Router>
      </ProfileProvider>
    </ThemeProvider>
  )
}

export default App