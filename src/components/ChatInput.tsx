import React, { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('')
  const { theme } = useTheme()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const scrollHeight = textareaRef.current.scrollHeight
      const lineHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight)
      const maxHeight = lineHeight * 15
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`
      
      if (scrollHeight > maxHeight) {
        textareaRef.current.scrollTop = scrollHeight - maxHeight
      }
    }
  }, [message])

  return (
    <div className={`flex items-center p-1 rounded-md ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
      <textarea
        ref={textareaRef}
        className={`flex-1 px-2 py-1 text-xs resize-none overflow-y-auto focus:outline-none ${
          theme === 'dark'
            ? 'bg-gray-800 text-white'
            : 'bg-white text-gray-900'
        } scrollbar-hide`}
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        rows={1}
        style={{ maxHeight: '15em' }}
      />
      <button
        className="ml-1 p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
        onClick={handleSubmit}
      >
        <Send className="w-3 h-3" />
      </button>
    </div>
  )
}

export default ChatInput