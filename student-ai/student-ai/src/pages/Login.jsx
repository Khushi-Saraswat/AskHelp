import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/api'
import { useApp } from '../context/AppContext'
import s from './AuthPage.module.css'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { user, refreshUser } = useApp()

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  const onSubmit = async (data) => {
    setError('')

    try {
      await login(data.email, data.password)
      await refreshUser()
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className={s.page}>
      <div className={s.authShell}>
        <aside className={s.authPanel}>
          <div className={s.brandPanel}>
            <div className={s.sideLogo}>S</div>
            <div>
              <h2 className={s.sideTitle}>StudyAI</h2>
              <p className={s.sideSubtitle}>Sign in to continue your learning workflow with AI-powered research, study summaries, and flashcards.</p>
            </div>
          </div>

          <div className={s.featureList}>
            <div className={s.featureItem}>
              <strong>Chat with AI</strong>
              <p>Ask questions and get instant answers for your study topics.</p>
            </div>
            <div className={s.featureItem}>
              <strong>Generate summaries</strong>
              <p>Turn notes into clear summaries in seconds.</p>
            </div>
            <div className={s.featureItem}>
              <strong>Create flashcards</strong>
              <p>Build study cards automatically from your text.</p>
            </div>
          </div>
        </aside>

        <main className={s.card}>
          <div className={s.switcher}>
            <Link to="/login" className={`${s.tabButton} ${s.activeTab}`}>Sign in</Link>
            <Link to="/signup" className={s.tabButton}>Register</Link>
          </div>

          <div>
            <h1 className={s.heading}>Sign in</h1>
            <p className={s.subhead}>Use your StudyAI account to access the app.</p>
          </div>

          {error && <div className={s.error}>{error}</div>}

          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.field}>
              <label className={s.label} htmlFor="email">Email</label>
              <input
                id="email"
                className={s.input}
                type="email"
                placeholder="you@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                })}
              />
              {errors.email && <p className={s.smallText}>{errors.email.message}</p>}
            </div>

            <div className={s.field}>
              <label className={s.label} htmlFor="password">Password</label>
              <input
                id="password"
                className={s.input}
                type="password"
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
              />
              {errors.password && <p className={s.smallText}>{errors.password.message}</p>}
            </div>

            <button className={s.button} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className={s.actions}>
            <span className={s.link}>New here?</span>
            <Link to="/signup">Create an account</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
