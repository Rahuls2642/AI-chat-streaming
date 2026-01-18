# AI Chat Application (Real-time Streaming)

A real-time AI chat application built with React and WebSockets that streams AI responses chunk-by-chunk.  
The app focuses on correct state management, streaming UX, error handling, and a clean, modern interface.

---

##  Project Overview

This project implements a ChatGPT-like interface where users can send messages and receive AI responses in real time.  
Instead of waiting for a full response, the AI reply is streamed progressively, providing immediate feedback and a better user experience.

The application is frontend-focused, with a lightweight WebSocket backend used to stream AI responses.

---

##  Tech Stack

### Frontend
- **React** (with Hooks)
- **TypeScript**
- **Vite**
- **Tailwind CSS (v4)**
- **react-markdown** (for rendering AI responses)

### Backend
- **Node.js**
- **WebSocket (`ws`)**
- **Groq LLM API** (used for streaming responses)

---

## ⚙️ Setup Instructions

### 1. Clone the repository
.env file in server
GROQ_API_KEY=your_groq_api_key_here
```bash

git clone https://github.com/Rahuls2642/AI-chat-streaming

cd client
npm install
npm run dev

cd server
npm install
node index.js
```

##  Features Implemented

### Core Functionality
- [x] Real-time AI response streaming (chunk-by-chunk)
- [x] WebSocket-based communication
- [x] Message storage in React state
- [x] Correct message ordering
- [x] Loading state handling

### UI & UX
- [x] Typing indicator animation
- [x] Input disabled during AI response
- [x] Connection status indicator
- [x] Error state handling

### Bonus Features
- [x] Message persistence using localStorage
- [x] Clear chat functionality
- [x] Copy AI response to clipboard
- [x] Markdown rendering for AI messages
- [x] Dark / Light mode toggle


⏱ Time Spent

Approx. 10–12 hours

Breakdown:

Core functionality & streaming: ~4 hours

WebSocket handling & error states: ~2 hours

UI/UX improvements & dark mode: ~2 hours

Persistence, debugging & polish: ~2–3 hours

## Demo Video

🔗 Demo Video Link:
https://youtu.be/juLfKVzPIPA?si=yoVctuK3Hu_mmn6a

## Notes

The app is designed to be LLM-agnostic.

Switching between providers (Gemini, Groq, etc.) only affects the backend logic.

React 18 StrictMode behavior was handled to avoid state overwrite during persistence.



