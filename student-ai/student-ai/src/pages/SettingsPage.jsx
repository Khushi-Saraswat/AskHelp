import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Check, Server, Info } from 'lucide-react'
import s from './SettingsPage.module.css'

export default function SettingsPage() {
  const { baseUrl, updateBaseUrl } = useApp()
  const [val, setVal]   = useState(baseUrl)
  const [saved, setSaved] = useState(false)

  const save = () => {
    updateBaseUrl(val.trim())
    setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className={s.page}>

      <section className={s.section}>
        <div className={s.sectionHead}>
          <Server size={16} />
          <h2 className={s.sectionTitle}>Spring Boot Backend URL</h2>
        </div>
        <p className={s.desc}>
          Point this to your running Spring Boot server. In development this is usually <code className={s.code}>http://localhost:8080</code>. Leave blank to use Vite's proxy (<code className={s.code}>/api</code>).
        </p>

        <div className={s.row}>
          <input className={s.input} placeholder="http://localhost:8080"
            value={val} onChange={e => { setVal(e.target.value); setSaved(false) }} />
          <button className={`${s.saveBtn} ${saved ? s.saved : ''}`} onClick={save}>
            {saved ? <><Check size={13} /> Saved</> : 'Save'}
          </button>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.sectionHead}>
          <Info size={16} />
          <h2 className={s.sectionTitle}>Expected Spring Boot Endpoints</h2>
        </div>
        <div className={s.endpoints}>
          {[
            ['POST', '/api/chat',       '{ messages:[{role,content}] }',    '{ reply }'],
            ['POST', '/api/summarize',  '{ text, mode }',                   '{ summary }'],
            ['POST', '/api/explain',    '{ concept, level }',               '{ explanation }'],
            ['POST', '/api/flashcards', '{ text, count }',                  '{ cards:[{q,a}] }'],
            ['POST', '/api/cite',       '{ title,author,year,…, format }',  '{ citation }'],
          ].map(([method, path, req, res]) => (
            <div key={path} className={s.endpoint}>
              <div className={s.epLeft}>
                <span className={s.method}>{method}</span>
                <code className={s.path}>{path}</code>
              </div>
              <div className={s.epRight}>
                <span className={s.epReq}>Body: <code>{req}</code></span>
                <span className={s.epRes}>→ <code>{res}</code></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <div className={s.sectionHead}><h2 className={s.sectionTitle}>About</h2></div>
        <p className={s.desc}>StudyAI v1.0 — A student-focused research assistant web app. React + Vite frontend connected to your Spring Boot + Gemini backend.</p>
        <div className={s.meta}>
          <span>Frontend: React 18 + Vite</span>
          <span>Backend: Spring Boot + Gemini</span>
        </div>
      </section>

    </div>
  )
}
