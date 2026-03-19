// ── API Service ──────────────────────────────────────────────
// All calls go to your Spring Boot backend.
// Default: http://localhost:8080 (proxied via Vite in dev)
// Change BASE_URL below if your backend is on a different host.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

async function post(endpoint, body) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
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

// ── Endpoints (match these to your Spring Boot controller) ───

// POST /api/chat  { messages: [{role, content}] }  → { reply: "..." }
export const sendChat = (messages) =>
  post('/chat', { messages })

// POST /api/summarize  { text, mode }  → { summary: "..." }
export const summarizeText = (text, mode = 'standard') =>
  post('/summarize', { text, mode })

// POST /api/cite  { ...fields, format }  → { citation: "..." }
export const generateCitation = (fields, format) =>
  post('/cite', { ...fields, format })

// POST /api/flashcards  { text, count }  → { cards: [{q, a}] }
export const generateFlashcards = (text, count = 5) =>
  post('/flashcards', { text, count })

// POST /api/explain  { concept, level }  → { explanation: "..." }
export const explainConcept = (concept, level = 'simple') =>
  post('/explain', { concept, level })
