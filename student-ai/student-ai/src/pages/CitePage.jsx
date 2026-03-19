import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useApi } from '../hooks/useApi'
import { generateCitation } from '../services/api'
import Button from '../components/common/Button'
import ResultCard from '../components/common/ResultCard'
import ErrorBanner from '../components/common/ErrorBanner'
import s from './ToolPage.module.css'

const FORMATS = ['APA', 'MLA', 'Chicago', 'Harvard', 'IEEE']

const FIELDS = [
  { key: 'title',   label: 'Title *',          placeholder: 'Article or book title' },
  { key: 'author',  label: 'Author(s) *',       placeholder: 'Last, First' },
  { key: 'year',    label: 'Year *',             placeholder: '2024' },
  { key: 'source',  label: 'Journal / Publisher',placeholder: 'Nature, Pearson…' },
  { key: 'url',     label: 'URL (optional)',     placeholder: 'https://…' },
  { key: 'volume',  label: 'Vol. / Issue',       placeholder: 'Vol. 12, Issue 3' },
  { key: 'pages',   label: 'Pages',              placeholder: '45–67' },
]

export default function CitePage() {
  const { saveNote } = useApp()
  const { run, loading, error, clearError } = useApi()
  const [format, setFormat] = useState('APA')
  const [fields, setFields] = useState({})
  const [result, setResult] = useState('')

  const set = (k, v) => { setFields(p => ({ ...p, [k]: v })); setResult('') }
  const valid = fields.title?.trim() && fields.author?.trim() && fields.year?.trim()

  const handle = async () => {
    setResult('')
    const data = await run(generateCitation, fields, format)
    if (data?.citation) setResult(data.citation)
  }

  return (
    <div className={s.page}>
      <div className={s.options}>
        {FORMATS.map(f => (
          <button key={f}
            className={`${s.opt} ${format === f ? s.optActive : ''}`}
            onClick={() => { setFormat(f); setResult('') }}>
            <span className={s.optLabel}>{f}</span>
          </button>
        ))}
      </div>

      <div className={s.formGrid}>
        {FIELDS.map(f => (
          <div key={f.key} className={s.field}>
            <label className={s.fieldLabel}>{f.label}</label>
            <input className={s.input} placeholder={f.placeholder}
              value={fields[f.key] || ''}
              onChange={e => set(f.key, e.target.value)} />
          </div>
        ))}
      </div>

      <div className={s.submitRow}>
        <Button onClick={handle} loading={loading} disabled={!valid} size="lg">Generate Citation →</Button>
        {!valid && <span className={s.hint}>* Title, Author and Year required</span>}
      </div>

      <ErrorBanner message={error} onClose={clearError} />
      <ResultCard label={`${format} Citation`} text={result} onSave={saveNote} tag="citation" />
    </div>
  )
}
