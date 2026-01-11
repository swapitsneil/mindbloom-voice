# 🎙️ MindBloom Voice (New Voice Version)

MindBloom Voice adds **hands-free emotional support** using speech.

- 🎤 Speak instead of typing using browser speech recognition  
- 🔊 AI responses are read aloud using text-to-speech  
- 🌿 Designed for moments of overwhelm, fatigue, or anxiety  
- 🧠 Safety-first, non-therapy philosophy  
- 🆓 Uses only **free browser APIs** (no paid voice services)

This makes MindBloom accessible even when users are too stressed to type.

---

## 🧠 Problem

Students today face:

- Academic pressure and deadlines  
- Career uncertainty and job loss  
- Financial stress  
- Emotional burnout  
- Limited access to counsellors (cost, wait time, hesitation)

Most students don’t need therapy immediately —  
they need **someone to listen, calm them down, and guide them gently**.

---

## 🌼 Solution - MindBloom Voice Companion

MindBloom Voice Companion provides:

- 🤍 A calm AI chat companion available 24/7 with voice input & voice out
- 🧘 Short, grounding coping steps (breathing, reflection, journaling)  
- 📓 A private journaling space tied to calendar dates  
- 😊 Daily mood tracking  
- 🔒 100% private — everything stays on the user’s device  
- 🚨 Gentle safety escalation when distress is detected  

No pressure.  
No diagnosis.  
No judgment.

---

## ✨ Key Features

### 💬 AI Chat Companion
- Supportive, human-like responses
- Progressive conversation (no repetitive replies)
- Session-based memory (resets on refresh)
- Powered by **free OpenRouter AI model**
- Optional **voice input & voice output** for hands-free support

### 📓 Smart Journaling
- Write entries for **any past date**
- Calendar highlights saved days
- Edit and revisit old thoughts easily
- Perfect for self-reflection and emotional clarity

### 😊 Mood Tracking
- Track how you feel daily
- Mood is linked with journal entries
- Helps recognize emotional patterns over time

### 🛡️ Safety-First Design
- Not therapy, not medical advice
- Encourages real-world support when needed
- Calm, student-friendly tone throughout

### Voice & Accessibility
- Browser SpeechRecognition API
- Browser SpeechSynthesis API
- No third-party paid voice services

---

## 🖼️ Screenshots

![Image](https://github.com/user-attachments/assets/2f999c9b-21ce-4fd5-bc78-0bf7d4a9b6af)

<img width="2824" height="1398" alt="Image" src="https://github.com/user-attachments/assets/85a9bc4c-98d3-4c75-ae55-b62d8a2025ba" />

<img width="2818" height="1388" alt="Image" src="https://github.com/user-attachments/assets/641097be-9a15-4e4a-a034-18e32c7cc344" />

<img width="2800" height="1362" alt="Image" src="https://github.com/user-attachments/assets/1be68d42-c06e-4afe-af67-9cb7da85ca14" />

<img width="2848" height="1390" alt="Image" src="https://github.com/user-attachments/assets/e640b5b6-1c14-4a49-948f-b81cd07ae0f6" />

---

## Deployment

Vercel deployment - https://mindbloom-voice.vercel.app/

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

### AI & Backend
- OpenRouter API
- model: xiaomi/mimo-v2-flash:free
- Server-side Node.js runtime
- In-memory session handling (no database)

### Storage
- Browser LocalStorage only
- No backend database
- No authentication

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- OpenRouter API key or any API key

### Installation

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Then add your API key (gemini, openai or any) to `.env.local`

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── app/                  ✅ App Router used correctly
│   ├── api/chat/          ✅ Server-only AI logic 
│   ├── chat/              ✅ Chat UI (voice + text)
│   ├── journal/           ✅ Journaling feature isolated
│   ├── mood/              ✅ Mood tracking isolated
│   └── page.tsx           ✅ Landing page
├── components/shared/     ✅ Reusable layout components
├── lib/
│   ├── hooks/useChat.ts   ✅ Single source of chat truth
│   └── storage/           ✅ LocalStorage abstraction (clean)
├── agents/
│   └── ai-agents.ts       ✅ AI safety & behaviour logic
└── types/
    └── index.ts           ✅ Centralized types

```

## 🔒 Privacy & Security

- **Local Storage Only**: All chat history, mood logs, and journal entries are stored locally in your browser
- **Session-Based**: Backend memory clears on server restart
- **No Medical Advice**: This is emotional support, not therapy
- **Emergency Resources**: Clear disclaimers and crisis helpline information

## ⚠️ Important Disclaimer

**MindBloom Voice Companion is not therapy or a replacement for professional help.** If you are in crisis or danger, please reach out to emergency services or a mental health professional immediately.

## 🎯 Project Goals

This project was built for a hackathon with the following objectives:

- ✅ Create a safe, judgment-free space for emotional expression
- ✅ Implement AI-powered supportive conversations
- ✅ Provide mood tracking and journaling capabilities
- ✅ Ensure complete user privacy through local storage
- ✅ Build with modern, accessible UI/UX


## 🤝 Contributing

This is a hackathon project, but feedback and suggestions are welcome!

---
## 🙌 Author
Built with care by Swapnil Nicolson Dadel for students who just need a moment of peace 🌱

**Built with love and care for student mental health** 💜
