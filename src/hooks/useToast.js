import { useState, useCallback, useRef } from 'react'

/**
 * useToast
 * Gerencia notificações temporárias estilo pixel art.
 */
export function useToast() {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  const showToast = useCallback((mensagem, tipo = 'default') => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToast({ mensagem, tipo })
    timerRef.current = setTimeout(() => setToast(null), 2400)
  }, [])

  return { toast, showToast }
}
