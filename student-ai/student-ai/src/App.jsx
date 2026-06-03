import { Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import ChatPage from './pages/ChatPage'
import SummarizePage from './pages/SummarizePage'
import ExplainPage from './pages/ExplainPage'
import FlashcardsPage from './pages/FlashcardsPage'
import CitePage from './pages/CitePage'
import NotesPage from './pages/NotesPage'
import SettingsPage from './pages/SettingsPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import RequireAuth from './components/RequireAuth'
import s from './App.module.css'
import DashboardPage from './pages/DashboardPage'
import KnowledgeBasePage from './pages/KnowledgeBase'

export default function App() {
  const location = useLocation()
  const isAuthRoute = ['/login', '/signup'].includes(location.pathname)

  return (
    <AppProvider>
      <div className={s.shell}>
        {!isAuthRoute && <Sidebar />}
        <div className={s.main}>
          {!isAuthRoute && <Header />}
          <div className={s.content}>
            <Routes>
              <Route path="/"            element={<RequireAuth><DashboardPage /></RequireAuth>} />
              <Route path="/dashboard"    element={<RequireAuth><DashboardPage /></RequireAuth>} />
              <Route path="/chat"         element={<RequireAuth><ChatPage /></RequireAuth>} />
              <Route path="/knowledgebase" element={<RequireAuth><KnowledgeBasePage /></RequireAuth>} />
              <Route path="/summarize"   element={<RequireAuth><SummarizePage /></RequireAuth>} />
              <Route path="/explain"     element={<RequireAuth><ExplainPage /></RequireAuth>} />
              <Route path="/flashcards"  element={<RequireAuth><FlashcardsPage /></RequireAuth>} />
              <Route path="/cite"        element={<RequireAuth><CitePage /></RequireAuth>} />
              <Route path="/notes"       element={<RequireAuth><NotesPage /></RequireAuth>} />
              <Route path="/settings"    element={<RequireAuth><SettingsPage /></RequireAuth>} />
              <Route path="/login"       element={<Login />} />
              <Route path="/signup"      element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </div>
    </AppProvider>
  )
}
