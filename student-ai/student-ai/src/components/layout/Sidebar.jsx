import { NavLink } from 'react-router-dom'
import { MessageSquare, FileText, Quote, StickyNote, Zap, BookOpen, Settings } from 'lucide-react'
import s from './Sidebar.module.css'

const NAV = [
  { to: '/',            icon: MessageSquare, label: 'AI Chat',     badge: null },
  { to: '/summarize',   icon: FileText,      label: 'Summarize',   badge: null },
  { to: '/explain',     icon: BookOpen,      label: 'Explain',     badge: 'New' },
  { to: '/flashcards',  icon: Zap,           label: 'Flashcards',  badge: 'New' },
  { to: '/cite',        icon: Quote,         label: 'Citations',   badge: null },
  { to: '/notes',       icon: StickyNote,    label: 'My Notes',    badge: null },
]

export default function Sidebar() {
  return (
    <aside className={s.sidebar}>
      <div className={s.brand}>
        <div className={s.logo}>S</div>
        <div>
          <div className={s.name}>StudyAI</div>
        </div>
      </div>

      <nav className={s.nav}>
        <p className={s.section}>Tools</p>
        {NAV.map(({ to, icon: Icon, label, badge }) => (
          <NavLink key={to} to={to} end={to === '/'}
            className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}>
            <Icon size={15} />
            <span>{label}</span>
            {badge && <span className={s.badge}>{badge}</span>}
          </NavLink>
        ))}
      </nav>

     
    </aside>
  )
}
