import type { Message } from '../types/message'

type Props = {
  message: Message
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'

  return (
<div className={`flex ${isUser ? 'justify-end' : 'justify-start'} message-enter`}>
  <div
    className={`
      max-w-[75%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl shadow-sm
      ${
        isUser
          ? 'bg-zinc-100 text-zinc-900 rounded-br-md'
          : 'bg-zinc-100 text-zinc-900 border border-zinc-200 rounded-bl-md'
      }
    `}
  >
    {message.content ? (
      message.content
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
