import CopyButton from './CopyButton'
import s from './ResultCard.module.css'

export default function ResultCard({ label, text, onSave, tag }) {
  if (!text) return null
  return (
    <div className={s.card}>
      <div className={s.header}>
        <span className={s.label}>{label}</span>
        <div className={s.actions}>
          {onSave && (
            <button className={s.save} onClick={() => onSave(text, tag)}>+ Save Note</button>
          )}
          <CopyButton text={text} />
        </div>
      </div>
      <div className={s.body}>{text}</div>
    </div>
  )
}
