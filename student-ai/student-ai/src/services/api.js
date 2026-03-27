// ── API Service ──────────────────────────────────────────────
// All calls go to your Spring Boot backend.
// Default: http://localhost:8080 (proxied via Vite in dev)
// Change BASE_URL below if your backend is on a different host.

export const BASE_URL = "http://localhost:8080"

console.log(BASE_URL+"BASE_URL");

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

// POST /api/chat  { message: "..." }  → { reply: "..." }
export const sendChat = (message) =>
  post('/api/chat', { message })

// POST /api/summarize  { text, mode }  → { summary: "..." }
export const summarizeText = (text, mode) =>
  post('/api/summarize', { text, mode })

// POST /api/cite  { ...fields, format }  → { citation: "..." }
export const generateCitation = (fields, format) =>
  post('/api/cite', { ...fields, format })

// POST /api/flashcards  { text, count }  → { cards: [{q, a}] }
export const generateFlashcards = (text, count = 5) =>
  post('/api/flashcards', { text, count })

// POST /api/explain  { concept, level }  → { explanation: "..." }
export const explainConcept = (concept, level) =>
  post('/api/explain', { concept, level })
