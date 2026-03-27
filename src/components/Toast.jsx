import styles from './Toast.module.css'

/**
 * Toast
 * Notificação temporária pixel art exibida na parte inferior.
 */
export default function Toast({ toast }) {
  if (!toast) return null

  return (
    <div className={`${styles.toast} ${styles[toast.tipo] ?? ''}`}>
      {toast.mensagem}
    </div>
  )
}
