import { Link } from 'react-router-dom'
import s from './AuthPage.module.css'

export default function AuthGuide() {
  return (
    <div className={s.page}>
      <div className={s.card}>
        <div>
          <h1 className={s.heading}>Authentication Guide</h1>
          <p className={s.subhead}>Use these pages to register, sign in, and log out of your StudyAI account.</p>
        </div>

        <section className={s.field}>
          <h2 className={s.label}>Register</h2>
          <p className={s.smallText}>
            Go to the signup page and enter your full name, email, and a secure password.
            After successful registration, you can sign in immediately.
          </p>
          <Link className={s.link} to="/signup">Open Signup page</Link>
        </section>

        <section className={s.field}>
          <h2 className={s.label}>Sign In</h2>
          <p className={s.smallText}>
            Use the login page to sign in with the email and password you registered with.
            If the credentials are correct, you will be redirected to the dashboard.
          </p>
          <Link className={s.link} to="/login">Open Login page</Link>
        </section>

        <section className={s.field}>
          <h2 className={s.label}>Logout</h2>
          <p className={s.smallText}>
            Use the Settings page to log out. This sends a logout request to the backend and clears your session.
          </p>
          <Link className={s.link} to="/settings">Open Settings page</Link>
        </section>

        <section className={s.field}>
          <h2 className={s.label}>Troubleshooting</h2>
          <p className={s.smallText}>
            If login or signup fails, make sure your Spring Boot backend is running and that the backend URL is configured in Settings.
          </p>
        </section>
      </div>
    </div>
  )
}
