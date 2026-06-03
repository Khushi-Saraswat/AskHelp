import { useApp } from '../context/AppContext'
import s from './AuthPage.module.css'

export default function HomePage() {
  const { user, authLoading } = useApp()

  return (
    <div className={s.page}>
      <div className={s.card}>
        <div>
          <h1 className={s.heading}>Welcome to StudyAI</h1>
          <p className={s.subhead}>
            StudyAI is your student research assistant. Use it to chat with AI, summarize notes, explain concepts, generate citations, make flashcards, and organize your research.
          </p>
        </div>

        {user && (
          <div className={s.banner}>
            <strong>Welcome back!</strong> You are signed in and your tools are available below.
          </div>
        )}

        <div className={s.field}>
          <h2 className={s.label}>How it works</h2>
          <p className={s.smallText}>
            First create an account or sign in. After authentication, the tool tabs and features unlock automatically. The app connects your React UI to a Spring Boot backend.
          </p>
        </div>

        <div className={s.field}>
          <h2 className={s.label}>Why use StudyAI?</h2>
          <ul className={s.smallText}>
            <li>Chat with AI for study help</li>
            <li>Generate summaries and explanations</li>
            <li>Create citations and flashcards quickly</li>
            <li>Save notes securely once signed in</li>
          </ul>
        </div>

        {user ? (
          <div className={s.actions}>
            <a className={s.button} href="/dashboard">Go to Dashboard</a>
          </div>
        ) : null}
      </div>
    </div>
  )
}
