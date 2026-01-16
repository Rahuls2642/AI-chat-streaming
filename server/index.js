import { WebSocketServer } from 'ws'
import { GoogleGenerativeAI } from '@google/generative-ai'
import 'dotenv/config'

const wss = new WebSocketServer({ port: 8080 })

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.on('message', async (message) => {
    const data = JSON.parse(message.toString())
    console.log('Received:', data)

    if (data.type !== 'user_message') return

    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
      })

      const stream = await model.generateContentStream({
        contents: [{ role: 'user', parts: [{ text: data.content }] }],
      })

      for await (const chunk of stream.stream) {
        const text =
          chunk.candidates?.[0]?.content?.parts?.[0]?.text

        if (text) {
          console.log('Sending chunk:', text)

          ws.send(
            JSON.stringify({
              type: 'chunk',
              content: text,
            })
          )
        }
      }

      console.log('Stream done')
      ws.send(JSON.stringify({ type: 'done' }))
    } catch (err) {
  console.error('Gemini error:', err)

  ws.send(
    JSON.stringify({
      type: 'error',
      message:
        err.status === 429
          ? 'AI quota exceeded. Please try again later.'
          : 'AI failed to respond.',
    })
  )
}

  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

console.log('Gemini WebSocket server running on ws://localhost:8080')
