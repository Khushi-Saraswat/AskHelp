// ── API Service ──────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL;

async function post(endpoint, body) {

  console.log(API_URL,"api_url")
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || err?.error || `Request failed (${res.status})`)
  }
  return res.json()
}

// ── Endpoints ───────────────────────────────────────────────

// POST /api/chat  { message: "..." }
export const sendChat = (message) =>
  post('/api/chat', { message })

// POST /api/summarize  { text, mode }
export const summarizeText = (text, mode) =>
  post('/api/summarize', { text, mode })

// POST /api/cite  { ...fields, format }
export const generateCitation = (fields, format) =>
  post('/api/cite', { ...fields, format })

// POST /api/flashcards  { text, count }
export const generateFlashcards = (text, count = 5) =>
  post('/api/flashcards', { text, count })

// POST /api/explain  { concept, level }
export const explainConcept = (concept, level) =>
  post('/api/explain', { concept, level })

export const askRag = async (question) => {
  const res = await fetch(`${API_URL}/api/ask/rag`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  })

  return res.json()
}

