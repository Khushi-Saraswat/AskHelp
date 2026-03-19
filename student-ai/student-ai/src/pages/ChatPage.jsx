import { useState, useRef, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { useApi } from '../hooks/useApi'
import { sendChat } from '../services/api'
import { Send, Bot, User, Trash2 } from 'lucide-react'
import ErrorBanner from '../components/common/ErrorBanner'
import s from './ChatPage.module.css'

export default function ChatPage() {
  const { chatHistory, setChatHistory, saveNote } = useApp()
  const { run, loading, error, clearError } = useApi()
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    clearError()

    const userMsg = { role: 'user', content: text }
    const updated = [...chatHistory, userMsg]
    setChatHistory(updated)

    const data = await run(sendChat, updated)
    if (data?.reply) {
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.reply }])
    }
  }

  const clear = () => { setChatHistory([]); clearError() }

  return (
    <div className={s.page}>
      <div className={s.messages}>
        {chatHistory.length === 0 && (
          <div className={s.empty}>
            <div className={s.emptyIcon}><Bot size={28} /></div>
            <p className={s.emptyTitle}>Start a conversation</p>
            <p className={s.emptySub}>Ask anything — topics, concepts, problems, essays…</p>
            <div className={s.starters}>
              {['Explain Newton\'s laws simply', 'What is the difference between mitosis and meiosis?', 'Help me understand the French Revolution', 'What is recursion in programming?'].map(q => (
                <button key={q} className={s.starter} onClick={() => setInput(q)}>{q}</button>
              ))}
            </div>
          </div>
        )}

        {chatHistory.map((msg, i) => (
          <div key={i} className={`${s.bubble} ${msg.role === 'user' ? s.user : s.ai}`}>
            <div className={s.avatar}>
              {msg.role === 'user' ? <User size={13} /> : <Bot size={13} />}
            </div>
            <div className={s.bubbleInner}>
              <p className={s.bubbleText}>{msg.content}</p>
              {msg.role === 'assistant' && (
                <button className={s.saveMsg} onClick={() => saveNote(msg.content, 'chat')}>Save</button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className={`${s.bubble} ${s.ai}`}>
            <div className={s.avatar}><Bot size={13} /></div>
            <div className={s.bubbleInner}><div className={s.typing}><span/><span/><span/></div></div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className={s.inputArea}>
        <ErrorBanner message={error} onClose={clearError} />
        <div className={s.inputRow}>
          {chatHistory.length > 0 && (
            <button className={s.clearBtn} onClick={clear} title="Clear chat"><Trash2 size={14}/></button>
          )}
          <textarea
            className={s.input}
            placeholder="Ask Gemini anything…"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={1}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          />
          <button className={`${s.sendBtn} ${loading || !input.trim() ? s.sendDisabled : ''}`} onClick={send} disabled={loading || !input.trim()}>
            <Send size={15} />
          </button>
        </div>
        <p className={s.hint}>Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}
