# AskHelp – AI Study Assistant Web App

AskHelp is an AI-powered web application that helps students, researchers, and developers summarize, explain, chat, generate flashcards, create citations, and save notes using Gemini AI + Spring Boot backend.

The project also includes a Basic RAG (Retrieval Augmented Generation) implementation using Java 8 Stream filtering, with plans to integrate real vector-based RAG in future versions.

---

# ✨ Features

## 🤖 AI Chat Assistant

* Ask questions about provided content
* Context-aware responses using Gemini AI
* Structured JSON response handling
* Clean UI built with React + Tailwind

Example:

* Explain this paragraph
* What does this mean?
* Summarize in bullet points

---

## 📝 AI Summarization

* Paste or input any text
* Generate concise summary
* Fast response using Gemini API
* Supports long content

---

## 📖 Explain Feature

* Simplifies complex content
* Beginner-friendly explanations
* AI-generated examples

Example:

* Explain in simple terms
* Explain with example
* Explain step by step

---

## 🧠 Flashcard Generator

* Converts text into flashcards
* Question → Answer format
* Useful for revision & interviews
* Structured response using Gemini

---

## 📌 Citation Generator

Automatically extracts and generates:

* Title
* URL
* Published date (if available)
* Reference format

Useful for:

* Assignments
* Research
* Blogs

---

## 💾 My Notes

* Save notes manually
* Store AI generated summaries
* Local storage support
* Persistent data

---

## 📋 Copy to Clipboard

* Copy AI responses
* Copy flashcards
* Copy summaries
* One-click support

---

# 🧠 Basic RAG Implementation

This project includes Basic RAG (Retrieval Augmented Generation)

Current Implementation:

* Context filtering using Java 8 Streams
* Relevant content selection
* Prompt construction
* Gemini API call
* Structured JSON output

Flow:

User Question
→ Filter relevant context (Java Streams)
→ Build prompt
→ Gemini API
→ Structured Response
→ UI Display

Benefits:

* Better accuracy
* Reduced hallucination
* Context-aware answers
* Faster responses

---

# 🔮 Future RAG Improvements

Planned upgrades:

* Vector Database
* Embeddings
* Semantic search
* Multi-document RAG
* Conversation memory
* Real retrieval pipeline

---

# 🏗 Tech Stack

Frontend:

* ReactJS
* App Context API
* Tailwind CSS
* Axios
* Component-based architecture

Backend:

* Spring Boot
* Spring AI
* Gemini API
* DTO architecture
* Structured JSON response

AI Features:

* Gemini AI
* Prompt engineering
* Basic RAG filtering
* Flashcard generation
* Summarization
* Explanation
* Chat assistant

---

# ⚙️ Architecture

React Web App
↓
Spring Boot API
↓
Basic RAG Filtering (Java Streams)
↓
Gemini API
↓
Structured Response
↓
Frontend UI

---

# 🚀 How to Run

1. Clone Repository

git clone [https://github.com/Khushi-Saraswat/AskHelp](https://github.com/Khushi-Saraswat/AskHelp)

2. Run Backend

cd backend
mvn spring-boot:run

3. Run Frontend

cd frontend
npm install
npm run dev

4. Add Gemini API Key

application.properties

gemini.api.key=YOUR_API_KEY

---

# 🧩 Project Highlights

* AI Chat
* Summarization
* Explain feature
* Flashcard generator
* Citation generator
* Notes storage
* Basic RAG implementation
* React Context state management
* Tailwind UI
* Spring Boot backend
* Gemini structured responses

---

# 🔥 Upcoming Features

* Real RAG with vector DB
* Upload PDF support
* Multi-page summarization
* Export notes
* AI study mode


---

# 🙌 Made By

Khushi Saraswat

GitHub:
[https://github.com/Khushi-Saraswat](https://github.com/Khushi-Saraswat)
