import { useEffect, useRef, useState } from 'react'

type Status = 'connected' | 'disconnected'

export function useWebSocket(onMessage: (data: any) => void) {
  const wsRef = useRef<WebSocket | null>(null)
  const [status, setStatus] = useState<Status>('disconnected')

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    wsRef.current = ws

    ws.onopen = () => setStatus('connected')
    ws.onclose = () => setStatus('disconnected')
    ws.onerror = () => setStatus('disconnected')

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      onMessage(data)
    }

    return () => {
      ws.close()
    }
  }, [onMessage])

  function send(data: any) {
  if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
    return false
  }

  wsRef.current.send(JSON.stringify(data))
  return true
}


  return { send, status }
}
