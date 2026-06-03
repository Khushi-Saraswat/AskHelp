import { createContext, useContext, useState, useEffect } from 'react'
import { me, logout } from '../services/api'

const Ctx = createContext(null)

function normalizeUser(data) {
  if (!data) return null
  return typeof data === 'object' ? data : { id: data }
}

export function AppProvider({ children }) {
  const [notes, setNotes]   = useState(() => JSON.parse(localStorage.getItem('sa_notes') || '[]'))
  const [chatHistory, setChatHistory] = useState([])
  const [baseUrl, setBaseUrl]     = useState(() => localStorage.getItem('sa_base_url') || '')
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    localStorage.setItem('sa_notes', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await me()
        setUser(normalizeUser(data))
      } catch (err) {
        setUser(null)
      } finally {
        setAuthLoading(false)
      }
    }

    loadUser()
  }, [])

  const refreshUser = async () => {
    try {
      const data = await me()
      const updated = normalizeUser(data)
      setUser(updated)
      return updated
    } catch (err) {
      setUser(null)
      throw err
    }
  }

  const logoutUser = async () => {
    try {
      await logout()
    } finally {
      setUser(null)
    }
  }

  const saveNote = (content, tag = 'general') => {
    setNotes(p => [{
      id: Date.now(),
      content,
      tag,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }, ...p])
  }

  const deleteNote = (id) => setNotes(p => p.filter(n => n.id !== id))

  const updateBaseUrl = (url) => {
    setBaseUrl(url)
    localStorage.setItem('sa_base_url', url)
  }

  return (
    <Ctx.Provider value={{
      notes,
      saveNote,
      deleteNote,
      chatHistory,
      setChatHistory,
      baseUrl,
      updateBaseUrl,
      user,
      authLoading,
      setUser,
      refreshUser,
      logoutUser,
    }}>
      {children}
    </Ctx.Provider>
  )
}

export const useApp = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('Must be inside AppProvider')
  return c
}
