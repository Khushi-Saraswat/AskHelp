import { Routes, Route } from 'react-router-dom'
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
import s from './App.module.css'

export default function App() {
  return (
    <AppProvider>
      <div className={s.shell}>
        <Sidebar />
        <div className={s.main}>
          <Header />
          <div className={s.content}>
            <Routes>
              <Route path="/"            element={<ChatPage />} />
              <Route path="/summarize"   element={<SummarizePage />} />
              <Route path="/explain"     element={<ExplainPage />} />
              <Route path="/flashcards"  element={<FlashcardsPage />} />
              <Route path="/cite"        element={<CitePage />} />
              <Route path="/notes"       element={<NotesPage />} />
              <Route path="/settings"    element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </AppProvider>
  )
}
