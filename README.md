# ✨ Sum-itt — Your AI-Powered Productivity Toolkit

Sum-itt is a smart, elegant, and AI-powered web application that helps students, professionals, and educators organize their learning content with ease. Whether it’s summarizing notes, transcribing lectures, generating topic-wise breakdowns, or building flashcards — Sum-itt is your one-stop toolset for productivity and learning.

---

## 📌 Problem Statement

> In the modern age of information overload, students and learners often struggle to extract and organize key insights from dense notes, audio lectures, video content, or documents. There is no centralized AI-powered space that seamlessly provides tools like summarization, transcription, note splitting, and content reorganization — all under one roof.

---

## 🚀 Project Objective

To build a **web-based suite of AI tools** that:
- Summarizes PDF and TXT notes
- Tracks expenses from bank statements
- Transcribes audio/video to notes
- Splits large notes topic-wise
- Enables chatbot interactions with notes
- Generates glossary and flashcards from uploaded notes

All powered by **Groq’s LLaMA-3**, **HuggingFace models**, and **Deepgram API**.

---

## 🛠️ Features Built

| Tool | Description |
|------|-------------|
| 📄 **PDF/Text Summarizer** | Upload notes and get concise summaries using HuggingFace’s BART |
| 📊 **Expense Tracker** | Upload `.csv` bank statements and see total spend, top categories, and monthly breakdown |
| 🎙️ **Sumscriptor** | Upload audio/video files and convert them into text using Deepgram transcription |
| 📚 **Topic-wise Notes Splitter** | Upload class notes and organize them into topic-wise structured sections |
| 🧠 **Talk-with-Notes** | Upload a PDF and interact with an AI chatbot referencing your notes |
| 🔍 **Glossary Builder** | Extract terms and definitions from uploaded notes in glossary format |
| 🧾 **Flashcard Generator** | Automatically generate question-answer pairs as flashcards for revision |
| 🤖 **AI Chatbot Helper** | Floating AI assistant to guide users toward the right tool for their use case |

---

## 🧑‍💻 Tech Stack

### 🌐 Frontend
- React.js + Tailwind CSS
- Framer Motion for transitions
- Custom dark UI with floating tool cards and popup modals

### ⚙️ Backend
- Node.js + Express.js
- File upload via Multer
- PDF parsing via `pdf-parse`
- CSV processing via `csv-parser`

### 🧠 AI & APIs
- HuggingFace (BART, Mistral) for summarization, notes splitting
- Deepgram API for transcription
- Groq (LLaMA-3) for chatbot interactions, glossary, and flashcards

### 🧱 Database
- SQLite planned for future (currently stateless and file-based)

---

## ⚗️ Development Timeline

1. **Idea Conceptualization**  
   - Started as a simple PDF summarizer
   - Gradually evolved into a full AI-powered productivity suite

2. **MVP Development**  
   - Implemented summarization and expense tracker
   - Designed clean dark-themed UI with Tailwind

3. **AI & NLP Integration**  
   - Integrated HuggingFace and Groq for language tasks
   - Added topic-splitting, glossary, chat-based tools

4. **Transcription Layer**  
   - Audio/Video file support via Deepgram
   - Accurate voice-to-notes conversion in seconds

5. **User Experience Enhancements**  
   - Floating cards with modals
   - Hero animations, tooltip info, loading indicators

---

## ⚠️ Challenges Faced

| Challenge | Solution |
|----------|----------|
| API key leakage during GitHub push | Switched to `.env` usage and removed sensitive commits |
| File upload failures on Netlify | Ensured correct `REACT_APP_API_URL` binding and backend deployment |
| Render backend crashes (500 errors) | Validated Content-Type headers and response handling |
| Slow processing for large files | Trimmed content before hitting APIs |
| HuggingFace rate limits | Migrated heavy tasks to Groq |
| File casing conflicts on Windows | Fixed consistent file imports (e.g., `FileUploadCard.jsx`) |
| .env issues not reflecting | Used `REACT_APP_` prefix and restarted builds after env updates |

---

## 🌍 Deployment

- **Frontend** hosted on: [https://sum-itt.netlify.app](https://sum-itt.netlify.app)
- **Backend** hosted on: [Render.com](https://render.com/)

---

## 🔮 Future Enhancements

- ✏️ Flashcard export (PDF/Anki format)
- 🧪 Notes quiz generator (MCQ & subjective)
- 🌐 Multi-language support for summarization
- 📱 Mobile app version using React Native
- 🧾 Save history/logs of user uploads
- 💾 Offline-compatible PWA support
- 🔐 OAuth login and user dashboard
- 📥 Dropbox / Google Drive integration

---

## 🤝 Contribution

Want to collaborate or suggest a feature?  
Feel free to open an issue or fork the repo.

---

## 📢 License

MIT © 2025 • Created with 💙 by [@lal5hivam](https://github.com/lal5hivam)

