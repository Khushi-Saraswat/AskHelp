import { useState } from 'react'

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const run = async (apiFn, ...args) => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiFn(...args)
      return result
    } catch (e) {
      setError(e.message || 'Something went wrong. Is your backend running?')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { run, loading, error, clearError: () => setError(null) }
}