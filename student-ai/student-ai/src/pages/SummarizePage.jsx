import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useApi } from '../hooks/useApi'
import { summarizeText } from '../services/api'
import Button from '../components/common/Button'
import ResultCard from '../components/common/ResultCard'
import ErrorBanner from '../components/common/ErrorBanner'
import s from './ToolPage.module.css'

const MODES = [
  { id: 'brief',    label: 'Brief',    desc: '2–3 sentences' },
  { id: 'standard', label: 'Standard', desc: '1 paragraph' },
  { id: 'detailed', label: 'Detailed', desc: 'Bullet points' },
]

export default function SummarizePage() {
  const { saveNote } = useApp()
  const { run, loading, error, clearError } = useApi()
  const [text, setText] = useState('')
  const [mode, setMode] = useState('standard')
  const [result, setResult] = useState('')

  const handle = async () => {
    setResult('')
    const data = await run(summarizeText, text, mode)
    if (data?.summary) setResult(data.summary)
  }

  const words = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <div className={s.page}>
      <div className={s.options}>
        {MODES.map(m => (
          <button key={m.id}
            className={`${s.opt} ${mode === m.id ? s.optActive : ''}`}
            onClick={() => { setMode(m.id); setResult('') }}>
            <span className={s.optLabel}>{m.label}</span>
            <span className={s.optDesc}>{m.desc}</span>
          </button>
        ))}
      </div>

      <div className={s.inputBox}>
        <textarea className={s.textarea} rows={9}
          placeholder="Paste any article, chapter, or notes here…"
          value={text} onChange={e => { setText(e.target.value); setResult('') }} />
        <div className={s.inputFooter}>
          <span className={s.wordCount}>{words > 0 ? `${words} words` : 'Paste your text above'}</span>
          <Button onClick={handle} loading={loading} disabled={!text.trim()}>Summarize →</Button>
        </div>
      </div>

      <ErrorBanner message={error} onClose={clearError} />
      <ResultCard label="Summary" text={result} onSave={saveNote} tag="summary" />
    </div>
  )
}
