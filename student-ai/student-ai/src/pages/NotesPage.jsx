import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Trash2, StickyNote, Plus } from 'lucide-react'
import CopyButton from '../components/common/CopyButton'
import s from './NotesPage.module.css'

const TAG_COLORS = {
  general: '#9a8f78', chat: '#f0b429', summary: '#2dd4bf',
  explain: '#a78bfa', citation: '#fb7185', flashcard: '#4ade80',
}

export default function NotesPage() {
  const { notes, saveNote, deleteNote } = useApp()
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('all')

  const tags = ['all', ...new Set(notes.map(n => n.tag))]
  const filtered = notes
    .filter(n => activeTag === 'all' || n.tag === activeTag)
    .filter(n => n.content.toLowerCase().includes(search.toLowerCase()))

  const add = () => {
    if (!input.trim()) return
    saveNote(input.trim(), 'general')
    setInput('')
  }

  return (
    <div className={s.page}>
      <div className={s.addBox}>
        <textarea className={s.addInput} rows={3}
          placeholder="Jot a quick note…"
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) add() }} />
        <div className={s.addFooter}>
          <span className={s.hint}>Ctrl+Enter to save</span>
          <button className={s.addBtn} onClick={add} disabled={!input.trim()}>
            <Plus size={12} /> Add Note
          </button>
        </div>
      </div>

      <div className={s.toolbar}>
        <input className={s.search} placeholder="Search notes…"
          value={search} onChange={e => setSearch(e.target.value)} />
        <div className={s.tags}>
          {tags.map(t => (
            <button key={t}
              className={`${s.tag} ${activeTag === t ? s.tagActive : ''}`}
              onClick={() => setActiveTag(t)}
              style={activeTag === t && t !== 'all' ? { borderColor: TAG_COLORS[t], color: TAG_COLORS[t] } : {}}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className={s.empty}>
          <StickyNote size={30} />
          <p>{notes.length === 0 ? 'No notes yet. Save AI responses or add your own.' : 'No notes match.'}</p>
        </div>
      )}

      <div className={s.grid}>
        {filtered.map(n => (
          <div key={n.id} className={s.card}>
            <div className={s.cardTag} style={{ background: `${TAG_COLORS[n.tag] || '#9a8f78'}18`, color: TAG_COLORS[n.tag] || '#9a8f78' }}>
              {n.tag}
            </div>
            <p className={s.cardBody}>{n.content}</p>
            <div className={s.cardFooter}>
              <span className={s.cardDate}>{n.date} · {n.time}</span>
              <div className={s.cardActions}>
                <CopyButton text={n.content} />
                <button className={s.del} onClick={() => deleteNote(n.id)}><Trash2 size={12}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
