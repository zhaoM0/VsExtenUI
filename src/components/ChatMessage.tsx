import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { User, Bot, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant'
    content: string
  }
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user'
  const { theme } = useTheme()
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null)

  const handleFeedback = (type: 'like' | 'dislike') => {
    setFeedback(type)
    // Here you would typically send this feedback to your backend
    console.log(`User ${type}d the message:`, message.content)
  }

  return (
    <div className={`mb-2 rounded-md overflow-hidden ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } shadow-sm`}>
      <div className={`flex items-center p-1 ${
        isUser
          ? theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'
          : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        <div className={`rounded-full p-1 mr-1 ${
          isUser ? 'bg-blue-500' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'
        }`}>
          {isUser ? <User className="w-3 h-3 text-white" /> : <Bot className="w-3 h-3 text-white" />}
        </div>
        <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {isUser ? 'User' : 'Assistant'}
        </span>
      </div>
      <div className={`p-2 text-xs ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={theme === 'dark' ? tomorrow : oneLight}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ fontSize: '0.75rem' }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={`${className} ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded px-1 text-xs`} {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
      {!isUser && (
        <div className="flex space-x-1 p-1 justify-end">
          <button
            onClick={() => handleFeedback('like')}
            className={`p-1 rounded ${feedback === 'like' ? 'bg-green-500' : 'bg-gray-200'} ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}
          >
            <ThumbsUp className={`w-2 h-2 ${feedback === 'like' ? 'text-white' : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          <button
            onClick={() => handleFeedback('dislike')}
            className={`p-1 rounded ${feedback === 'dislike' ? 'bg-red-500' : 'bg-gray-200'} ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}
          >
            <ThumbsDown className={`w-2 h-2 ${feedback === 'dislike' ? 'text-white' : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ChatMessage