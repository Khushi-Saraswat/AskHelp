import { AlertTriangle, X } from 'lucide-react'
import s from './ErrorBanner.module.css'

export default function ErrorBanner({ message, onClose }) {
  if (!message) return null
  return (
    <div className={s.wrap}>
      <AlertTriangle size={14} />
      <span>{message}</span>
      {onClose && <button className={s.close} onClick={onClose}><X size={12}/></button>}
    </div>
  )
}
