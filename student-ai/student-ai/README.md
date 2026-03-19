# StudyAI — Student Research Assistant

React + Vite frontend for your Spring Boot + Gemini backend.

## Project Structure

```
src/
├── components/
│   ├── common/           Button, CopyButton, ErrorBanner, ResultCard
│   └── layout/           Sidebar, Header
├── context/
│   └── AppContext.jsx     Global state (notes, backend URL)
├── hooks/
│   └── useApi.js          Reusable loading/error wrapper
├── pages/
│   ├── ChatPage.jsx        Conversation with full history
│   ├── SummarizePage.jsx   Brief / Standard / Detailed modes
│   ├── ExplainPage.jsx     Explain at 4 levels (child → expert)
│   ├── FlashcardsPage.jsx  Flip cards with 3D animation
│   ├── CitePage.jsx        APA / MLA / Chicago / Harvard / IEEE
│   ├── NotesPage.jsx       Tagged notes grid with search
│   └── SettingsPage.jsx    Backend URL config + endpoint docs
├── services/
│   └── api.js              All fetch calls in one file
└── styles/
    └── global.css          Warm academic dark theme
```

## Quick Start

```bash
npm install
npm run dev        # runs on http://localhost:3000
```

Vite proxies `/api/*` → `http://localhost:8080` automatically in dev.

## Spring Boot Endpoints Required

| Method | Path             | Request Body                          | Response           |
|--------|------------------|---------------------------------------|--------------------|
| POST   | /api/chat        | `{ messages: [{role, content}] }`     | `{ reply }`        |
| POST   | /api/summarize   | `{ text, mode }`                      | `{ summary }`      |
| POST   | /api/explain     | `{ concept, level }`                  | `{ explanation }`  |
| POST   | /api/flashcards  | `{ text, count }`                     | `{ cards:[{q,a}] }`|
| POST   | /api/cite        | `{ title, author, year, …, format }`  | `{ citation }`     |

## Production Build

```bash
npm run build      # outputs to /dist
```

Deploy `/dist` to Netlify, Vercel, or serve from Spring Boot's `static/` folder.
