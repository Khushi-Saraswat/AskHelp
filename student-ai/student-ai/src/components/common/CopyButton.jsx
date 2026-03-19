import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import s from './CopyButton.module.css'

export default function CopyButton({ text }) {
  const [ok, setOk] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setOk(true); setTimeout(() => setOk(false), 2000)
  }
  return (
    <button className={`${s.btn} ${ok ? s.ok : ''}`} onClick={copy}>
      {ok ? <Check size={12}/> : <Copy size={12}/>}
      {ok ? 'Copied' : 'Copy'}
    </button>
  )
}
