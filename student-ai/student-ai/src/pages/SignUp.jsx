import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/api'
import { useApp } from '../context/AppContext'
import s from './AuthPage.module.css'

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { user } = useApp()

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  const onSubmit = async (data) => {
    setError('')

    try {
      await registerUser(data.name, data.email, data.password)
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Registration failed')
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
              <p className={s.sideSubtitle}>Create your account to start using AI study tools, summaries, and notes.</p>
            </div>
          </div>

          <div className={s.featureList}>
            <div className={s.featureItem}>
              <strong>Smart study help</strong>
              <p>Use AI to learn faster and stay organized.</p>
            </div>
            <div className={s.featureItem}>
              <strong>Easy account access</strong>
              <p>Register once and access the app from anywhere.</p>
            </div>
            <div className={s.featureItem}>
              <strong>Research tools</strong>
              <p>Generate citations, flashcards, and notes quickly.</p>
            </div>
          </div>
        </aside>

        <main className={s.card}>
          <div className={s.switcher}>
            <Link to="/login" className={s.tabButton}>Sign in</Link>
            <Link to="/signup" className={`${s.tabButton} ${s.activeTab}`}>Register</Link>
          </div>

          <div>
            <h1 className={s.heading}>Create account</h1>
            <p className={s.subhead}>Start with your name, email, and a secure password.</p>
          </div>

          {error && <div className={s.error}>{error}</div>}

          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.field}>
              <label className={s.label} htmlFor="name">Full name</label>
              <input
                id="name"
                className={s.input}
                type="text"
                placeholder="Jane Doe"
                {...register('name', {
                  required: 'Full name is required',
                })}
              />
              {errors.name && <p className={s.smallText}>{errors.name.message}</p>}
            </div>

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
              {isSubmitting ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <div className={s.actions}>
            <span className={s.link}>Already have an account?</span>
            <Link to="/login">Sign in</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
