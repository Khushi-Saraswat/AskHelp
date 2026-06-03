import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function RequireAuth({ children }) {
  const { user, authLoading } = useApp()
  const location = useLocation()

  if (authLoading) {
    return null
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
