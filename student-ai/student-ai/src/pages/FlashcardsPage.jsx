import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { generateFlashcards, askRag } from '../services/api'
import Button from '../components/common/Button'
import ErrorBanner from '../components/common/ErrorBanner'
import { ChevronLeft, ChevronRight, RotateCcw, Eye } from 'lucide-react'
import s from './FlashcardsPage.module.css'

export default function FlashcardsPage() {
  const { run, loading, error, clearError } = useApi()

  const [text, setText] = useState('')
  const [count, setCount] = useState(5)
  const [cards, setCards] = useState([])
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const [question, setQuestion] = useState('')
  const [ragAnswer, setRagAnswer] = useState('')
  const [ragLoading, setRagLoading] = useState(false)

  // ── Flashcard generation ─────────────────────────────
  const generate = async () => {
    setCards([])
    setIdx(0)
    setFlipped(false)

    const data = await run(generateFlashcards, text, count)
    if (data?.cards) setCards(data.cards)
  }

  // ── RAG search ───────────────────────────────────────
  const askQuestion = async () => {
    if (!question.trim()) return

    setRagLoading(true)
    setRagAnswer('')

    try {
      const res = await askRag(question)

      // backend-safe response handling
      setRagAnswer(
        res?.answer ||
        res?.data?.answer ||
        res?.result ||
        'No answer found'
      )
    } catch (err) {
      setRagAnswer(err.message)
    } finally {
      setRagLoading(false)
    }
  }

  // ── Flashcard navigation ─────────────────────────────
  const next = () => {
    setIdx(i => Math.min(i + 1, cards.length - 1))
    setFlipped(false)
  }

  const prev = () => {
    setIdx(i => Math.max(i - 1, 0))
    setFlipped(false)
  }

  return (
    <div className={s.page}>

      {/* ── RAG SEARCH BAR ───────────────────────────── */}
      <div className={s.inputBox}>
        <div className={s.inputFooter}>
          <textarea
            className={s.textarea}
            rows={2}
            placeholder="Ask anything (RAG search)..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <Button
            onClick={askQuestion}
            loading={ragLoading}
            disabled={!question.trim()}
          >
            Ask →
          </Button>
        </div>

        {ragAnswer && (
          <div className={s.ragAnswer}>
            <strong>Answer:</strong>
            <p>{ragAnswer}</p>
          </div>
        )}
      </div>

      {/* ── FLASHCARD INPUT ───────────────────────────── */}
      {cards.length === 0 ? (
        <>
          <div className={s.inputBox}>
            <textarea
              className={s.textarea}
              rows={8}
              placeholder="Paste your notes or any text — AI will turn it into flashcards…"
              value={text}
              onChange={e => setText(e.target.value)}
            />

            <div className={s.inputFooter}>
              <div className={s.countRow}>
                <span className={s.countLabel}>Cards to generate:</span>

                {[3, 5, 8, 10].map(n => (
                  <button
                    key={n}
                    className={`${s.countBtn} ${count === n ? s.countActive : ''}`}
                    onClick={() => setCount(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <Button
                onClick={generate}
                loading={loading}
                disabled={!text.trim()}
              >
                Generate Cards →
              </Button>
            </div>
          </div>

          <ErrorBanner message={error} onClose={clearError} />
        </>
      ) : (
        /* ── FLASHCARD DECK ───────────────────────────── */
        <div className={s.deck}>

          <div className={s.deckMeta}>
            <span className={s.deckCount}>
              {idx + 1} / {cards.length}
            </span>

            <button
              className={s.resetBtn}
              onClick={() => {
                setCards([])
                clearError()
              }}
            >
              <RotateCcw size={13} /> New Cards
            </button>
          </div>

          <div
            className={`${s.card} ${flipped ? s.flipped : ''}`}
            onClick={() => setFlipped(p => !p)}
          >
            <div className={s.cardFront}>
              <span className={s.cardSide}>Question</span>

              <button className={s.cardText}>Save</button>

              <p className={s.cardText}>
                {cards[idx]?.q}
              </p>

              <div className={s.tapHint}>
                <Eye size={12} /> Tap to reveal answer
              </div>
            </div>

            <div className={s.cardBack}>
              <span className={s.cardSide}>Answer</span>

              <p className={s.cardText}>
                {cards[idx]?.a}
              </p>
            </div>
          </div>

          <div className={s.controls}>
            <button
              className={s.navBtn}
              onClick={prev}
              disabled={idx === 0}
            >
              <ChevronLeft size={18} />
            </button>

            <div className={s.dots}>
              {cards.map((_, i) => (
                <span
                  key={i}
                  className={`${s.dot} ${i === idx ? s.dotActive : ''}`}
                  onClick={() => {
                    setIdx(i)
                    setFlipped(false)
                  }}
                />
              ))}
            </div>

            <button
              className={s.navBtn}
              onClick={next}
              disabled={idx === cards.length - 1}
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>
      )}
    </div>
  )
}