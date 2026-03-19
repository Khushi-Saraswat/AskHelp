import s from './Button.module.css'

export default function Button({ children, variant='primary', size='md', loading, disabled, onClick, type='button', className='' }) {
  return (
    <button type={type} className={`${s.btn} ${s[variant]} ${s[size]} ${className}`}
      disabled={disabled || loading} onClick={onClick}>
      {loading && <span className={s.spin} />}
      {children}
    </button>
  )
}
