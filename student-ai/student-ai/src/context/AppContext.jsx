import { createContext, useContext, useState, useEffect } from 'react'

const Ctx = createContext(null)

export function AppProvider({ children }) {
  const [notes, setNotes]   = useState(() => JSON.parse(localStorage.getItem('sa_notes') || '[]'))
  const [chatHistory, setChatHistory] = useState([])
  const [baseUrl, setBaseUrl]     = useState(() => localStorage.getItem('sa_base_url') || '')

  useEffect(() => {
    localStorage.setItem('sa_notes', JSON.stringify(notes))
  }, [notes])

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
    <Ctx.Provider value={{ notes, saveNote, deleteNote, chatHistory, setChatHistory, baseUrl, updateBaseUrl }}>
      {children}
    </Ctx.Provider>
  )
}

export const useApp = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('Must be inside AppProvider')
  return c
}
