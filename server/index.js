import { WebSocketServer } from 'ws'
import Groq from 'groq-sdk'
import 'dotenv/config'

const wss = new WebSocketServer({ port: 8080 })
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.on('message', async (message) => {
    const data = JSON.parse(message.toString())
    if (data.type !== 'user_message') return

    try {
      const stream = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: data.content }],
        stream: true,
      })

      for await (const chunk of stream) {
        const content =
          chunk.choices?.[0]?.delta?.content

        if (content) {
          ws.send(
            JSON.stringify({
              type: 'chunk',
              content,
            })
          )
        }
      }

      ws.send(JSON.stringify({ type: 'done' }))
    } catch (err) {
      console.error('Groq error:', err)

      ws.send(
        JSON.stringify({
          type: 'error',
          message: 'AI service error. Please try again later.',
        })
      )
    }
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

console.log('Groq WebSocket server running on ws://localhost:8080')
