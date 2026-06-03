// ── API Service ──────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL || ''

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || err?.error || `Request failed (${res.status})`)
  }

  return res.json()
}

function post(endpoint, body) {
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

function get(endpoint) {
  return request(endpoint, {
    method: 'GET',
  })
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

export const login = (email, password) =>
  post('/auth/login', { email, password })

export const registerUser = (name, email, password) =>
  post('/auth/register', { name, email, password })

export const logout = () =>
  post('/auth/logout', {})

export const me = () =>
  get('/auth/me')

export const askRag = async (question) => {
  const res = await fetch(`${API_URL}/api/ask/rag`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ question }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || err?.error || `Request failed (${res.status})`)
  }

  return res.json()
}

