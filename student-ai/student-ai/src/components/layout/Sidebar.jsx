import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { MessageSquare, Quote, StickyNote, Zap, BookOpen, UserPlus, LogOut } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import s from './Sidebar.module.css'

export default function Sidebar() {
  const { user, logoutUser } = useApp()
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)

  const navLinks = user
    ? [
        { to: '/chat',         icon: MessageSquare, label: 'AI Chat',       badge: null },
        { to: '/dashboard',    icon: BookOpen,      label: 'Dashboard',     badge: null },
        { to: '/knowledgebase', icon: BookOpen,     label: 'Knowledge Base', badge: null },
        { to: '/summarize',    icon: MessageSquare, label: 'Summarize',     badge: null },
        { to: '/flashcards',   icon: Zap,           label: 'Flashcards',    badge: 'New' },
        { to: '/cite',         icon: Quote,         label: 'Citations',     badge: null },
        { to: '/notes',        icon: StickyNote,    label: 'My Notes',      badge: null },
      ]
    : []

  const authLinks = user ? [] : [
    { to: '/signup', icon: UserPlus, label: 'Sign up', badge: null },
  ]

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logoutUser()
      navigate('/login')
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <aside className={s.sidebar}>
      <div className={s.brand}>
        <div className={s.logo}>S</div>
        <div>
          <div className={s.name}>StudyAI</div>
        </div>
      </div>

      <nav className={s.nav}>
        <p className={s.section}>{user ? 'Your tools' : 'Get started'}</p>
        {navLinks.map(({ to, icon: Icon, label, badge }) => (
          <NavLink key={to} to={to} end={to === '/'}
            className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}>
            <Icon size={15} />
            <span>{label}</span>
            {badge && <span className={s.badge}>{badge}</span>}
          </NavLink>
        ))}

        {authLinks.length > 0 && (
          <>
            <p className={s.section}>Authentication</p>
            {authLinks.map(({ to, icon: Icon, label, badge }) => (
              <NavLink key={to} to={to} end={to === '/'}
                className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}>
                <Icon size={15} />
                <span>{label}</span>
                {badge && <span className={s.badge}>{badge}</span>}
              </NavLink>
            ))}
          </>
        )}

        {user && (
          <div className={s.authPanel}>
            <button
              type="button"
              className={s.authBtn}
              onClick={handleLogout}
              disabled={loggingOut}
            >
              <LogOut size={15} />
              <span>{loggingOut ? 'Logging out…' : 'Logout'}</span>
            </button>
          </div>
        )}
      </nav>
    </aside>
  )
}
