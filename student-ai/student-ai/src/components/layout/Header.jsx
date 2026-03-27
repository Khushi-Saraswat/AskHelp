import { useLocation } from 'react-router-dom'
import s from './Header.module.css'

const META = {
  '/':           { title: 'AI Chat',         sub: 'Have a conversation with Gemini AI' },
  '/summarize':  { title: 'Summarize',        sub: 'Get concise summaries of any text' },
  '/explain':    { title: 'Explain Concept',  sub: 'Understand any topic at your level' },
  '/flashcards': { title: 'Flashcards',       sub: 'Generate study cards from your notes' },
  '/cite':       { title: 'Citations',        sub: 'Auto-generate APA, MLA, Chicago & more' },
  '/notes':      { title: 'My Notes',         sub: 'Your personal research notebook' },
  '/settings':   { title: 'Settings',         sub: 'Configure backend and preferences' },
}

export default function Header() {
  const { pathname } = useLocation()
  console.log(pathname+"pathname");
  const { title, sub } = META[pathname] || META['/']
  return (
    <header className={s.header}>
      <div className={s.left}>
        <h1 className={s.title}>{title}</h1>
        <p className={s.sub}>{sub}</p>
      </div>
    </header>
  )
}
