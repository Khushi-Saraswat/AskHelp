import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useApi } from '../hooks/useApi'
import { explainConcept } from '../services/api'
import Button from '../components/common/Button'
import ResultCard from '../components/common/ResultCard'
import ErrorBanner from '../components/common/ErrorBanner'
import s from './ToolPage.module.css'

const LEVELS = [
  { id: 'simple',       label: '5-year-old',  desc: 'Super simple' },
  { id: 'school',       label: 'School',      desc: 'Class 8–10' },
  { id: 'undergraduate',label: 'College',     desc: 'Undergrad level' },
  { id: 'expert',       label: 'Expert',      desc: 'Technical depth' },
]

const EXAMPLES = [
  'Photosynthesis', 'Blockchain', 'Quantum entanglement',
  'Supply and demand', 'Neural networks', 'DNA replication',
]

export default function ExplainPage() {
  const { saveNote } = useApp()
  const { run, loading, error, clearError } = useApi()
  const [concept, setConcept] = useState('')
  const [level, setLevel] = useState('school')
  const [result, setResult] = useState('')

  const handle = async () => {
    setResult('')
    const data = await run(explainConcept, concept, level)
    if (data?.explanation) setResult(data.explanation)
  }

  return (
    <div className={s.page}>
      <div className={s.options}>
        {LEVELS.map(l => (
          <button key={l.id}
            className={`${s.opt} ${level === l.id ? s.optActive : ''}`}
            onClick={() => { setLevel(l.id); setResult('') }}>
            <span className={s.optLabel}>{l.label}</span>
            <span className={s.optDesc}>{l.desc}</span>
          </button>
        ))}
      </div>

      <div className={s.inputBox}>
        <input className={s.singleInput}
          placeholder="Enter a concept, topic, or term…"
          value={concept}
          onChange={e => { setConcept(e.target.value); setResult('') }}
          onKeyDown={e => e.key === 'Enter' && handle()}
        />
        <div className={s.inputFooter}>
          <span className={s.wordCount}>Press Enter or click button</span>
          <Button onClick={handle} loading={loading} disabled={!concept.trim()}>Explain →</Button>
        </div>
      </div>

      {!result && !loading && (
        <div className={s.suggestions}>
          <p className={s.suggestLabel}>Try these</p>
          <div className={s.chips}>
            {EXAMPLES.map(e => (
              <button key={e} className={s.chip} onClick={() => setConcept(e)}>{e}</button>
            ))}
          </div>
        </div>
      )}

      <ErrorBanner message={error} onClose={clearError} />
      <ResultCard label="Explanation" text={result} onSave={saveNote} tag="explain" />
    </div>
  )
}
