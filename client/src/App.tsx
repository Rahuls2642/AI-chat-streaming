import { useCallback, useEffect, useRef, useState } from 'react'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import type { Message } from './types/message'
import { useWebSocket } from './hooks/useWebSocket'

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>(
  () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
)

//Handele socket message
const handleSocketMessage = useCallback((data: any) => {
  if (data.type === 'error') {
  setError(data.message)
  setIsStreaming(false)

  setMessages(prev =>
    prev.filter((msg, i) => i !== prev.length - 1)
  )

  return
}


  if (data.type === 'chunk') {
    setMessages(prev => {
      const updated = [...prev]
      const lastIndex = updated.length - 1
      updated[lastIndex] = {
        ...updated[lastIndex],
        content: updated[lastIndex].content + data.content,
      }
      return updated
    })
  }

  if (data.type === 'done') {
    setIsStreaming(false)
  }
}, [])

 const { send, status } = useWebSocket(handleSocketMessage)

//Handle send message
 function handleSend(text: string) {
  if (status !== 'connected') {
    setError('Not connected to server. Please try again.')
    return
  }

  setError(null)

  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: 'user',
    content: text,
    timestamp: Date.now(),
  }

  const aiMessage: Message = {
    id: crypto.randomUUID(),
    role: 'ai',
    content: '',
    timestamp: Date.now(),
  }

  setMessages(prev => [...prev, userMessage, aiMessage])
  setIsStreaming(true)

  send({
    type: 'user_message',
    content: text,
  })
}
//Bonus
//Message persistence
const STORAGE_KEY = 'chat-messages'
const isFirstRender = useRef(true)

// LOAD once
useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    setMessages(JSON.parse(saved))
  }
}, [])

// SAVE after first render only
useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false
    return
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
}, [messages])


//claer chat
function clearChat() {
  setMessages([])
  setError(null)
  localStorage.removeItem(STORAGE_KEY)
}

//Toggle theme
useEffect(() => {
  localStorage.setItem('theme', theme)
  document.documentElement.classList.toggle('dark', theme === 'dark')
}, [theme])



//Auto scroll
 useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])


  return (
    <div className="h-screen flex flex-col bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">



  <header className="
    sticky top-0 z-10 px-5 py-3 flex items-center justify-between bg-zinc-50/80 backdrop-blur border-b border-zinc-200
  ">
    <span className="text-sm font-medium text-zinc-900">
      Chat
    </span>

    <div className="flex items-center gap-2 text-xs text-zinc-500">
      <span
        className={`h-2 w-2 rounded-full ${
          status === 'connected' ? 'bg-green-600' : 'bg-red-600'
        }`}
      />
      {status === 'connected' ? 'Online' : 'Offline'}
    </div>


    <button
  onClick={clearChat}
  className="text-sm text-red-600 hover:underline"
>
  Clear chat
</button>
<button
  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
  className="text-sm"
>
  {theme === 'light' ? '🌙' : '☀️'}
</button>
  </header>

 
  <main className="
    flex-1 overflow-y-auto  px-5 py-4 space-y-3
  ">
    {error && (
  <div className="mb-3 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
    {error}
  </div>
)}
    {messages.map(msg => (
      <ChatMessage key={msg.id} message={msg} />
    ))}
    <div ref={messagesEndRef} />
  </main>

  <footer className="
    sticky bottom-0 px-5 py-3 bg-zinc-50/80 backdrop-blur  border-t border-zinc-200
  ">
    <ChatInput onSend={handleSend} disabled={isStreaming} />
  </footer>
</div>

  )
}

export default App
