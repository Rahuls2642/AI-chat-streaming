import type { Message } from '../types/message'
import ReactMarkdown from 'react-markdown'
type Props = {
  message: Message
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'
//copy clipboard
function copyToClipboard() {
  alert('copied')
  navigator.clipboard.writeText(message.content)
}
  return (
<div className={`flex ${isUser ? 'justify-end' : 'justify-start'} message-enter`}>
  <div
  className={`
    relative group
    max-w-[75%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl shadow-sm
    ${
      isUser
        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 rounded-bl-md'
        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 rounded-bl-md'
    }
  `}
>
 {message.role === 'ai' && message.content && (
  <button
    onClick={copyToClipboard}
    title="Copy"
    className="
      absolute top-3 right-0 text-zinc-400 hover:text-zinc-700 text-xs cursor-pointer
    "
  >
    📋
  </button>
)}

    
    {message.content ? (
      <div className="prose prose-sm max-w-none">
     <ReactMarkdown>
      {message.content}
    </ReactMarkdown>
  </div>
    ) : message.role === 'ai' ? (
      <div className="flex gap-1 items-center h-5">
        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    ) : null}

    <div className="mt-1 text-[10px] text-zinc-500 text-right">
      {new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </div>
  </div>
</div>

  )
}
