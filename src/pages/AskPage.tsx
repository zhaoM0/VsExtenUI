import React, { useState, useRef, useEffect } from 'react'
import ChatInput from '../components/ChatInput'
import ChatMessage from '../components/ChatMessage'
import { useTheme } from '../contexts/ThemeContext'
import { MessageCircle } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const AskPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = async (message: string) => {
    if (message.trim() === '') return

    const newMessage: Message = { role: 'user', content: message }
    setMessages((prevMessages) => [...prevMessages, newMessage])

    const assistantMessage: Message = { role: 'assistant', content: '' }
    setMessages((prevMessages) => [...prevMessages, assistantMessage])

    await simulateStreamingResponse(message, assistantMessage)
  }

  const simulateStreamingResponse = async (message: string, assistantMessage: Message): Promise<void> => {
    const words = `This is a simulated response to: "${message}". It demonstrates markdown support and code highlighting:\n\n# Heading 1\n## Heading 2\n\nHere's some **bold** and *italic* text.\n\n\`\`\`python\ndef hello_world():\n    print("Hello, World!")\n\nhello_world()\n\`\`\``.split(' ')
    
    for (let i = 0; i < words.length; i++) {
      assistantMessage.content += words[i] + ' '
      setMessages((prevMessages) => [...prevMessages])
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }

  return (
    <div className="h-full flex flex-col">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <MessageCircle className={`w-16 h-16 mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            Welcome to Ask Page
          </h2>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
      <div className="p-4">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}

export default AskPage